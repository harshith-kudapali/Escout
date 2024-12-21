import React from 'react';
import { ShoppingBag } from 'lucide-react';

const ShopItem = ({ item }) => {
  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Added to cart:', item);
  };

  return (
    <div className="bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-primary text-lg mb-2">{item.name}</h3>
        <p className="text-neutral mb-2 truncate">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-500 font-bold"> ₹ {item.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="flex items-center bg-primary text-white px-3 py-2 rounded hover:bg-blue-600"
          >
            <ShoppingBag className="mr-2" size={16} />
            Add to Cart
          </button>
        </div>
        <div className="mt-2 text-sm text-accent-content">
          {item.stock} in stock
        </div>
      </div>
    </div>
  );
};

export default ShopItem;