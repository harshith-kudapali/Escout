import { ShopItem } from '../models/shop.model.js';

export const getShopItems = async (req, res) => {
  try {
    const { category, priceFilter, page = 1, limit = 12 } = req.query;
    
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    let sortOption = {};
    if (priceFilter === 'low') {
      sortOption = { price: 1 }; // Low to High
    } else if (priceFilter === 'high') {
      sortOption = { price: -1 }; // High to Low
    }

    const skip = (page - 1) * limit;

    const shopItems = await ShopItem.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate('creator', 'username profilePicture');

    const total = await ShopItem.countDocuments(query);

    res.status(200).json({
      shopItems,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching shop items:', error);
    res.status(500).json({ error: 'Unable to fetch shop items' });
  }
};

export const createShopItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;

    const newShopItem = new ShopItem({
      name,
      description,
      price,
      category,
      imageUrl,
      stock: stock || 10,
      creator: req.user._id
    });

    await newShopItem.save();

    res.status(201).json(newShopItem);
  } catch (error) {
    console.error('Error creating shop item:', error);
    res.status(500).json({ error: 'Unable to create shop item' });
  }
};

export const updateShopItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedItem = await ShopItem.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Shop item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating shop item:', error);
    res.status(500).json({ error: 'Unable to update shop item' });
  }
};

export const deleteShopItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await ShopItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Shop item not found' });
    }

    res.status(200).json({ message: 'Shop item deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop item:', error);
    res.status(500).json({ error: 'Unable to delete shop item' });
  }
};