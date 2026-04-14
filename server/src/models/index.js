const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// --- Models Definition ---

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('Super Admin', 'Admin', 'Manager', 'Cashier', 'Viewer'), defaultValue: 'Viewer' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  last_login: { type: DataTypes.DATE },
}, { timestamps: true, tableName: 'users' });

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  parent_id: { type: DataTypes.INTEGER, allowNull: true }
}, { timestamps: true, updatedAt: false, tableName: 'categories' });

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, unique: true },
  barcode: { type: DataTypes.STRING, unique: true },
  category_id: { type: DataTypes.INTEGER },
  unit: { type: DataTypes.STRING },
  cost_price: { type: DataTypes.DECIMAL(10, 2) },
  selling_price: { type: DataTypes.DECIMAL(10, 2) },
  tax_rate: { type: DataTypes.DECIMAL(5, 2) },
  image_url: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true, tableName: 'products' });

const Warehouse = sequelize.define('Warehouse', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  manager_id: { type: DataTypes.INTEGER }
}, { timestamps: true, updatedAt: false, tableName: 'warehouses' });

const Inventory = sequelize.define('Inventory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product_id: { type: DataTypes.INTEGER },
  warehouse_id: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  reorder_level: { type: DataTypes.INTEGER, defaultValue: 10 },
  reorder_quantity: { type: DataTypes.INTEGER, defaultValue: 50 },
  last_updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false, tableName: 'inventory' });

const Supplier = sequelize.define('Supplier', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contact_person: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  gst_number: { type: DataTypes.STRING }
}, { timestamps: true, updatedAt: false, tableName: 'suppliers' });

const PurchaseOrder = sequelize.define('PurchaseOrder', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  supplier_id: { type: DataTypes.INTEGER },
  status: { type: DataTypes.ENUM('draft', 'ordered', 'received', 'cancelled'), defaultValue: 'draft' },
  order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  received_date: { type: DataTypes.DATE },
  total_amount: { type: DataTypes.DECIMAL(12, 2) },
  notes: { type: DataTypes.TEXT },
  created_by: { type: DataTypes.INTEGER }
}, { timestamps: false, tableName: 'purchase_orders' });

const PurchaseOrderItem = sequelize.define('PurchaseOrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  po_id: { type: DataTypes.INTEGER },
  product_id: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER },
  unit_price: { type: DataTypes.DECIMAL(10, 2) },
  total: { type: DataTypes.DECIMAL(12, 2) }
}, { timestamps: false, tableName: 'purchase_order_items' });

const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  gst_number: { type: DataTypes.STRING },
  credit_limit: { type: DataTypes.DECIMAL(12, 2) }
}, { timestamps: true, updatedAt: false, tableName: 'customers' });

const Invoice = sequelize.define('Invoice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoice_number: { type: DataTypes.STRING, unique: true, allowNull: false },
  customer_id: { type: DataTypes.INTEGER },
  cashier_id: { type: DataTypes.INTEGER },
  invoice_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  due_date: { type: DataTypes.DATE },
  subtotal: { type: DataTypes.DECIMAL(12, 2) },
  tax_amount: { type: DataTypes.DECIMAL(12, 2) },
  discount: { type: DataTypes.DECIMAL(12, 2) },
  grand_total: { type: DataTypes.DECIMAL(12, 2) },
  payment_status: { type: DataTypes.ENUM('unpaid', 'partial', 'paid'), defaultValue: 'unpaid' },
  payment_method: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT }
}, { timestamps: false, tableName: 'invoices' });

const InvoiceItem = sequelize.define('InvoiceItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoice_id: { type: DataTypes.INTEGER },
  product_id: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER },
  unit_price: { type: DataTypes.DECIMAL(10, 2) },
  discount_pct: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  total: { type: DataTypes.DECIMAL(12, 2) }
}, { timestamps: false, tableName: 'invoice_items' });

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoice_id: { type: DataTypes.INTEGER },
  amount: { type: DataTypes.DECIMAL(12, 2) },
  payment_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  method: { type: DataTypes.ENUM('cash', 'card', 'upi', 'bank') },
  reference_number: { type: DataTypes.STRING },
  recorded_by: { type: DataTypes.INTEGER }
}, { timestamps: false, tableName: 'payments' });

const StockMovement = sequelize.define('StockMovement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product_id: { type: DataTypes.INTEGER },
  type: { type: DataTypes.ENUM('in', 'out', 'adjustment', 'transfer') },
  quantity: { type: DataTypes.INTEGER },
  reference_id: { type: DataTypes.INTEGER },
  reference_type: { type: DataTypes.STRING },
  warehouse_id: { type: DataTypes.INTEGER },
  performed_by: { type: DataTypes.INTEGER },
  notes: { type: DataTypes.TEXT }
}, { timestamps: true, updatedAt: false, tableName: 'stock_movements' });

const AuditLog = sequelize.define('AuditLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  action: { type: DataTypes.STRING },
  entity: { type: DataTypes.STRING },
  entity_id: { type: DataTypes.INTEGER },
  old_values: { type: DataTypes.JSON },
  new_values: { type: DataTypes.JSON },
  ip_address: { type: DataTypes.STRING }
}, { timestamps: true, updatedAt: false, tableName: 'audit_logs' });

// --- Relationships ---

// Categories
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'subcategories' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });

// Products
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Warehouses
User.hasMany(Warehouse, { foreignKey: 'manager_id' });
Warehouse.belongsTo(User, { foreignKey: 'manager_id', as: 'manager' });

// Inventory
Product.hasMany(Inventory, { foreignKey: 'product_id', onDelete: 'RESTRICT' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });
Warehouse.hasMany(Inventory, { foreignKey: 'warehouse_id', onDelete: 'RESTRICT' });
Inventory.belongsTo(Warehouse, { foreignKey: 'warehouse_id' });

// Purchase Orders
Supplier.hasMany(PurchaseOrder, { foreignKey: 'supplier_id', onDelete: 'RESTRICT' });
PurchaseOrder.belongsTo(Supplier, { foreignKey: 'supplier_id' });
User.hasMany(PurchaseOrder, { foreignKey: 'created_by' });
PurchaseOrder.belongsTo(User, { as: 'creator', foreignKey: 'created_by' });

PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: 'po_id', onDelete: 'RESTRICT' });
PurchaseOrderItem.belongsTo(PurchaseOrder, { foreignKey: 'po_id' });
Product.hasMany(PurchaseOrderItem, { foreignKey: 'product_id', onDelete: 'RESTRICT' });
PurchaseOrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Invoices
Customer.hasMany(Invoice, { foreignKey: 'customer_id', onDelete: 'RESTRICT' });
Invoice.belongsTo(Customer, { foreignKey: 'customer_id' });
User.hasMany(Invoice, { foreignKey: 'cashier_id' });
Invoice.belongsTo(User, { foreignKey: 'cashier_id', as: 'cashier' });

Invoice.hasMany(InvoiceItem, { foreignKey: 'invoice_id', onDelete: 'RESTRICT' });
InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoice_id' });
Product.hasMany(InvoiceItem, { foreignKey: 'product_id', onDelete: 'RESTRICT' });
InvoiceItem.belongsTo(Product, { foreignKey: 'product_id' });

// Payments
Invoice.hasMany(Payment, { foreignKey: 'invoice_id', onDelete: 'RESTRICT' });
Payment.belongsTo(Invoice, { foreignKey: 'invoice_id' });
User.hasMany(Payment, { foreignKey: 'recorded_by' });
Payment.belongsTo(User, { foreignKey: 'recorded_by', as: 'recorder' });

// Stock Movements
Product.hasMany(StockMovement, { foreignKey: 'product_id', onDelete: 'RESTRICT' });
StockMovement.belongsTo(Product, { foreignKey: 'product_id' });
Warehouse.hasMany(StockMovement, { foreignKey: 'warehouse_id', onDelete: 'RESTRICT' });
StockMovement.belongsTo(Warehouse, { foreignKey: 'warehouse_id' });
User.hasMany(StockMovement, { foreignKey: 'performed_by' });
StockMovement.belongsTo(User, { foreignKey: 'performed_by', as: 'performer' });

// Audit Logs
User.hasMany(AuditLog, { foreignKey: 'user_id', onDelete: 'RESTRICT' });
AuditLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Warehouse,
  Inventory,
  Supplier,
  PurchaseOrder,
  PurchaseOrderItem,
  Customer,
  Invoice,
  InvoiceItem,
  Payment,
  StockMovement,
  AuditLog
};
