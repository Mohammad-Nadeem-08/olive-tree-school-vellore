import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  CheckCheck,
  Lock,
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
  onSendAnother?: () => void;
}

export const WhatsAppSimulatorModal: React.FC<WhatsAppSimulatorProps> = ({
  isOpen,
  onClose,
  formattedMessage,
  onSendAnother,
}) => {
  const [copied, setCopied] = useState(false);

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

  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-full text-start animate-in fade-in zoom-in-95 duration-200">
      {/* Toast Notification for Copy Action */}
      {copied && (
        <div className="mb-3 p-3 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-200" />
          <span>Copied to clipboard! Ready to paste into WhatsApp.</span>
        </div>
      )}

      {/* WhatsApp Interface Wrapper */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-2xl bg-[#EFEAE2] dark:bg-[#0B141A]">
        {/* Chat Header: Green WhatsApp Header (#075E54) with Avatar, Online status, and Close button (✕) */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md">
          {/* School Avatar + Identity + Online Status */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/olive-logo.jpeg"
                alt="Olive Tree School Logo"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20 bg-white shadow-xs"
              />
              <span
                className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full"
                title="Online"
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
              <p className="text-xs text-emerald-100 flex items-center gap-1.5 mt-0.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span>Online</span>
              </p>
            </div>
          </div>

          {/* Close Button (✕) */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Chat Canvas / Message Area */}
        <div className="p-4 sm:p-6 space-y-4 min-h-[260px] max-h-[380px] overflow-y-auto bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Encryption Notice */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFEECD] dark:bg-[#182229] text-[#54656F] dark:text-[#8696A0] text-[11px] font-medium shadow-2xs max-w-sm text-center">
              <Lock className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>End-to-end encrypted inquiry simulation.</span>
            </div>
          </div>

          {/* Today Date Pill */}
          <div className="flex justify-center">
            <span className="px-2.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider shadow-2xs">
              Today
            </span>
          </div>

          {/* WhatsApp-style Incoming/Outgoing Message Speech Bubble */}
          <div className="flex justify-end">
            <div className="max-w-[95%] sm:max-w-[90%] bg-[#DCF8C6] dark:bg-[#005C4B] text-slate-900 dark:text-slate-100 p-4 rounded-xl shadow-sm text-sm font-mono whitespace-pre-line leading-relaxed text-start relative group select-all">
              {formattedMessage}

              {/* Timestamp & Double Blue Ticks */}
              <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-500 dark:text-emerald-200/70 font-mono select-none">
                <span>{currentTime}</span>
                <CheckCheck className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: 2 Clean Buttons (Copy Message to Clipboard + Submit Another Inquiry) */}
        <div className="p-4 bg-white dark:bg-[#16241F] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          {/* Button 1: Copy Message to Clipboard */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ring-4 ring-emerald-500/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-emerald-200" />
                <span>📋 Copy Message to Clipboard</span>
              </>
            )}
          </button>

          {/* Button 2: Submit Another Inquiry */}
          <button
            type="button"
            onClick={onSendAnother}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-98 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>✏️ Submit Another Inquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
