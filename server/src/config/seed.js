const bcrypt = require('bcrypt');
const { sequelize, User, Category } = require('../models');

async function seedDB() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.');

    // Seed Super Admin
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash('admin123', salt);
    
    await User.create({
      name: 'Kaveen',
      email: 'admin@smartbiz.com',
      password_hash,
      role: 'Super Admin',
      is_active: true
    });
    console.log('Kaveen (Super Admin) created.');

    // Seed Category
    await Category.create({ name: 'Electronics', description: 'Electronic devices' });
    
    console.log('Seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed Failed:', error);
    process.exit(1);
  }
}

seedDB();
