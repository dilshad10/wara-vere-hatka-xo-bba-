
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <div className="space-y-8 text-slate-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Zero Data Retention</h2>
          <p>WaraHatkaXoBaa is built on the principle of absolute privacy. We do not store any logs of your conversations, IP addresses, or metadata. Once a chat session ends or the window is closed, all messages are permanently purged from the server memory.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. No Personal Identification</h2>
          <p>We do not require accounts, emails, or phone numbers. Every session assigns you a temporary, random identifier that is never linked to your real-world identity.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. View-Once Images</h2>
          <p>Images shared using the 'View Once' feature are deleted immediately from our temporary caching service after the recipient has opened the image or the session has expired.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. Geolocation</h2>
          <p>When using 'Nearby Chat', we request your approximate location. This data is used only for matching you with nearby users and is never stored or associated with your identity.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">5. Third-Party Services</h2>
          <p>We do not use third-party analytics or tracking cookies. Your privacy is our only priority.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
