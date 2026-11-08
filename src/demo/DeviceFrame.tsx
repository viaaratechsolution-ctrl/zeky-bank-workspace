import React, { useRef } from 'react';
import { Wifi, Signal, BatteryMedium } from 'lucide-react';
import { Language } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  language: Language;
  currentTime?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  isFocusMode?: boolean;
  bottomNav?: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  language,
  currentTime = '9:41',
  onSwipeLeft,
  onSwipeRight,
  isFocusMode = false,
  bottomNav,
}) => {
  const isRtl = language === 'ar';
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swiped Left
        if (isRtl) {
          if (onSwipeLeft) onSwipeLeft();
        } else {
          if (onSwipeRight) onSwipeRight();
        }
      } else {
        // Swiped Right
        if (isRtl) {
          if (onSwipeRight) onSwipeRight();
        } else {
          if (onSwipeLeft) onSwipeLeft();
        }
      }
    }
  };

  return (
    <div
      className={`touch-pan-y select-none transition-all duration-300 ${
        isFocusMode ? 'w-[min(100%,400px)]' : 'w-[min(100%,360px)]'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative mx-auto w-full">
        {/* Glow behind the phone */}
        <div
          className="pointer-events-none absolute -inset-10 rounded-[4rem] bg-gradient-brand opacity-20 blur-3xl"
          aria-hidden="true"
        />

        {/* Side physical buttons */}
        <span
          className="absolute -left-[3px] top-28 h-8 w-[3px] rounded-l bg-zinc-700"
          aria-hidden="true"
        />
        <span
          className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-zinc-700"
          aria-hidden="true"
        />
        <span
          className="absolute -left-[3px] top-56 h-14 w-[3px] rounded-l bg-zinc-700"
          aria-hidden="true"
        />
        <span
          className="absolute -right-[3px] top-44 h-20 w-[3px] rounded-r bg-zinc-700"
          aria-hidden="true"
        />

        {/* Outer Bezel */}
        <div className="relative rounded-[3.25rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-700 p-[3px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
          <div className="rounded-[3.1rem] bg-zinc-950 p-[10px]">
            {/* Display screen aspect container */}
            <div className="relative flex aspect-[9/19.5] w-full flex-col overflow-hidden rounded-[2.5rem] bg-app-bg text-app-ink shadow-inner">
              {/* Status Bar */}
              <div className="relative flex h-11 shrink-0 items-center justify-between bg-app-bg px-7 pt-1 text-[13px] font-semibold text-app-ink select-none z-30">
                <span className="tabular-nums">{currentTime}</span>

                {/* Dynamic Island */}
                <span
                  className="absolute left-1/2 top-2 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black shadow-sm"
                  aria-hidden="true"
                />

                {/* Status Icons */}
                <span className="flex items-center gap-1" aria-hidden="true">
                  <Signal className="size-3.5" />
                  <Wifi className="size-3.5" />
                  <BatteryMedium className="size-4" />
                </span>
              </div>

              {/* Viewport Screen Content */}
              <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className="relative min-h-0 flex-1 overflow-y-auto no-scrollbar flex flex-col bg-slate-50"
              >
                <div className="flex-1">{children}</div>
                {bottomNav}
              </div>

              {/* Home Indicator */}
              <div
                className="flex h-5 shrink-0 items-start justify-center bg-white select-none z-30"
                aria-hidden="true"
              >
                <span className="mt-1.5 h-1 w-28 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
