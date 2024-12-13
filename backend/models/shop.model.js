import mongoose from 'mongoose';

const shopItemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Default name',
    trim: true
  },
  description: {
    type: String,
    default: 'Default description'
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Books', 'Accessories'],
    default: 'Electronics'
  },
  imageUrl: {
    type: String,
    default: 'https://images.app.goo.gl/2YorEBn7QrKt8PJn8'
  },
  stock: {
    type: Number,
    default: 0
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: '6745e8c1df3b1cca618fc9ae'
  }
}, { timestamps: true });

export const ShopItem = mongoose.model('ShopItem', shopItemSchema);