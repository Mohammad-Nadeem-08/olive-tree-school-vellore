import React, { useState, useEffect } from 'react';
import {
  BellRing,
  AlertCircle,
  PlusCircle,
  Trash2,
  ChevronRight,
  X,
  Edit3,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { formatPhoneDisplay } from '../utils/whatsapp';
import type { NoticeItem } from '../types';

export const NoticeBoard: React.FC = () => {
  const {
    t,
    notices,
    language,
    addNotice,
    updateNotice,
    togglePublishNotice,
    deleteNotice,
    isAdminAuthenticated,
    theme,
  } = useSchool();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);

  useEffect(() => {
    if (!selectedNotice && !isAddNoticeOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNotice(null);
        setIsAddNoticeOpen(false);
        setEditingNotice(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNotice, isAddNoticeOpen]);

  const categories = ['All', 'Admissions', 'Academic', 'Islamic'];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'All':
        return t.notices.filterAll;
      case 'Admissions':
        return t.notices.catAdmissions;
      case 'Academic':
        return t.notices.catAcademic;
      case 'Islamic':
        return t.notices.catIslamic;
      case 'Events':
        return t.notices.catEvents;
      default:
        return cat;
    }
  };

  // For public visitors: show ONLY published notices (item.isPublished !== false)
  // For admin users: show both published and draft notices
  const filteredNotices = notices.filter((item) => {
    if (!isAdminAuthenticated && item.isPublished === false) return false;
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const getTitle = (n: NoticeItem) => {
    if (language === 'ta') return n.titleTa || n.titleEn;
    if (language === 'ur') return n.titleUr || n.titleEn;
    return n.titleEn;
  };

  const getContent = (n: NoticeItem) => {
    if (language === 'ta') return n.contentTa || n.contentEn;
    if (language === 'ur') return n.contentUr || n.contentEn;
    return n.contentEn;
  };

  const parseNoticeDate = (dateStr: string) => {
    if (!dateStr) return { month: 'CIRC', day: 'OTS', year: '2027' };
    const parts = dateStr.trim().split(/[\s,/-]+/);
    if (parts.length >= 2) {
      if (isNaN(Number(parts[0]))) {
        return {
          month: parts[0].substring(0, 3).toUpperCase(),
          day: parts[1].padStart(2, '0'),
          year: parts[2] || '2027',
        };
      } else {
        return {
          day: parts[0].padStart(2, '0'),
          month: (parts[1] || 'OCT').substring(0, 3).toUpperCase(),
          year: parts[2] || '2027',
        };
      }
    }
    return { month: 'CIRC', day: 'OTS', year: '2027' };
  };

  return (
    <section
      id="notices"
      className={`py-12 sm:py-20 relative transition-colors scroll-mt-20 sm:scroll-mt-24 ${
        theme === 'dark' ? 'bg-[#0E1714] text-[#F3F7F4]' : 'bg-[#EBF2EE] text-slate-900'
      }`}
    >
      {/* Organic Wave Divider at top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none transform -translate-y-full">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#EBF2EE] dark:text-[#0E1714]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123524] text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 shadow-xs">
              <BellRing className="w-4 h-4 text-[#F59E0B]" />
              <span>Official Bulletin Ledger</span>
            </div>

            <h2
              className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-[#123524]'
              } tracking-tight ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
            >
              {t.notices.title}
            </h2>

            <p
              className={`mt-3 text-base sm:text-lg font-medium ${
                theme === 'dark' ? 'text-[#9DB0A6]' : 'text-[#3D5245]'
              } max-w-xl ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
            >
              {t.notices.description}
            </p>
          </div>

          {/* Category Filter Pills & Admin Add Action */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`p-1.5 rounded-2xl shadow-xs border flex items-center flex-wrap gap-1 ${
                theme === 'dark' ? 'bg-[#16241F] border-[#243B32]' : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : theme === 'dark'
                      ? 'text-[#9DB0A6] hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>

            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  setEditingNotice(null);
                  setIsAddNoticeOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D93829] hover:bg-[#b92c1e] text-white rounded-2xl text-sm font-bold transition-colors shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.notices.publishNotice}</span>
              </button>
            )}
          </div>
        </div>

        {/* Notices Cards Grid OR Clean Professional Empty State */}
        {filteredNotices.length === 0 ? (
          <div
            className={`rounded-3xl p-10 sm:p-14 text-center border shadow-xs max-w-2xl mx-auto transition-colors ${
              theme === 'dark'
                ? 'bg-[#16241F] border-[#243B32] text-[#9DB0A6]'
                : 'bg-white border-slate-200/90 text-slate-600'
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <BellRing className="w-8 h-8 text-[#E59A23]" />
            </div>
            <h3
              className={`font-editorial text-2xl sm:text-3xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-[#123524]'
              } ${language === 'ur' ? 'font-urdu' : ''}`}
            >
              {t.notices.emptyHeading}
            </h3>
            <p
              className={`text-sm sm:text-base font-medium max-w-md mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
              } ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
            >
              {t.notices.emptyDescription}
            </p>
            {isAdminAuthenticated && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setEditingNotice(null);
                    setIsAddNoticeOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123524] hover:bg-[#0c2419] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-[#F59E0B]" />
                  <span>Publish First Circular</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-start">
            {filteredNotices.map((notice) => {
              const dateInfo = parseNoticeDate(notice.date);
              const isPublished = notice.isPublished !== false;
              return (
                <div
                  key={notice.id}
                  className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 border transition-all flex flex-col justify-between group hover:shadow-xl text-start relative overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-[#16241F] text-white shadow-lg'
                      : 'bg-white text-slate-900 shadow-md shadow-slate-900/5'
                  } ${
                    notice.isImportant
                      ? 'border-[#D93829] ring-2 ring-[#D93829]/20'
                      : !isPublished
                      ? 'border-amber-400/60 dark:border-amber-600/60 opacity-90'
                      : theme === 'dark'
                      ? 'border-[#243B32] hover:border-[#34D399]'
                      : 'border-slate-200/90 hover:border-emerald-600'
                  }`}
                >
                  {/* Decorative Paper Clip Aesthetic Badge on Top Left */}
                  <div className="absolute top-0 left-8 w-6 h-3 bg-gradient-to-b from-[#D1D5DB] to-[#9CA3AF] rounded-b-md shadow-xs opacity-75 pointer-events-none" />

                  <div>
                    {/* Admin Status Pill when logged in */}
                    {isAdminAuthenticated && (
                      <div className="mb-3 pb-2 border-b border-dashed border-slate-200 dark:border-[#243B32] flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide ${
                            isPublished
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {isPublished ? `● ${t.notices.publishedBadge}` : `○ ${t.notices.draftBadge}`}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => togglePublishNotice(notice.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-[#0E1714] dark:hover:bg-[#243B32] text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                            title={isPublished ? t.notices.unpublishAction : t.notices.publishAction}
                          >
                            {isPublished ? (
                              <>
                                <EyeOff className="w-3 h-3 text-amber-600" />
                                <span>{t.notices.unpublishAction}</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3 text-emerald-600" />
                                <span>{t.notices.publishAction}</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingNotice(notice);
                              setIsAddNoticeOpen(true);
                            }}
                            className="p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                            title={t.notices.editNotice}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Notice Top: Calendar Date Block + Tags */}
                    <div className="flex items-start justify-between gap-3 mb-5 pt-1">
                      {/* Left: Authentic Calendar Stamp Block */}
                      <div className="w-13 rounded-xl border border-slate-200 dark:border-[#243B32] overflow-hidden shrink-0 shadow-2xs text-center">
                        <div className="bg-[#123524] text-white text-[10px] font-mono font-bold tracking-wider uppercase py-0.5">
                          {dateInfo.month}
                        </div>
                        <div className="bg-slate-50 dark:bg-[#0E1714] text-slate-900 dark:text-[#F3F7F4] py-1 font-editorial font-bold text-lg leading-tight">
                          {dateInfo.day}
                        </div>
                      </div>

                      {/* Right: Category Tag + Urgent Stamp */}
                      <div className="flex flex-col items-end gap-1.5 flex-1 min-w-0">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wide uppercase shadow-xs ${
                            notice.category === 'Admissions'
                              ? 'bg-[#123524] text-white'
                              : notice.category === 'Academic'
                              ? 'bg-[#1E3A8A] text-white'
                              : 'bg-[#D97706] text-white'
                          }`}
                        >
                          {getCategoryLabel(notice.category)}
                        </span>

                        {notice.isImportant && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#B91C1C] text-white flex items-center gap-1 shadow-xs">
                            <AlertCircle className="w-3 h-3 text-white" />
                            <span>{t.notices.importantBadge}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-editorial text-lg sm:text-xl font-bold mb-3 line-clamp-2 transition-colors ${
                        theme === 'dark'
                          ? 'text-white group-hover:text-[#FDE68A]'
                          : 'text-[#133829] group-hover:text-[#D93829]'
                      } ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
                    >
                      {getTitle(notice)}
                    </h3>

                    {/* Content snippet */}
                    <p
                      className={`text-sm line-clamp-3 leading-relaxed ${
                        theme === 'dark' ? 'text-[#9DB0A6]' : 'text-[#4A5B52]'
                      } ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
                    >
                      {getContent(notice)}
                    </p>
                  </div>

                  {/* Footer Read More & Admin Controls */}
                  <div
                    className={`mt-6 pt-4 border-t flex items-center justify-between text-sm ${
                      theme === 'dark' ? 'border-[#243B32]' : 'border-slate-100'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedNotice(notice)}
                      className="font-bold text-[#133829] dark:text-[#34D399] hover:text-[#D93829] dark:hover:text-[#D93829] inline-flex items-center gap-1 text-sm transition-colors cursor-pointer"
                    >
                      <span>Read Circular</span>
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </button>

                    {isAdminAuthenticated && (
                      <button
                        type="button"
                        onClick={() => deleteNotice(notice.id)}
                        className="text-rose-500 hover:text-rose-700 dark:text-rose-400 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Admin: Delete Notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div
          onClick={() => setSelectedNotice(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border animate-in fade-in zoom-in-95 duration-150 text-start relative my-auto max-h-[92dvh] sm:max-h-[88dvh] overflow-y-auto modal-scroll-hidden cursor-default ${
              theme === 'dark' ? 'bg-[#16241F] border-[#243B32] text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* High-Visibility Sticky Close Button (X) */}
            <button
              type="button"
              onClick={() => setSelectedNotice(null)}
              className="sticky top-2 float-right -mt-1 -me-1 z-20 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className={`flex items-center justify-between pb-5 border-b ${
                theme === 'dark' ? 'border-[#243B32]' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[#133829]/10 dark:bg-[#133829]/40 text-[#133829] dark:text-[#34D399] border border-[#133829]/20">
                  {getCategoryLabel(selectedNotice.category)}
                </span>
                {selectedNotice.isImportant && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#D93829]/15 text-[#D93829] border border-[#D93829]/30">
                    {t.notices.importantBadge}
                  </span>
                )}
                {selectedNotice.isPublished === false && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {t.notices.draftBadge}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-[#6B7280] dark:text-[#9DB0A6]">{selectedNotice.date}</span>
            </div>

            <div className="py-6">
              <h3
                className={`font-editorial text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-[#133829]'
                } ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
              >
                {getTitle(selectedNotice)}
              </h3>
              <p
                className={`text-base leading-relaxed whitespace-pre-line ${
                  theme === 'dark' ? 'text-[#D1E0D7]' : 'text-[#3D5245]'
                } ${language === 'ur' ? 'font-urdu leading-[1.9]' : ''}`}
              >
                {getContent(selectedNotice)}
              </p>
            </div>

            <div
              className={`pt-5 border-t flex items-center justify-between ${
                theme === 'dark' ? 'border-[#243B32]' : 'border-slate-100'
              }`}
            >
              <span className="text-xs font-mono text-[#6B7280] dark:text-[#9DB0A6]">Olive Tree School • Circular Ledger</span>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="px-6 py-2.5 rounded-xl bg-[#133829] hover:bg-[#0E1714] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                {t.notices.closeNotice}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Notice Modal for Admin */}
      {isAddNoticeOpen && (
        <NoticeFormModal
          editingNotice={editingNotice}
          onClose={() => {
            setIsAddNoticeOpen(false);
            setEditingNotice(null);
          }}
          onSave={(data) => {
            if (editingNotice) {
              updateNotice(editingNotice.id, data);
            } else {
              addNotice(data);
            }
            setIsAddNoticeOpen(false);
            setEditingNotice(null);
          }}
        />
      )}
    </section>
  );
};

// Internal Add / Edit Notice Modal Component
interface NoticeFormModalProps {
  onClose: () => void;
  editingNotice?: NoticeItem | null;
  onSave: (notice: Omit<NoticeItem, 'id'>) => void;
}

const NoticeFormModal: React.FC<NoticeFormModalProps> = ({
  onClose,
  editingNotice,
  onSave,
}) => {
  const { siteConfig } = useSchool();
  const [category, setCategory] = useState<NoticeItem['category']>(
    editingNotice?.category || 'Admissions'
  );
  const [isImportant, setIsImportant] = useState(editingNotice?.isImportant || false);
  const [isPublished, setIsPublished] = useState(
    editingNotice ? editingNotice.isPublished !== false : true
  );

  const [titleEn, setTitleEn] = useState(editingNotice?.titleEn || '');
  const [titleTa, setTitleTa] = useState(editingNotice?.titleTa || '');
  const [titleUr, setTitleUr] = useState(editingNotice?.titleUr || '');

  const [contentEn, setContentEn] = useState(editingNotice?.contentEn || '');
  const [contentTa, setContentTa] = useState(editingNotice?.contentTa || '');
  const [contentUr, setContentUr] = useState(editingNotice?.contentUr || '');

  const handleUseAdmissionsTemplate = () => {
    const year = siteConfig.admissionYear;
    const phone = formatPhoneDisplay(siteConfig.primaryPhone);

    setTitleEn(`Admissions Open for Academic Year ${year} (Pre-KG to 5th Std)`);
    setTitleTa(`${year} கல்வி ஆண்டுக்கான மாணவர் சேர்க்கை துவக்கம் (Pre-KG - 5th)`);
    setTitleUr(`تعلیمی سال ${year} کے لیے نئے داخلوں کا باقاعدہ آغاز`);

    setContentEn(
      `Admission forms are now available at the school campus during office hours (9:00 AM – 4:00 PM on all working days). Parents can also submit an online inquiry via WhatsApp (${phone}). Limited seats per class to preserve our 1:15 ratio.`
    );
    setContentTa(
      `பள்ளி வளாகத்தில் அலுவலக வேலை நேரங்களில் (காலை 9:00 - மாலை 4:00) சேர்க்கை படிவங்கள் பெறலாம். இணையதளம் மற்றும் வாட்ஸ்அப் (${phone}) மூலமாகவும் முன்பதிவு செய்யலாம்.`
    );
    setContentUr(
      `اسکول کیمپس میں دفتری اوقات (صبح 9:00 تا شام 4:00) داخلہ فارم دستیاب ہیں۔ والدین آن لائن اور واٹس ایپ (${phone}) پر بھی رابطہ کر سکتے ہیں۔`
    );
    setCategory('Admissions');
    setIsImportant(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn || !contentEn) return;

    onSave({
      date: editingNotice?.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category,
      isImportant,
      isPublished,
      titleEn,
      titleTa: titleTa || titleEn,
      titleUr: titleUr || titleEn,
      contentEn,
      contentTa: contentTa || contentEn,
      contentUr: contentUr || contentEn,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#16241F] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#243B32] relative my-auto max-h-[92dvh] sm:max-h-[88dvh] overflow-y-auto modal-scroll-hidden text-start cursor-default"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* High-Visibility Sticky Close Button (X) */}
        <button
          type="button"
          onClick={onClose}
          className="sticky top-2 float-right -mt-1 -me-1 z-20 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-[#243B32]">
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#133829] dark:text-white">
              {editingNotice ? 'Edit School Circular' : 'Publish School Circular'}
            </h3>
            <p className="text-xs font-mono text-[#6B7280] dark:text-[#9DB0A6]">
              {editingNotice ? `Editing Circular ID: ${editingNotice.id}` : 'Official Bulletin Desk'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {!editingNotice && (
              <button
                type="button"
                onClick={handleUseAdmissionsTemplate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E59A23]/15 text-[#92400E] dark:text-[#FDE68A] text-xs font-mono font-bold border border-[#E59A23]/30 hover:bg-[#E59A23]/25 transition-colors cursor-pointer"
              >
                <span>Use Admissions Circular Template</span>
              </button>
            )}

            <div className="flex items-center gap-4 ml-auto">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span>Publish Immediately</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs font-bold text-[#D93829] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="rounded text-[#D93829] focus:ring-[#D93829] cursor-pointer"
                />
                <span>Urgent</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm"
            >
              <option value="Admissions">Admissions</option>
              <option value="Academic">Academic</option>
              <option value="Islamic">Islamic Tarbiyah</option>
              <option value="Events">Events</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1">
              English Title & Content *
            </label>
            <input
              type="text"
              placeholder="Notice Title in English"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm mb-2"
              required
            />
            <textarea
              rows={3}
              placeholder="Detailed Notice Content in English..."
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1">
                தமிழ் தலைப்பு & விவரம்
              </label>
              <input
                type="text"
                placeholder="தமிழ் தலைப்பு"
                value={titleTa}
                onChange={(e) => setTitleTa(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm mb-2 font-tamil"
              />
              <textarea
                rows={2}
                placeholder="தமிழ் விவரம்..."
                value={contentTa}
                onChange={(e) => setContentTa(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm font-tamil"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1">
                اردو عنوان اور تفصیل
              </label>
              <input
                type="text"
                placeholder="اردو عنوان"
                value={titleUr}
                onChange={(e) => setTitleUr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm mb-2 font-urdu"
              />
              <textarea
                rows={2}
                placeholder="اردو تفصیل..."
                value={contentUr}
                onChange={(e) => setContentUr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm font-urdu"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E4DC] dark:border-[#243B32] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#E8E4DC] dark:border-[#243B32] text-[#4A5B52] dark:text-[#9DB0A6] font-semibold text-sm hover:bg-[#F2F6F3] dark:hover:bg-[#0E1714] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#D93829] hover:bg-[#b92c1e] text-white font-bold text-sm shadow-md cursor-pointer"
            >
              {editingNotice ? 'Save Changes' : isPublished ? 'Publish Circular' : 'Save as Draft'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
