import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Edit3,
  BellRing,
  Image as ImageIcon,
  RotateCcw,
  LogOut,
  ChevronUp,
  ChevronDown,
  Settings,
  X,
  Save,
  Check,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const AdminCommandDock: React.FC = () => {
  const {
    isAdminAuthenticated,
    liveEditMode,
    setLiveEditMode,
    resetDemoData,
    logoutAdmin,
    siteConfig,
    updateSiteConfig,
  } = useSchool();

  const [minimized, setMinimized] = useState(false);
  const [isQuickConfigOpen, setIsQuickConfigOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (!isQuickConfigOpen && !showResetConfirm) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsQuickConfigOpen(false);
        setShowResetConfirm(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQuickConfigOpen, showResetConfirm]);

  // Quick config modal temporary form state
  const [tempAdmissionYear, setTempAdmissionYear] = useState(siteConfig.admissionYear);
  const [tempYearsExcellence, setTempYearsExcellence] = useState(siteConfig.yearsOfExcellence);
  const [tempPhone1, setTempPhone1] = useState(siteConfig.primaryPhone);
  const [tempPhone2, setTempPhone2] = useState(siteConfig.secondaryPhone);
  const [tempPhone3, setTempPhone3] = useState(siteConfig.altPhone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAdminAuthenticated) return null;

  const handleOpenConfig = () => {
    setTempAdmissionYear(siteConfig.admissionYear);
    setTempYearsExcellence(siteConfig.yearsOfExcellence);
    setTempPhone1(siteConfig.primaryPhone);
    setTempPhone2(siteConfig.secondaryPhone);
    setTempPhone3(siteConfig.altPhone);
    setIsQuickConfigOpen(true);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({
      admissionYear: tempAdmissionYear,
      yearsOfExcellence: tempYearsExcellence,
      primaryPhone: tempPhone1,
      secondaryPhone: tempPhone2,
      altPhone: tempPhone3,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsQuickConfigOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Bottom Admin Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw]">
        <div className="bg-[#133829]/95 text-[#FBF9F5] rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-2xl border border-[#E59A23]/30 backdrop-blur-md flex items-center gap-1 sm:gap-2 text-xs">
          {/* Admin Identity Badge */}
          <div className="flex items-center gap-2 pl-2 pr-1 sm:pr-2 border-r border-white/15">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#E59A23] to-amber-200 text-[#133829] flex items-center justify-center font-black shadow-xs">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /> Live Admin
              </div>
              <div className="text-[10px] text-emerald-200/70 font-serif">Olive Tree School</div>
            </div>
          </div>

          {!minimized ? (
            <>
              {/* Toggle Live Edit Mode */}
              <button
                type="button"
                onClick={() => setLiveEditMode(!liveEditMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  liveEditMode
                    ? 'bg-[#E59A23] text-[#133829] shadow-md shadow-[#E59A23]/25'
                    : 'bg-white/10 text-white/90 hover:bg-white/15'
                }`}
                title="Toggle On-Page Live Editing"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live Edit:</span>
                <span>{liveEditMode ? 'ON' : 'OFF'}</span>
              </button>

              {/* Notice Board Manager Button */}
              <button
                type="button"
                onClick={() => document.getElementById('notices')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold bg-[#123524] hover:bg-[#1a4b33] text-white transition-colors border border-emerald-600/40 cursor-pointer shadow-xs"
                title="Scroll to Notice Board to Publish/Manage Circulars"
              >
                <BellRing className="w-3.5 h-3.5 text-amber-300" />
                <span>Notice Board</span>
              </button>

              {/* Campus Gallery Manager Button */}
              <button
                type="button"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold bg-[#1E3A8A] hover:bg-[#1e40af] text-white transition-colors border border-blue-500/40 cursor-pointer shadow-xs"
                title="Scroll to Campus Gallery to Add/Manage Photos"
              >
                <ImageIcon className="w-3.5 h-3.5 text-blue-200" />
                <span>Gallery</span>
              </button>

              {/* Quick Config Modal Trigger */}
              <button
                type="button"
                onClick={handleOpenConfig}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-semibold bg-white/10 hover:bg-white/15 text-white/90 transition-colors cursor-pointer"
                title="Quick Edit Admissions Year & Phones"
              >
                <Settings className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden md:inline">Numbers & Year</span>
              </button>

              {/* Reset Demo Data Button */}
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-semibold bg-white/10 hover:bg-white/15 text-white/80 transition-colors cursor-pointer"
                title="Restore default demo notices and config"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden lg:inline">Reset</span>
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={logoutAdmin}
                className="p-1.5 rounded-xl text-white/70 hover:text-rose-300 hover:bg-white/10 transition-colors cursor-pointer"
                title="Logout from Admin Mode"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className="text-[11px] text-slate-300 font-medium px-2">Dock Minimized</span>
          )}

          {/* Minimize / Expand Toggle */}
          <button
            type="button"
            onClick={() => setMinimized(!minimized)}
            className="p-1 text-slate-400 hover:text-white rounded-lg"
          >
            {minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Config Modal */}
      {isQuickConfigOpen && (
        <div
          onClick={() => setIsQuickConfigOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FBF9F5] dark:bg-[#16241F] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 dark:border-[#243B32] text-stone-900 dark:text-[#FBF9F5] animate-in fade-in zoom-in-95 duration-150 relative my-auto max-h-[90vh] overflow-y-auto cursor-default"
          >
            {/* High-Visibility Sticky Close Button (X) */}
            <button
              type="button"
              onClick={() => setIsQuickConfigOpen(false)}
              className="sticky top-1 float-right -mt-1 -me-1 z-20 w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-[#243B32]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#133829] text-[#E59A23] flex items-center justify-center">
                  <Settings className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-[#133829] dark:text-[#FBF9F5]">Quick School Settings</h3>
              </div>
            </div>

            <form onSubmit={handleSaveConfig} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Admission Year Pill</label>
                <input
                  type="text"
                  value={tempAdmissionYear}
                  onChange={(e) => setTempAdmissionYear(e.target.value)}
                  placeholder="2026-2027"
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-stone-900 dark:text-[#FBF9F5] text-xs focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Years of Excellence Badge
                </label>
                <input
                  type="text"
                  value={tempYearsExcellence}
                  onChange={(e) => setTempYearsExcellence(e.target.value)}
                  placeholder="13+"
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-stone-900 dark:text-[#FBF9F5] text-xs focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Primary Phone (WhatsApp Desk)
                </label>
                <input
                  type="text"
                  value={tempPhone1}
                  onChange={(e) => setTempPhone1(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-stone-900 dark:text-[#FBF9F5] text-xs focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Phone 2</label>
                  <input
                    type="text"
                    value={tempPhone2}
                    onChange={(e) => setTempPhone2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-stone-900 dark:text-[#FBF9F5] text-xs focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">Phone 3</label>
                  <input
                    type="text"
                    value={tempPhone3}
                    onChange={(e) => setTempPhone3(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-stone-900 dark:text-[#FBF9F5] text-xs focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-200 dark:border-[#243B32]">
                <button
                  type="button"
                  onClick={() => setIsQuickConfigOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-white/10 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#D93829] hover:bg-[#b82e20] text-white font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div
          onClick={() => setShowResetConfirm(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FBF9F5] dark:bg-[#16241F] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 dark:border-[#243B32] text-center animate-in fade-in zoom-in-95 duration-150 relative my-auto cursor-default"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mx-auto flex items-center justify-center mb-3">
              <RotateCcw className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#133829] dark:text-[#FBF9F5] mb-1">Reset Demo Data?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mb-6">
              This will restore all default notices, phone numbers, and gallery photos.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D93829] hover:bg-[#b82e20] text-white shadow-sm transition-colors cursor-pointer"
              >
                Yes, Reset Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
