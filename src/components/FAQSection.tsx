import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Download, CalendarCheck, MessageSquare } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const FAQSection: React.FC = () => {
  const { t, language, theme, openAdmissionModal, openVisitModal } = useSchool();
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqItems = t.faq?.items || [];

  return (
    <section
      id="faq"
      className={`py-12 sm:py-20 relative transition-colors scroll-mt-20 sm:scroll-mt-24 ${
        theme === 'dark' ? 'bg-[#121E19] text-[#F3F7F4]' : 'bg-[#F4F7F5] text-slate-900'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 text-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 shadow-xs">
            <HelpCircle className="w-4 h-4 text-[#F59E0B]" />
            <span>{t.faq?.tagline || 'FREQUENTLY ASKED QUESTIONS'}</span>
          </div>

          <h2
            className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-[#123524]'
            } tracking-tight ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
          >
            {t.faq?.title || 'Questions Parents Often Ask'}
          </h2>

          <p
            className={`mt-3 text-base sm:text-lg font-medium leading-relaxed ${
              theme === 'dark' ? 'text-[#9DB0A6]' : 'text-[#3D5245]'
            } ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
          >
            {t.faq?.description ||
              'Authentic information regarding our classes, admissions, dual curriculum, and campus visits.'}
          </p>
        </div>

        {/* Compact Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Accordion Items */}
          <div className="lg:col-span-8 space-y-3.5">
            {faqItems.map((item, idx) => {
              const isOpen = openIndices.includes(idx);
              const panelId = `faq-panel-${idx}`;
              const buttonId = `faq-btn-${idx}`;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden text-start ${
                    theme === 'dark'
                      ? 'bg-[#16241F] border-[#243B32]'
                      : 'bg-white border-slate-200/90 shadow-2xs'
                  } ${isOpen ? 'ring-1 ring-emerald-600/30 dark:ring-emerald-500/30' : ''}`}
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(idx)}
                    className="w-full min-h-[52px] py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-start transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <span
                      className={`font-heading font-bold text-base sm:text-lg leading-snug transition-colors ${
                        isOpen
                          ? theme === 'dark'
                            ? 'text-emerald-300'
                            : 'text-emerald-800'
                          : theme === 'dark'
                          ? 'text-white hover:text-emerald-300'
                          : 'text-slate-900 hover:text-emerald-800'
                      } ${language === 'ur' ? 'font-urdu leading-[1.6]' : ''}`}
                    >
                      {item.question}
                    </span>

                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-[#0E1714] text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-[#243B32]/60 animate-in fade-in-50 duration-150 ${
                        theme === 'dark' ? 'text-[#D1E0D7]' : 'text-slate-700'
                      } ${language === 'ur' ? 'font-urdu leading-[1.9]' : ''}`}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Quick Parent Assistance Card */}
          <div className="lg:col-span-4">
            <div
              className={`rounded-3xl p-6 sm:p-7 border text-start space-y-5 transition-colors sticky top-24 ${
                theme === 'dark'
                  ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                  : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold border border-amber-300">
                <span>Direct Admissions Desk</span>
              </div>

              <div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold leading-tight">
                  Need Personalized Assistance?
                </h3>
                <p
                  className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                  }`}
                >
                  Our admissions coordinators in Kaspa, Vellore are readily available during office hours to guide you through age criteria, class seats, and campus visits.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={openAdmissionModal}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#D93829] hover:bg-[#b92c1e] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Online Admission Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={openVisitModal}
                  className={`w-full py-3 px-4 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                    theme === 'dark'
                      ? 'bg-[#0E1714] text-white border-[#243B32] hover:bg-[#1E2E28]'
                      : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-700 dark:text-[#34D399]" />
                  <span>Schedule Campus Walkthrough</span>
                </button>

                <a
                  href="/assets/brochure/olive-tree-school-brochure-2026.pdf"
                  download="olive-tree-school-brochure-2026.pdf"
                  className={`w-full py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                    theme === 'dark'
                      ? 'bg-[#0E1714] text-[#FDE68A] border-[#D97706]/40 hover:bg-[#1E2E28]'
                      : 'bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100/70'
                  }`}
                >
                  <Download className="w-4 h-4 text-[#D97706]" />
                  <span>Download School Brochure (PDF)</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#243B32] text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>Kaspa, Vellore • 9:00 AM – 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

