
import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile, FoodItem, FoodStatus } from '../types';
import { STATUS_COLORS } from '../constants';

interface ShelterDashboardProps {
  user: UserProfile;
  foodItems: FoodItem[];
  onUpdate: (id: string, status: FoodStatus, extra?: any) => void;
}

const ShelterDashboard: React.FC<ShelterDashboardProps> = ({ user, foodItems, onUpdate }) => {
  const availableItems = foodItems.filter(item => item.status === FoodStatus.POSTED);
  const myClaims = foodItems.filter(item => item.shelterId === user.id);

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-800">Available Marketplace</h2>
        {availableItems.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 border border-slate-200 rounded-3xl">
            <p className="text-slate-500">No new food postings available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableItems.map(item => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase">{item.type}</span>
                    <span className="text-xs text-slate-400 font-medium">Post 2h ago</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.quantity} {item.unit} available</p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">📍 {item.location.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button 
                    onClick={() => onUpdate(item.id, FoodStatus.ACCEPTED, { shelterId: user.id })}
                    className="bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-emerald-600 transition-colors"
                  >
                    Self Pickup
                  </button>
                  <button 
                    onClick={() => onUpdate(item.id, FoodStatus.PICKUP_ASSIGNED, { shelterId: user.id })}
                    className="bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Need Driver
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-800">My Claimed Items</h2>
        <div className="space-y-4">
          {myClaims.length === 0 ? (
            <div className="text-center py-10 text-slate-400 italic">No items claimed yet.</div>
          ) : (
            myClaims.map(item => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">📦</div>
                  <div>
                    <h5 className="font-bold text-slate-800">{item.title}</h5>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${STATUS_COLORS[item.status]}`}>{item.status.replace('_', ' ')}</p>
                  </div>
                </div>
                
                {item.status === FoodStatus.IN_TRANSIT && (
                  <button 
                    onClick={() => onUpdate(item.id, FoodStatus.DELIVERED)}
                    className="bg-emerald-500 text-white text-xs font-bold py-2 px-4 rounded-xl"
                  >
                    Confirm Delivery
                  </button>
                )}
                {item.status === FoodStatus.DELIVERED && (
                  <span className="text-emerald-500 font-bold text-xs flex items-center gap-1">✅ Received</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboard;
