// test-mongo.ts
import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const uri = "mongodb+srv://shreytalreja25:Shrey%409999@cluster0.7lbnxum.mongodb.net/MediSync?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas cluster');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ Connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('🔌 Disconnected from MongoDB');
});

async function run() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    if (mongoose.connection.db) {
      const pingResult = await mongoose.connection.db.admin().command({ ping: 1 });
      console.log('🏓 Ping result:', pingResult);
    } else {
      console.warn('⚠️ mongoose.connection.db is undefined');
    }

  } catch (error) {
    console.error('❌ Final Catch Block Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
