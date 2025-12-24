
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gender, ChatType, UserPreferences } from '../types';

interface Props {
  setPreferences: (prefs: UserPreferences) => void;
}

const LandingPage: React.FC<Props> = ({ setPreferences }) => {
  const navigate = useNavigate();
  const [localPrefs, setLocalPrefs] = useState<UserPreferences>({
    gender: Gender.PREFER_NOT_TO_SAY,
    lookingFor: 'Any',
    chatType: ChatType.GLOBAL
  });

  const [activeNodes, setActiveNodes] = useState<string[]>(["London", "New York", "Tokyo", "Dubai", "Berlin"]);

  const handleStart = () => {
    setPreferences(localPrefs);
    navigate('/chat');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WaraHatkaXoBaa',
          text: 'Connect anonymously with people worldwide. No logs, no trace.',
          url: window.location.origin,
        });
      } catch (err) { console.log('Share error'); }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard! Share it with your friends.');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10 md:py-24 px-4 max-w-5xl mx-auto text-center overflow-hidden">
      {/* Background World Map Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none -z-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat scale-150"></div>

      <div className="mb-6 inline-flex items-center space-x-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full shadow-xl">
         <span className="flex space-x-1">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
         </span>
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Global Network: Online</span>
      </div>

      <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.8] text-white">
        WORLDWIDE<br />
        <span className="bg-gradient-to-r from-indigo-500 via-white to-slate-500 bg-clip-text text-transparent italic">ANONYMOUS</span>
      </h1>
      
      <p className="text-base md:text-xl text-slate-500 mb-10 font-medium max-w-sm md:max-w-2xl mx-auto leading-relaxed">
        The ultimate borderless chat platform. No registration, no tracking. Connect with anyone, anywhere, instantly.
      </p>

      <div className="w-full bg-slate-900/40 p-5 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] space-y-8 backdrop-blur-3xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-left bg-slate-950/50 p-5 rounded-3xl border border-slate-800 transition-colors hover:border-indigo-500/30">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Global Identity</label>
            <select 
              value={localPrefs.gender}
              onChange={(e) => setLocalPrefs({...localPrefs, gender: e.target.value as Gender})}
              className="w-full bg-transparent text-slate-200 focus:outline-none font-bold text-lg appearance-none"
            >
              {Object.values(Gender).map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
            </select>
          </div>
          <div className="space-y-2 text-left bg-slate-950/50 p-5 rounded-3xl border border-slate-800 transition-colors hover:border-indigo-500/30">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Interested In</label>
            <select 
              value={localPrefs.lookingFor}
              onChange={(e) => setLocalPrefs({...localPrefs, lookingFor: e.target.value as any})}
              className="w-full bg-transparent text-slate-200 focus:outline-none font-bold text-lg appearance-none"
            >
              <option value="Any" className="bg-slate-900">Everyone Worldwide</option>
              {Object.values(Gender).map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
            </select>
          </div>
        </div>

        <div className="pt-2">
            <button 
                onClick={handleStart}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-6 rounded-3xl shadow-2xl shadow-indigo-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] text-xl uppercase tracking-tight mb-6"
            >
                Connect to Global Lobby
            </button>
            
            <button 
                onClick={handleShare}
                className="group flex items-center justify-center space-x-3 text-slate-500 hover:text-white transition-colors mx-auto font-black text-xs uppercase tracking-[0.2em]"
            >
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-indigo-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z" /></svg>
                </div>
                <span>Share WaraHatkaXoBaa Worldwide</span>
            </button>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col items-center space-y-3">
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">Active Regional Nodes</span>
            <div className="flex flex-wrap justify-center gap-4">
                {activeNodes.map(node => (
                    <div key={node} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                        <span className="text-[10px] font-bold text-slate-500">{node}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
        <div className="p-8 bg-slate-900/20 border border-slate-800/50 rounded-[2rem] text-left">
            <div className="text-3xl mb-4">🌍</div>
            <h4 className="text-white font-black uppercase mb-2">Global Routing</h4>
            <p className="text-slate-500 text-sm">Low-latency connections through our worldwide network of secure nodes.</p>
        </div>
        <div className="p-8 bg-slate-900/20 border border-slate-800/50 rounded-[2rem] text-left">
            <div className="text-3xl mb-4">🔐</div>
            <h4 className="text-white font-black uppercase mb-2">P2P Encryption</h4>
            <p className="text-slate-500 text-sm">Messages stay between you and your peer. No middleman, no logs.</p>
        </div>
        <div className="p-8 bg-slate-900/20 border border-slate-800/50 rounded-[2rem] text-left">
            <div className="text-3xl mb-4">💨</div>
            <h4 className="text-white font-black uppercase mb-2">Auto-Erasure</h4>
            <p className="text-slate-500 text-sm">Every session is ephemeral. Once you disconnect, you are gone forever.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
