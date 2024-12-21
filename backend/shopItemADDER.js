import mongoose from 'mongoose';
import { ShopItem } from './models/shop.model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedShopItems = [
  {
    name: 'RAZER BASILISK V3 PRO 35K',
    description: 'Our most advanced wireless ergonomic RGB gaming mouse, featuring our newest sensor and highly adjustable tilt wheel.',
    price: 2999.99,
    category: 'Electronics',
    imageUrl: "https://assets2.razerzone.com/images/pnx.assets/392d2ff1497385d9db4575e709d058ac/500x500-basilisklinepg-productline-basiliskv3pro.webp",
    stock: 10,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'RAZER COBRA PRO',
    description: 'A wireless gaming mouse packed with 3 modes of connection, 11-zone Chroma RGB with underglow and compatible with wireless charging.',
    price: 3999.99,
    category: 'Electronics',
    imageUrl: "https://assets2.razerzone.com/images/pnx.assets/780a74ce808f4b7c0a5c3a389cb98eed/razer-cobra-line-cobrapro_500x500.jpg",
    stock: 10,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'RAZER COBRA',
    description: 'An ultra-lightweight wired gaming mouse with single-zone gradient Chroma RGB with underglow.',
    price: 1999.99,
    category: 'Electronics',
    imageUrl: "https://assets2.razerzone.com/images/pnx.assets/780a74ce808f4b7c0a5c3a389cb98eed/razer-cobra-line-cobra_500x500.jpg",
    stock: 20,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'RAZER COBRA MARK 1',
    description: 'An ultra-lightweight wired gaming mouse with single-zone gradient Chroma RGB with underglow.',
    price: 1899.99,
    category: 'Electronics',
    imageUrl: "https://assets2.razerzone.com/images/pnx.assets/392d2ff1497385d9db4575e709d058ac/500x500-basilisklinepg-productline-basiliskv3.webp",
    stock: 20,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'RAZER HUNTSMAN V3 PRO',
    description: 'Opt for complete control and customization with a full-size wired model featuring an LED array indicator, dedicated volume dial, 2 macro buttons, and 1 media button.',
    price: 4399.99,
    category: 'Electronics',
    imageUrl: "https://assets2.razerzone.com/images/pnx.assets/1a0339cc1621d3b23d7e79658bea2c4a/razer-huntsman-v3-pro-line_500x500-v2.webp",
    stock:10,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'RAZER HUNTSMAN V3 PRO MINI',
    description: 'Get maximum space to maneuver your mouse with a compact 60% keyboard that features dual-purpose modifier keys for arrow key functionality.',
    price: 3599.99,
    category: 'Electronics',
    imageUrl: "https://assets2.razerzone.com/images/pnx.assets/1a0339cc1621d3b23d7e79658bea2c4a/razer-huntsman-v3-pro-mini-line_500x500-v2.webp",
    stock:30,
    creator: null // You'll need to replace with a valid user ID
  },
  {
    name: 'RAZER PHANTOM KEYCAP UPGRADE SET',
    description: 'Unique stealth and dual-layer pudding design',
    price: 1599.99,
    category: 'Electronics',
    imageUrl: "https://assets2.razerzone.com/images/pnx.assets/a9e957f79c2c0cbf6015e8807b3c7a6c/img-phantomkeycaps.webp",
    stock:10,
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