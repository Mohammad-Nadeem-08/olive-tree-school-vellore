import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  User,
  Phone,
  CheckCircle2,
  MessageSquare,
  Calendar,
  Clock,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  ExternalLink,
  ClipboardCheck,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import {
  createWhatsAppUrl,
  openWhatsAppChat,
} from '../utils/whatsapp';

type ModalStep = 'form' | 'preview' | 'confirmed';

export const CampusVisitModal: React.FC = () => {
  const { isVisitModalOpen, closeVisitModal, siteConfig, t, language } = useSchool();

  // Multi-step modal navigation
  const [step, setStep] = useState<ModalStep>('form');

  // Form Fields State
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');

  // Confirmation & Feedback State
  const [formattedWaMessage, setFormattedWaMessage] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleClose = useCallback(() => {
    setStep('form');
    setParentName('');
    setPhone('');
    setDate('');
    setTimeSlot('10:30 AM');
    setFormattedWaMessage('');
    setIsOpening(false);
    setPopupBlocked(false);
    setCopied(false);
    setValidationError('');
    closeVisitModal();
  }, [closeVisitModal]);

  useEffect(() => {
    if (!isVisitModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisitModalOpen, handleClose]);

  if (!isVisitModalOpen) return null;

  // Build the standardized WhatsApp visit request message
  const buildVisitMessage = () => {
    return `Hello Olive Tree School,

I would like to request an appointment to visit your school campus.

Parent Name: ${parentName.trim()}
Contact Number: ${phone.trim()}
Preferred Visit Date: ${date.trim() || 'To be scheduled / Next working day'}
Preferred Visit Time: ${timeSlot || 'Morning slot (09:00 AM - 04:00 PM)'}

Looking forward to your confirmation.
Thank you.`;
  };

  // Step 1: Validate fields and transition to Step 2 (Preview)
  // Crucial: DOES NOT open WhatsApp!
  const handlePreviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!parentName.trim()) {
      setValidationError('Please enter your parent/guardian name.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('Please enter your contact phone number.');
      return;
    }

    const msg = buildVisitMessage();
    setFormattedWaMessage(msg);
    setStep('preview');
  };

  // Step 2: Explicit Confirmation click handler
  // Crucial: ONLY called when user explicitly clicks "Confirm & Continue to WhatsApp"
  const handleConfirmAndOpenWhatsApp = () => {
    if (isOpening) return;
    setIsOpening(true);

    const msg = formattedWaMessage || buildVisitMessage();
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

  const labels = {
    en: {
      tag: 'Visit Vellore Campus',
      title: 'Schedule a Campus Visit',
      desc: 'Office Hours: 9:00 AM to 4:00 PM on all Working Days.',
      dateLabel: 'Preferred Date',
      timeLabel: 'Time Slot',
      submitBtn: 'Preview Visit Details →',
      footerNote: 'Kaspa, Vellore campus is open Monday to Saturday, 9 AM – 4 PM.',
      previewTag: 'Step 2 of 2: Review Schedule',
      previewTitle: 'Review Visit Details',
      previewDesc: 'Please verify your visit schedule before continuing to WhatsApp.',
      goBackBtn: 'Go Back & Edit',
      confirmBtn: 'Confirm & Continue to WhatsApp →',
      successTitle: 'Visit Request Prepared for WhatsApp',
      successDesc: `Thank you, ${parentName}. Your visit request for ${date || 'the next working day'} around ${timeSlot} has been loaded into WhatsApp (+91 86101 13160). Please tap Send in WhatsApp to connect with our coordinator.`,
      campusLoc: 'Campus Location:',
      openWhatsAppBtn: '📲 Open WhatsApp (+91 86101 13160)',
      copyBtn: 'Copy Message',
      copiedBtn: 'Copied!',
      doneBtn: 'Done / Close Window',
      sendAnotherBtn: 'Schedule Another Visit',
      popupNote: 'Popup blocker detected. Click below to open WhatsApp directly:',
      statusNote: 'Note: Appointments are scheduled based on coordinator availability and confirmed manually by the school office. Submission of this request does not constitute a pre-confirmed appointment.',
    },
    ta: {
      tag: 'வேலூர் வளாக பார்வை',
      title: 'பள்ளி வளாக பார்வை முன்பதிவு',
      desc: 'அலுவலக நேரம்: காலை 9:00 - மாலை 4:00 (வேலை நாட்களில்).',
      dateLabel: 'விருப்பமான தேதி',
      timeLabel: 'நேரம்',
      submitBtn: 'வளாக பார்வை விவரங்களை சரிபார்க்க →',
      footerNote: 'கஸ்பா, வேலூர் வளாகம் திங்கள் முதல் சனி வரை இயங்கும்.',
      previewTag: 'படி 2: அட்டவணையை சரிபார்க்கவும்',
      previewTitle: 'வளாக பார்வை விவரங்கள்',
      previewDesc: 'வாட்ஸ்அப் செல்வதற்கு முன் தங்களின் வருகை நேரத்தை சரிபார்க்கவும்.',
      goBackBtn: 'மீண்டும் சென்று திருத்துக',
      confirmBtn: 'உறுதிசெய்து வாட்ஸ்அப்பில் தொடரவும் →',
      successTitle: 'வளாக பார்வை கோரிக்கை தயாராக உள்ளது',
      successDesc: `நன்றி, ${parentName}. தங்களின் வளாக பார்வை கோரிக்கை தயாராக உள்ளது (${date || 'அடுத்த வேலை நாள்'} ${timeSlot}). வருகை நேரத்தை உறுதிப்படுத்த வாட்ஸ்அப்பில் செய்தியை அனுப்பவும்.`,
      campusLoc: 'பள்ளி முகவரி:',
      openWhatsAppBtn: '📲 வாட்ஸ்அப்பில் திறக்கவும் (+91 86101 13160)',
      copyBtn: 'செய்தியை நகலெடுக்கவும்',
      copiedBtn: 'நகலெடுக்கப்பட்டது!',
      doneBtn: 'முடிந்தது / சாளரத்தை மூடுக',
      sendAnotherBtn: 'மற்றொரு வருகையை திட்டமிடுக',
      popupNote: 'பாப்அப் தடுக்கப்பட்டது. வாட்ஸ்அப்பை நேரடியாக திறக்க கீழே சொடுக்கவும்:',
      statusNote: 'குறிப்பு: வருகை நேரம் பள்ளி அலுவலகத்தால் சரிபார்க்கப்பட்டு வாட்ஸ்அப் வழியாக உறுதிப்படுத்தப்படும்.',
    },
    ur: {
      tag: 'کاسپا کیمپس دورہ',
      title: 'کیمپس دورے کا وقت لیں',
      desc: 'دفتری اوقات: صبح 9:00 بجے تا شام 4:00 بجے تمام دفتری ایام میں۔',
      dateLabel: 'پسندیدہ تاریخ',
      timeLabel: 'وقت',
      submitBtn: 'دورے کی تفصیلات کا جائزہ لیں ←',
      footerNote: 'کاسپا، ویلور کیمپس پیر تا ہفتہ صبح 9 تا شام 4 کھلا رہتا ہے۔',
      previewTag: 'مرحلہ 2: شیڈول کا جائزہ لیں',
      previewTitle: 'کیمپس دورے کی تفصیلات',
      previewDesc: 'براہ کرم واٹس ایپ پر جانے سے پہلے اپنے منتخب کردہ وقت کی تصدیق کریں۔',
      goBackBtn: 'واپس جائیں اور ترمیم کریں',
      confirmBtn: 'تصدیق کریں اور واٹس ایپ پر جائیں ←',
      successTitle: 'کیمپس دورے کی درخواست تیار ہے',
      successDesc: `شکریہ محترم/محترمہ ${parentName}۔ آپ کے کیمپس دورے کی درخواست تیار ہو چکی ہے (${date || 'اگلے دفتری دن'} ${timeSlot})۔ وقت کی حتمی تصدیق کے لیے براہ کرم واٹس ایپ پر پیغام ارسال فرمائیں۔`,
      campusLoc: 'کیمپس کا پتہ:',
      openWhatsAppBtn: '📲 واٹس ایپ کھولیں (+91 86101 13160)',
      copyBtn: 'پیغام کاپی کریں',
      copiedBtn: 'کاپی ہو گیا!',
      doneBtn: 'مکمل / بند کریں',
      sendAnotherBtn: 'دوسرا دورہ طے کریں',
      popupNote: 'پاپ اپ بلاکر کا پتہ چلا۔ براہ راست واٹس ایپ کھولنے کے لیے نیچے کلک کریں:',
      statusNote: 'نوٹ: دورے کے وقت کی حتمی تصدیق اسکول انتظامیہ کی جانب سے واٹس ایپ پر کی جائے گی۔',
    },
  };

  const l = labels[language] || labels.en;

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }}
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-hidden cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#16241F] text-slate-900 dark:text-[#F3F7F4] rounded-2xl sm:rounded-3xl max-w-md w-full p-4.5 sm:p-7 md:p-8 shadow-2xl border border-slate-200 dark:border-[#243B32] relative my-auto max-h-[92dvh] sm:max-h-[88dvh] overflow-y-auto modal-scroll-hidden animate-in fade-in zoom-in-95 duration-150 text-start cursor-default"
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
            handleClose();
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
            <div className="mb-6 text-start pe-8">
              <span className="text-xs font-mono font-bold text-[#123524] dark:text-[#34D399] uppercase tracking-wider">
                {l.tag}
              </span>
              <h3
                className={`font-editorial text-2xl font-bold text-[#123524] dark:text-white mt-1 ${
                  language === 'ur' ? 'font-urdu leading-[1.4]' : ''
                }`}
              >
                {l.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#3D5245] dark:text-[#9DB0A6] mt-1">
                {l.desc}
              </p>
            </div>

            {validationError && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handlePreviewSubmit} className="space-y-4 text-start">
              <div>
                <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1.5">
                  {t.modal.parentNameLabel} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6B7280] dark:text-[#9DB0A6] absolute start-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder={t.modal.parentNamePlaceholder}
                    className="w-full ps-10 pe-4 py-3 rounded-2xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm focus:ring-2 focus:ring-[#133829] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1.5">
                  {t.modal.phoneLabel} *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#E59A23] absolute start-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.modal.phonePlaceholder}
                    className="w-full ps-10 pe-4 py-3 rounded-2xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm focus:ring-2 focus:ring-[#133829] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{l.dateLabel}</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-3 rounded-2xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm focus:ring-2 focus:ring-[#133829] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{l.timeLabel}</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-3 rounded-2xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm focus:ring-2 focus:ring-[#133829] outline-none cursor-pointer"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 py-4 rounded-2xl border border-slate-200 dark:border-[#243B32] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>{l.submitBtn}</span>
                </button>
              </div>

              <p className="text-xs text-[#6B7280] dark:text-[#9DB0A6] text-center">
                {l.footerNote}
              </p>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: DETAILS PREVIEW (Review with Edit / Confirm)       */}
        {/* ========================================================= */}
        {step === 'preview' && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-start pe-8">
              <span className="text-xs font-mono font-bold text-[#123524] dark:text-[#34D399] uppercase tracking-wider">
                {l.previewTag}
              </span>
              <h3
                className={`font-editorial text-2xl font-bold text-[#123524] dark:text-white mt-1 ${
                  language === 'ur' ? 'font-urdu leading-[1.4]' : ''
                }`}
              >
                {l.previewTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#3D5245] dark:text-[#9DB0A6] mt-1">
                {l.previewDesc}
              </p>
            </div>

            {/* Clean Structured Review Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1714] border border-slate-200 dark:border-[#243B32] space-y-3 text-xs sm:text-sm">
              <div className="pb-2.5 border-b border-slate-200 dark:border-[#243B32]">
                <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  Parent / Guardian Name
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  {parentName.trim()}
                </span>
              </div>

              <div className="pb-2.5 border-b border-slate-200 dark:border-[#243B32]">
                <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  Contact Phone (WhatsApp)
                </span>
                <span className="font-bold text-emerald-700 dark:text-[#34D399] font-mono">
                  {phone.trim()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-2.5 border-b border-slate-200 dark:border-[#243B32]">
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Preferred Date
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {date.trim() || 'Next Working Day'}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                    Time Slot
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {timeSlot}
                  </span>
                </div>
              </div>

              <div>
                <span className="block font-mono text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  Campus Address
                </span>
                <span className="font-normal text-slate-700 dark:text-slate-300">
                  {siteConfig.address}
                </span>
              </div>
            </div>

            {/* Informational Guidance Box */}
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-700 dark:text-[#34D399] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                Clicking <strong>Confirm & Continue to WhatsApp</strong> will open WhatsApp (+91 86101 13160). Our coordinator will verify slot availability and confirm your appointment manually.
              </div>
            </div>

            {/* TWO BUTTONS: Go Back & Edit vs Confirm & Continue to WhatsApp */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="py-3.5 px-4 rounded-2xl border border-slate-300 dark:border-[#243B32] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{l.goBackBtn}</span>
              </button>

              <button
                type="button"
                disabled={isOpening}
                onClick={handleConfirmAndOpenWhatsApp}
                className="flex-1 py-4 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-extrabold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="text-xl">📲</span>
                <span>{isOpening ? 'Opening WhatsApp...' : l.confirmBtn}</span>
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
                className={`font-editorial text-2xl font-bold text-slate-900 dark:text-white ${
                  language === 'ur' ? 'font-urdu leading-[1.4]' : ''
                }`}
              >
                {l.successTitle}
              </h3>
              <p
                className={`text-sm sm:text-base text-slate-600 dark:text-[#9DB0A6] leading-relaxed ${
                  language === 'ur' ? 'font-urdu leading-[1.8]' : ''
                }`}
              >
                {l.successDesc}
              </p>
            </div>

            {/* Popup Blocker Notice & Fallback Link (ONLY if browser blocked popup) */}
            {popupBlocked && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-start space-y-2 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                <div className="font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Popup Blocker Detected</span>
                </div>
                <p>{l.popupNote}</p>
                <a
                  href={createWhatsAppUrl(formattedWaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{l.openWhatsAppBtn}</span>
                </a>
              </div>
            )}

            {/* Campus Location Card */}
            <div className="p-4 bg-slate-50 dark:bg-[#0E1714] rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-[#9DB0A6] text-start border border-slate-200 dark:border-[#243B32]">
              <div className="font-bold text-slate-900 dark:text-white">{l.campusLoc}</div>
              <div className="mt-0.5">{siteConfig.address}</div>
              <div className="text-emerald-700 dark:text-[#34D399] mt-2 font-bold font-mono">
                {t.contact.officeHoursLabel}: {siteConfig.officeHours}
              </div>
            </div>

            {/* Message Text and Copy Button */}
            <div className="p-3.5 bg-slate-50 dark:bg-[#0E1714] border border-slate-200 dark:border-[#243B32] rounded-2xl text-start">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Prepared Visit Message
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-[#34D399] text-xs font-bold transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{l.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{l.copyBtn}</span>
                    </>
                  )}
                </button>
              </div>
              <pre
                className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto modal-scroll-hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {formattedWaMessage}
              </pre>
            </div>

            {/* Accurate Status Guidance */}
            <p className="text-xs text-slate-500 dark:text-[#9DB0A6] italic max-w-md mx-auto">
              {l.statusNote}
            </p>

            {/* Completion Actions (Done / Schedule Another) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep('form');
                  setParentName('');
                  setPhone('');
                  setDate('');
                  setTimeSlot('10:30 AM');
                  setFormattedWaMessage('');
                }}
                className="py-3 px-5 rounded-2xl border border-slate-200 dark:border-[#243B32] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{l.sendAnotherBtn}</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white font-bold text-sm transition-colors cursor-pointer shadow-md"
              >
                {l.doneBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
