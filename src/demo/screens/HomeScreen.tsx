import React from 'react';
import { RefreshCw, Zap, Clock, Edit3, Building2, ChevronRight } from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { translations } from '../../i18n/translations';
import { DemoNavbar } from '../components/DemoNavbar';

interface HomeScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onNavigate,
  tasks,
  onSelectTask,
}) => {
  const t = translations[language].demo;

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending' || t.status === 'overdue').length;
  const totalCount = 24; // Baseline 24 branch daily protocols
  const completionPercentage = Math.round(((12 + completedCount - 1) / totalCount) * 100);

  // Pick top upcoming tasks
  const upcomingTasks = tasks.slice(0, 2);

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 text-slate-900 pb-4">
      <DemoNavbar
        language={language}
        title={t.bankName}
        subtitle={t.branchName}
        showBack={true}
        onBack={() => onNavigate('tasks')}
      />

      <div className="px-5 pt-4 pb-6 space-y-5">
        {/* Branch Team Badge */}
        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.operationsTeam}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          </div>
        </div>

        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.greeting}
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {t.greetingSub}
          </p>
        </div>

        {/* Workspace Progress Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {t.workspaceProgress}
              </h3>
            </div>
            <span className="text-[11px] font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
              {t.middaySync}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                  {completionPercentage}%
                </span>
                <span className="text-xs font-semibold text-teal-700">
                  {t.onTrack}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {language === 'ar'
                  ? `تم إنجاز ${12 + completedCount - 1} مهمة من أصل ${totalCount} مهمة`
                  : `${12 + completedCount - 1} of ${totalCount} tasks completed`}
              </p>
            </div>

            {/* Circular Gauge Ring */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-500 transition-all duration-700 ease-out"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-[8px] font-bold text-teal-800 uppercase tracking-tighter text-center leading-tight">
                {language === 'ar' ? 'على المسار' : 'ON TRACK'}
              </div>
            </div>
          </div>

          {/* Progress track */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* 3 Status summary boxes */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="bg-teal-50/80 hover:bg-teal-100/80 transition-colors p-3 rounded-2xl text-center cursor-pointer border border-teal-100/50"
            >
              <div className="text-lg font-bold text-teal-800 tabular-nums">
                {12 + completedCount - 1}
              </div>
              <div className="text-[11px] text-teal-700 font-medium mt-0.5">
                {t.completed}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="bg-indigo-50/80 hover:bg-indigo-100/80 transition-colors p-3 rounded-2xl text-center cursor-pointer border border-indigo-100/50"
            >
              <div className="text-lg font-bold text-indigo-800 tabular-nums">
                {8 + inProgressCount - 1}
              </div>
              <div className="text-[11px] text-indigo-700 font-medium mt-0.5">
                {t.inProgress}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="bg-rose-50/80 hover:bg-rose-100/80 transition-colors p-3 rounded-2xl text-center cursor-pointer border border-rose-100/50"
            >
              <div className="text-lg font-bold text-rose-800 tabular-nums">
                {Math.max(1, 4 + pendingCount - 1)}
              </div>
              <div className="text-[11px] text-rose-700 font-medium mt-0.5">
                {t.pending}
              </div>
            </button>
          </div>
        </div>

        {/* Upcoming Tasks Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {t.upcomingTasks}
              </h3>
              <span className="w-5 h-5 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                {upcomingTasks.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
            >
              {t.viewPriority}
            </button>
          </div>

          <div className="space-y-2.5">
            {upcomingTasks.map((task, idx) => (
              <div
                key={task.id}
                onClick={() => {
                  onSelectTask(task.id);
                  onNavigate('task-details');
                }}
                className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 hover:border-teal-200 transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-100">
                    <img
                      src={
                        idx === 0
                          ? '/demo/mohamed-ali.png'
                          : '/demo/sara-mohamed.png'
                      }
                      alt="Assignee"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-teal-500 text-white flex items-center justify-center text-[9px]">
                      {idx === 0 ? (
                        <Zap className="w-2.5 h-2.5" />
                      ) : (
                        <Clock className="w-2.5 h-2.5" />
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {language === 'ar' ? task.titleAr : task.titleEn}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      {idx === 0
                        ? language === 'ar'
                          ? 'محمد على · اليوم · الساعة 3:00 مساءً'
                          : 'Mohamed Ali · Today · 3:00 PM'
                        : language === 'ar'
                        ? 'سارة محمد · اليوم · الساعة 4:00 مساءً'
                        : 'Sara Mohamed · Today · 4:00 PM'}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      idx === 0
                        ? 'bg-blue-100/70 text-blue-700'
                        : 'bg-rose-100/70 text-rose-700'
                    }`}
                  >
                    {idx === 0
                      ? language === 'ar'
                        ? 'مراجعة'
                        : 'Review'
                      : language === 'ar'
                      ? 'عالي'
                      : 'High'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              {t.recentActivity}
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              {t.realTimeFeed}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                <img
                  src="/demo/mohamed-ali.png"
                  alt="Mohamed Ali"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px]">
                  <Edit3 className="w-2.5 h-2.5" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {language === 'ar'
                    ? 'قام محمد على بتحديث مهمة'
                    : 'Mohamed Ali updated a task'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'ar'
                    ? 'مرفق جدول بيانات التدقيق المعدل'
                    : 'Attached revised audit spreadsheet'}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-[11px] font-semibold text-teal-600">
              {language === 'ar' ? 'الآن' : 'Just now'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
