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
    imageUrl: "https://8mm.in/cdn/shop/files/2_90df86c1-3a44-4d92-8909-b98a25e374fd_900x900.png?v=1707574730",
    stock: 4,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'Compact Wireless Gaming Mouse',
    description: 'Razer Cobra Pro Compact Wireless Gaming Mouse with Underglow Lighting I High Speed Wireless, Bluetooth, 8 Buttons, 3rd Gen 30K Optical Sensor Switch, Focus Pro-RZ01-04660100-R3A1',
    price: 299.99,
    category: 'Electronics',
    imageUrl: "https://m.media-amazon.com/images/I/71tuAoPh-LL._AC_UL640_QL65_.jpg",
    stock: 20,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'Logitech G304 Lightspeed Wireless Gaming Mouse',
    description: 'Logitech G304 Lightspeed Wireless Gaming Mouse, Hero Sensor, 12,000 DPI, Lightweight, 6 Programmable Buttons, 250h Battery Life, On-Board Memory, Compatible with PC/Mac - White',
    price: 139.99,
    category: 'Electronics',
    imageUrl: "https://m.media-amazon.com/images/I/51DYDLykzoL._AC_UL640_QL65_.jpg",
    stock:10,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'Wired USB Gaming',
    description: 'Logitech G502 Hero High Performance Wired USB Gaming Mouse, Hero 25K Sensor, 25,600 DPI, RGB, Adjustable Weights, 11 Programmable Buttons, On-Board Memory, PC/Mac - Black',
    price: 159.99,
    category: 'Electronics',
    imageUrl: "https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_UY436_QL65_.jpg",
    stock:30,
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