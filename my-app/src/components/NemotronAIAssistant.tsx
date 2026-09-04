import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, PhoneCall, ShieldCheck, Minimize2, Zap } from 'lucide-react';
import { TMF_META } from '../data/tmfVerifiedData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  '৮০জি ট্যাক্স সার্টিফিকেট কিভাবে পাবো?',
  'আসন্ন রক্তদান ও স্বাস্থ্য শিবির কবে?',
  'মিনতি কোচিং সেন্টারের ভর্তির নিয়ম কি?',
  'How can our company submit a CSR proposal?'
];

export const NemotronAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'নমস্কার! আমি ত্রিবেনী মিনতি ফাউন্ডেশনের 24/7 AI সহকারী (Powered by NVIDIA Nemotron 3.5 Lightning)। অনুদান, ৮০জি ট্যাক্স সার্টিফিকেট, রক্তদান শিবির বা ভলান্টিয়ার কার্যক্রম সম্পর্কে যেকোনো প্রশ্ন করতে পারেন।',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botMsgId = (Date.now() + 1).toString();
    const initialBotMsg: ChatMessage = {
      id: botMsgId,
      sender: 'bot',
      text: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg, initialBotMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(-4).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory,
          stream: true
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === 'data: [DONE]') continue;
            if (trimmed.startsWith('data: ')) {
              try {
                const json = JSON.parse(trimmed.slice(6));
                const delta = json.choices?.[0]?.delta?.content || '';
                if (delta) {
                  accumulated += delta;
                  setMessages((prev) =>
                    prev.map((m) => (m.id === botMsgId ? { ...m, text: accumulated } : m))
                  );
                }
              } catch {
                // partial json line
              }
            } else if (!trimmed.startsWith('data:') && trimmed.length > 0) {
              // Plain JSON fallback response
              try {
                const plainJson = JSON.parse(trimmed);
                if (plainJson.reply) {
                  accumulated = plainJson.reply;
                  setMessages((prev) =>
                    prev.map((m) => (m.id === botMsgId ? { ...m, text: accumulated } : m))
                  );
                }
              } catch {
                // ignore
              }
            }
          }
        }

        if (!accumulated) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? {
                    ...m,
                    text: `নমস্কার, সরাসরি আমাদের হেল্পলাইনে কথা বলতে কল করুন: ${TMF_META.contacts.helplines[0]}`
                  }
                : m
            )
          );
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? {
                ...m,
                text: `নমস্কার, সংযোগে সাময়িক সমস্যা হচ্ছে। জরুরি তথ্যের জন্য আমাদের ২৪/৭ হেল্পলাইনে কল করুন: ${TMF_META.contacts.helplines[0]}`
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-linear-to-r from-[#1B3B2B] via-[#26533D] to-[#1B3B2B] text-white shadow-2xl shadow-black/30 border border-emerald-400/30 cursor-pointer group"
          aria-label="Open 24/7 AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-xs font-bold font-['Plus_Jakarta_Sans'] tracking-wide">
            24/7 AI Assistant
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5 fill-amber-300" />
            Lightning 30B
          </span>
        </motion.button>
      )}

      {/* Floating Chat Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-[90vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden text-slate-800"
          >
            {/* Header */}
            <div className="p-4 bg-[#111A15] text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-amber-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white tracking-wide font-['Plus_Jakarta_Sans']">
                      Minati AI Assistant
                    </h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-emerald-300/80 font-mono flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                    <span>NVIDIA Nemotron 3.5 Lightning (30B)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Statutory Trust Ribbon */}
            <div className="px-3 py-1.5 bg-emerald-50 border-b border-emerald-100 text-[10px] text-emerald-800 flex items-center justify-between font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Reg: SO212276 · 80G Certified</span>
              </span>
              <a
                href={`tel:${TMF_META.contacts.helplines[0]}`}
                className="text-emerald-900 font-bold hover:underline flex items-center gap-0.5"
              >
                <PhoneCall className="w-2.5 h-2.5" />
                <span>Helpline</span>
              </a>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FBFBF9] text-xs">
              {messages.map((msg) => {
                if (msg.sender === 'bot' && !msg.text && isLoading) {
                  return (
                    <div key={msg.id} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#1B3B2B] text-amber-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className="p-3 rounded-2xl bg-white border border-slate-200/80 text-slate-500 italic text-[11px] flex items-center gap-1.5 shadow-xs">
                        <Sparkles className="w-3 h-3 animate-spin text-amber-500" />
                        <span>Minati AI চিন্তা করছে ও দ্রুত লিখছে...</span>
                      </div>
                    </div>
                  );
                }

                if (msg.sender === 'bot' && !msg.text) return null;

                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${isBot ? '' : 'flex-row-reverse'}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                        isBot ? 'bg-[#1B3B2B] text-amber-300' : 'bg-amber-500 text-white'
                      }`}
                    >
                      {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                        isBot
                          ? 'bg-white border border-slate-200/80 text-slate-800 shadow-xs'
                          : 'bg-[#1B3B2B] text-white shadow-xs'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span
                        className={`text-[9px] mt-1 block font-mono ${
                          isBot ? 'text-slate-400' : 'text-emerald-300'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[10px] text-slate-600 whitespace-nowrap transition-colors border border-slate-200/60 cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="যেকোনো প্রশ্ন লিখুন (Type here)..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1.5 focus:ring-emerald-600 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="w-8 h-8 rounded-xl bg-[#1B3B2B] hover:bg-[#26533D] text-amber-300 disabled:opacity-40 flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NemotronAIAssistant;
