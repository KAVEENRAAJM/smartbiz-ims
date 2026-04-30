require('dotenv').config();
const app = require('./app');
const { connectDB, sequelize } = require('./config/db');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  
  // Sync DB
  await sequelize.sync({ alter: true });
  console.log('Database synchronized');

  // Auto-seed admin user if no users exist
  const { User, Category } = require('./models');
  const userCount = await User.count();
  if (userCount === 0) {
    console.log('No users found. Seeding default Super Admin...');
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'Kaveen',
      email: 'admin@smartbiz.com',
      password_hash,
      role: 'Super Admin',
      is_active: true
    });
    console.log('Default admin created: admin@smartbiz.com / admin123');

    // Seed a default category
    const catCount = await Category.count();
    if (catCount === 0) {
      await Category.create({ name: 'Electronics', description: 'Electronic devices' });
      console.log('Default category "Electronics" created.');
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
