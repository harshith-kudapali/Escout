import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { ShoppingCart, Filter, Tag } from 'lucide-react';
import ShopItem from '../components/ShopItem';
import Sidebar from '../components/Sidebar';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { 
    data: shopData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['shopItems', selectedCategory, priceFilter, page],
    queryFn: async () => {
      const res = await axiosInstance.get('/shop', {
        params: { 
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          priceFilter,
          page
        }
      });
      return res.data;
    }
  });

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Accessories'];

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
      <div className='hidden lg:block lg:col-span-1'>
        <Sidebar user={authUser} />
      </div>

      <div className='col-span-1 lg:col-span-3'>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <ShoppingCart className="mr-3 text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Our Shop</h1>
          </div>

          {/* Filters */}
          <div className="mb-6 flex space-x-4">
            <div className="flex items-center">
              <Filter className="mr-2 text-gray-600" size={20} />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded px-3 py-2"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <Tag className="mr-2 text-gray-600" size={20} />
              <select 
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="">All Prices</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </div>

          {/* Shop Items Grid */}
          {isLoading ? (
            <div className="text-center py-8">Loading shop items...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error loading shop items: {error.message}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {shopData?.shopItems?.map(item => (
                  <ShopItem key={item._id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 space-x-4">
                <button 
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {shopData?.totalPages}
                </span>
                <button 
                  onClick={() => setPage(prev => 
                    prev < shopData?.totalPages ? prev + 1 : prev
                  )}
                  disabled={page === shopData?.totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Empty State */}
          {!isLoading && shopData?.shopItems?.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-xl text-gray-600">No items available in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;