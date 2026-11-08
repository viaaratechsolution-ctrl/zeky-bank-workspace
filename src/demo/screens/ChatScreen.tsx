import React, { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  CheckCheck,
  ClipboardList,
  ArrowRight,
  ArrowLeft,
  Camera,
  Paperclip,
  Smile,
  Mic,
  Send,
} from 'lucide-react';
import { Language, ScreenType, ChatMessage, Task } from '../../types';
import { translations } from '../../i18n/translations';
import { DemoNavbar } from '../components/DemoNavbar';

interface ChatScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  language,
  onNavigate,
  messages,
  onSendMessage,
  tasks,
  onSelectTask,
}) => {
  const t = translations[language].demo;
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/70 text-slate-900 pb-16">
      {/* Group Header */}
      <header className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="p-1 -ml-1 text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
          >
            {isRtl ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>

          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-slate-200">
            <img
              src="/brand/viaara-logo.webp"
              alt="Cairo Main Branch"
              className="w-full h-full object-contain p-1 bg-slate-900"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-slate-900">
                {t.groupChatTitle}
              </h2>
              <span className="w-3.5 h-3.5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[8px] font-bold">
                ✓
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              {t.groupSubtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Menu"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </header>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Date separator */}
        <div className="flex justify-center">
          <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-600 text-[10px] font-bold tracking-wider uppercase">
            {t.today}
          </span>
        </div>

        {/* Message Stream */}
        {messages.map((msg) => {
          const isAhmed = msg.senderId === 'mgr-1';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAhmed ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 px-1">
                <span className="text-[11px] font-bold text-slate-800">
                  {language === 'ar' ? msg.senderNameAr : msg.senderNameEn}
                </span>
                {msg.isLead && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-teal-50 text-teal-700">
                    {language === 'ar' ? msg.senderRoleAr : msg.senderRoleEn}
                  </span>
                )}
                {!msg.isLead && (
                  <span className="text-[10px] text-slate-400">
                    {language === 'ar' ? msg.senderRoleAr : msg.senderRoleEn}
                  </span>
                )}
              </div>

              <div className="flex items-end gap-2 max-w-[85%]">
                {!isAhmed && (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-1">
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderNameEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  {/* Text bubble */}
                  {msg.textEn && (
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isAhmed
                          ? 'bg-teal-50/90 text-teal-950 rounded-br-none border border-teal-100/60 shadow-xs'
                          : 'bg-white text-slate-800 rounded-bl-none border border-slate-100 shadow-xs'
                      }`}
                    >
                      <p>{language === 'ar' ? msg.textAr || msg.textEn : msg.textEn}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                        <span>{language === 'ar' ? msg.timeAr : msg.timeEn}</span>
                        {isAhmed && <CheckCheck className="w-3 h-3 text-teal-600" />}
                      </div>
                    </div>
                  )}

                  {/* Attached Task Card */}
                  {msg.attachedTaskId && (
                    <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-sm space-y-2.5 min-w-[220px]">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-1 font-bold text-slate-500 uppercase">
                          <ClipboardList className="w-3.5 h-3.5 text-teal-600" />
                          <span>{t.taskAttached}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                          {t.pending}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900">
                        {language === 'ar'
                          ? 'تقرير العمليات اليومية للفرع'
                          : 'Daily Branch Operations Report'}
                      </h4>

                      <div className="text-[10px] text-slate-500 font-medium">
                        {language === 'ar'
                          ? 'الموعد النهائي اليوم · الساعة 3:00 مساءً'
                          : 'Due Today · 3:00 PM · Mohamed A.'}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectTask(msg.attachedTaskId!);
                          onNavigate('task-details');
                        }}
                        className="w-full py-2 px-3 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>{t.viewTask}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        <div className="flex items-center gap-2 pt-1 pl-1">
          <div className="px-3 py-1.5 rounded-full bg-slate-200/70 text-slate-600 text-[11px] font-medium flex items-center gap-1.5">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
            </span>
            <span>{t.typingIndicator}</span>
          </div>
        </div>

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-2 sticky bottom-0 z-20"
      >
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Camera"
        >
          <Camera className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Attachment"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.typeMessagePlaceholder}
            className="w-full text-xs py-2 px-3.5 pr-8 rounded-full bg-slate-100 border border-transparent focus:outline-none focus:bg-white focus:border-teal-500"
          />
          <button
            type="button"
            className={`absolute ${isRtl ? 'left-2.5' : 'right-2.5'} text-slate-400 hover:text-slate-600`}
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        <button
          type="submit"
          className="w-9 h-9 rounded-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
          aria-label="Send"
        >
          {inputText.trim() ? <Send className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
};
