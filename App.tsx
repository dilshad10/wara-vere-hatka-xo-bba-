
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import ChatPage from './pages/ChatPage.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsOfUse from './pages/TermsOfUse.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import { UserPreferences, Gender, ChatType } from './types.ts';

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    gender: Gender.PREFER_NOT_TO_SAY,
    lookingFor: 'Any',
    chatType: ChatType.GLOBAL
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950">
        <Header />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPage setPreferences={setPreferences} />} />
            <Route path="/chat" element={<ChatPage preferences={preferences} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
