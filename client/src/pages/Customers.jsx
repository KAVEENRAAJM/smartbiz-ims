import { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const dummyCustomers = [
  { id: 1, name: 'Acme Corp', email: 'billing@acmecorp.com', phone: '+1 555-1234', address: '123 Tech Park', amount_due: 1250.00 },
  { id: 2, name: 'Global Tech', email: 'accounts@globaltech.com', phone: '+1 555-5678', address: '450 Innovation Dr', amount_due: 0 },
  { id: 3, name: 'Stark Industries', email: 'tony@stark.com', phone: '+1 555-9999', address: 'New York, NY', amount_due: 5400.00 },
];

export const Customers = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Customers Directory</h1>
        <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition shadow-sm">
          <PlusIcon className="w-5 h-5" /> Add Customer
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 transition-shadow" 
              placeholder="Search customers by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-100 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Customer Name</th>
              <th className="px-6 py-4">Contact Email</th>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4">Amount Due</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyCustomers.map(item => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${item.amount_due > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    ${item.amount_due.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-brand-600 font-medium cursor-pointer hover:underline">
                  View Ledger
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
