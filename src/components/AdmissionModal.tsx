import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  User,
  Phone,
  MessageSquare,
  Calendar,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { WhatsAppSimulatorModal } from './WhatsAppSimulatorModal';

export const AdmissionModal: React.FC = () => {
  const { isAdmissionModalOpen, closeAdmissionModal, language } = useSchool();

  const [studentName, setStudentName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('Pre-KG');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'New Admission 2026-27' | 'Schedule Campus Visit'>('New Admission 2026-27');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formattedWaMessage, setFormattedWaMessage] = useState('');

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStudentName('');
    setAge('');
    setGrade('Pre-KG');
    setParentName('');
    setPhone('');
    setInquiryType('New Admission 2026-27');
    setMessage('');
    closeAdmissionModal();
  };

  useEffect(() => {
    if (!isAdmissionModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetAndClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmissionModalOpen]);

  if (!isAdmissionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentName.trim() || !phone.trim()) return;

    const formattedMessage = `*🏫 OLIVE TREE SCHOOL — NEW ADMISSION INQUIRY (2026-27)*
-----------------------------------------
*• Inquiry Type:* ${inquiryType}
*• Student Name:* ${studentName.trim()}
*• Child's Age / DOB:* ${age.trim() || 'Not specified'}
*• Applying for Grade:* ${grade}
*• Parent Name:* ${parentName.trim()}
*• Contact Number:* ${phone.trim()}
*• Message:* ${message.trim() || 'Requesting admission details & office visit slot.'}`;

    setFormattedWaMessage(formattedMessage);
    setIsSubmitted(true);
  };

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

  return (
    <div
      onClick={handleResetAndClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-[#16241F] text-slate-900 dark:text-[#F3F7F4] rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-[#243B32] relative my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 text-start cursor-default ${
          isSubmitted ? 'p-0 overflow-hidden' : 'p-6 sm:p-8'
        }`}
      >
        {!isSubmitted && (
          /* High-Visibility Sticky Close Button (X) for Form */
          <button
            type="button"
            onClick={handleResetAndClose}
            className="sticky top-2 float-right -mt-1 -me-1 z-20 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {isSubmitted ? (
          /* Strictly Local WhatsApp Chat Simulator Screen */
          <WhatsAppSimulatorModal
            isOpen={isSubmitted}
            onClose={handleResetAndClose}
            inquiryData={{
              inquiryType,
              studentName,
              age,
              grade,
              parentName,
              phone,
              message,
            }}
            formattedMessage={formattedWaMessage}
            onSendAnother={() => {
              setIsSubmitted(false);
              setStudentName('');
              setAge('');
              setGrade('Pre-KG');
              setParentName('');
              setPhone('');
              setInquiryType('New Admission 2026-27');
              setMessage('');
            }}
          />
        ) : (
          /* Active Parent Inquiry Form */
          <div>
            <div className="text-start mb-6 pe-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-700 text-white font-mono text-xs font-bold mb-3 shadow-xs">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Admissions 2026–27 Desk</span>
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
                Submit details below to connect directly with the school admissions office over WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-start">
              {/* Inquiry Type Radio Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                  Inquiry Purpose *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInquiryType('New Admission 2026-27')}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      inquiryType === 'New Admission 2026-27'
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
                  <span>Target Class for 2026–27 *</span>
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none transition-all shadow-2xs font-bold"
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
                  placeholder="e.g. Asking about van pickup from Kaspa, sibling fee concession, admission timeline..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-700 outline-none transition-all shadow-2xs"
                />
              </div>

              {/* Actions: Cancel/Close and Submit */}
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
                  className="flex-1 py-4 px-6 rounded-2xl font-bold text-base text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-98 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer ring-4 ring-emerald-500/20"
                >
                  <span className="text-xl">📲</span>
                  <span>Preview WhatsApp Message →</span>
                </button>
              </div>

              <div className="text-center text-xs text-slate-500 dark:text-[#9DB0A6] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-[#34D399]" />
                <span>Local WhatsApp chat simulation. No external browser redirects.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
