import React from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Award,
  Languages,
  ArrowRight,
  MapPin,
  Edit3,
  GraduationCap,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const Hero: React.FC = () => {
  const {
    t,
    siteConfig,
    openAdmissionModal,
    openVisitModal,
    liveEditMode,
    updateSiteConfig,
    language,
    theme,
  } = useSchool();

  // Full headline in solid, high-contrast colors with human editorial serif & hand-drawn SVG underline
  const renderHeadline = () => {
    if (language === 'ta') {
      return (
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.2] font-tamil ${
            theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#133829]'
          }`}
        >
          <span className="block">வாழ்நாள் கல்விக்கான</span>
          <span className="block">
            <span className="relative inline-block font-editorial italic font-semibold text-[#172554] dark:text-[#93C5FD]">
              வலுவான அடித்தளம்
              <svg
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 -bottom-2 w-full h-3 text-[#E59A23] stroke-current"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 8.5C45 3.5 130 2.5 197 7.5"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h1>
      );
    }
    if (language === 'ur') {
      return (
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.25] font-urdu py-1 ${
            theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#133829]'
          }`}
        >
          <span className="block">زندگی بھر سیکھنے کے لیے</span>
          <span className="block">
            <span className="relative inline-block font-editorial italic font-bold text-[#172554] dark:text-[#93C5FD]">
              ایک مضبوط بنیاد
              <svg
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 -bottom-2 w-full h-3 text-[#E59A23] stroke-current"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 8.5C45 3.5 130 2.5 197 7.5"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h1>
      );
    }
    return (
      <h1
        className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] ${
          theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#133829]'
        }`}
      >
        <span className="block">Building a Foundation</span>
        <span className="block">
          for a{' '}
          <span className="relative inline-block font-editorial italic font-normal text-[#172554] dark:text-[#93C5FD]">
            Lifetime of Learning
            <svg
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 -bottom-2 w-full h-3 text-[#E59A23] stroke-current"
              preserveAspectRatio="none"
            >
              <path
                d="M3 8.5C45 3.5 130 2.5 197 7.5"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
      </h1>
    );
  };

  return (
    <section
      id="home"
      className={`relative overflow-hidden pt-6 pb-4 transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#0E1714] text-[#F3F7F4]' : 'bg-[#F4F7F5] text-slate-900'
      }`}
    >
      {/* Hero Grid Container: Perfectly balanced 2-column layout */}
      <div className="w-full px-6 lg:px-16 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center text-start">
        {/* Left Column (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-start text-start">
          {/* Institutional Partnership Co-Branding Header */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div
              className={`inline-flex items-center gap-3 px-3.5 py-2 h-14 rounded-2xl border transition-colors shadow-sm shrink-0 whitespace-nowrap ${
                theme === 'dark'
                  ? 'bg-[#16241F] border-[#243B32] text-[#F3F7F4]'
                  : 'bg-white border-slate-200/90 text-slate-900'
              }`}
            >
              <img
                src="/brainy-stars-logo.jpeg"
                alt="Brainy Stars International School"
                loading="eager"
                decoding="async"
                className="h-9 w-auto object-contain rounded-md shrink-0"
              />
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block shrink-0" />
              <div className="flex flex-col text-start justify-center">
                <span className={`text-[11px] font-bold tracking-wide uppercase whitespace-nowrap leading-none ${theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-500'}`}>
                  {t.branding.coBrandPrefix}
                </span>
                <span
                  className={`font-heading font-extrabold text-xs sm:text-sm leading-tight whitespace-nowrap mt-0.5 ${
                    theme === 'dark' ? 'text-[#93C5FD]' : 'text-blue-700'
                  }`}
                >
                  {t.branding.coBrandName}
                </span>
              </div>
              <span className="font-bold px-2.5 py-0.5 rounded-full text-xs sm:text-sm hidden md:inline ml-1 bg-amber-100 text-amber-950 border border-amber-300 shadow-xs whitespace-nowrap shrink-0">
                {t.branding.coBrandMotto.startsWith('★') ? t.branding.coBrandMotto : `★ ${t.branding.coBrandMotto}`}
              </span>
            </div>

            {/* Admission Year Pill - Solid Deep Forest Green */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs sm:text-sm font-bold shadow-sm bg-emerald-700 text-white border-emerald-800"
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
              {liveEditMode ? (
                <div className="flex items-center gap-1.5">
                  <span>{t.hero.badgeAdmission}:</span>
                  <input
                    type="text"
                    value={siteConfig.admissionYear}
                    onChange={(e) => updateSiteConfig({ admissionYear: e.target.value })}
                    className={`border rounded px-2 py-0.5 text-xs font-bold w-24 ${
                      theme === 'dark'
                        ? 'bg-[#0E1714] text-[#A7F3D0] border-[#243B32]'
                        : 'bg-white text-slate-900 border-slate-300'
                    }`}
                  />
                  <Edit3 className="w-3.5 h-3.5 text-white" />
                </div>
              ) : (
                <span>{t.hero.admissionsOpenPill}</span>
              )}
            </div>
          </div>

          {/* Main Headline */}
          <div className="mb-6">{renderHeadline()}</div>

          {/* Sub-headline */}
          <p
            className={`text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-2xl ${
              theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
            } ${language === 'ur' ? 'font-urdu leading-[2.1]' : ''}`}
          >
            {t.hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            {/* Primary Terracotta Red CTA Button */}
            <button
              type="button"
              onClick={openAdmissionModal}
              className="bg-[#D93829] hover:bg-[#C22F21] text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg inline-flex items-center justify-center gap-3 transition active:scale-95 group cursor-pointer"
            >
              <span>{t.hero.applyCta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
            </button>

            {/* Schedule Campus Visit Button */}
            <button
              type="button"
              onClick={openVisitModal}
              className={`border px-7 py-4 rounded-2xl font-bold text-lg transition active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                theme === 'dark'
                  ? 'bg-[#16241F] text-[#A7F3D0] border-[#243B32] hover:bg-[#1E2E28]'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <CalendarCheck className="w-5 h-5 text-emerald-700 dark:text-[#A7F3D0]" />
              <span>{t.hero.visitCta}</span>
            </button>
          </div>

          {/* Micro Trust Indicators */}
          <div
            className={`flex flex-wrap items-center gap-y-2 gap-x-6 text-sm font-bold ${
              theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-[#A7F3D0]" />
              <span>{t.hero.trustAdmissions}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-[#A7F3D0]" />
              <span>{t.hero.trustQuran}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>{t.hero.trustCampus}</span>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-5): Human-Crafted Scrapbook Collage Frame */}
        <div className="lg:col-span-5 relative w-full pt-4">
          {/* Offset Warm Gold Backdrop Card */}
          <div className="absolute inset-0 bg-amber-500/10 rounded-3xl transform -rotate-2 -translate-x-2 translate-y-3 border border-amber-500/30 pointer-events-none" />

          {/* Main Polaroid Frame */}
          <div
            className={`relative rounded-3xl p-3 sm:p-4 border shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300 w-full max-w-[600px] ml-auto ${
              theme === 'dark'
                ? 'bg-[#16241F] border-[#243B32]'
                : 'bg-white border-slate-200/90'
            }`}
          >
            {/* Top Washi Tape Aesthetic */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-400/30 rounded-xs transform -rotate-1 shadow-xs border-y border-dashed border-amber-500/60 z-30 pointer-events-none" />

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#0E1714]">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80"
                alt="Happy primary school children learning at Olive Tree School"
                fetchPriority="high"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Badge: Dual Curriculum */}
              <div className="absolute top-4 end-4 z-20">
                <div
                  className={`backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border flex items-center gap-2.5 ${
                    theme === 'dark'
                      ? 'bg-[#0E1714]/90 text-white border-[#243B32]'
                      : 'bg-white/95 text-slate-900 border-slate-200/90'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-amber-300 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <div className="text-xs font-extrabold leading-tight">
                      {t.hero.floatingDualCurriculum}
                    </div>
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                      Academic + Tarbiyah
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge: 5 Active Languages */}
              <div className="absolute bottom-4 end-4 z-20">
                <div
                  className={`backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-lg border flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-[#0E1714]/90 text-white border-[#243B32]'
                      : 'bg-white/95 text-slate-900 border-slate-200/90'
                  }`}
                >
                  <Languages className="w-4 h-4 text-blue-700 dark:text-[#93C5FD]" />
                  <span className="text-xs font-bold">5 Languages</span>
                </div>
              </div>
            </div>

            {/* Circular Academic Stamp Badge (13+ Years of Excellence) */}
            <div className="absolute -bottom-5 -start-5 z-30">
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed flex flex-col items-center justify-center p-1.5 text-center shadow-xl transform rotate-[-8deg] hover:rotate-0 transition-transform ${
                  theme === 'dark'
                    ? 'bg-[#123524] text-[#FDE68A] border-[#D97706]'
                    : 'bg-white text-slate-900 border-amber-500'
                }`}
              >
                <div className="w-full h-full rounded-full border border-solid border-amber-500/40 flex flex-col items-center justify-center p-1">
                  <Award className="w-3.5 h-3.5 text-amber-600 mb-0.5" />
                  <div className="font-editorial text-xl sm:text-2xl font-black leading-none text-amber-600">
                    {siteConfig.yearsOfExcellence}
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider leading-tight mt-0.5">
                    Trust
                  </div>
                  <div className="text-[7px] opacity-75 font-serif italic">Est. 2013</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Horizontal Architectural Stats Ribbon */}
      <div className="w-full px-6 lg:px-16 mt-8">
        <div className="bg-[#133829] text-[#FBF9F5] rounded-3xl py-7 px-6 sm:px-10 shadow-xl border border-[#1E4D38] grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
          {/* Stat 1 */}
          <div className="p-4 sm:p-5 text-center">
            <div className="font-editorial text-4xl sm:text-5xl font-black text-[#FBBF24] tracking-tight">
              {siteConfig.yearsOfExcellence}
            </div>
            <div className="text-xs sm:text-sm font-medium mt-1 text-[#D1E0D7] tracking-wide">
              {t.stats.stat1Label}
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-4 sm:p-5 text-center">
            <div className="font-editorial text-4xl sm:text-5xl font-black text-[#FBBF24] tracking-tight">
              {t.stats.stat2Value}
            </div>
            <div className="text-xs sm:text-sm font-medium mt-1 text-[#D1E0D7] tracking-wide">
              {t.stats.stat2Label}
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-4 sm:p-5 text-center pt-4 lg:pt-5">
            <div className="font-editorial text-4xl sm:text-5xl font-black text-[#FBBF24] tracking-tight">
              {t.stats.stat3Value}
            </div>
            <div className="text-xs sm:text-sm font-medium mt-1 text-[#D1E0D7] tracking-wide">
              {t.stats.stat3Label}
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-4 sm:p-5 text-center pt-4 lg:pt-5">
            <div className="font-editorial text-4xl sm:text-5xl font-black text-[#FBBF24] tracking-tight">
              {t.stats.stat4Value}
            </div>
            <div className="text-xs sm:text-sm font-medium mt-1 text-[#D1E0D7] tracking-wide">
              {t.stats.stat4Label}
            </div>
          </div>
        </div>
      </div>

      {/* Organic Wave Section Divider */}
      <div className="w-full overflow-hidden leading-none mt-12 text-[#F2F6F3] dark:text-[#121E19]">
        <svg
          viewBox="0 0 1440 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 sm:h-10 block"
          preserveAspectRatio="none"
        >
          <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
};

