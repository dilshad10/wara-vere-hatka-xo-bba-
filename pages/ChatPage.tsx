
import React, { useState, useEffect, useRef } from 'react';
import { UserPreferences, Message } from '../types';
import { ChatService } from '../services/chatService';
import { useNavigate } from 'react-router-dom';

interface Props { preferences: UserPreferences; }

const ChatPage: React.FC<Props> = ({ preferences }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [matchingStep, setMatchingStep] = useState('Syncing Nodes...');
  const [chatService, setChatService] = useState<ChatService | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [userId] = useState(() => Math.random().toString(36).substring(7));
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const steps = ["Securing Tunnel...", "Searching Network...", "Pairing Node...", "Verifying Keys..."];
    let stepIdx = 0;
    const stepInterval = setInterval(() => {
        if (stepIdx < steps.length - 1) { stepIdx++; setMatchingStep(steps[stepIdx]); }
    }, 1200);

    const service = new ChatService(
      userId,
      (msg) => { setMessages(prev => [...prev, msg]); setIsTyping(false); },
      () => { setIsSearching(false); }
    );

    setChatService(service);
    service.joinLobby();

    const fallbackTimer = setTimeout(async () => {
      if (isSearching) {
        setIsSearching(false);
        setIsTyping(true);
        const intro = await service.initializeAI(preferences.chatType, preferences.gender, preferences.lookingFor);
        setIsTyping(false);
        setMessages([{ id: 'ai-init', senderId: 'stranger', text: intro, timestamp: Date.now() }]);
      }
    }, 6000);

    return () => { service.disconnect(); clearTimeout(fallbackTimer); clearInterval(stepInterval); };
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isRateLimited || !chatService) return;
    const myMsg: Message = { id: Math.random().toString(36), senderId: 'me', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, myMsg]);
    const textToSend = inputValue;
    setInputValue('');
    setIsRateLimited(true);
    setTimeout(() => setIsRateLimited(false), 1200);
    const aiResponse = await chatService.sendMessage(textToSend);
    if (aiResponse) {
      setIsTyping(true);
      setTimeout(() => { setIsTyping(false); setMessages(prev => [...prev, aiResponse]); }, 1000 + Math.random() * 2000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && chatService) {
      const reader = new FileReader();
      reader.onload = async () => {
        const myMsg: Message = { id: Math.random().toString(36), senderId: 'me', imageUrl: reader.result as string, isViewOnce: true, timestamp: Date.now() };
        setMessages(prev => [...prev, myMsg]);
        await chatService.sendMessage("", reader.result as string, true);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isSearching) {
    return (
      <div className="flex-grow h-screen-dynamic flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden relative">
        <div className="relative w-64 h-64 flex items-center justify-center mb-10">
            <div className="absolute inset-0 border border-indigo-500/10 rounded-full animate-ping"></div>
            <div className="absolute inset-8 border border-indigo-500/20 rounded-full animate-pulse"></div>
            <div className="w-5 h-5 bg-indigo-600 rounded-full shadow-[0_0_40px_rgba(99,102,241,1)] z-10"></div>
            <div className="absolute w-full h-full border border-indigo-500/10 rounded-full">
                <div className="w-1/2 h-1 bg-gradient-to-r from-transparent to-indigo-600 absolute top-1/2 left-1/2 -translate-y-1/2 origin-left animate-[spin_1s_linear_infinite]"></div>
            </div>
        </div>
        <h2 className="text-3xl font-black mb-4 tracking-tighter text-white uppercase italic">{matchingStep}</h2>
        <div className="bg-slate-900/50 px-5 py-2 rounded-2xl border border-slate-800 mb-8">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Discovery Active</span>
        </div>
        <button onClick={() => navigate('/')} className="text-slate-600 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-[0.3em]">Cancel Handshake</button>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col h-screen-dynamic overflow-hidden bg-slate-950">
      <div className="bg-slate-900/90 backdrop-blur-xl px-4 py-3 border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center text-lg border border-slate-700">👤</div>
          <div>
            <div className="font-black text-[13px] text-slate-100 flex items-center tracking-tight leading-none mb-1">STRANGER_P2P</div>
            <div className="text-[9px] text-indigo-400 font-black uppercase tracking-widest flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span> Encrypted
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="bg-slate-800 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all active:scale-90">Leave</button>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-hide pb-20">
        <div className="flex justify-center pt-2">
            <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest bg-slate-900/30 px-3 py-1 rounded-full border border-slate-800">Room: {preferences.chatType}</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'} animate-fade-in`}>
            {msg.text && (
              <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed ${
                msg.senderId === 'me' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-900 text-slate-100 rounded-bl-none border border-slate-800'
              }`}>
                {msg.text}
              </div>
            )}
            {msg.imageUrl && (
              <div className="max-w-[85%]">
                <img src={msg.imageUrl} className="rounded-2xl border border-slate-800 shadow-xl" alt="Media" />
              </div>
            )}
            <span className="text-[8px] text-slate-700 mt-1 uppercase font-black tracking-widest">{msg.senderId === 'me' ? 'ME' : 'PEER'}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-slate-600 italic px-1"><div className="w-1 h-1 bg-slate-700 rounded-full animate-bounce"></div><span className="text-[9px] font-black uppercase">Stranger is typing...</span></div>
        )}
      </div>

      <div className="p-3 md:p-4 bg-slate-950/95 backdrop-blur-md border-t border-slate-900 z-30 pb-safe shrink-0">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end space-x-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 bg-slate-900 rounded-xl text-slate-500 border border-slate-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </button>
          <div className="relative flex-grow">
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(e as any)}
                placeholder="Say something..."
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 pr-12 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none min-h-[50px] max-h-[120px] transition-all"
                rows={1}
            />
            <button type="submit" disabled={!inputValue.trim()} className="absolute right-2 bottom-2 p-2.5 bg-indigo-600 text-white rounded-xl disabled:opacity-30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
