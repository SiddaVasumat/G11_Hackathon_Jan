
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, FoodItem, FoodStatus, StorageType } from '../types';
import StatusTimeline from '../components/StatusTimeline';
import { STATUS_COLORS } from '../constants';

interface DonorDashboardProps {
  user: UserProfile;
  foodItems: FoodItem[];
  onAdd: (item: FoodItem) => void;
}

const DonorDashboard: React.FC<DonorDashboardProps> = ({ user, foodItems, onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Cooked Meal',
    quantity: 1,
    unit: 'meals' as 'kg' | 'meals',
    expiryHours: 4,
    storageType: StorageType.REFRIGERATED,
    costBasis: 0,
    fmv: 0
  });

  const myItems = foodItems.filter(item => item.donorId === user.id);

  const calculateTaxDeduction = (cost: number, fmv: number) => {
    // min(2 * cost, cost + 0.5 * (fmv - cost))
    const cap1 = 2 * cost;
    const cap2 = cost + 0.5 * (fmv - cost);
    return Math.min(cap1, cap2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: FoodItem = {
      id: `f-${Date.now()}`,
      donorId: user.id,
      title: formData.title,
      type: formData.type,
      quantity: formData.quantity,
      unit: formData.unit,
      timePrepared: new Date().toISOString(),
      expiryTime: new Date(Date.now() + formData.expiryHours * 3600000).toISOString(),
      storageType: formData.storageType,
      location: { lat: 40.7128, lng: -74.0060, address: 'Marco\'s Bistro, 123 Main St' },
      costBasis: formData.costBasis,
      fairMarketValue: formData.fmv,
      status: FoodStatus.POSTED,
      createdAt: new Date().toISOString()
    };
    onAdd(newItem);
    setShowForm(false);
    setFormData({ ...formData, title: '', costBasis: 0, fmv: 0 });
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">Donor Dashboard</h2>
          <p className="text-slate-500">Manage your food surplus</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
        >
          {showForm ? 'Cancel' : <span>+ <span className="hidden sm:inline">Donate Food</span></span>}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-600">Food Name</label>
                  <input 
                    required 
                    placeholder="e.g. Tray of Lasagna"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-600">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option>Cooked Meal</option>
                    <option>Bakery</option>
                    <option>Produce</option>
                    <option>Canned Goods</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Quantity</label>
                    <input 
                      type="number"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Unit</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.unit}
                      onChange={e => setFormData({ ...formData, unit: e.target.value as any })}
                    >
                      <option value="meals">Meals</option>
                      <option value="kg">KG</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-600">Expires in (Hours)</label>
                  <input 
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.expiryHours}
                    onChange={e => setFormData({ ...formData, expiryHours: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-600">Cost Basis ($)</label>
                  <input 
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.costBasis}
                    onChange={e => setFormData({ ...formData, costBasis: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-600">Fair Market Value ($)</label>
                  <input 
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.fmv}
                    onChange={e => setFormData({ ...formData, fmv: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-800 font-medium">Estimated Tax Deduction</p>
                  <p className="text-2xl font-bold text-emerald-900">${calculateTaxDeduction(formData.costBasis, formData.fmv).toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-emerald-600 italic">IRS Section 170(e)(3)</p>
                </div>
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors">
                Publish Listing
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-700">My Active Donations</h3>
        {myItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-3xl">
            <p className="text-slate-400">No active listings. Start donating!</p>
          </div>
        ) : (
          myItems.map(item => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[item.status]}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                  <h4 className="text-xl font-bold text-slate-800 mt-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.quantity} {item.unit} • {item.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expires In</p>
                  <Countdown date={item.expiryTime} />
                </div>
              </div>

              <StatusTimeline currentStatus={item.status} />

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-lg">📍</span> {item.location.address}
                </div>
                <div className="text-emerald-600 font-bold">
                  Deduction: ${calculateTaxDeduction(item.costBasis, item.fairMarketValue).toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const Countdown: React.FC<{ date: string }> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(date).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('EXPIRED');
        clearInterval(timer);
        return;
      }

      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return <span className={`text-lg font-mono font-bold ${timeLeft === 'EXPIRED' ? 'text-red-500' : 'text-slate-800'}`}>{timeLeft}</span>;
};

export default DonorDashboard;
