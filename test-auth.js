// Quick test script to verify authentication setup
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/productivity-app');
    console.log('✅ MongoDB connected successfully');
    
    // Test User model
    const User = (await import('./models/User.js')).default;
    console.log('✅ User model loaded');
    
    // Test bcrypt
    const bcrypt = (await import('bcryptjs')).default;
    const testHash = await bcrypt.hash('test', 10);
    console.log('✅ bcryptjs working');
    
    // Test JWT
    const jwt = (await import('jsonwebtoken')).default;
    const token = jwt.sign({ test: 'test' }, 'test-secret');
    console.log('✅ jsonwebtoken working');
    
    await mongoose.disconnect();
    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testConnection();

