import React from 'react';
import { Building2, Share2, Clock, Flag, MessageSquare, CheckCircle2, UserCheck } from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { translations } from '../../i18n/translations';
import { INITIAL_EMPLOYEES } from '../../data/mockData';
import { DemoNavbar } from '../components/DemoNavbar';

interface TaskDetailScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  task: Task;
  onCompleteTask: (taskId: string) => void;
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  language,
  onNavigate,
  task,
  onCompleteTask,
}) => {
  const t = translations[language].demo;

  const assignee = INITIAL_EMPLOYEES.find((e) => e.id === task.assigneeId) || INITIAL_EMPLOYEES[0];
  const isCompleted = task.status === 'completed';

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 text-slate-900 pb-6">
      <DemoNavbar
        language={language}
        title={t.taskDetail}
        subtitle={t.branchName}
        onBack={() => onNavigate('tasks')}
        rightAction={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-slate-200">
              <img
                src="/demo/ahmed-hassan.png"
                alt="Ahmed"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        }
      />

      <div className="px-5 pt-4 pb-6 space-y-4">
        {/* Branch Team Badge */}
        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.operationsTeam}</span>
          </div>
        </div>

        {/* Title & Description Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-2">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
            {language === 'ar' ? task.titleAr : task.titleEn}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'ar' ? task.descriptionAr : task.descriptionEn}
          </p>
        </div>

        {/* Assignee Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-100">
              <img
                src={assignee.avatar}
                alt={assignee.nameEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900">
                  {language === 'ar' ? assignee.nameAr : assignee.nameEn}
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  {t.assigneeBadge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'ar' ? assignee.roleAr : assignee.roleEn}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                <UserCheck className="w-3 h-3" />
                <span>{t.assignedBy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deadline & Priority Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.deadlineLabel}</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1.5">
                {language === 'ar' ? task.deadlineAr : task.deadlineEn}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Flag className="w-3.5 h-3.5 text-rose-500" />
                <span>{t.priorityLabel}</span>
              </div>
              <div className="mt-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  {t.highPriority}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-1 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">{t.statusLabel}</span>
              <span className="font-semibold text-indigo-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>
                  {isCompleted
                    ? t.completed
                    : task.status === 'in-progress'
                    ? t.inProgress
                    : t.pending}
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">{t.completionLabel}</span>
              <span className="font-bold text-slate-900 tabular-nums">
                {task.progress}% Complete
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Activity Live Feed */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">{t.activityLabel}</h3>
            <span className="text-[10px] text-slate-400 font-medium">{t.liveFeed}</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {task.activities && task.activities.length > 0 ? (
              task.activities.map((act, i) => (
                <div key={act.id || i} className="relative text-xs">
                  <span
                    className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                      i === 0 ? 'bg-teal-500' : 'bg-slate-300'
                    }`}
                  />
                  <div className="font-bold text-slate-900">
                    {language === 'ar' ? act.actionAr : act.actionEn}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {language === 'ar' ? act.actorAr : act.actorEn} ·{' '}
                    {language === 'ar' ? act.timeAr : act.timeEn}
                  </div>
                </div>
              ))
            ) : (
              <div className="relative text-xs">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-white" />
                <div className="font-bold text-slate-900">
                  {language === 'ar' ? 'المهمة الموكلة' : 'Task assigned'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {assignee.nameEn} · {language === 'ar' ? 'الآن' : 'Just now'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={() => onNavigate('chat')}
            className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-sm rounded-2xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.messageEmployee}</span>
          </button>

          {!isCompleted && (
            <button
              type="button"
              onClick={() => onNavigate('my-task')}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>
                {language === 'ar'
                  ? 'عرض شاشة الموظف (إنجاز المهمة)'
                  : 'Switch to Employee View (Complete Task)'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
