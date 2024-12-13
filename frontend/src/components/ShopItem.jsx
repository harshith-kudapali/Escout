import React from 'react';
import { ShoppingBag } from 'lucide-react';

const ShopItem = ({ item }) => {
  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Added to cart:', item);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2 truncate">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${item.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          >
            <ShoppingBag className="mr-2" size={16} />
            Add to Cart
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {item.stock} in stock
        </div>
      </div>
    </div>
  );
};

export default ShopItem;