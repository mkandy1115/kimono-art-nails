import { Sequelize } from 'sequelize';

// ----------------------------------------------------------------------------
// Database connection (Sequelize).
//
// In production, set DATABASE_URL to your Neon PostgreSQL connection string.
// When DATABASE_URL is absent (e.g. local development before you create a Neon
// account), `sequelize` is null and the API falls back to serving the seed
// catalog from memory. See src/repository.js.
// ----------------------------------------------------------------------------

const databaseUrl = process.env.DATABASE_URL?.trim();

export const hasDatabase = Boolean(databaseUrl);

export const sequelize = hasDatabase
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        // Neon requires SSL. `rejectUnauthorized: false` is the standard
        // setting for managed providers that use their own certificate chain.
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 5,
        min: 0,
        idle: 10_000,
        acquire: 30_000,
      },
    })
  : null;

export default sequelize;
