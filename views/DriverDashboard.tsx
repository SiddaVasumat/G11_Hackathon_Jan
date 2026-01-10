
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile, FoodItem, FoodStatus } from '../types';

interface DriverDashboardProps {
  user: UserProfile;
  foodItems: FoodItem[];
  onUpdate: (id: string, status: FoodStatus, extra?: any) => void;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ user, foodItems, onUpdate }) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const openTasks = foodItems.filter(item => item.status === FoodStatus.PICKUP_ASSIGNED && !item.driverId);
  const myActiveTask = foodItems.find(item => item.driverId === user.id && item.status !== FoodStatus.DELIVERED);

  return (
    <div className="space-y-10 pb-20">
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Driver Status</h2>
          <p className="text-slate-400 text-sm">{isAvailable ? 'Ready for deliveries' : 'Offline'}</p>
        </div>
        <button 
          onClick={() => setIsAvailable(!isAvailable)}
          className={`px-6 py-2 rounded-2xl font-bold text-sm transition-all ${isAvailable ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          {isAvailable ? 'ACTIVE' : 'OFFLINE'}
        </button>
      </div>

      {myActiveTask ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-800">Current Task</h2>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-lg space-y-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{myActiveTask.title}</h3>
                <p className="text-slate-500">Pick up from: {myActiveTask.location.address}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-xl font-bold italic">GO</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">1</span>
                <span>Navigate to Donor</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">2</span>
                <span>Confirm Food Quality & Storage</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">3</span>
                <span>Deliver to Shelter</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {myActiveTask.status === FoodStatus.PICKUP_ASSIGNED && (
                <button 
                  onClick={() => onUpdate(myActiveTask.id, FoodStatus.PICKUP_CONFIRMED)}
                  className="bg-emerald-500 text-white font-bold py-4 rounded-2xl col-span-2 shadow-md shadow-emerald-200"
                >
                  I've Arrived at Pickup
                </button>
              )}
              {myActiveTask.status === FoodStatus.PICKUP_CONFIRMED && (
                <button 
                  onClick={() => onUpdate(myActiveTask.id, FoodStatus.IN_TRANSIT)}
                  className="bg-indigo-600 text-white font-bold py-4 rounded-2xl col-span-2 shadow-md shadow-indigo-200"
                >
                  Start Delivery Trip
                </button>
              )}
              {myActiveTask.status === FoodStatus.IN_TRANSIT && (
                <div className="col-span-2 text-center py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold animate-pulse">
                  Delivery in progress...
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-800">Available Deliveries</h2>
          {openTasks.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl">
              <p className="text-slate-400">No active delivery requests right now.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {openTasks.map(task => (
                <div key={task.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div>
                    <h5 className="font-bold text-slate-800">{task.title}</h5>
                    <p className="text-xs text-slate-500">{task.quantity} {task.unit} • 3.2 miles away</p>
                  </div>
                  <button 
                    onClick={() => onUpdate(task.id, FoodStatus.PICKUP_ASSIGNED, { driverId: user.id })}
                    className="bg-slate-900 text-white text-xs font-bold py-3 px-6 rounded-xl hover:bg-slate-800"
                  >
                    Accept Job
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
