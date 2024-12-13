import mongoose from 'mongoose';
import { ShopItem } from './models/shop.model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedShopItems = [
  {
    name: 'Gaming Headset',
    description: 'High-quality gaming headset with noise cancellation',
    price: 129.99,
    category: 'Electronics',
    imageUrl: null,
    stock: 50,
    creator: null // You'll need to replace with a valid user ID
  },
  // Add more items...
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    
    await ShopItem.deleteMany({});
    await ShopItem.insertMany(seedShopItems);
    
    console.log('Shop items seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding shop items:', error);
    mongoose.connection.close();
  }
};

seedDatabase();