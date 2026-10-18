import React from 'react';
import { Phone, Clock, Edit3, Lock, ShieldCheck } from 'lucide-react';
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
    <div className="bg-[#133829] text-[#FBF9F5] border-b border-[#1E4D38] text-xs sm:text-sm py-2 px-0 relative z-40 shadow-xs">
      <div className="w-full px-6 lg:px-16 flex items-center justify-between gap-4">
        {/* Left: Announcement ticker */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E59A23]/20 text-[#FDE68A] font-bold text-xs shrink-0 border border-[#E59A23]/40 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E59A23] animate-pulse" />
            <span>2026-2027</span>
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
            <div className="overflow-hidden text-emerald-50 text-xs sm:text-sm font-semibold truncate tracking-wide">
              <span>{tickerText}</span>
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

            <span className="text-emerald-400/60 hidden sm:inline">•</span>

            <a
              href={`tel:+91${siteConfig.secondaryPhone.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center text-emerald-100 hover:text-white transition-colors"
            >
              <span>{siteConfig.secondaryPhone}</span>
            </a>

            <span className="text-emerald-400/60">•</span>

            {/* Subtle Admin Lock Icon */}
            {isAdminAuthenticated ? (
              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1 text-[11px] text-amber-200 hover:text-white bg-emerald-900/80 px-2 py-0.5 rounded-md border border-emerald-700/60 cursor-pointer"
                title="Admin Logged In (Click to Logout)"
              >
                <ShieldCheck className="w-3 h-3 text-amber-300" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openAdminLoginModal}
                className="text-emerald-300/80 hover:text-amber-300 transition-colors p-1 rounded hover:bg-emerald-800/50 cursor-pointer"
                title="Staff Admin Portal"
                aria-label="Staff Admin Login"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
