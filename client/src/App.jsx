import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { POS } from './pages/POS';
import { Inventory } from './pages/Inventory';
import { Customers } from './pages/Customers';
import { Invoices } from './pages/Invoices';
import { Reports } from './pages/Reports';
import { PurchaseOrders } from './pages/PurchaseOrders';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <PrivateRoute>
            <div className="flex bg-gray-50 min-h-screen font-sans text-gray-900 w-full relative">
              <Sidebar />
              <main className="flex-1 p-8 overflow-y-auto w-full">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/invoices/new" element={<POS />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/purchase-orders" element={<PurchaseOrders />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </main>
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
