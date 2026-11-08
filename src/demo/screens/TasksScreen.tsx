import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, ChevronRight, ChevronLeft, Check, X } from 'lucide-react';
import { Language, ScreenType, Task } from '../../types';
import { translations } from '../../i18n/translations';
import { DemoNavbar } from '../components/DemoNavbar';

interface TasksScreenProps {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  language,
  onNavigate,
  tasks,
  onSelectTask,
}) => {
  const t = translations[language].demo;
  const isRtl = language === 'ar';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'in-progress' && task.status !== 'in-progress') return false;
    if (filter === 'completed' && task.status !== 'completed') return false;
    if (filter === 'pending' && task.status !== 'pending' && task.status !== 'overdue') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = task.titleEn.toLowerCase().includes(q) || task.descriptionEn.toLowerCase().includes(q);
      const matchAr = task.titleAr.includes(q) || task.descriptionAr.includes(q);
      return matchEn || matchAr;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-slate-50/70 text-slate-900 pb-20 relative">
      <DemoNavbar
        language={language}
        title={t.bankName}
        subtitle={t.branchName}
        onBack={() => onNavigate('home')}
      />

      <div className="px-5 pt-4 pb-2">
        {/* Title & Action Icons */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t.tasksTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.manageWork}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600">
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                // Cycle through filters
                const next = filter === 'all' ? 'in-progress' : filter === 'in-progress' ? 'completed' : filter === 'completed' ? 'pending' : 'all';
                setFilter(next);
              }}
              className="p-2 rounded-full hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search input if active */}
        {showSearch && (
          <div className="mt-3 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
            }`}
          >
            {t.all}
          </button>
          <button
            type="button"
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'in-progress'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
            }`}
          >
            {t.inProgress}
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'completed'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
            }`}
          >
            {t.completed}
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'pending'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
            }`}
          >
            {t.pending}
          </button>
        </div>

        {/* Task Cards List */}
        <div className="space-y-3 mt-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500 font-medium">
                {language === 'ar' ? 'لا توجد مهام تطابق هذا التصنيف' : 'No tasks found for this filter'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isCompleted = task.status === 'completed';
              const isHigh = task.priority === 'high';
              const isInProgress = task.status === 'in-progress';
              const isPending = task.status === 'pending' || task.status === 'overdue';

              return (
                <div
                  key={task.id}
                  onClick={() => {
                    onSelectTask(task.id);
                    onNavigate('task-details');
                  }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/90 hover:border-teal-200 transition-all cursor-pointer flex items-center justify-between group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-100">
                      <img
                        src={
                          task.assigneeId === 'emp-1'
                            ? '/demo/mohamed-ali.png'
                            : task.assigneeId === 'emp-2'
                            ? '/demo/sara-mohamed.png'
                            : '/demo/ahmed-hassan.png'
                        }
                        alt="Assignee"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                        {language === 'ar' ? task.titleAr : task.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {language === 'ar'
                          ? task.assigneeId === 'emp-1'
                            ? 'محمد على · اليوم، 3:00 مساءً'
                            : task.assigneeId === 'emp-2'
                            ? 'سارة محمد · اليوم، 4:00 مساءً'
                            : task.assigneeId === 'emp-4'
                            ? 'نور أحمد · أمس، 4:00 مساءً'
                            : 'عمر خالد · غداً، 12:00 ظهراً'
                          : task.assigneeId === 'emp-1'
                          ? 'Mohamed Ali · Today, 3:00 PM'
                          : task.assigneeId === 'emp-2'
                          ? 'Sara Mohamed · Today, 4:00 PM'
                          : task.assigneeId === 'emp-4'
                          ? 'Nour Ahmed · Yesterday, 4:00 PM'
                          : 'Omar Khaled · Tomorrow, 12:00 PM'}
                      </p>

                      <div className="flex items-center gap-1.5 mt-2">
                        {isHigh ? (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100/70 text-rose-700">
                            {language === 'ar' ? 'عالي' : 'High'}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {language === 'ar' ? 'متوسط' : 'Medium'}
                          </span>
                        )}

                        {isCompleted && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-100/70 text-teal-800 flex items-center gap-1">
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            <span>{language === 'ar' ? 'مكتمل' : 'Completed'}</span>
                          </span>
                        )}

                        {isInProgress && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100/70 text-blue-700">
                            {language === 'ar' ? 'في تَقَدم' : 'In Progress'}
                          </span>
                        )}

                        {isPending && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100/60 text-indigo-700">
                            {language === 'ar' ? 'قيد الانتظار' : 'Pending'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-slate-400 group-hover:text-slate-700 transition-colors shrink-0">
                    <ChevronIcon className="w-5 h-5" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        type="button"
        onClick={() => onNavigate('new-task')}
        className={`absolute bottom-16 ${isRtl ? 'left-5' : 'right-5'} size-12 rounded-full bg-teal-500 hover:bg-teal-600 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-teal-500/30 transition-all z-20 cursor-pointer`}
        aria-label="Add New Task"
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};
