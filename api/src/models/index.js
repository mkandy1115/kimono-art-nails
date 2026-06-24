import { DataTypes } from 'sequelize';
import { sequelize, hasDatabase } from '../config/database.js';

// Models are only defined when a database is configured. When running without
// a DATABASE_URL, these stay null and the repository serves seed data instead.

export let Category = null;
export let Product = null;
export let Inquiry = null;

if (hasDatabase) {
  Category = sequelize.define(
    'Category',
    {
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { tableName: 'categories', underscored: true }
  );

  Product = sequelize.define(
    'Product',
    {
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      tagline: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USD' },
      shape: { type: DataTypes.STRING },
      length: { type: DataTypes.STRING },
      pieces: { type: DataTypes.INTEGER, defaultValue: 10 },
      materials: { type: DataTypes.TEXT },
      status: {
        type: DataTypes.ENUM('available', 'made_to_order', 'sold_out', 'coming_soon'),
        allowNull: false,
        defaultValue: 'available',
      },
      featured: { type: DataTypes.BOOLEAN, defaultValue: false },
      image: { type: DataTypes.STRING },
      gallery: { type: DataTypes.JSONB, defaultValue: [] },
      theme: { type: DataTypes.JSONB, defaultValue: {} },
      displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { tableName: 'products', underscored: true }
  );

  Inquiry = sequelize.define(
    'Inquiry',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      productSlug: { type: DataTypes.STRING },
      subject: { type: DataTypes.STRING },
      message: { type: DataTypes.TEXT, allowNull: false },
      handled: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { tableName: 'inquiries', underscored: true }
  );

  // Associations
  Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
  Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
}

export { sequelize, hasDatabase };
