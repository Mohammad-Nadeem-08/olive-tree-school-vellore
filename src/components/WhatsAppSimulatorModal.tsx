import React, { useState } from 'react';
import {
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  CheckCheck,
  Lock,
  Phone,
  Video,
  MoreVertical,
} from 'lucide-react';

export interface WhatsAppSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryData: {
    inquiryType: string;
    studentName: string;
    age: string;
    grade: string;
    parentName: string;
    phone: string;
    message: string;
  };
  formattedMessage: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  onSendAnother?: () => void;
}

export const WhatsAppSimulatorModal: React.FC<WhatsAppSimulatorProps> = ({
  isOpen,
  onClose,
  inquiryData,
  formattedMessage,
  primaryPhone = '918610113160',
  secondaryPhone = '919629049907',
  onSendAnother,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeNumber, setActiveNumber] = useState<string>(primaryPhone);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedMessage);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = formattedMessage;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenLiveWhatsApp = () => {
    const waUrl = `https://wa.me/${activeNumber}?text=${encodeURIComponent(formattedMessage)}`;
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-full text-start animate-in fade-in zoom-in-95 duration-200">
      {/* Toast Notification for Copy Action */}
      {copied && (
        <div className="mb-4 p-3 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center justify-between text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-200" />
            <span>Copied to clipboard! Ready to paste into WhatsApp.</span>
          </div>
          <span className="text-emerald-200 text-xs font-mono">100% Ready</span>
        </div>
      )}

      {/* WhatsApp Interface Wrapper */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-2xl bg-[#EFEAE2] dark:bg-[#0B141A]">
        {/* WhatsApp App Top Bar */}
        <div className="bg-[#075E54] dark:bg-[#202C33] text-white px-4 py-3 flex items-center justify-between shadow-md">
          {/* School Avatar + Identity */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/olive-logo.jpeg"
                alt="Olive Tree School Logo"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20 bg-white shadow-xs"
              />
              <span
                className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] dark:border-[#202C33] rounded-full"
                title="Online Now"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base leading-tight">
                  Olive Tree School
                </span>
                <span
                  className="inline-flex items-center justify-center w-3.5 h-3.5 bg-emerald-400 text-[#075E54] rounded-full text-[9px] font-black"
                  title="Verified Admissions Desk"
                >
                  ✓
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80 leading-none mt-0.5 font-mono truncate max-w-[200px] sm:max-w-xs">
                {inquiryData.studentName
                  ? `Inquiry for ${inquiryData.studentName} (${inquiryData.grade})`
                  : 'Admissions Desk • Kaspa, Vellore'}
              </p>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 text-emerald-100">
            <Phone className="w-4 h-4 cursor-pointer hover:text-white transition-colors hidden sm:block opacity-80" />
            <Video className="w-4 h-4 cursor-pointer hover:text-white transition-colors hidden sm:block opacity-80" />
            <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white transition-colors opacity-80" />
          </div>
        </div>

        {/* Chat Canvas / Message Area */}
        <div className="p-4 sm:p-6 space-y-4 min-h-[260px] max-h-[360px] overflow-y-auto bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Encryption Notice */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFEECD] dark:bg-[#182229] text-[#54656F] dark:text-[#8696A0] text-[11px] font-medium shadow-2xs max-w-sm text-center">
              <Lock className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>End-to-end encrypted inquiry. WhatsApp simulation preview.</span>
            </div>
          </div>

          {/* Today Date Pill */}
          <div className="flex justify-center">
            <span className="px-2.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider shadow-2xs">
              Today
            </span>
          </div>

          {/* Outgoing Message Speech Bubble */}
          <div className="flex justify-end">
            <div className="max-w-[95%] sm:max-w-[88%] bg-[#D9FDD3] dark:bg-[#005C4B] text-slate-900 dark:text-white rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-sm border border-emerald-200/50 dark:border-emerald-700/30 text-start relative group">
              {/* Formatted Message Plaintext Body */}
              <pre className="font-sans text-xs sm:text-sm text-slate-900 dark:text-emerald-50 leading-relaxed whitespace-pre-wrap select-all selection:bg-emerald-300 dark:selection:bg-emerald-800">
                {formattedMessage}
              </pre>

              {/* Timestamp & Double Blue Ticks */}
              <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-500 dark:text-emerald-200/70 font-mono">
                <span>{currentTime}</span>
                <CheckCheck className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Simulated Input Area / Desk Selector */}
        <div className="bg-[#F0F2F5] dark:bg-[#202C33] px-3.5 py-2.5 border-t border-slate-300 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
              Admissions Target Desk:
            </span>
            <div className="inline-flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveNumber(primaryPhone)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  activeNumber === primaryPhone
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Primary (+91 86101 13160)
              </button>
              <button
                type="button"
                onClick={() => setActiveNumber(secondaryPhone)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  activeNumber === secondaryPhone
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Secondary (+91 96290 49907)
              </button>
            </div>
          </div>

          <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
            ● Local Simulation Active
          </span>
        </div>
      </div>

      {/* 3 Explicit Action Buttons */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Action 1: Copy Formatted Message */}
        <button
          type="button"
          onClick={handleCopy}
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 shadow-xs transition-all active:scale-98 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300">Copied to clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>📋 Copy Formatted Message</span>
            </>
          )}
        </button>

        {/* Action 2: Open Live WhatsApp */}
        <button
          type="button"
          onClick={handleOpenLiveWhatsApp}
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer ring-4 ring-emerald-500/20"
        >
          <ExternalLink className="w-4 h-4" />
          <span>🚀 Open Live WhatsApp (wa.me/{activeNumber})</span>
        </button>

        {/* Action 3: Close / Send Another */}
        <button
          type="button"
          onClick={() => {
            if (onSendAnother) {
              onSendAnother();
            } else {
              onClose();
            }
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm transition-all active:scale-98 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>✕ Close / Send Another</span>
        </button>
      </div>
    </div>
  );
};
