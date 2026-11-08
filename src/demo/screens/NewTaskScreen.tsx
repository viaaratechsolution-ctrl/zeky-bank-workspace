import React, { useState } from 'react';
import { Building2, ChevronDown, Calendar, Bell, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, ScreenType, Task, Priority, Employee } from '../../types';
import { translations } from '../../i18n/translations';
import { INITIAL_EMPLOYEES } from '../../data/mockData';
import { DemoNavbar } from '../components/DemoNavbar';

interface NewTaskScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  onAddTask: (task: Partial<Task>) => void;
}

export const NewTaskScreen: React.FC<NewTaskScreenProps> = ({
  language,
  onNavigate,
  onAddTask,
}) => {
  const t = translations[language].demo;
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [title, setTitle] = useState(
    language === 'ar' ? 'تقرير العمليات اليومية للفرع' : 'Daily Branch Operations Report'
  );
  const [description, setDescription] = useState(
    language === 'ar'
      ? 'قم بإعداد وتقديم ملخص العمليات اليومية للفرع.'
      : 'Prepare and submit the daily branch operations summary.'
  );
  const [selectedEmpId, setSelectedEmpId] = useState('emp-1');
  const [deadline, setDeadline] = useState(
    language === 'ar' ? 'اليوم · الساعة 3:00 مساءً' : 'Today · 3:00 PM'
  );
  const [priority, setPriority] = useState<Priority>('high');
  const [reminder, setReminder] = useState(true);
  const [showEmpDropdown, setShowEmpDropdown] = useState(false);
  const [showDeadlineDropdown, setShowDeadlineDropdown] = useState(false);

  const selectedEmployee = INITIAL_EMPLOYEES.find((e) => e.id === selectedEmpId) || INITIAL_EMPLOYEES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      titleEn: title,
      titleAr: title,
      descriptionEn: description,
      descriptionAr: description,
      assigneeId: selectedEmpId,
      deadlineEn: deadline,
      deadlineAr: deadline,
      deadlineNoteEn: 'End of Banking Hours',
      deadlineNoteAr: 'نهاية ساعات العمل المصرفية',
      priority,
      status: 'pending',
      progress: 0,
      hasReminder: reminder,
    });
    onNavigate('tasks');
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 text-slate-900 pb-6">
      <DemoNavbar
        language={language}
        title={t.newTask}
        subtitle={t.branchName}
        onBack={() => onNavigate('tasks')}
      />

      <form onSubmit={handleSubmit} className="px-5 pt-4 pb-6 space-y-4">
        {/* Branch Team Badge */}
        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.operationsTeam}</span>
          </div>
        </div>

        {/* Task Title */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {t.taskTitleLabel}
          </label>
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل عنوان المهمة' : 'Enter task title'}
              className="w-full text-sm font-semibold text-slate-900 bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {t.descriptionLabel}
          </label>
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل وصف المهمة' : 'Enter task description'}
              className="w-full text-xs text-slate-700 leading-relaxed bg-transparent focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Assign To */}
        <div className="space-y-1.5 relative">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {t.assignToLabel}
          </label>
          <button
            type="button"
            onClick={() => setShowEmpDropdown(!showEmpDropdown)}
            className="w-full bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.nameEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {language === 'ar' ? selectedEmployee.nameAr : selectedEmployee.nameEn}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {language === 'ar' ? selectedEmployee.roleAr : selectedEmployee.roleEn}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* Employee Dropdown Menu */}
          {showEmpDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30">
              {INITIAL_EMPLOYEES.map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  onClick={() => {
                    setSelectedEmpId(emp.id);
                    setShowEmpDropdown(false);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-3 transition-colors text-left cursor-pointer"
                >
                  <img
                    src={emp.avatar}
                    alt={emp.nameEn}
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {language === 'ar' ? emp.nameAr : emp.nameEn}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {language === 'ar' ? emp.roleAr : emp.roleEn}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Deadline */}
        <div className="space-y-1.5 relative">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {t.deadlineLabel}
          </label>
          <button
            type="button"
            onClick={() => setShowDeadlineDropdown(!showDeadlineDropdown)}
            className="w-full bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-teal-600">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{deadline}</h4>
                <p className="text-[11px] text-slate-500">
                  {language === 'ar' ? 'نهاية ساعات العمل المصرفية' : 'End of Banking Hours'}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showDeadlineDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 space-y-1">
              {[
                { labelEn: 'Today · 3:00 PM', labelAr: 'اليوم · الساعة 3:00 مساءً' },
                { labelEn: 'Today · 5:00 PM', labelAr: 'اليوم · الساعة 5:00 مساءً' },
                { labelEn: 'Tomorrow · 12:00 PM', labelAr: 'غداً · الساعة 12:00 ظهراً' },
                { labelEn: 'End of Week · 4:00 PM', labelAr: 'نهاية الأسبوع · الساعة 4:00 مساءً' },
              ].map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDeadline(language === 'ar' ? d.labelAr : d.labelEn);
                    setShowDeadlineDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                >
                  {language === 'ar' ? d.labelAr : d.labelEn}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Priority */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {t.priorityLabel}
          </label>
          <div className="grid grid-cols-3 gap-2 bg-slate-200/50 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setPriority('low')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                priority === 'low'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.low}
            </button>
            <button
              type="button"
              onClick={() => setPriority('medium')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                priority === 'medium'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.medium}
            </button>
            <button
              type="button"
              onClick={() => setPriority('high')}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                priority === 'high'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.high}
            </button>
          </div>
        </div>

        {/* Set Reminder */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{t.setReminder}</h4>
              <p className="text-[10px] text-slate-500 leading-tight">
                {t.reminderSub}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setReminder(!reminder)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              reminder ? 'bg-teal-500' : 'bg-slate-200'
            }`}
            aria-label="Toggle reminder"
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                reminder ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Assign Task Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-sm rounded-2xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{t.assignTaskBtn}</span>
            <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </form>
    </div>
  );
};
