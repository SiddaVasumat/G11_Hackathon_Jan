
import React from 'react';
import { motion } from 'framer-motion';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect }) => {
  const navigate = useNavigate();

  const handleSelect = (role: UserRole, path: string) => {
    onRoleSelect(role);
    navigate(path);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-xl mx-auto space-y-12 py-10"
    >
      <div className="text-center space-y-4">
        <motion.h1 variants={item} className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Let's stop <span className="text-emerald-500 underline decoration-emerald-200">wasting</span> food.
        </motion.h1>
        <motion.p variants={item} className="text-slate-500 text-lg">
          Connect directly with local organizations and volunteers to ensure every surplus meal finds a home.
        </motion.p>
      </div>

      <div className="grid gap-6">
        <motion.button
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(UserRole.DONOR, '/donor')}
          className="flex items-center gap-6 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all text-left"
        >
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">🍲</div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">I am a Donor</h3>
            <p className="text-slate-500">Restaurant, bakery, or catering service with surplus food.</p>
          </div>
        </motion.button>

        <motion.button
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(UserRole.SHELTER, '/shelter')}
          className="flex items-center gap-6 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all text-left"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">🏠</div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">I am a Shelter</h3>
            <p className="text-slate-500">Verified 501(c)(3) organization in need of food support.</p>
          </div>
        </motion.button>

        <motion.button
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(UserRole.DRIVER, '/driver')}
          className="flex items-center gap-6 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all text-left"
        >
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl">🚗</div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">I am a Driver</h3>
            <p className="text-slate-500">Volunteer ready to transport food safely across town.</p>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LandingPage;
