
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-2xl font-black text-white italic tracking-tighter mb-4 uppercase">WaraHatkaXoBaa</div>
        
        <div className="flex justify-center space-x-6 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <a href="mailto:hello@warahatkaxobaa.com" className="hover:text-white">Support</a>
        </div>

        <div className="inline-block bg-slate-900 p-6 rounded-3xl border border-slate-800 text-left max-w-md">
            <h5 className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">How to launch this:</h5>
            <ol className="text-xs text-slate-500 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Create a free account at <strong>Vercel.com</strong></li>
                <li>Download your project folder</li>
                <li>Drag the folder into the Vercel dashboard</li>
                <li>Your site is now live worldwide!</li>
            </ol>
        </div>

        <p className="mt-10 text-[9px] text-slate-700 font-black uppercase tracking-[0.3em]">
          Global Decentralized Network © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
