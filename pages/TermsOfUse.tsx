
import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-8">Terms of Use</h1>
      <div className="space-y-8 text-slate-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p>By using WaraHatkaXoBaa, you agree to these terms. If you do not agree, please stop using the platform immediately.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">2. Anonymous Nature</h2>
          <p>The platform provides anonymous communication. You are solely responsible for your interactions. We do not moderate or monitor private conversations unless reported for severe violations of safety.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">3. Prohibited Content</h2>
          <p>You may not use this platform to share illegal content, engage in harassment, spamming, or distribute malware. Violation of these rules will result in an immediate temporary or permanent IP ban.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">4. Disclaimers</h2>
          <p>WaraHatkaXoBaa is provided "as is" without any warranties. We are not liable for any harm or damages arising from the use of the service or interactions with other anonymous users.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">5. Age Restriction</h2>
          <p>Users must be at least 18 years of age to use the platform. Use by minors is strictly prohibited.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
