import React from 'react';
import { Phone, Clock, Edit3, Lock, ShieldCheck, Megaphone } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const TopBar: React.FC = () => {
  const {
    siteConfig,
    language,
    liveEditMode,
    updateSiteConfig,
    openAdminLoginModal,
    isAdminAuthenticated,
    logoutAdmin,
  } = useSchool();

  const tickerText =
    language === 'ta'
      ? siteConfig.tickerAnnouncementTa
      : language === 'ur'
        ? siteConfig.tickerAnnouncementUr
        : siteConfig.tickerAnnouncementEn;

  return (
    <div className="bg-[#133829] text-[#FBF9F5] border-b border-[#1E4D38] text-xs sm:text-sm py-1.5 sm:py-2 px-0 relative z-50 shadow-xs">
      <div className="w-full px-3 sm:px-6 lg:px-16">
        {/* ========================================================
            MOBILE VIEWPORT (< sm: < 640px): 2-Tier Responsive Layout
            With Continuous Smooth Horizontal Marquee
            ======================================================== */}
        <div className="flex flex-col gap-1 sm:hidden">
          {/* Row 1: Academic Year Badge + Smooth Marquee + Staff/Admin Action */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E59A23]/20 text-[#FDE68A] font-bold text-[11px] shrink-0 border border-[#E59A23]/40 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E59A23] animate-pulse" />
                <span>2027–2028</span>
              </span>

              {/* Continuous Marquee on Mobile */}
              <div
                className="overflow-hidden relative flex-1 min-w-0 flex items-center gap-1 text-[11px] font-semibold text-emerald-100/95"
                role="region"
                aria-label="School Announcements"
              >
                <Megaphone className="w-3 h-3 text-amber-300 shrink-0" aria-hidden="true" />
                <div className="overflow-hidden relative w-full select-none">
                  <div className="animate-marquee-track items-center">
                    <span className="pe-6 inline-flex items-center gap-2">
                      <span>{tickerText}</span>
                      <span className="text-amber-400/80 font-bold">•</span>
                    </span>
                    <span className="pe-6 inline-flex items-center gap-2" aria-hidden="true">
                      <span>{tickerText}</span>
                      <span className="text-amber-400/80 font-bold">•</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clearly Labeled Staff/Admin Control - Never an empty square */}
            <div className="shrink-0">
              {isAdminAuthenticated ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    logoutAdmin();
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-200 hover:text-white bg-emerald-900/90 px-2 py-0.5 rounded-md border border-emerald-700/60 cursor-pointer shadow-xs active:scale-95 transition-all relative z-10 pointer-events-auto"
                  title="Admin Logged In (Tap to Logout)"
                >
                  <ShieldCheck className="w-3 h-3 text-amber-300" />
                  <span>Admin</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openAdminLoginModal();
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-200 hover:text-white bg-emerald-900/60 hover:bg-emerald-800/80 px-2 py-0.5 rounded-md border border-emerald-700/50 transition-colors cursor-pointer active:scale-95 relative z-10 pointer-events-auto"
                  title="Staff Admin Portal"
                  aria-label="Staff Admin Login"
                >
                  <Lock className="w-3 h-3 text-amber-300" />
                  <span>Staff</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Direct Contact & Office Hours (Clickable & Uncluttered) */}
          <div className="flex items-center justify-between gap-2 pt-0.5 border-t border-emerald-800/40 text-[11px] font-medium">
            <a
              href={`tel:+91${siteConfig.primaryPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold active:scale-95 transition-all"
            >
              <Phone className="w-3 h-3 text-amber-300 shrink-0" />
              <span>Call / WhatsApp: {siteConfig.primaryPhone}</span>
            </a>

            <div className="flex items-center gap-1 text-emerald-200/80 shrink-0">
              <Clock className="w-3 h-3 text-amber-300/80" />
              <span>9 AM – 4 PM</span>
            </div>
          </div>

          {/* Mobile Live Edit Ticker Bar (When admin editing is active) */}
          {liveEditMode && (
            <div className="flex items-center gap-1.5 pt-1 border-t border-amber-400/30">
              <input
                type="text"
                value={
                  language === 'ta'
                    ? siteConfig.tickerAnnouncementTa
                    : language === 'ur'
                      ? siteConfig.tickerAnnouncementUr
                      : siteConfig.tickerAnnouncementEn
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (language === 'ta') updateSiteConfig({ tickerAnnouncementTa: val });
                  else if (language === 'ur') updateSiteConfig({ tickerAnnouncementUr: val });
                  else updateSiteConfig({ tickerAnnouncementEn: val });
                }}
                className="bg-emerald-950/90 text-amber-200 border border-amber-400/60 rounded px-2 py-0.5 w-full text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-300"
                title="Admin: Edit Ticker Live"
              />
              <span className="text-[10px] text-amber-300 font-bold shrink-0 flex items-center gap-0.5 bg-emerald-900 px-1.5 py-0.5 rounded border border-amber-400/40">
                <Edit3 className="w-2.5 h-2.5 text-amber-400" /> Edit
              </span>
            </div>
          )}
        </div>

        {/* ========================================================
            DESKTOP VIEWPORT (sm:flex): Smooth Continuous Marquee
            ======================================================== */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          {/* Left: Academic badge + Continuous Marquee */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E59A23]/20 text-[#FDE68A] font-bold text-xs shrink-0 border border-[#E59A23]/40 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E59A23] animate-pulse" />
              <span>2027–2028</span>
            </span>

            {liveEditMode ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <input
                  type="text"
                  value={
                    language === 'ta'
                      ? siteConfig.tickerAnnouncementTa
                      : language === 'ur'
                        ? siteConfig.tickerAnnouncementUr
                        : siteConfig.tickerAnnouncementEn
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (language === 'ta') updateSiteConfig({ tickerAnnouncementTa: val });
                    else if (language === 'ur') updateSiteConfig({ tickerAnnouncementUr: val });
                    else updateSiteConfig({ tickerAnnouncementEn: val });
                  }}
                  className="bg-emerald-950/80 text-amber-200 border border-amber-400/60 rounded px-2.5 py-1 w-full text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-300"
                  title="Admin: Edit Ticker Live"
                />
                <span className="text-[11px] text-amber-300 font-bold shrink-0 flex items-center gap-1 bg-emerald-900/80 px-2 py-0.5 rounded border border-amber-400/30">
                  <Edit3 className="w-3 h-3 text-amber-400" /> Live Edit
                </span>
              </div>
            ) : (
              <div
                className="overflow-hidden relative flex-1 min-w-0 flex items-center gap-2 text-emerald-50 text-xs sm:text-sm font-semibold tracking-wide"
                role="region"
                aria-label="School Admissions Announcement"
              >
                <Megaphone className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
                <div className="overflow-hidden relative w-full select-none">
                  <div className="animate-marquee-track items-center">
                    <span className="pe-8 inline-flex items-center gap-3">
                      <span>{tickerText}</span>
                      <span className="text-amber-400/80 font-bold">•</span>
                    </span>
                    <span className="pe-8 inline-flex items-center gap-3" aria-hidden="true">
                      <span>{tickerText}</span>
                      <span className="text-amber-400/80 font-bold">•</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Office Hours & Fast Contact without overlapping */}
          <div className="flex items-center gap-4 shrink-0 text-xs sm:text-sm font-semibold">
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-100 bg-emerald-900/50 px-2.5 py-0.5 rounded-lg border border-emerald-700/50">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{siteConfig.officeHours}</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:+91${siteConfig.primaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>{siteConfig.primaryPhone}</span>
              </a>

              <span className="text-emerald-400/60">•</span>

              <a
                href={`tel:+91${siteConfig.secondaryPhone.replace(/\s+/g, '')}`}
                className="hidden md:inline-flex items-center text-emerald-100 hover:text-white transition-colors"
              >
                <span>{siteConfig.secondaryPhone}</span>
              </a>

              <span className="text-emerald-400/60 hidden md:inline">•</span>

              {/* Staff / Admin Access Button */}
              {isAdminAuthenticated ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    logoutAdmin();
                  }}
                  className="inline-flex items-center gap-1 text-[11px] text-amber-200 hover:text-white bg-emerald-900/80 px-2 py-0.5 rounded-md border border-emerald-700/60 cursor-pointer shadow-xs relative z-10 pointer-events-auto"
                  title="Admin Logged In (Click to Logout)"
                >
                  <ShieldCheck className="w-3 h-3 text-amber-300" />
                  <span>Admin</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openAdminLoginModal();
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-200 hover:text-white bg-emerald-900/60 hover:bg-emerald-800/80 px-2 py-0.5 rounded-md border border-emerald-700/50 transition-colors cursor-pointer relative z-10 pointer-events-auto"
                  title="Staff Admin Portal"
                  aria-label="Staff Admin Login"
                >
                  <Lock className="w-3 h-3 text-amber-300" />
                  <span>Staff</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
