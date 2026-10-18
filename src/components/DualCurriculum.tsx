import React, { useState } from 'react';
import {
  BookOpen,
  Languages,
  Binary,
  FlaskConical,
  Globe2,
  Laptop,
  Compass,
  CheckCircle,
  Sun,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { curriculumData } from '../data/translations';

export const DualCurriculum: React.FC = () => {
  const { t, language, openAdmissionModal, theme } = useSchool();
  const [activeTab, setActiveTab] = useState<'both' | 'academic' | 'islamic'>('both');

  const { academic, islamic } = curriculumData;

  const getLangName = (item: any) => {
    if (language === 'ta') return item.nameTa;
    if (language === 'ur') return item.nameUr;
    return item.nameEn;
  };

  const getLangDesc = (item: any) => {
    if (language === 'ta') return item.descTa;
    if (language === 'ur') return item.descUr;
    return item.descEn;
  };

  const getIslamicTitle = (item: any) => {
    if (language === 'ta') return item.titleTa;
    if (language === 'ur') return item.titleUr;
    return item.titleEn;
  };

  const getIslamicDesc = (item: any) => {
    if (language === 'ta') return item.descTa;
    if (language === 'ur') return item.descUr;
    return item.descEn;
  };

  const getIslamicHighlights = (item: any) => {
    if (language === 'ta') return item.keyHighlightsTa;
    if (language === 'ur') return item.keyHighlightsUr;
    return item.keyHighlightsEn;
  };

  const renderStemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Binary className="w-6 h-6 text-[#1E3A8A]" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-[#123524]" />;
      case 'Globe':
        return <Globe2 className="w-6 h-6 text-[#D97706]" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-[#1E3A8A]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#123524]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#123524]" />;
    }
  };

  return (
    <section
      id="curriculum"
      className={`py-20 relative overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-[#0E1714] text-[#F3F7F4]' : 'bg-[#F4F7F5] text-slate-900'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs sm:text-sm font-extrabold tracking-wider uppercase mb-3 shadow-xs">
            <Layers className="w-4 h-4 text-amber-800" />
            <span>{t.curriculum.tagline}</span>
          </div>

          <h2
            className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
              theme === 'dark' ? 'text-[#93C5FD]' : 'text-slate-900'
            } tracking-tight ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
          >
            {t.curriculum.title}
          </h2>

          <p
            className={`mt-4 text-lg sm:text-xl font-medium ${
              theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
            } leading-relaxed max-w-2xl mx-auto ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
          >
            {t.curriculum.description}
          </p>

          {/* Quick Filter Switcher */}
          <div
            className={`mt-8 inline-flex flex-wrap justify-center p-1.5 rounded-2xl shadow-sm border gap-1.5 ${
              theme === 'dark' ? 'bg-[#16241F] border-[#243B32]' : 'bg-white border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'both'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : theme === 'dark'
                  ? 'text-[#9DB0A6] hover:text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.curriculum.filterBoth}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('academic')}
              className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'academic'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : theme === 'dark'
                  ? 'text-[#9DB0A6] hover:text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.curriculum.academicTab}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('islamic')}
              className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'islamic'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : theme === 'dark'
                  ? 'text-[#9DB0A6] hover:text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.curriculum.islamicTab}
            </button>
          </div>
        </div>

        {/* 2-Column Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* COLUMN 1: Academic Education (10 Subjects) */}
          {(activeTab === 'both' || activeTab === 'academic') && (
            <div
              className={`rounded-3xl p-8 sm:p-10 border transition-all flex flex-col justify-between text-start relative overflow-hidden ${
                theme === 'dark'
                  ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                  : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
              }`}
            >
              {/* Subtle architectural top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-700" />

              <div>
                {/* Column Banner */}
                <div className={`flex items-center justify-between pb-6 border-b ${
                  theme === 'dark' ? 'border-[#243B32]' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center text-white shadow-sm">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-[#93C5FD] block">
                        MODERN ACADEMIC CURRICULUM
                      </span>
                      <h3 className={`font-editorial text-2xl sm:text-3xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {t.curriculum.languagesHeading} & Sciences
                      </h3>
                    </div>
                  </div>
                  <span className="px-3.5 py-1.5 bg-blue-700 text-white rounded-full text-xs font-bold tracking-tight shadow-xs">
                    10 Subjects
                  </span>
                </div>

                {/* Sub-Group 1: The 5-Language Polyglot Foundation */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-blue-700 dark:text-[#34D399]" />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-[#34D399]">
                        The 5-Language Polyglot Foundation
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {academic.languages.map((langItem) => (
                      <div
                        key={langItem.id}
                        className="flex flex-col items-start gap-2 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-start"
                      >
                        {/* Top Row: Small badge pill above title */}
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700/60">
                          {langItem.tag}
                        </span>

                        {/* Second Row: Subject Name on its own full line */}
                        <h5 className="text-xl font-bold text-slate-900 dark:text-white">
                          {getLangName(langItem)}
                        </h5>

                        {/* Third Row: Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {getLangDesc(langItem)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Group 2: Core Sciences & Humanities */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Binary className="w-5 h-5 text-blue-700 dark:text-[#93C5FD]" />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-[#93C5FD]">
                        Core Sciences & Humanities
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {academic.stem.map((stemItem, sIdx) => (
                      <div
                        key={stemItem.id}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all text-start group"
                      >
                        <div
                          className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                            theme === 'dark'
                              ? 'bg-[#16241F] border-[#243B32]'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          {renderStemIcon(stemItem.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-[#93C5FD] transition-colors">
                              {getLangName(stemItem)}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                              0{sIdx + 6}
                            </span>
                          </div>
                          <p
                            className="text-xs sm:text-sm mt-1 leading-relaxed text-slate-600 dark:text-[#9DB0A6]"
                          >
                            {getLangDesc(stemItem)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer Action */}
              <div
                className={`mt-8 pt-5 border-t-2 flex items-center justify-between text-sm ${
                  theme === 'dark'
                    ? 'border-[#243B32] text-[#9DB0A6]'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <span className="font-bold text-xs sm:text-sm">{t.curriculum.integratedSyllabus}</span>
                <button
                  type="button"
                  onClick={openAdmissionModal}
                  className="font-extrabold text-[#1E3A8A] dark:text-[#93C5FD] hover:text-[#D93829] dark:hover:text-[#D93829] inline-flex items-center gap-1.5 text-sm transition-colors cursor-pointer"
                >
                  <span>{t.curriculum.applyAcademicSeat}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* COLUMN 2: Islamic Education in Proper Sunnah Way (4 Pillars) */}
          {(activeTab === 'both' || activeTab === 'islamic') && (
            <div
              className={`rounded-3xl p-8 sm:p-10 border transition-all flex flex-col justify-between relative overflow-hidden text-start ${
                theme === 'dark'
                  ? 'bg-[#16241F] border-[#133829] text-white shadow-xl'
                  : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
              }`}
            >
              {/* Arabesque Heritage Ribbon Pattern */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-700" />

              <div>
                {/* Column Banner */}
                <div
                  className={`flex items-center justify-between pb-6 border-b ${
                    theme === 'dark' ? 'border-[#243B32]' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-700 flex items-center justify-center text-amber-300 shadow-sm">
                      <Sun className="w-7 h-7 text-amber-300" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-[#34D399] flex items-center gap-1.5 font-mono">
                        HERITAGE TARBIYAH TRACK
                      </span>
                      <h3
                        className={`font-editorial text-2xl sm:text-3xl font-bold ${
                          theme === 'dark' ? 'text-[#FDE68A]' : 'text-slate-900'
                        }`}
                      >
                        {t.curriculum.islamicTab}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3.5 py-1.5 bg-emerald-700 text-white rounded-full text-xs font-bold tracking-tight shadow-xs">
                    4 Core Pillars
                  </span>
                </div>

                {/* 4 Islamic Pillars Detailed Heritage Cards */}
                <div className="mt-8 space-y-4">
                  {islamic.map((pillar, idx) => (
                    <div
                      key={pillar.id}
                      className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all text-start relative group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          {/* Numbered Pillars 01, 02, 03, 04 in Gold Serif Type */}
                          <span className="font-editorial text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tighter shrink-0 select-none">
                            0{idx + 1}
                          </span>
                          <h4
                            className={`font-editorial font-bold text-lg sm:text-xl ${
                              theme === 'dark' ? 'text-[#FDE68A]' : 'text-slate-900'
                            } ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
                          >
                            {getIslamicTitle(pillar)}
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-white bg-emerald-700 px-2.5 py-1 rounded-md shadow-xs shrink-0">
                          {pillar.badge}
                        </span>
                      </div>

                      <p
                        className={`text-xs sm:text-sm mt-3 leading-relaxed ${
                          theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                        } ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
                      >
                        {getIslamicDesc(pillar)}
                      </p>

                      {/* Clean highlight pills */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {getIslamicHighlights(pillar).map((highlight: string, hIdx: number) => (
                          <span
                            key={hIdx}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${
                              theme === 'dark'
                                ? 'bg-[#16241F] border-[#243B32] text-[#9DB0A6]'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-700 dark:text-[#34D399] shrink-0" />
                            <span>{highlight}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer Action */}
              <div
                className={`mt-8 pt-5 border-t flex items-center justify-between text-sm ${
                  theme === 'dark'
                    ? 'border-[#243B32] text-[#9DB0A6]'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <span className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  {t.curriculum.sunnahDaily}
                </span>
                <button
                  type="button"
                  onClick={openAdmissionModal}
                  className="font-extrabold text-emerald-700 dark:text-[#FDE68A] hover:text-[#D93829] dark:hover:text-[#D93829] inline-flex items-center gap-1.5 text-sm transition-colors cursor-pointer"
                >
                  <span>{t.curriculum.joinTarbiyahCohort}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Banner with Inquiry Prompt */}
        <div
          className={`mt-14 rounded-3xl p-8 border-2 flex flex-col md:flex-row items-center justify-between gap-6 text-start ${
            theme === 'dark'
              ? 'bg-[#16241F] border-[#243B32] text-white'
              : 'bg-[#123524] text-[#FBF9F5] border-[#123524] shadow-xl'
          }`}
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center shrink-0 font-bold font-editorial text-xl shadow-xs">
              ★
            </div>
            <div>
              <h4 className="font-editorial text-lg sm:text-xl font-bold">
                {t.curriculum.syllabusPromptTitle}
              </h4>
              <p
                className={`text-sm mt-1 max-w-2xl ${
                  theme === 'dark' ? 'text-[#9DB0A6]' : 'text-[#FBF9F5]/90'
                }`}
              >
                {t.curriculum.syllabusPromptDesc}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openAdmissionModal}
            className="px-6 py-3.5 rounded-2xl bg-[#D97706] hover:bg-[#b45309] text-white text-sm font-extrabold transition-all shrink-0 shadow-md cursor-pointer hover:shadow-lg"
          >
            {t.curriculum.exploreFullSyllabus} →
          </button>
        </div>
      </div>
    </section>
  );
};
