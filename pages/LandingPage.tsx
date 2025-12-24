
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gender, ChatType, UserPreferences } from '../types';

interface Props { setPreferences: (prefs: UserPreferences) => void; }

const LandingPage: React.FC<Props> = ({ setPreferences }) => {
  const navigate = useNavigate();
  const [localPrefs, setLocalPrefs] = useState<UserPreferences>({
    gender: Gender.PREFER_NOT_TO_SAY,
    lookingFor: 'Any',
    chatType: ChatType.GLOBAL
  });

  const handleStart = () => {
    setPreferences(localPrefs);
    navigate('/chat');
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-4xl mx-auto text-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent -z-10"></div>
      
      <div className="mb-4 text-indigo-500 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Worldwide Servers Online</div>
      <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none text-white italic uppercase">
        CHAT<br />ANYWHERE.
      </h1>
      
      <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto font-medium">
        The most secure anonymous chat network on Earth. No trace. No logs. Just freedom.
      </p>

      <div className="w-full bg-slate-900/60 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-left bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Your Gender</label>
            <select 
              value={localPrefs.gender}
              onChange={(e) => setLocalPrefs({...localPrefs, gender: e.target.value as Gender})}
              className="w-full bg-transparent text-white font-bold text-lg appearance-none cursor-pointer outline-none"
            >
              {Object.values(Gender).map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
            </select>
          </div>
          <div className="text-left bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Looking For</label>
            <select 
              value={localPrefs.lookingFor}
              onChange={(e) => setLocalPrefs({...localPrefs, lookingFor: e.target.value as any})}
              className="w-full bg-transparent text-white font-bold text-lg appearance-none cursor-pointer outline-none"
            >
              <option value="Any" className="bg-slate-900">Everyone</option>
              {Object.values(Gender).map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
            </select>
          </div>
        </div>

        <button 
          onClick={handleStart}
          className="w-full bg-white text-black font-black py-6 rounded-3xl text-xl uppercase tracking-tighter hover:bg-indigo-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          Instant Connect
        </button>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {['Encrypted', 'Ephemeral', 'Global', 'Safe'].map(word => (
            <div key={word} className="px-4 py-2 bg-slate-900/40 border border-slate-800/50 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {word}
            </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
