import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  listCategories,
  listProducts,
  getProductBySlug,
  createInquiry,
  hasDatabase,
} from '../repository.js';

const router = Router();

// ------------------------------- Health --------------------------------------

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'kimono-art-nails-api',
    mode: hasDatabase ? 'postgres' : 'in-memory',
    time: new Date().toISOString(),
  });
});

// ----------------------------- Categories ------------------------------------

router.get('/categories', async (req, res, next) => {
  try {
    res.json({ data: await listCategories() });
  } catch (err) {
    next(err);
  }
});

// ------------------------------- Products ------------------------------------

router.get('/products', async (req, res, next) => {
  try {
    const { category, featured, status } = req.query;
    const filters = {};
    if (category) filters.category = String(category);
    if (status) filters.status = String(status);
    if (featured !== undefined) filters.featured = featured === 'true' || featured === '1';

    res.json({ data: await listProducts(filters) });
  } catch (err) {
    next(err);
  }
});

router.get('/products/:slug', async (req, res, next) => {
  try {
    const product = await getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
});

// ------------------------------- Inquiries -----------------------------------

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 inquiries per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

router.post('/inquiries', inquiryLimiter, async (req, res, next) => {
  try {
    const { name, email, productSlug, subject, message } = req.body ?? {};

    const errors = [];
    if (!name || String(name).trim().length < 2) errors.push('A name is required.');
    if (!email || !isEmail(String(email))) errors.push('A valid email is required.');
    if (!message || String(message).trim().length < 5) errors.push('A message is required.');
    if (errors.length) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const inquiry = await createInquiry({
      name: String(name).trim(),
      email: String(email).trim(),
      productSlug: productSlug ? String(productSlug).trim() : null,
      subject: subject ? String(subject).trim() : null,
      message: String(message).trim(),
    });

    res.status(201).json({
      data: { id: inquiry.id ?? null, persisted: inquiry.persisted !== false },
      message: 'Thank you — your inquiry has been received. We will reply by email soon.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
