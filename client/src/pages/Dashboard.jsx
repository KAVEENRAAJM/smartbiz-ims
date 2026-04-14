import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false, text: 'Monthly Revenue Trend' },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [12000, 19000, 15000, 22000, 24500, 28000, 31000],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  const barData = {
    labels: ['Wireless Mouse', 'Mech Keyboard', 'USB-C Hub', 'Monitor', 'HDMI Cable'],
    datasets: [
      {
        label: 'Units Sold',
        data: [145, 82, 65, 45, 110],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
          <h3 className="text-gray-500 font-medium text-sm">Total Revenue</h3>
          <p className="text-3xl font-black text-gray-900 mt-2">$24,500</p>
          <span className="text-green-500 text-sm font-semibold mt-2 bg-green-50 w-fit px-2 py-0.5 rounded">+12% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
          <h3 className="text-gray-500 font-medium text-sm">Pending Invoices</h3>
          <p className="text-3xl font-black text-gray-900 mt-2">14</p>
          <span className="text-red-500 text-sm font-semibold mt-2 bg-red-50 w-fit px-2 py-0.5 rounded">3 overdue</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
          <h3 className="text-gray-500 font-medium text-sm">Low Stock Items</h3>
          <p className="text-3xl font-black text-gray-900 mt-2">8</p>
          <span className="text-yellow-600 text-sm font-semibold mt-2 bg-yellow-50 w-fit px-2 py-0.5 rounded">Requires action</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
          <h3 className="text-gray-500 font-medium text-sm">Customers</h3>
          <p className="text-3xl font-black text-gray-900 mt-2">124</p>
          <span className="text-green-500 text-sm font-semibold mt-2 bg-green-50 w-fit px-2 py-0.5 rounded">+5 this week</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-96">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Monthly Revenue Trend</h2>
          <div className="flex-1 relative">
            <Line options={lineOptions} data={lineData} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-96">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Top 5 Selling Products</h2>
          <div className="flex-1 relative">
            <Bar options={barOptions} data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};
