
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-10">
            <div className="text-2xl font-black text-white italic mb-2 tracking-tighter uppercase">WaraHatkaXoBaa</div>
            <p className="text-slate-500 text-sm">The World's Favorite Anonymous Chat Engine.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-black uppercase tracking-widest text-slate-400 mb-10">
          <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
          <a href="https://github.com" className="hover:text-indigo-400 transition-colors">Open Source</a>
          <a href="mailto:support@warahatkaxobaa.com" className="hover:text-indigo-400 transition-colors">Support</a>
        </div>

        <div className="max-w-xl mx-auto p-6 bg-slate-900/50 rounded-2xl border border-slate-800 text-left mb-10">
            <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Deployment Instructions</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
                To publish this globally: 
                1. Push this code to <strong>GitHub</strong>. 
                2. Connect your repository to <strong>Vercel</strong> or <strong>Netlify</strong>. 
                3. Add your <code className="text-indigo-300">API_KEY</code> to the Environment Variables. 
                4. Your site will be live on a worldwide CDN instantly.
            </p>
        </div>

        <p className="text-[10px] text-slate-700 uppercase tracking-[0.2em] font-black">
          © {new Date().getFullYear()} WaraHatkaXoBaa GLOBAL • ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
