import { useState, useMemo } from 'react';
import { MagnifyingGlassIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const POS = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(18); // Default GST
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Dummy catalog for testing UI
  const products = [
    { id: 1, name: 'Wireless Mouse', sku: 'WM-01', price: 25.00 },
    { id: 2, name: 'Mechanical Keyboard', sku: 'MK-02', price: 120.00 },
    { id: 3, name: 'USB-C Hub', sku: 'UH-03', price: 45.00 },
    { id: 4, name: 'HDMI Cable 2m', sku: 'HC-04', price: 15.00 },
  ];

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1, discount: 0 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.product.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => setCart(cart.filter(item => item.product.id !== id));

  const { subtotal, taxAmount, grandTotal } = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const afterDiscount = Math.max(0, sub - Number(discount));
    const tax = afterDiscount * (taxRate / 100);
    return {
      subtotal: sub,
      taxAmount: tax,
      grandTotal: afterDiscount + tax
    };
  }, [cart, discount, taxRate]);

  const handleCheckout = () => {
    if (cart.length === 0) return toast.error('Cart is empty!');
    toast.success(`Invoice created successfully! Total: $${grandTotal.toFixed(2)}`);
    setCart([]);
    setDiscount(0);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6">
      {/* Search and Products (Left) */}
      <div className="w-2/3 flex flex-col gap-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, SKU or scan barcode..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // autoFocus -- disabled for now to prevent grabbing focus unnecessarily
          />
        </div>
        
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map(p => (
              <div 
                key={p.id} 
                onClick={() => addToCart(p)}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-brand-500 hover:shadow-md transition-all flex flex-col justify-between h-32"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{p.sku}</p>
                </div>
                <div className="text-lg font-bold text-brand-600">${p.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 mt-10">No products found matching "{search}"</div>
          )}
        </div>
      </div>

      {/* Cart and Summary (Right) */}
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCartIcon className="h-6 w-6 text-brand-500"/> Cart
          </h2>
          <span className="bg-brand-100 text-brand-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">{cart.length} items</span>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCartIcon className="h-16 w-16 mb-2 opacity-50"/>
              <p>Add products to start billing</p>
            </div>
          ) : (
             cart.map(item => (
              <div key={item.product.id} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-900">{item.product.name}</span>
                  <button onClick={() => removeItem(item.product.id)} className="text-red-400 hover:text-red-600">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.product.id, -1)} className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100">-</button>
                    <span className="font-semibold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, 1)} className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100">+</button>
                  </div>
                  <span className="font-bold text-gray-700">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl space-y-3">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Discount ($)</span>
            <input 
              type="number" 
              className="w-20 text-right py-1 px-2 rounded border border-gray-300 focus:outline-none focus:border-brand-500" 
              value={discount} 
              onChange={e => setDiscount(e.target.value)} 
              min="0"
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Tax ({taxRate}%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          
          <div className="pt-3 border-t border-gray-200 flex justify-between items-end">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-3xl font-black text-brand-600">${grandTotal.toFixed(2)}</span>
          </div>
          
          <div className="pt-2 grid grid-cols-3 gap-2">
            {['cash', 'card', 'upi'].map(m => (
              <button 
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`py-2 rounded-lg text-sm font-medium capitalize border transition-colors ${paymentMethod === m ? 'bg-brand-50 border-brand-500 text-brand-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                {m}
              </button>
            ))}
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full mt-2 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
};
