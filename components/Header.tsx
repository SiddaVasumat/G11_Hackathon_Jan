
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
            R
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Redistribute</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-900 leading-tight">{user.fullName}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{user.role}</p>
              </div>
              <button 
                onClick={() => { onLogout(); navigate('/'); }}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <span className="text-sm text-slate-400 font-medium">Community Network</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
