
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  // GLOBAL SYNC FORMULA
  // This makes sure every user in every country sees the SAME number at the same time.
  const getGlobalUserCount = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const minutesToday = Math.floor((now.getTime() - startOfDay) / 60000);
    
    // Logic: Base (3,500) + a number that changes every minute + extra users during evening hours
    const base = 3540;
    const wave = Math.floor(Math.sin(minutesToday / 100) * 400); // Fluctuates naturally
    const dailyPeak = Math.floor(Math.sin((now.getUTCHours() / 24) * Math.PI) * 1500); 
    
    return base + wave + Math.abs(dailyPeak);
  };

  const [userCount, setUserCount] = useState(getGlobalUserCount());

  useEffect(() => {
    // Update the number every 10 seconds to keep it "Live"
    const interval = setInterval(() => {
      setUserCount(getGlobalUserCount());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 px-4 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">W</div>
        <span className="text-xl font-black tracking-tighter text-white uppercase italic">WaraHatkaXoBaa</span>
      </Link>
      
      <div className="flex items-center space-x-2 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
          {userCount.toLocaleString()} ONLINE
        </span>
      </div>
    </header>
  );
};

export default Header;
