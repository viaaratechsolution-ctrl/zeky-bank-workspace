import React, { useState } from 'react';
import {
  ShieldCheck,
  BellRing,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { translations } from '../../i18n/translations';
import { INITIAL_EMPLOYEES } from '../../data/mockData';
import { DemoNavbar } from '../components/DemoNavbar';

interface PerformanceScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  tasks: Task[];
  onRemindEmployee: (empName: string) => void;
  onSelectTask: (taskId: string) => void;
}

export const PerformanceScreen: React.FC<PerformanceScreenProps> = ({
  language,
  onNavigate,
  tasks,
  onRemindEmployee,
  onSelectTask,
}) => {
  const t = translations[language].demo;
  const isRtl = language === 'ar';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('week');

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const totalCount = 24;
  const progressPercent = Math.min(100, Math.round(((12 + completedCount) / totalCount) * 100));

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 text-slate-900 pb-16">
      <DemoNavbar
        language={language}
        title={t.performanceTitle}
        subtitle="CAIRO MAIN BRANCH · OPERATIONS"
        onBack={() => onNavigate('home')}
      />

      <div className="px-5 pt-3 pb-6 space-y-4">
        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-2xl">
          <button
            type="button"
            onClick={() => setPeriod('today')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              period === 'today'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.todayTab}
          </button>
          <button
            type="button"
            onClick={() => setPeriod('week')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              period === 'week'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.thisWeekTab}
          </button>
          <button
            type="button"
            onClick={() => setPeriod('month')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              period === 'month'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.thisMonthTab}
          </button>
        </div>

        {/* Progress Index Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-2">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>{t.progressIndex}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {progressPercent}%
              </div>
              <h3 className="text-xs font-bold text-slate-800 mt-0.5">
                {t.workspaceCompletion}
              </h3>
              <p className="text-[11px] text-teal-600 font-semibold mt-1">
                {language === 'ar'
                  ? `تم إنجاز ${12 + completedCount} مهمة من أصل ${totalCount} مهمة`
                  : `${12 + completedCount} of ${totalCount} tasks completed`}
              </p>
            </div>

            {/* Circular Gauge Ring */}
            <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
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
                  strokeDasharray={`${progressPercent}, 100`}
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
        </div>

        {/* Needs Attention Card */}
        <div className="bg-rose-50/60 rounded-3xl p-4 border border-rose-100 shadow-xs space-y-3">
          <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>{t.needsAttention}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                {language === 'ar' ? 'تقرير متابعة العملاء' : 'Customer Follow-up Report'}
              </h4>
              <p className="text-[11px] text-rose-600 font-semibold mt-0.5">
                {language === 'ar' ? 'متأخر · يوم واحد' : 'Overdue · 1 day'}
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
              {t.highPriority}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-rose-200">
                <img
                  src="/demo/sara-mohamed.png"
                  alt="Nour Ahmed"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-slate-800">
                {language === 'ar' ? 'نور أحمد' : 'Nour Ahmed'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onRemindEmployee(language === 'ar' ? 'نور أحمد' : 'Nour Ahmed')}
              className="py-1.5 px-3 bg-white hover:bg-rose-100/60 active:scale-95 text-rose-700 text-[11px] font-bold rounded-xl border border-rose-200/80 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <BellRing className="w-3.5 h-3.5 text-rose-600" />
              <span>{t.remindEmployee}</span>
            </button>
          </div>
        </div>

        {/* Task Overview */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-900">{t.taskOverview}</h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700 text-[10px] font-bold">
                {language === 'ar' ? '4 مهام' : '4 Tasks'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
            >
              {t.viewAll}
            </button>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'task-1',
                titleEn: 'Daily Branch Operations Report',
                titleAr: 'تقرير العمليات اليومية للفرع',
                assigneeEn: 'Mohamed Ali · Today 3:00 PM',
                assigneeAr: 'محمد علي · اليوم الساعة 3:00 مساءً',
                status: 'completed',
                statusLabelEn: 'Completed',
                statusLabelAr: 'مكتمل',
              },
              {
                id: 'task-2',
                titleEn: 'Customer Documentation Review',
                titleAr: 'مراجعة وثائق العميل',
                assigneeEn: 'Sara Mohamed · Today 4:00 PM',
                assigneeAr: 'سارة محمد · اليوم الساعة 4:00 مساءً',
                status: 'in-progress',
                statusLabelEn: 'In Progress',
                statusLabelAr: 'في تَقَدم',
              },
              {
                id: 'task-3',
                titleEn: 'Daily Transaction Review',
                titleAr: 'مراجعة المعاملات اليومية',
                assigneeEn: 'Omar Khaled · Tomorrow 12:00 PM',
                assigneeAr: 'عمر خالد · غداً الساعة 12:00 ظهراً',
                status: 'completed',
                statusLabelEn: 'Completed',
                statusLabelAr: 'مكتمل',
              },
              {
                id: 'task-4',
                titleEn: 'Customer Follow-up Report',
                titleAr: 'تقرير متابعة العملاء',
                assigneeEn: 'Nour Ahmed · Yesterday 4:00 PM',
                assigneeAr: 'نور أحمد · أمس الساعة 4:00 مساءً',
                status: 'overdue',
                statusLabelEn: 'Overdue',
                statusLabelAr: 'متأخر',
              },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectTask(item.id);
                  onNavigate('task-details');
                }}
                className="bg-white rounded-2xl p-3 shadow-xs border border-slate-100 flex items-center justify-between hover:border-teal-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      item.status === 'completed'
                        ? 'bg-teal-50 text-teal-600'
                        : item.status === 'in-progress'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {item.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : item.status === 'in-progress' ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {language === 'ar' ? item.assigneeAr : item.assigneeEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'completed'
                        ? 'bg-teal-100/70 text-teal-800'
                        : item.status === 'in-progress'
                        ? 'bg-blue-100/70 text-blue-700'
                        : 'bg-rose-100/70 text-rose-700'
                    }`}
                  >
                    {language === 'ar' ? item.statusLabelAr : item.statusLabelEn}
                  </span>
                  <ChevronIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Progress */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">{t.teamProgress}</h3>
            <span className="text-[10px] text-slate-500 font-medium">{t.membersActive}</span>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3.5">
            {[
              {
                emp: INITIAL_EMPLOYEES[0],
                completed: 6,
                total: 6,
                rate: 100,
              },
              {
                emp: INITIAL_EMPLOYEES[1],
                completed: 4,
                total: 5,
                rate: 80,
              },
              {
                emp: INITIAL_EMPLOYEES[2],
                completed: 3,
                total: 4,
                rate: 75,
              },
              {
                emp: INITIAL_EMPLOYEES[3],
                completed: 3,
                total: 5,
                rate: 60,
              },
            ].map(({ emp, completed, total, rate }) => (
              <div key={emp.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
                      <img
                        src={emp.avatar}
                        alt={emp.nameEn}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {language === 'ar' ? emp.nameAr : emp.nameEn}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {language === 'ar'
                          ? `تم إنجاز ${completed} من أصل ${total} مهام`
                          : `${completed} / ${total} tasks completed`}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full tabular-nums">
                    {rate}%
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
