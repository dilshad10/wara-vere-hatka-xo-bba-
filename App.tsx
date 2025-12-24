
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserPreferences, Gender, ChatType } from './types';

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    gender: Gender.PREFER_NOT_TO_SAY,
    lookingFor: 'Any',
    chatType: ChatType.GLOBAL
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
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
