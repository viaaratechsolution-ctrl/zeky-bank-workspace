import React from 'react';
import { Building2, MoreVertical, CheckCircle2 } from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { translations } from '../../i18n/translations';
import { DemoNavbar } from '../components/DemoNavbar';

interface MyTaskScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  task: Task;
  onCompleteTask: (taskId: string) => void;
}

export const MyTaskScreen: React.FC<MyTaskScreenProps> = ({
  language,
  onNavigate,
  task,
  onCompleteTask,
}) => {
  const t = translations[language].demo;
  const isCompleted = task.status === 'completed';

  const handleMarkComplete = () => {
    onCompleteTask(task.id);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 text-slate-900 pb-6">
      <DemoNavbar
        language={language}
        title={t.myTaskTitle}
        subtitle={t.branchName}
        onBack={() => onNavigate('tasks')}
        rightAction={
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-slate-200">
            <img
              src="/demo/mohamed-ali.png"
              alt="Mohamed Ali"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
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

        {/* Task Header Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-start justify-between">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
              {language === 'ar' ? task.titleAr : task.titleEn}
            </h2>
            <button
              type="button"
              className="p-1.5 -mr-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'ar' ? task.descriptionAr : task.descriptionEn}
          </p>

          {/* Inner Meta Box */}
          <div className="bg-slate-50/80 rounded-2xl p-3.5 space-y-2 border border-slate-100/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {language === 'ar' ? 'مُعيّن من قِبل' : 'Assigned by'}
              </span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] flex items-center justify-center font-bold">
                  {language === 'ar' ? 'أح' : 'AH'}
                </span>
                <span>{language === 'ar' ? 'أحمد حسن' : 'Ahmed Hassan'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {language === 'ar' ? 'موعد التسليم' : 'Deadline'}
              </span>
              <span className="font-bold text-slate-900">
                {language === 'ar' ? task.deadlineAr : task.deadlineEn}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {language === 'ar' ? 'أولوية' : 'Priority'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                <span>{t.highPriority}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.currentStatus}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                isCompleted
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-indigo-50 text-indigo-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCompleted ? 'bg-teal-600' : 'bg-indigo-600'
                }`}
              />
              <span>{isCompleted ? t.completed : t.inProgress}</span>
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {isCompleted ? '100%' : `${task.progress}%`}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {isCompleted
                ? language === 'ar'
                  ? 'تم الاعتماد بنجاح · جاهز للتدقيق'
                  : 'Completed · Audit verified'
                : language === 'ar'
                ? 'شبه مكتمل · المراجعة النهائية قيد الانتظار'
                : 'Almost complete · Final review pending'}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${isCompleted ? 100 : task.progress}%` }}
            />
          </div>
        </div>

        {/* Activity Live Feed */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">{t.activityLabel}</h3>
            <span className="text-[10px] text-slate-400 font-medium">{t.liveFeed}</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {isCompleted && (
              <div className="relative text-xs">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-white" />
                <div className="font-bold text-teal-800">
                  {language === 'ar' ? 'تم اكتمال المهمة' : 'Task completed'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {language === 'ar' ? 'محمد علي · الآن' : 'Mohamed Ali · Just now'}
                </div>
              </div>
            )}

            <div className="relative text-xs">
              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-white" />
              <div className="font-bold text-slate-900">
                {language === 'ar' ? 'المهمة الموكلة' : 'Task assigned'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {language === 'ar' ? 'محمد علي · الآن' : 'Mohamed Ali · Just now'}
              </div>
            </div>

            <div className="relative text-xs">
              <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-2 ring-white" />
              <div className="font-bold text-slate-900">
                {language === 'ar' ? 'في تَقَدم' : 'In Progress'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {language === 'ar' ? 'محمد علي · الآن' : 'Mohamed Ali · Just now'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: Mark as Completed */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isCompleted}
            onClick={handleMarkComplete}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-teal-100 text-teal-800 cursor-default shadow-none'
                : 'bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white shadow-teal-600/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>{isCompleted ? (language === 'ar' ? 'تمت المهمة بنجاح' : 'Task Completed!') : t.markAsCompleted}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
