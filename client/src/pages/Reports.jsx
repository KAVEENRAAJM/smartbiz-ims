import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Reports = () => {
  const pieData = {
    labels: ['Electronics', 'Accessories', 'Furniture', 'Software'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const reportsList = [
    { name: 'Sales Report', desc: 'Itemized sales data by date range', icon: '📈' },
    { name: 'Profit & Loss', desc: 'Revenue vs Cost analysis', icon: '💰' },
    { name: 'Inventory Valuation', desc: 'Current stock value', icon: '📦' },
    { name: 'Tax Summary', desc: 'GST/Tax collected period-wise', icon: '🏛️' },
  ];

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports & Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4 self-start">Sales by Category</h2>
          <div className="w-full max-w-[250px]">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Available Reports</h2>
            <div className="flex gap-2 text-sm">
              <input type="date" className="border rounded px-2 py-1 text-gray-600 outline-none" />
              <button className="bg-brand-50 text-brand-600 font-semibold px-3 py-1 rounded">Generate All</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {reportsList.map((report, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-5 hover:border-brand-500 hover:shadow-md transition cursor-pointer flex gap-4 items-center bg-gray-50/50">
                <div className="text-3xl">{report.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{report.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
