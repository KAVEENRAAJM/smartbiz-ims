import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const dummyInventory = [
  { id: 1, name: 'Wireless Mouse', sku: 'WM-01', category: 'Electronics', stock: 150, price: 25.00, status: 'In Stock' },
  { id: 2, name: 'Mechanical Keyboard', sku: 'MK-02', category: 'Electronics', stock: 4, price: 120.00, status: 'Low Stock' },
  { id: 3, name: 'USB-C Hub', sku: 'UH-03', category: 'Accessories', stock: 0, price: 45.00, status: 'Out of Stock' },
];

export const Inventory = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inventory Management</h1>
        <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition">
          <PlusIcon className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500" 
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 text-sm text-gray-500">
            <span className="bg-white border rounded px-3 py-1 shadow-sm">All Categories</span>
            <span className="bg-white border rounded px-3 py-1 shadow-sm">Sort: Stock Level</span>
          </div>
        </div>
        
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-100 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyInventory.map(item => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4">{item.sku}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.stock > 10 ? 'bg-green-100 text-green-700' : item.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-brand-600 cursor-pointer hover:underline font-medium">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
          <span>Showing 1 to 3 of 3 entries</span>
          <div className="flex gap-2 outline-none">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 cursor-pointer" disabled>Prev</button>
            <button className="px-3 py-1 bg-brand-50 text-brand-600 border border-brand-200 rounded font-medium">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 cursor-pointer" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
