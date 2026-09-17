import React, { useState } from 'react';
import { MessageSquare, Send, Mic, Sparkles, Bot, User, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { mockInitialChatMessages } from '../services/mockData';
import { ChatMessage } from '../types';

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockInitialChatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate BuildVision AI Answer
    setTimeout(() => {
      let botResponse = `BuildVision AI Neural Query Result: Evaluated site telematics. All systems operational across active sectors.`;

      if (text.toLowerCase().includes('risk') || text.toLowerCase().includes('delay')) {
        botResponse = `**Harbor Gateway Bridge & Flyover** exhibits the highest schedule delay risk (**74% probability**, 18 predicted delay days). Primary bottleneck: Steel Rebar inventory deficit (28 Tons vs 50 Ton threshold). AI recommends fast-track procurement order from SteelCorp Global.`;
      } else if (text.toLowerCase().includes('safety') || text.toLowerCase().includes('violation')) {
        botResponse = `Today, **YOLO Safety Vision** flagged **3 PPE violations** across Pier 4 Scaffolding (1 missing hard hat, 96.4% confidence) and Zone B Material Hoist (1 missing high-vis vest). Safety Inspectors have been dispatched.`;
      } else if (text.toLowerCase().includes('rebar') || text.toLowerCase().includes('stock')) {
        botResponse = `**Fe550 TMT Rebar (16mm)** stock for Harbor Gateway Bridge stands at **28 Tons** (Critical threshold: 50 Tons). Daily consumption rate is **8.5 Tons/day**. Reorder recommended within 24h.`;
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setInputText('Show me safety violations detected today across all sites');
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn h-[calc(100vh-140px)] flex flex-col">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-cyan-400" />
          BuildVision AI Natural Language Assistant
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Ask questions in plain English or voice commands regarding delay risks, safety incidents, materials, and equipment.
        </p>
      </div>

      {/* Main Chat Box Container */}
      <div className="flex-1 glass-panel rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
                    : 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-glow-cyan'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 font-bold" />}
              </div>

              <div className={`max-w-xl space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                </div>
                <div className="text-[10px] text-slate-500 px-1">{msg.timestamp}</div>

                {/* Pre-set suggestion chips */}
                {msg.suggestions && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {msg.suggestions.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 transition"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3 text-xs text-cyan-400">
              <Bot className="w-5 h-5 animate-pulse" />
              <span className="animate-pulse">BuildVision AI is calculating answer from live site telemetry...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center gap-3">
          <button
            onClick={toggleVoice}
            className={`p-3 rounded-2xl border transition ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-ping'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? 'Listening to voice query...' : 'Ask BuildVision AI about site status, risk, or safety...'}
            className="flex-1 px-4 py-3 bg-slate-900 text-xs text-white rounded-2xl border border-slate-700/80 focus:outline-none focus:border-cyan-500"
          />

          <button
            onClick={() => handleSend()}
            className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan hover:opacity-95 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
