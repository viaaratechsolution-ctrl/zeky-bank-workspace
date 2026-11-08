import React from 'react';
import { ArrowLeft, ArrowRight, Bell } from 'lucide-react';
import { Language, ScreenType } from '../../types';
import { translations } from '../../i18n/translations';

interface DemoNavbarProps {
  language: Language;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  avatarUrl?: string;
  unreadCount?: number;
  rightAction?: React.ReactNode;
}

export const DemoNavbar: React.FC<DemoNavbarProps> = ({
  language,
  title,
  subtitle,
  onBack,
  showBack = true,
  avatarUrl = '/demo/ahmed-hassan.png',
  unreadCount = 1,
  rightAction,
}) => {
  const t = translations[language].demo;
  const isRtl = language === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <header className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            aria-label="Back"
          >
            <BackIcon className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-tight">
            {title || t.bankName}
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            {subtitle || t.branchName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {rightAction ? (
          rightAction
        ) : (
          <>
            <button
              type="button"
              className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full ring-2 ring-white" />
              )}
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-teal-500/20 shadow-sm shrink-0">
              <img
                src={avatarUrl}
                alt="Ahmed Hassan"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
};
