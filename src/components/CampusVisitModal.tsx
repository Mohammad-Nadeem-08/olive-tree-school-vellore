import React, { useState, useEffect } from 'react';
import { X, User, Phone, CheckCircle2 } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const CampusVisitModal: React.FC = () => {
  const { isVisitModalOpen, closeVisitModal, siteConfig, t, language } = useSchool();

  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [confirmed, setConfirmed] = useState(false);

  const handleClose = () => {
    setConfirmed(false);
    setParentName('');
    setPhone('');
    setDate('');
    closeVisitModal();
  };

  useEffect(() => {
    if (!isVisitModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisitModalOpen]);

  if (!isVisitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone) return;
    setConfirmed(true);
  };

  const labels = {
    en: {
      tag: 'Visit Vellore Campus',
      title: 'Schedule a Campus Visit',
      desc: 'Office Hours: 9:00 AM to 4:00 PM on all Working Days.',
      dateLabel: 'Preferred Date',
      timeLabel: 'Time Slot',
      submitBtn: 'Confirm Visit Appointment',
      footerNote: 'Kaspa, Vellore campus is open Monday to Saturday, 9 AM – 4 PM.',
      successTitle: 'Campus Visit Scheduled!',
      successDesc: `Thank you, ${parentName}. We look forward to welcoming you at our Kaspa, Vellore campus on ${date || 'your scheduled date'} around ${timeSlot}.`,
      campusLoc: 'Campus Location:',
      doneBtn: 'Done',
    },
    ta: {
      tag: 'வேலூர் வளாக பார்வை',
      title: 'பள்ளி வளாக பார்வை முன்பதிவு',
      desc: 'அலுவலக நேரம்: காலை 9:00 - மாலை 4:00 (வேலை நாட்களில்).',
      dateLabel: 'விருப்பமான தேதி',
      timeLabel: 'நேரம்',
      submitBtn: 'வளாக பார்வையை உறுதி செய்க',
      footerNote: 'கஸ்பா, வேலூர் வளாகம் திங்கள் முதல் சனி வரை இயங்கும்.',
      successTitle: 'வளாக பார்வை உறுதி செய்யப்பட்டது!',
      successDesc: `நன்றி, ${parentName}. தங்களை கஸ்பா, வேலூர் வளாகத்திற்கு அன்புடன் வரவேற்கிறோம் (${date || 'குறிப்பிட்ட தேதி'} ${timeSlot}).`,
      campusLoc: 'பள்ளி முகவரி:',
      doneBtn: 'முடிந்தது',
    },
    ur: {
      tag: 'کاسپا کیمپس دورہ',
      title: 'کیمپس دورے کا وقت لیں',
      desc: 'دفتری اوقات: صبح 9:00 بجے تا شام 4:00 بجے تمام دفتری ایام میں۔',
      dateLabel: 'پسندیدہ تاریخ',
      timeLabel: 'وقت',
      submitBtn: 'دورے کی تصدیق کریں',
      footerNote: 'کاسپا، ویلور کیمپس پیر تا ہفتہ صبح 9 تا شام 4 کھلا رہتا ہے۔',
      successTitle: 'کیمپس کا وقت کامیابی سے مقرر ہو گیا!',
      successDesc: `شکریہ محترم/محترمہ ${parentName}۔ ہم کاسپا، ویلور کیمپس میں آپ کے استقبال کے منتظر ہیں (${date || 'مقررہ تاریخ'} ${timeSlot})۔`,
      campusLoc: 'کیمپس کا پتہ:',
      doneBtn: 'مکمل',
    },
  };

  const l = labels[language] || labels.en;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#16241F] text-slate-900 dark:text-[#F3F7F4] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#243B32] relative my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 text-start cursor-default"
      >
        {/* High-Visibility Sticky Close Button (X) */}
        <button
          type="button"
          onClick={handleClose}
          className="sticky top-2 float-right -mt-1 -me-1 z-20 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-[#34D399] mx-auto flex items-center justify-center mb-4 ring-4 ring-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3
              className={`font-editorial text-2xl font-bold text-slate-900 dark:text-white mb-2 ${
                language === 'ur' ? 'font-urdu leading-[1.4]' : ''
              }`}
            >
              {l.successTitle}
            </h3>
            <p
              className={`text-sm sm:text-base text-slate-600 dark:text-[#9DB0A6] mb-6 leading-relaxed ${
                language === 'ur' ? 'font-urdu leading-[1.8]' : ''
              }`}
            >
              {l.successDesc}
            </p>
            <div className="p-4 bg-slate-50 dark:bg-[#0E1714] rounded-2xl text-xs sm:text-sm text-slate-700 dark:text-[#9DB0A6] mb-6 text-start border border-slate-200 dark:border-[#243B32]">
              <div className="font-bold text-slate-900 dark:text-white">{l.campusLoc}</div>
              <div className="mt-0.5">{siteConfig.address}</div>
              <div className="text-emerald-700 dark:text-[#34D399] mt-2 font-bold font-mono">
                {t.contact.officeHoursLabel}: {siteConfig.officeHours}
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl bg-[#123524] hover:bg-[#1a4b33] text-white font-bold text-sm transition-colors cursor-pointer shadow-xs"
            >
              {l.doneBtn}
            </button>
          </div>
        ) : (
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

            <form onSubmit={handleSubmit} className="space-y-4 text-start">
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
                  <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1.5">
                    {l.dateLabel}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-3 rounded-2xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm focus:ring-2 focus:ring-[#133829] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#6B7280] dark:text-[#9DB0A6] uppercase mb-1.5">
                    {l.timeLabel}
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-3 rounded-2xl border border-[#E8E4DC] dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-[#133829] dark:text-white text-sm focus:ring-2 focus:ring-[#133829] outline-none"
                  >
                    <option value="10:00 AM">10:00 AM</option>
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
                  className="flex-1 py-4 rounded-2xl bg-[#D93829] hover:bg-[#b92c1e] text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  {l.submitBtn} →
                </button>
              </div>

              <p className="text-xs text-[#6B7280] dark:text-[#9DB0A6] text-center">
                {l.footerNote}
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
