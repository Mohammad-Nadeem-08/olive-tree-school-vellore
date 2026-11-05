import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  GraduationCap,
  User,
  Phone,
  MessageSquare,
  Calendar,
  Building,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  ExternalLink,
  ClipboardCheck,
  ShieldCheck,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import {
  createWhatsAppUrl,
  openWhatsAppChat,
  OFFICIAL_WHATSAPP_NUMBER,
} from '../utils/whatsapp';

type ModalStep = 'form' | 'preview' | 'confirmed';

export const AdmissionModal: React.FC = () => {
  const { isAdmissionModalOpen, closeAdmissionModal, language, siteConfig } = useSchool();

  // Multi-step modal navigation
  const [step, setStep] = useState<ModalStep>('form');

  // Form Fields State
  const [studentName, setStudentName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('Pre-KG');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'New Admission 2027-28' | 'Schedule Campus Visit'>('New Admission 2027-28');
  const [message, setMessage] = useState('');

  // Confirmation & Feedback State
  const [formattedWaMessage, setFormattedWaMessage] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  const academicYear = siteConfig?.admissionYear || '2027–2028';

  const handleResetAndClose = useCallback(() => {
    setStep('form');
    setStudentName('');
    setAge('');
    setGrade('Pre-KG');
    setParentName('');
    setPhone('');
    setInquiryType('New Admission 2027-28');
    setMessage('');
    setFormattedWaMessage('');
    setIsOpening(false);
    setPopupBlocked(false);
    setCopied(false);
    setValidationError('');
    closeAdmissionModal();
  }, [closeAdmissionModal]);

  useEffect(() => {
    if (!isAdmissionModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetAndClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmissionModalOpen, handleResetAndClose]);

  if (!isAdmissionModalOpen) return null;

  const gradeOptions = [
    'Pre-KG',
    'LKG',
    'UKG',
    '1st Std',
    '2nd Std',
    '3rd Std',
    '4th Std',
    '5th Std',
  ];

  // Helper to compile additional details
  const getAdditionalDetails = () => {
    return [
      age.trim() ? `Child's Age/DOB: ${age.trim()}` : '',
      inquiryType !== 'New Admission 2027-28' ? `Inquiry: ${inquiryType}` : '',
      message.trim() ? message.trim() : '',
    ].filter(Boolean).join(' | ') || 'None provided';
  };

  // Helper to generate formatted WhatsApp message
  const buildWhatsAppMessage = () => {
    const additionalDetails = getAdditionalDetails();
    return `Hello Olive Tree School,

I would like to inquire about admission for my child.

Student Name: ${studentName.trim()}
Parent / Guardian Name: ${parentName.trim()}
Contact Number: ${phone.trim()}
Grade Applying For: ${grade}
Academic Year: ${academicYear}
Additional Information: ${additionalDetails}

Thank you.`;
  };

  // Step 1: Validate fields and transition to Step 2 (Preview)
  // Crucial: DOES NOT open WhatsApp!
  const handlePreviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!studentName.trim()) {
      setValidationError('Please enter the student full name.');
      return;
    }
    if (!age.trim()) {
      setValidationError("Please enter the child's age or date of birth.");
      return;
    }
    if (!parentName.trim()) {
      setValidationError('Please enter the parent/guardian name.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Please enter a valid contact phone number.');
      return;
    }

    const msg = buildWhatsAppMessage();
    setFormattedWaMessage(msg);
    setStep('preview');
  };

  // Step 2: Explicit Confirmation click handler
  // Crucial: ONLY called when user explicitly clicks "Confirm & Continue to WhatsApp"
  const handleConfirmAndOpenWhatsApp = () => {
    if (isOpening) return;
    setIsOpening(true);

    const msg = formattedWaMessage || buildWhatsAppMessage();
    setFormattedWaMessage(msg);

    // Single intentional user interaction to open WhatsApp
    const result = openWhatsAppChat(msg);
    setPopupBlocked(!result.success);
    setIsOpening(false);
    setStep('confirmed');
  };

  // Copy Message Handler
  const handleCopyMessage = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedWaMessage);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = formattedWaMessage;
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

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleResetAndClose();
      }}
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-hidden cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#16241F] text-slate-900 dark:text-[#F3F7F4] rounded-2xl sm:rounded-3xl max-w-xl w-full p-4.5 sm:p-7 md:p-8 shadow-2xl border border-slate-200 dark:border-[#243B32] relative my-auto max-h-[92dvh] sm:max-h-[88dvh] overflow-y-auto modal-scroll-hidden animate-in fade-in zoom-in-95 duration-200 text-start cursor-default"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* High-Visibility Sticky Close Button (X) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleResetAndClose();
          }}
          className="sticky top-2 float-right -mt-1 -me-1 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================= */}
        {/* STEP 1: FILL FORM (Inputs & Validation)                    */}
        {/* ========================================================= */}
        {step === 'form' && (
          <div>
            <div className="text-start mb-6 pe-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-700 text-white font-mono text-xs font-bold mb-3 shadow-xs">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Admissions 2027–28 Desk</span>
              </div>
              <h3
                className={`font-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white ${
                  language === 'ur' ? 'font-urdu leading-[1.4]' : ''
                }`}
              >
                Online Admission & Visit Inquiry
              </h3>
              <p
                className={`text-sm sm:text-base text-slate-600 dark:text-[#9DB0A6] mt-2 ${
                  language === 'ur' ? 'font-urdu leading-[1.8]' : ''
                }`}
              >
                Fill in the details below. You will review and confirm your details before connecting to WhatsApp.
              </p>
            </div>

            {validationError && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handlePreviewSubmit} className="space-y-4 text-start">
              {/* Inquiry Type Radio Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Inquiry Purpose *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInquiryType('New Admission 2027-28')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      inquiryType === 'New Admission 2027-28'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 dark:bg-[#0E1714] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#243B32] hover:bg-slate-100'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>New Admission</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInquiryType('Schedule Campus Visit')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      inquiryType === 'Schedule Campus Visit'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 dark:bg-[#0E1714] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#243B32] hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Campus Visit</span>
                  </button>
                </div>
              </div>

              {/* Student Name & Child's Age / DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-700 dark:text-[#34D399]" />
                    <span>Student Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Mohammed Rayan"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                    <span>Child's Age / DOB *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 3.5 Years / 15-08-2022"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Target Grade Dropdown */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
                  <span>Target Class for 2027–28 *</span>
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none transition-all shadow-2xs font-bold cursor-pointer"
                >
                  {gradeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Parent Name & WhatsApp Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                    <span>Parent / Guardian Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Syed Farooq"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Parent Mobile / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98401 23456"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>Optional Message / Questions</span>
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Asking about van pickup from Kaspa, syllabus details, admission timeline..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none transition-all shadow-2xs"
                />
              </div>

              {/* Actions: Cancel and Preview Details Button */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="py-3.5 px-6 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#243B32] transition-colors cursor-pointer"
                >
                  Cancel / Close
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 px-6 rounded-2xl font-bold text-base text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  <span>Preview Details →</span>
                </button>
              </div>

              <div className="text-center text-xs text-slate-500 dark:text-[#9DB0A6] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-[#34D399]" />
                <span>Step 1 of 2: Review your information on the next screen before WhatsApp is opened.</span>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: DETAILS PREVIEW (Review with Edit / Confirm)       */}
        {/* ========================================================= */}
        {step === 'preview' && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-start pe-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-[#34D399] font-mono text-xs font-bold mb-2">
                <span>Step 2 of 2: Review Your Details</span>
              </div>
              <h3
                className={`font-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white ${
                  language === 'ur' ? 'font-urdu leading-[1.4]' : ''
                }`}
              >
                Review Admission Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#9DB0A6] mt-1">
                Please verify your entered information below before connecting to WhatsApp (+91 {OFFICIAL_WHATSAPP_NUMBER.slice(2)}).
              </p>
            </div>

            {/* Clean Structured Review Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1714] border border-slate-200 dark:border-[#243B32] space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200 dark:border-[#243B32]">
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Student Full Name
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-base">
                    {studentName.trim()}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Child's Age / DOB
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {age.trim()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200 dark:border-[#243B32]">
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Parent / Guardian Name
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {parentName.trim()}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Contact Phone (WhatsApp)
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-[#34D399] font-mono">
                    {phone.trim()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200 dark:border-[#243B32]">
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Target Class
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white inline-block px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-[#34D399] text-xs">
                    {grade}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Academic Year
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {academicYear}
                  </span>
                </div>
              </div>

              <div>
                <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  Inquiry Purpose
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {inquiryType}
                </span>
              </div>

              <div>
                <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  Additional Information
                </span>
                <span className="font-normal text-slate-700 dark:text-slate-300 italic">
                  {message.trim() || 'None provided'}
                </span>
              </div>
            </div>

            {/* Informational Guidance Box */}
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-700 dark:text-[#34D399] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                Clicking <strong>Confirm & Continue to WhatsApp</strong> will open WhatsApp (+91 86101 13160) with this inquiry. You can review the message in WhatsApp and tap Send to contact the admissions team.
              </div>
            </div>

            {/* TWO BUTTONS: Go Back & Edit vs Confirm & Continue to WhatsApp */}
            <div className="pt-2 flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="py-3.5 px-5 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-[#243B32] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back & Edit</span>
              </button>

              <button
                type="button"
                disabled={isOpening}
                onClick={handleConfirmAndOpenWhatsApp}
                className="flex-1 py-4 px-6 rounded-2xl font-extrabold text-base text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-98 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="text-xl">📲</span>
                <span>{isOpening ? 'Opening WhatsApp...' : 'Confirm & Continue to WhatsApp →'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: EXPLICIT CONFIRMATION (Sent State / Fallback)     */}
        {/* ========================================================= */}
        {step === 'confirmed' && (
          <div className="text-center py-4 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-[#34D399] mx-auto flex items-center justify-center ring-4 ring-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3
                className={`font-editorial text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white ${
                  language === 'ur' ? 'font-urdu leading-[1.4]' : ''
                }`}
              >
                Inquiry Prepared for WhatsApp
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-[#9DB0A6] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{parentName}</strong>. Your inquiry for <strong>{studentName}</strong> ({grade}) has been loaded into WhatsApp (+91 86101 13160). Please click <strong>Send</strong> in WhatsApp to connect with our admissions office.
              </p>
            </div>

            {/* Popup Blocker Notice & Fallback Link (ONLY if browser blocked popup) */}
            {popupBlocked && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-start space-y-2 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                <div className="font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Popup Blocker Detected</span>
                </div>
                <p>
                  Your browser prevented opening WhatsApp automatically. Please use the direct link below:
                </p>
                <a
                  href={createWhatsAppUrl(formattedWaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open WhatsApp Directly (+91 86101 13160)</span>
                </a>
              </div>
            )}

            {/* Formatted Message Preview Box */}
            <div className="p-4 bg-slate-50 dark:bg-[#0E1714] border border-slate-200 dark:border-[#243B32] rounded-2xl text-start">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Formatted WhatsApp Message
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-[#34D399] text-xs font-bold transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Message</span>
                    </>
                  )}
                </button>
              </div>
              <pre
                className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto modal-scroll-hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {formattedWaMessage}
              </pre>
            </div>

            {/* Safe Confirmation Guidance Notice */}
            <p className="text-xs text-slate-500 dark:text-[#9DB0A6] italic max-w-md mx-auto">
              Note: Submitting this inquiry does not constitute confirmed admission. Admissions are subject to seat availability, document verification, and final school approval.
            </p>

            {/* Completion Actions (Done / Send Another) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep('form');
                  setStudentName('');
                  setAge('');
                  setGrade('Pre-KG');
                  setParentName('');
                  setPhone('');
                  setMessage('');
                  setFormattedWaMessage('');
                }}
                className="py-3 px-5 rounded-2xl border border-slate-200 dark:border-[#243B32] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Inquiry</span>
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white font-bold text-sm transition-colors cursor-pointer shadow-md"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
