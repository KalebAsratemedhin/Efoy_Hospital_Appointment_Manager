const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); 

const User = require('../models/user'); 
const connectDatabase = require('./db');

const seedAdmin = async () => {
  try {

    connectDatabase()
    
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      fullName: 'Kaleb A.',
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();

    console.log('Admin user seeded successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
