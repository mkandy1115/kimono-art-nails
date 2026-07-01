import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';

import { getDb } from './db/client.js';
import {
  listCategories,
  listProducts,
  getProductBySlug,
  createInquiry,
} from './repository.js';
import images from './routes/images.js';
import { sendInquiryEmail } from './lib/inquiryEmail.js';

// ----------------------------------------------------------------------------
// KIMONO Art Nails API — Hono app for Cloudflare Workers.
//
// On Workers there is no `app.listen()`: we `export default app`, and the
// runtime invokes `app.fetch` for each request. Environment values come from
// `c.env` (Worker secrets / vars), not `process.env`.
// ----------------------------------------------------------------------------

const app = new Hono();

app.use('*', logger());
// Security headers for API JSON routes only — not /images/* (CORP: same-origin
// would block <img> embeds from kimono-art-nails.pages.dev → workers.dev).
app.use('/api/*', secureHeaders());

// CORS — allow the configured frontend origin(s). `ALLOWED_ORIGINS` is a
// comma-separated list, or "*" for any origin (fine for a public catalog).
app.use('/api/*', (c, next) => {
  const raw = c.env.ALLOWED_ORIGINS?.trim();
  const handler = cors({
    origin: !raw || raw === '*' ? '*' : raw.split(',').map((o) => o.trim()).filter(Boolean),
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    maxAge: 86400,
  });
  return handler(c, next);
});

// Attach a per-request Drizzle client (or null for in-memory fallback).
app.use('/api/*', async (c, next) => {
  c.set('db', getDb(c.env.DATABASE_URL));
  await next();
});

// Product photos from Cloudflare R2 (GET /images/<key>)
app.route('/images', images);

// --------------------------------- Root --------------------------------------
app.get('/', (c) =>
  c.json({
    name: 'KIMONO Art Nails API',
    docs: '/api/health, /api/categories, /api/products, /api/products/:slug, POST /api/inquiries, GET /images/*',
  })
);

// -------------------------------- Health -------------------------------------
app.get('/api/health', (c) =>
  c.json({
    status: 'ok',
    service: 'kimono-art-nails-api',
    mode: c.get('db') ? 'postgres' : 'in-memory',
    images: Boolean(c.env.PRODUCT_IMAGE),
    notifications: Boolean(c.env.WEB3FORMS_ACCESS_KEY?.trim()),
    time: new Date().toISOString(),
  })
);

// ------------------------------ Categories -----------------------------------
app.get('/api/categories', async (c) => {
  const data = await listCategories(c.get('db'));
  return c.json({ data });
});

// ------------------------------- Products ------------------------------------
app.get('/api/products', async (c) => {
  const { category, featured, status } = c.req.query();
  const filters = { publicBaseUrl: c.env.API_PUBLIC_URL };
  if (category) filters.category = category;
  if (status) filters.status = status;
  if (featured !== undefined) filters.featured = featured === 'true' || featured === '1';

  const data = await listProducts(c.get('db'), filters);
  return c.json({ data });
});

app.get('/api/products/:slug', async (c) => {
  const product = await getProductBySlug(c.get('db'), c.req.param('slug'), {
    publicBaseUrl: c.env.API_PUBLIC_URL,
  });
  if (!product) return c.json({ error: 'Product not found' }, 404);
  return c.json({ data: product });
});

// ------------------------------- Inquiries -----------------------------------
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

app.post('/api/inquiries', async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON in request body' }, 400);
  }

  const { name, email, productSlug, subject, message } = body ?? {};

  const trimmedName = name ? String(name).trim() : '';
  const trimmedEmail = email ? String(email).trim() : '';
  const trimmedMessage = message ? String(message).trim() : '';
  const trimmedSubject = subject ? String(subject).trim() : null;
  const trimmedSlug = productSlug ? String(productSlug).trim() : null;

  const errors = [];
  if (!trimmedName || trimmedName.length < 2) errors.push('A name is required.');
  if (trimmedName.length > 100) errors.push('Name is too long.');
  if (!trimmedEmail || !isEmail(trimmedEmail)) errors.push('A valid email is required.');
  if (!trimmedMessage || trimmedMessage.length < 5) errors.push('A message is required.');
  if (trimmedMessage.length > 5000) errors.push('The message is too long.');
  if (errors.length) {
    return c.json({ error: 'Validation failed', details: errors }, 400);
  }

  let inquiry;
  try {
    inquiry = await createInquiry(c.get('db'), {
      name: trimmedName,
      email: trimmedEmail,
      productSlug: trimmedSlug,
      subject: trimmedSubject,
      message: trimmedMessage,
    });
  } catch (err) {
    console.error('[inquiry db]', err);
    return c.json({ error: 'Could not save your inquiry. Please try again.' }, 500);
  }

  let mail = { sent: false };
  try {
    mail = await sendInquiryEmail(c.env, {
      name: trimmedName,
      email: trimmedEmail,
      productSlug: trimmedSlug,
      subject: trimmedSubject,
      message: trimmedMessage,
    });
    if (!mail.sent) {
      console.warn('[inquiry] WEB3FORMS_ACCESS_KEY not set — saved to DB only.');
    }
  } catch (err) {
    // Inquiry is already persisted — do not fail the form if Web3Forms is down.
    console.error('[inquiry web3forms]', err);
    mail = { sent: false, error: err.message };
  }

  return c.json(
    {
      data: {
        id: inquiry.id ?? null,
        persisted: inquiry.persisted !== false,
        emailed: Boolean(mail.sent),
      },
      message: 'Thank you — your inquiry has been received. We will reply by email soon.',
    },
    201
  );
});

// ------------------------------- 404 + errors --------------------------------
app.notFound((c) => c.json({ error: 'Not found' }, 404));

app.onError((err, c) => {
  console.error('[error]', err);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;
