import React, { useState, useEffect } from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginModalOpen, closeAdminLoginModal, loginAdmin } = useSchool();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isAdminLoginModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAdminLoginModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoginModalOpen]);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (success) {
      setError(false);
      setUsername('');
      setPassword('');
      closeAdminLoginModal();
    } else {
      setError(true);
    }
  };

  const handleDemoFill = () => {
    setUsername('admin');
    setPassword('olive2026');
    setError(false);
  };

  return (
    <div
      onClick={closeAdminLoginModal}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#16241F] text-slate-900 dark:text-[#F3F7F4] rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#243B32] relative my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 text-start cursor-default"
      >
        {/* High-Visibility Sticky Close Button (X) */}
        <button
          type="button"
          onClick={closeAdminLoginModal}
          className="sticky top-2 float-right -mt-1 -me-1 z-20 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-[#F59E0B] mx-auto flex items-center justify-center mb-3 shadow-xs">
            <Lock className="w-7 h-7 text-[#F59E0B]" />
          </div>
          <h3 className="font-editorial text-2xl font-extrabold text-slate-900 dark:text-white">Staff & Admin Access</h3>
          <p className="text-xs font-mono text-slate-600 dark:text-[#9DB0A6] mt-1">
            Access Live On-Page Editor & Controls
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-[#D93829]/10 border border-[#D93829]/30 flex items-center gap-2 text-[#D93829] text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Invalid credentials. (Hint: admin / olive2026)</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-600 dark:text-[#9DB0A6] uppercase mb-1.5">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-600 dark:text-[#9DB0A6] uppercase mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none"
            />
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={closeAdminLoginModal}
              className="w-1/3 py-3.5 rounded-2xl border border-slate-200 dark:border-[#243B32] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-colors shadow-md cursor-pointer"
            >
              Login →
            </button>
          </div>

          {/* Quick Demo Fill Shortcut */}
          <button
            type="button"
            onClick={handleDemoFill}
            className="w-full py-2.5 rounded-2xl bg-amber-50 text-amber-950 text-xs font-mono font-bold hover:bg-amber-100 transition-colors border border-amber-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Fill Demo Credentials (admin / olive2026)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
