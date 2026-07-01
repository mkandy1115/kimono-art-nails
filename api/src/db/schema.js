import {
  pgTable,
  pgEnum,
  serial,
  integer,
  varchar,
  text,
  numeric,
  boolean,
  jsonb,
  timestamp,
} from 'drizzle-orm/pg-core';

// ----------------------------------------------------------------------------
// Drizzle schema — the database shape for the KIMONO Art Nails catalog.
//
// Maps 1:1 to the previous Sequelize models. `price` is kept as numeric dollars
// (e.g. 38.00) to match the catalog data and the frontend formatter. If you
// later add Stripe, consider an integer `price_cents` column.
// ----------------------------------------------------------------------------

export const productStatus = pgEnum('product_status', [
  'available',
  'made_to_order',
  'sold_out',
  'coming_soon',
]);

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  tagline: varchar('tagline', { length: 255 }),
  taglineJa: varchar('tagline_ja', { length: 255 }),
  description: text('description'),
  descriptionJa: text('description_ja'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull().default('0'),
  currency: varchar('currency', { length: 8 }).notNull().default('USD'),
  categoryId: integer('category_id').references(() => categories.id),
  shape: varchar('shape', { length: 64 }),
  length: varchar('length', { length: 64 }),
  pieces: integer('pieces').default(10),
  materials: text('materials'),
  status: productStatus('status').notNull().default('available'),
  featured: boolean('featured').notNull().default(false),
  image: varchar('image', { length: 512 }),
  gallery: jsonb('gallery').notNull().default([]),
  theme: jsonb('theme').notNull().default({}),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  productSlug: varchar('product_slug', { length: 255 }),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  handled: boolean('handled').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
