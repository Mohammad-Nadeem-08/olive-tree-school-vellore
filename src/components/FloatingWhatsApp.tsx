import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const FloatingWhatsApp: React.FC = () => {
  const { language, siteConfig, t } = useSchool();

  const getWhatsAppMessage = () => {
    if (language === 'ta') {
      return 'அஸ்ஸலாமு அலைக்கும்! ஆலிவ் ட்ரீ பள்ளியில் 2026-2027 மாணவர் சேர்க்கை குறித்து அறிய விரும்புகிறேன் (வேலூர் வளாகம்).';
    }
    if (language === 'ur') {
      return 'السلام علیکم! میں اولیو ٹری اسکول، ویلور میں تعلیمی سال 2026-2027 کے داخلوں کے متعلق معلومات حاصل کرنا چاہتا/چاہتی ہوں۔';
    }
    return `Assalamu Alaikum! I would like to inquire about Pre-KG to 5th Std admissions for 2026-2027 at Olive Tree School (with Brainy Stars International), Kaspa, Vellore.`;
  };

  const cleanPhone = siteConfig.primaryPhone.replace(/\D/g, '') || '8610113160';
  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <div className="fixed bottom-6 end-6 z-40 flex items-center group">
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
        aria-label="Direct WhatsApp Chat"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white/80"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />

        {/* Live indicator dot */}
        <span className="absolute top-1 end-1 w-3 h-3 bg-amber-300 rounded-full border-2 border-[#25D366]"></span>
      </a>
    </div>
  );
};
