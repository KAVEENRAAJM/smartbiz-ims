import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, CubeIcon, UsersIcon, DocumentTextIcon, ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'bg-brand-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50';

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 shadow-sm flex flex-col z-10 relative">
      <div className="mb-8 p-2">
        <h2 className="text-2xl font-bold text-brand-600 tracking-tight">SmartBiz IMS</h2>
      </div>
      <nav className="space-y-1.5 flex-1">
        <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive('/')}`}>
          <HomeIcon className="w-5 h-5" /> Dashboard
        </Link>
        <Link to="/inventory" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive('/inventory')}`}>
          <CubeIcon className="w-5 h-5" /> Inventory
        </Link>
        <Link to="/purchase-orders" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive('/purchase-orders')}`}>
          <BriefcaseIcon className="w-5 h-5" /> Purchases
        </Link>
        <Link to="/invoices" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive('/invoices')}`}>
          <DocumentTextIcon className="w-5 h-5" /> Billing
        </Link>
        <Link to="/customers" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive('/customers')}`}>
          <UsersIcon className="w-5 h-5" /> Customers
        </Link>
        <Link to="/reports" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive('/reports')}`}>
          <ChartBarIcon className="w-5 h-5" /> Reports
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-100 flex flex-col gap-1 items-center justify-center text-sm text-gray-500">
        <span className="font-medium text-brand-700">Kaveen</span>
        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">Preview Mode</span>
      </div>
    </aside>
  );
};

export default Sidebar;
