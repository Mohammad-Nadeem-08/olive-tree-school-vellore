import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { normalizeWhatsAppNumber, formatPhoneDisplay } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const {
    language,
    siteConfig,
    t,
    isAdminAuthenticated,
    isAdminLoginModalOpen,
    isAdmissionModalOpen,
    isVisitModalOpen,
  } = useSchool();

  // Hide floating WhatsApp button whenever a modal overlay is active to prevent any hit-testing overlap
  if (isAdminLoginModalOpen || isAdmissionModalOpen || isVisitModalOpen) {
    return null;
  }

  const getWhatsAppMessage = () => {
    const year = siteConfig.admissionYear;
    if (language === 'ta') {
      return `அஸ்ஸலாமு அலைக்கும்! ஆலிவ் ட்ரீ பள்ளியில் ${year} மாணவர் சேர்க்கை குறித்து அறிய விரும்புகிறேன் (வேலூர் வளாகம்).`;
    }
    if (language === 'ur') {
      return `السلام علیکم! میں اولیو ٹری اسکول، ویلور میں تعلیمی سال ${year} کے داخلوں کے متعلق معلومات حاصل کرنا چاہتا/چاہتی ہوں۔`;
    }
    return `Assalamu Alaikum! I would like to inquire about Pre-KG to 5th Std admissions for ${year} at Olive Tree School (with Brainy Stars International), Kaspa, Vellore.`;
  };

  const cleanPhone = normalizeWhatsAppNumber(siteConfig.primaryPhone);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <div
      id="floating-whatsapp-desk"
      className={`fixed ${
        isAdminAuthenticated
          ? 'bottom-20 right-3.5 sm:bottom-6 sm:right-6 rtl:right-auto rtl:left-3.5 rtl:sm:left-6 end-3.5 sm:end-6'
          : 'bottom-4 right-3.5 sm:bottom-6 sm:right-6 rtl:right-auto rtl:left-3.5 rtl:sm:left-6 end-3.5 sm:end-6'
      } z-40 flex items-center group transition-all duration-300 pointer-events-none`}
    >
      {/* Tooltip on hover */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#133829] text-white text-xs font-semibold me-3 shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse inline-block" />
        <span>{t.contact.whatsAppDesk}</span>
      </div>

      {/* Floating Button with WhatsApp Emerald Glow */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Direct WhatsApp Chat (${formatPhoneDisplay(siteConfig.primaryPhone)})`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white/80 cursor-pointer pointer-events-auto"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 pointer-events-none"></span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-[#25D366]" />

        {/* Live indicator dot */}
        <span className="absolute top-0.5 end-0.5 sm:top-1 sm:end-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-300 rounded-full border-2 border-[#25D366]"></span>
      </a>
    </div>
  );
};
