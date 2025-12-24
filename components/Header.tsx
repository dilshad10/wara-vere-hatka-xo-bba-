
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  // Global Sync Logic: Calculate a "Real" number based on time so all users see the same
  const getGlobalUserCount = () => {
    const now = new Date();
    const minutesSinceEpoch = Math.floor(now.getTime() / 60000);
    // Base users (e.g., 4000) + a fluctuating number seeded by time
    const seed = (minutesSinceEpoch * 13) % 457;
    const peakHourAdjustment = Math.sin((now.getHours() / 24) * Math.PI) * 1200;
    return Math.floor(4200 + peakHourAdjustment + seed);
  };

  const [userCount, setUserCount] = useState(getGlobalUserCount());

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(getGlobalUserCount());
    }, 30000); // Sync every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 safe-top">
      <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 shrink-0 group">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">W</div>
          <span className="text-lg font-black tracking-tighter text-white uppercase italic truncate">
            WaraHatkaXoBaa
          </span>
        </Link>
        
        <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 shrink-0">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.1em]">
                  {userCount.toLocaleString()} <span className="hidden sm:inline">LIVE</span>
                </span>
            </div>
            
            <nav className="hidden md:flex space-x-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <Link to="/chat" className="hover:text-white transition-colors">Start Chat</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
