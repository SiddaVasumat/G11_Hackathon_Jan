
import React from 'react';
import { FoodStatus } from '../types';
import { motion } from 'framer-motion';

const steps = [
  FoodStatus.POSTED,
  FoodStatus.ACCEPTED,
  FoodStatus.PICKUP_ASSIGNED,
  FoodStatus.IN_TRANSIT,
  FoodStatus.DELIVERED
];

const labelMap: Record<string, string> = {
  [FoodStatus.POSTED]: 'Posted',
  [FoodStatus.ACCEPTED]: 'Accepted',
  [FoodStatus.PICKUP_ASSIGNED]: 'Driver Assigned',
  [FoodStatus.IN_TRANSIT]: 'In Transit',
  [FoodStatus.DELIVERED]: 'Delivered'
};

interface StatusTimelineProps {
  currentStatus: FoodStatus;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ currentStatus }) => {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2" />
        
        {/* Progress Line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-10" 
        />

        {steps.map((step, idx) => {
          const isActive = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={step} className="relative z-20 flex flex-col items-center">
              <motion.div 
                animate={{ 
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isActive ? '#10b981' : '#e2e8f0'
                }}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              />
              <span className={`absolute top-6 text-[10px] font-bold uppercase whitespace-nowrap tracking-tighter ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                {labelMap[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
