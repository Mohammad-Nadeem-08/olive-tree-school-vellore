import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShieldCheck, Sun, Moon, ChevronDown } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import type { Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    t,
    openAdmissionModal,
    isAdminAuthenticated,
    liveEditMode,
    openAdminLoginModal,
    logoutAdmin,
  } = useSchool();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const moreRef = useRef<HTMLDivElement>(null);

  // Primary desktop navigation links
  const primaryNavLinks = [
    { href: '#home', id: 'home', label: t.nav.home },
    { href: '#about', id: 'about', label: t.nav.about },
    { href: '#curriculum', id: 'curriculum', label: t.nav.curriculum },
    { href: '#grades', id: 'grades', label: t.nav.grades },
    { href: '#gallery', id: 'gallery', label: t.nav.gallery },
    { href: '#notices', id: 'notices', label: t.nav.notices },
    { href: '#contact', id: 'contact', label: t.nav.contact },
  ];

  // Secondary desktop navigation links inside "More" dropdown
  const secondaryNavLinks = [
    { href: '#why-choose', id: 'why-choose', label: t.nav.whyChoose },
    { href: '#learning-corner', id: 'learning-corner', label: t.nav.learningCorner },
    { href: '#eligibility', id: 'eligibility', label: t.nav.eligibility },
    { href: '#faq', id: 'faq', label: t.nav.faq },
  ];

  // All navigation links displayed inside the mobile drawer
  const allMobileNavLinks = [
    { href: '#home', id: 'home', label: t.nav.home },
    { href: '#about', id: 'about', label: t.nav.about },
    { href: '#why-choose', id: 'why-choose', label: t.nav.whyChoose },
    { href: '#curriculum', id: 'curriculum', label: t.nav.curriculum },
    { href: '#learning-corner', id: 'learning-corner', label: t.nav.learningCorner },
    { href: '#grades', id: 'grades', label: t.nav.grades },
    { href: '#gallery', id: 'gallery', label: t.nav.gallery },
    { href: '#eligibility', id: 'eligibility', label: t.nav.eligibility },
    { href: '#notices', id: 'notices', label: t.nav.notices },
    { href: '#faq', id: 'faq', label: t.nav.faq },
    { href: '#contact', id: 'contact', label: t.nav.contact },
  ];

  // IntersectionObserver to dynamically highlight the current active section
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'why-choose',
      'curriculum',
      'core-pillars',
      'learning-corner',
      'grades',
      'gallery',
      'eligibility',
      'notices',
      'faq',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          const topVisibleId = visibleEntries[0].target.id;
          if (topVisibleId === 'core-pillars') {
            setActiveSection('curriculum');
          } else {
            setActiveSection(topVisibleId);
          }
        }
      },
      {
        rootMargin: '-15% 0px -60% 0px',
        threshold: [0, 0.2, 0.5, 0.8, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu or More dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setIsMoreOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle click outside "More" dropdown
  useEffect(() => {
    if (!isMoreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMoreOpen]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSectionClick = (href: string) => {
    setMobileMenuOpen(false);
    setIsMoreOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSecondaryActive = secondaryNavLinks.some((l) => l.id === activeSection);

  return (
    <header
      className={`w-full sticky top-0 z-50 backdrop-blur-md transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-[#0E1714]/95 border-b border-[#243B32] text-[#F3F7F4]'
          : 'bg-white/95 border-b border-slate-200 text-slate-900 shadow-xs'
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-14 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-3 xl:gap-6">
        {/* Brand Left: Official Logo from public/assets/branding/olive-tree-logo.jpeg */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSectionClick('#home');
          }}
          className="flex items-center gap-2 sm:gap-3 shrink-0 group"
          aria-label="Olive Tree School Home"
        >
          <div className="bg-white rounded-xl p-1 sm:p-1.5 shadow-xs flex items-center justify-center border border-slate-200/50 dark:border-slate-800 shrink-0">
            <img
              src="/assets/branding/olive-tree-logo.jpeg"
              alt="Olive Tree Nursery and Primary School"
              fetchPriority="high"
              className="h-8 xs:h-9 sm:h-12 md:h-13 w-auto max-w-[130px] xs:max-w-none object-contain group-hover:scale-102 transition-transform duration-200 shrink-0"
            />
          </div>
        </a>

        {/* Desktop Navigation Links: Primary shortcuts + Compact "More" dropdown */}
        <nav
          className={`hidden lg:flex items-center shrink-0 ${
            language === 'ta'
              ? 'gap-3 xl:gap-5 text-[13px] font-semibold'
              : 'gap-4 xl:gap-6 text-[14px] font-semibold'
          }`}
          aria-label="Main Navigation"
        >
          {primaryNavLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(link.href);
                }}
                className={`py-2 px-1 whitespace-nowrap shrink-0 transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-bold border-emerald-600 dark:border-emerald-400'
                    : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 border-transparent'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          {/* "More ▾" Dropdown for Secondary Sections */}
          <div className="relative shrink-0" ref={moreRef}>
            <button
              type="button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              aria-expanded={isMoreOpen}
              aria-haspopup="true"
              className={`py-2 px-2.5 rounded-lg whitespace-nowrap inline-flex items-center gap-1 transition-all border-b-2 cursor-pointer ${
                isSecondaryActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold border-emerald-600 dark:border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30'
                  : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 border-transparent hover:bg-slate-100/60 dark:hover:bg-[#16241F]'
              }`}
            >
              <span>{t.nav.more}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isMoreOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isMoreOpen && (
              <div
                className={`absolute top-full end-0 mt-2 w-52 rounded-2xl border p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150 z-50 text-start ${
                  theme === 'dark'
                    ? 'bg-[#16241F] border-[#243B32] text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                {secondaryNavLinks.map((sLink) => {
                  const isActive = activeSection === sLink.id;
                  return (
                    <a
                      key={sLink.href}
                      href={sLink.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSectionClick(sLink.href);
                      }}
                      className={`block px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-[#0E1714] text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {sLink.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Cluster: Language Switcher + Theme Toggle + Admin Badge + Apply CTA */}
        <div className="hidden sm:flex items-center gap-3.5 shrink-0">
          {/* Segmented Trilingual Selector */}
          <div
            className={`p-1 rounded-xl flex items-center border ${
              theme === 'dark'
                ? 'bg-[#16241F] border-[#243B32]'
                : 'bg-slate-100 border-slate-200'
            }`}
            role="group"
            aria-label="Language Selector"
          >
            {[
              { code: 'en' as const, label: 'English', font: '' },
              { code: 'ta' as const, label: 'தமிழ்', font: 'font-tamil' },
              { code: 'ur' as const, label: 'اردو', font: 'font-urdu' },
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${lang.font}`}
                style={
                  language === lang.code
                    ? { backgroundColor: '#133829', color: '#FFFFFF' }
                    : {
                        backgroundColor: 'transparent',
                        color: theme === 'dark' ? '#E2E8F0' : '#334155',
                      }
                }
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle Sun / Moon Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.themeToggle}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2.5 rounded-xl border transition-colors shadow-xs active:scale-95 cursor-pointer ${
              theme === 'dark'
                ? 'bg-[#16241F] text-[#FBBF24] border-[#243B32] hover:bg-[#1E2E28]'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[#FBBF24] transition-transform rotate-0" />
            ) : (
              <Moon className="w-5 h-5 text-[#123524] transition-transform -rotate-12" />
            )}
          </button>

          {/* Admin Indicator pill if authenticated */}
          {isAdminAuthenticated && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border ${
                liveEditMode
                  ? theme === 'dark'
                    ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                  : theme === 'dark'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{liveEditMode ? 'Live Mode' : 'Admin'}</span>
            </span>
          )}

          {/* Terracotta Admissions Button */}
          <button
            type="button"
            onClick={openAdmissionModal}
            className="shrink-0 whitespace-nowrap px-4 xl:px-5 py-2.5 rounded-xl font-bold text-xs xl:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer group hover:opacity-90"
            style={{ backgroundColor: '#D93829', color: '#FFFFFF' }}
          >
            <span style={{ color: '#FFFFFF' }}>{t.nav.applyNow.replace(/→/g, '').trim()}</span>
            <span
              style={{ color: '#FFFFFF' }}
              className="opacity-80 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180 transition-transform"
            >
              →
            </span>
          </button>
        </div>

        {/* Mobile Menu Button & Compact Mobile Controls */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:hidden shrink-0">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.themeToggle}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg sm:rounded-xl border cursor-pointer transition-colors shrink-0 active:scale-95 ${
              theme === 'dark'
                ? 'bg-[#16241F] text-[#FBBF24] border-[#243B32]'
                : 'bg-[#F2F6F3] text-[#133829] border-[#E8E4DC]'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBBF24]" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#133829]" />
            )}
          </button>

          {/* Mobile Language Switcher */}
          <div
            className={`p-0.5 rounded-lg sm:rounded-xl flex items-center border text-[10px] xs:text-[11px] sm:text-xs shrink-0 ${
              theme === 'dark' ? 'bg-[#16241F] border-[#243B32]' : 'bg-[#F2F6F3] border-[#E8E4DC]'
            }`}
            role="group"
            aria-label="Language Selector"
          >
            {[
              { code: 'en' as const, label: 'EN', font: '' },
              { code: 'ta' as const, label: 'தமிழ்', font: 'font-tamil' },
              { code: 'ur' as const, label: 'اردو', font: 'font-urdu' },
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-1.5 xs:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg font-bold transition-all shrink-0 cursor-pointer ${lang.font}`}
                style={
                  language === lang.code
                    ? { backgroundColor: '#133829', color: '#FFFFFF' }
                    : {
                        backgroundColor: 'transparent',
                        color: theme === 'dark' ? '#E2E8F0' : '#334155',
                      }
                }
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl transition-colors cursor-pointer shrink-0 active:scale-95 ${
              theme === 'dark'
                ? 'text-[#F3F7F4] hover:bg-[#16241F]'
                : 'text-[#133829] hover:bg-[#F2F6F3]'
            }`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu — Complete Homepage Section Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className={`lg:hidden border-t px-4 pt-3 pb-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto ${
            theme === 'dark'
              ? 'border-[#243B32] bg-[#0E1714] text-[#F3F7F4]'
              : 'border-slate-200 bg-white text-slate-900'
          }`}
        >
          {/* Dedicated Full Language Switcher inside Drawer */}
          <div className="mb-4 pb-3 border-b border-slate-200 dark:border-[#243B32]">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              {language === 'ta'
                ? 'மொழியைத் தேர்வு செய்க'
                : language === 'ur'
                ? 'زبان منتخب کریں'
                : 'Choose Language'}
            </div>
            <div
              className={`p-1 rounded-xl grid grid-cols-3 gap-1 border ${
                theme === 'dark'
                  ? 'bg-[#16241F] border-[#243B32]'
                  : 'bg-slate-100 border-slate-200'
              }`}
            >
              {[
                { code: 'en' as const, label: 'English', font: '' },
                { code: 'ta' as const, label: 'தமிழ்', font: 'font-tamil' },
                { code: 'ur' as const, label: 'اردو', font: 'font-urdu' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    handleLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-1 text-center rounded-lg font-bold text-xs transition-all cursor-pointer ${lang.font}`}
                  style={
                    language === lang.code
                      ? { backgroundColor: '#133829', color: '#FFFFFF' }
                      : {
                          backgroundColor: 'transparent',
                          color: theme === 'dark' ? '#E2E8F0' : '#334155',
                        }
                  }
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section Navigation Links with ≥44px touch targets */}
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {allMobileNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick(link.href);
                  }}
                  className={`min-h-[46px] px-3.5 py-3 text-sm sm:text-base font-semibold rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-600/30'
                      : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-[#16241F]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`text-xs font-mono ${
                      isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    →
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Admission Action & Admin Footer */}
          <div
            className={`mt-4 pt-3 border-t flex flex-col gap-2.5 ${
              theme === 'dark' ? 'border-[#243B32]' : 'border-slate-100'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAdmissionModal();
              }}
              className="w-full min-h-[48px] shrink-0 whitespace-nowrap flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#D93829', color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>{t.nav.applyNow.replace(/→/g, '').trim()}</span>
              <span style={{ color: '#FFFFFF' }} className="opacity-80 rtl:rotate-180">
                →
              </span>
            </button>

            <div className="flex items-center justify-between pt-1">
              {isAdminAuthenticated ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    logoutAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs font-semibold hover:underline cursor-pointer relative z-10 pointer-events-auto ${
                    theme === 'dark' ? 'text-rose-400' : 'text-rose-600'
                  }`}
                >
                  {t.nav.adminLogout}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileMenuOpen(false);
                    openAdminLoginModal();
                  }}
                  className={`text-xs font-medium cursor-pointer relative z-10 pointer-events-auto ${
                    theme === 'dark'
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.nav.adminLogin}
                </button>
              )}

              <a
                href="tel:8610113160"
                className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                  theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                }`}
              >
                <span>Call: 86101 13160</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
