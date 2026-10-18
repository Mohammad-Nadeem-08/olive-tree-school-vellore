import React, { useState } from 'react';
import { Menu, X, ShieldCheck, PhoneCall, Sun, Moon } from 'lucide-react';
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

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#curriculum', label: t.nav.curriculum },
    { href: '#grades', label: t.nav.grades },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#notices', label: t.nav.notices },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 backdrop-blur-md transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-[#0E1714]/95 border-b border-[#243B32] text-[#F3F7F4]'
          : 'bg-white/95 border-b border-slate-200 text-slate-900 shadow-xs'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-14 h-20 flex items-center justify-between gap-3 xl:gap-6">
        {/* Brand Left: Real Logo from public/olive-logo.jpeg without duplicate text */}
        <a href="#home" className="flex items-center gap-3 shrink-0 group" aria-label="Olive Tree School Home">
          <img
            src="/olive-logo.jpeg"
            alt="Olive Tree School"
            fetchPriority="high"
            className="h-14 sm:h-16 w-auto object-contain rounded-xl shadow-xs group-hover:scale-102 transition-transform duration-200"
          />
        </a>

        {/* Desktop Navigation Links: Centered, Single line, whitespace-nowrap */}
        <nav
          className={`hidden lg:flex items-center shrink-0 ${
            language === 'ta'
              ? 'gap-4 xl:gap-6 text-[13.5px] font-semibold'
              : 'gap-7 text-[15px] font-semibold'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap shrink-0 hover:text-emerald-700 transition-colors text-slate-700 dark:text-slate-200 ${
                language === 'ta' ? 'text-[13.5px]' : 'text-sm xl:text-base'
              }`}
            >
              {link.label}
            </a>
          ))}
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
            {([
              { code: 'en' as const, label: 'English', font: '' },
              { code: 'ta' as const, label: 'தமிழ்', font: 'font-tamil' },
              { code: 'ur' as const, label: 'اردو', font: 'font-urdu' },
            ]).map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${lang.font}`}
                style={
                  language === lang.code
                    ? { backgroundColor: '#133829', color: '#FFFFFF' }
                    : { backgroundColor: 'transparent', color: theme === 'dark' ? '#E2E8F0' : '#334155' }
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

          {/* Terracotta Admissions Button with Editorial Arrow */}
          <button
            type="button"
            onClick={openAdmissionModal}
            className="shrink-0 whitespace-nowrap px-4 xl:px-5 py-2.5 rounded-xl font-bold text-xs xl:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer group hover:opacity-90"
            style={{ backgroundColor: '#D93829', color: '#FFFFFF' }}
          >
            <span style={{ color: '#FFFFFF' }}>{t.nav.applyNow.replace(/→/g, '').trim()}</span>
            <span style={{ color: '#FFFFFF' }} className="opacity-80 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180 transition-transform">→</span>
          </button>
        </div>

        {/* Mobile Menu Button & Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.themeToggle}
            className={`p-2 rounded-lg border cursor-pointer ${
              theme === 'dark'
                ? 'bg-[#16241F] text-[#FBBF24] border-[#243B32]'
                : 'bg-[#F2F6F3] text-[#133829] border-[#E8E4DC]'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FBBF24]" /> : <Moon className="w-4 h-4 text-[#133829]" />}
          </button>

          {/* Mobile Language Switcher */}
          <div
            className={`p-0.5 rounded-lg flex items-center border text-xs ${
              theme === 'dark' ? 'bg-[#16241F] border-[#243B32]' : 'bg-[#F2F6F3] border-[#E8E4DC]'
            }`}
          >
            {([
              { code: 'en' as const, label: 'EN', font: '' },
              { code: 'ta' as const, label: 'தமிழ்', font: 'font-tamil' },
              { code: 'ur' as const, label: 'اردو', font: 'font-urdu' },
            ]).map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-2 py-1 rounded transition-all shrink-0 cursor-pointer ${lang.font}`}
                style={
                  language === lang.code
                    ? { backgroundColor: '#133829', color: '#FFFFFF' }
                    : { backgroundColor: 'transparent', color: theme === 'dark' ? '#E2E8F0' : '#334155' }
                }
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'text-[#F3F7F4] hover:bg-[#16241F]'
                : 'text-[#133829] hover:bg-[#F2F6F3]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 ${
            theme === 'dark'
              ? 'border-[#243B32] bg-[#0E1714] text-[#F3F7F4]'
              : 'border-slate-200 bg-white text-slate-900'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="whitespace-nowrap shrink-0 px-3 py-2 text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-700 transition-colors rounded-lg"
              >
                {link.label}
              </a>
            ))}

            <div
              className={`pt-2 border-t flex flex-col gap-2 ${
                theme === 'dark' ? 'border-[#243B32]' : 'border-slate-100'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdmissionModal();
                }}
                className="w-full shrink-0 whitespace-nowrap flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#D93829', color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>{t.nav.applyNow.replace(/→/g, '').trim()}</span>
                <span style={{ color: '#FFFFFF' }} className="opacity-80 rtl:rotate-180">→</span>
              </button>

              <div className="flex items-center justify-between pt-2">
                {isAdminAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      logoutAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className={`text-xs font-semibold hover:underline ${
                      theme === 'dark' ? 'text-rose-400' : 'text-rose-600'
                    }`}
                  >
                    {t.nav.adminLogout}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAdminLoginModal();
                    }}
                    className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
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
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>86101 13160</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
