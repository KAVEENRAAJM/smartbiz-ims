import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const dummyPOs = [
  { id: 'PO-001', supplier: 'Tech Distributions Inc.', date: '2026-04-12', total: 4500.00, status: 'Received' },
  { id: 'PO-002', supplier: 'Global Logistics', date: '2026-04-15', total: 12500.50, status: 'Ordered' },
  { id: 'PO-003', supplier: 'Local Supplies Co.', date: '2026-04-10', total: 850.00, status: 'Draft' },
];

export const PurchaseOrders = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Purchase Orders</h1>
        <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition shadow-sm">
          <PlusIcon className="w-5 h-5" /> Create PO
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-shadow" 
              placeholder="Search POs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-100 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">PO Number</th>
              <th className="px-6 py-4">Supplier</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyPOs.map(po => (
              <tr key={po.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{po.id}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{po.supplier}</td>
                <td className="px-6 py-4">{po.date}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">${po.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    po.status === 'Received' ? 'bg-green-100 text-green-700 border border-green-200' : 
                    po.status === 'Ordered' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                    'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {po.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-4 text-brand-600">
                  <button className="hover:underline font-medium transition-colors">View</button>
                  {po.status === 'Draft' && <button className="hover:underline font-medium transition-colors">Edit</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
