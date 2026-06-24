import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

import routes from './routes/index.js';
import { sequelize, hasDatabase } from './models/index.js';

const app = express();

// ------------------------------- Security ------------------------------------
app.disable('x-powered-by');
app.use(helmet());
app.use(compression());

// --------------------------------- CORS --------------------------------------
// Allow the configured frontend origins. "*" allows any origin, which is fine
// for a public, read-only catalog API.
const rawOrigins = process.env.ALLOWED_ORIGINS?.trim();
const corsOptions =
  !rawOrigins || rawOrigins === '*'
    ? { origin: true }
    : {
        origin: rawOrigins.split(',').map((o) => o.trim()).filter(Boolean),
      };
app.use(cors(corsOptions));

// ------------------------------- Parsing/logs --------------------------------
app.use(express.json({ limit: '100kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// --------------------------------- Routes ------------------------------------
app.get('/', (req, res) => {
  res.json({
    name: 'KIMONO Art Nails API',
    docs: '/api/health, /api/categories, /api/products, /api/products/:slug, POST /api/inquiries',
  });
});

app.use('/api', routes);

// ------------------------------- 404 + errors --------------------------------
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Malformed JSON bodies from body-parser are client errors, not server errors.
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  console.error('[error]', err);
  res.status(err.status || 500).json({ error: 'Internal server error' });
});

// -------------------------------- Startup ------------------------------------
const port = process.env.PORT || 3000;

async function start() {
  if (hasDatabase) {
    try {
      await sequelize.authenticate();
      // `alter: true` keeps the schema in sync without destructive migrations —
      // appropriate for a tiny catalog. Run `npm run seed` to populate data.
      await sequelize.sync({ alter: true });
      console.log('[db] Connected to PostgreSQL and synced models.');
    } catch (err) {
      console.error('[db] Could not connect to the database:', err.message);
      console.error('[db] Falling back is not possible mid-run — fix DATABASE_URL and restart.');
      process.exit(1);
    }
  } else {
    console.log('[db] No DATABASE_URL set — serving the in-memory seed catalog.');
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[api] KIMONO Art Nails API running on port ${port}`);
  });
}

start();

export default app;
