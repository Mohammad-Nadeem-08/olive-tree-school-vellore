import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  MessageSquare,
  TreePine,
  Lock,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const ContactFooter: React.FC = () => {
  const {
    t,
    siteConfig,
    language,
    openAdminLoginModal,
    openAdmissionModal,
    isAdminAuthenticated,
    logoutAdmin,
    theme,
  } = useSchool();

  return (
    <footer
      id="contact"
      className={`relative pt-20 pb-12 overflow-hidden border-t transition-colors ${
        theme === 'dark'
          ? 'bg-[#0E1714] text-[#F3F7F4] border-[#243B32]'
          : 'bg-[#F4F7F5] text-slate-900 border-slate-200'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        {/* Top Contact Highlight Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 shadow-xs">
            <MapPin className="w-4 h-4 text-[#F59E0B]" />
            <span>{t.contact.tagline}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-start">
            <div className="lg:col-span-7 text-start">
              <h2
                className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-[#123524]'
                } tracking-tight ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
              >
                {t.contact.title}
              </h2>
              <p
                className={`mt-3 text-base sm:text-lg font-medium max-w-xl leading-relaxed ${
                  theme === 'dark' ? 'text-[#9DB0A6]' : 'text-[#3D5245]'
                } ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
              >
                {t.contact.description}
              </p>

              {/* Contact Information Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                {/* Location Card */}
                <div
                  className={`p-6 rounded-3xl border transition-colors text-start ${
                    theme === 'dark'
                      ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                      : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[#123524] dark:text-[#34D399] font-mono font-bold text-xs uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>{t.contact.addressLabel}</span>
                  </div>
                  <p
                    className={`text-sm sm:text-base font-semibold leading-relaxed ${
                      theme === 'dark' ? 'text-[#F3F7F4]' : 'text-slate-900'
                    }`}
                  >
                    {siteConfig.address}
                  </p>
                  <div
                    className={`mt-3 text-xs font-semibold flex items-center gap-1.5 ${
                      theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                    }`}
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{t.contact.directionsDesc}</span>
                  </div>
                </div>

                {/* Office Hours Card */}
                <div
                  className={`p-6 rounded-3xl border transition-colors text-start ${
                    theme === 'dark'
                      ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                      : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[#123524] dark:text-[#34D399] font-mono font-bold text-xs uppercase tracking-wider mb-2">
                    <Clock className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>{t.contact.officeHoursLabel}</span>
                  </div>
                  <p
                    className={`text-sm sm:text-base font-semibold leading-relaxed ${
                      theme === 'dark' ? 'text-[#F3F7F4]' : 'text-slate-900'
                    }`}
                  >
                    {siteConfig.officeHours}
                  </p>
                  <span className="inline-block mt-3 text-xs font-mono font-bold bg-[#123524] text-white px-3.5 py-1 rounded-full shadow-xs">
                    {t.contact.officeHoursNotice}
                  </span>
                </div>

                {/* Direct Helplines */}
                <div
                  className={`p-6 rounded-3xl border transition-colors text-start ${
                    theme === 'dark'
                      ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                      : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[#123524] dark:text-[#34D399] font-mono font-bold text-xs uppercase tracking-wider mb-2">
                    <Phone className="w-4 h-4 text-[#123524] dark:text-[#34D399] shrink-0" />
                    <span>{t.contact.phonesLabel}</span>
                  </div>
                  <div
                    className={`flex flex-col space-y-2 text-sm sm:text-base font-bold font-mono ${
                      theme === 'dark' ? 'text-white' : 'text-[#123524]'
                    }`}
                  >
                    <a
                      href={`tel:+91${siteConfig.primaryPhone.replace(/\s+/g, '')}`}
                      className="hover:text-[#D93829] transition-colors flex items-center justify-between"
                    >
                      <span>{siteConfig.primaryPhone}</span>
                      <span className="text-[11px] font-mono font-bold bg-[#D97706] text-white px-2.5 py-0.5 rounded shadow-xs">
                        {t.contact.whatsAppDesk}
                      </span>
                    </a>
                    <a
                      href={`tel:+91${siteConfig.secondaryPhone.replace(/\s+/g, '')}`}
                      className="hover:text-[#D93829] transition-colors"
                    >
                      <span>{siteConfig.secondaryPhone}</span>
                    </a>
                    <a
                      href={`tel:+91${siteConfig.altPhone.replace(/\s+/g, '')}`}
                      className="hover:text-[#D93829] transition-colors"
                    >
                      <span>{siteConfig.altPhone}</span>
                    </a>
                  </div>
                </div>

                {/* Email Desk */}
                <div
                  className={`p-6 rounded-3xl border transition-colors text-start ${
                    theme === 'dark'
                      ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                      : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[#123524] dark:text-[#34D399] font-mono font-bold text-xs uppercase tracking-wider mb-2">
                    <Mail className="w-4 h-4 text-[#D93829] shrink-0" />
                    <span>{t.contact.emailLabel}</span>
                  </div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className={`text-sm font-bold font-mono hover:text-[#D93829] transition-colors break-all block ${
                      theme === 'dark' ? 'text-[#F3F7F4]' : 'text-slate-900'
                    }`}
                  >
                    {siteConfig.email}
                  </a>
                  <div className="mt-4">
                    <a
                      href="https://wa.me/918610113160"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#123524] dark:text-[#34D399] hover:text-[#D93829] dark:hover:text-[#D93829] font-bold cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#D97706]" />
                      <span>{t.contact.chatOnWhatsApp} →</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Map / Direction Visual Card */}
            <div
              className={`lg:col-span-5 p-7 rounded-3xl border relative overflow-hidden text-start ${
                theme === 'dark'
                  ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                  : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
              }`}
            >
              <div
                className={`flex items-center justify-between pb-4 border-b ${
                  theme === 'dark' ? 'border-[#243B32]' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#123524] dark:bg-[#34D399]" />
                  <span className="font-editorial font-bold text-base text-[#123524] dark:text-white">
                    {t.hero.trustCampus}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold bg-[#1E3A8A] text-white px-3 py-1 rounded shadow-xs">
                  {t.contact.pincodeLabel}
                </span>
              </div>

              {/* Interactive Google Maps Embed */}
              <div className="my-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#243B32] shadow-2xs">
                <iframe
                  title="Olive Tree School Location - Kaspa, Vellore"
                  src="https://maps.google.com/maps?q=Kaspa,+Vellore,+Tamil+Nadu+632001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="210"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full block"
                />
                <div
                  className={`px-4 py-2.5 text-xs flex items-center justify-between font-medium ${
                    theme === 'dark'
                      ? 'bg-[#0E1714] text-[#9DB0A6] border-t border-[#243B32]'
                      : 'bg-slate-50 text-slate-800 border-t border-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5 font-bold text-[#123524] dark:text-[#34D399]">
                    <MapPin className="w-3.5 h-3.5 text-[#D93829] shrink-0" />
                    <span>Kaspa, Vellore — 632 001</span>
                  </span>
                  <a
                    href="https://maps.google.com/?q=Kaspa,+Vellore,+Tamil+Nadu+632001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#123524] dark:text-[#34D399] hover:underline font-bold text-[11px]"
                  >
                    Open Map ↗
                  </a>
                </div>
              </div>

              {/* Campus Address Snippet */}
              <div className="p-3.5 mb-5 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold">
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">
                  {siteConfig.address}
                </div>
                <div className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1 mt-1">
                  <span>✓ {t.contact.accessibleVellore}</span>
                </div>
              </div>

              {/* CTA Action */}
              <button
                type="button"
                onClick={openAdmissionModal}
                className="w-full py-4 px-6 rounded-2xl bg-[#D93829] hover:bg-[#b92c1e] text-white font-bold text-base transition-all text-center shadow-md hover:shadow-lg cursor-pointer"
              >
                {t.contact.bookCampusTour} →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Dual Brands, Rights & Staff Login */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm ${
            theme === 'dark'
              ? 'border-[#243B32] text-[#9DB0A6]'
              : 'border-slate-200 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#123524] flex items-center justify-center text-white font-bold shadow-xs">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <div className="text-start">
              <span className={`font-bold font-editorial ${theme === 'dark' ? 'text-white' : 'text-[#123524]'}`}>
                {t.branding.schoolName}
              </span>
              <span className="text-[#3D5245] mx-2">•</span>
              <span
                className={`font-semibold ${
                  theme === 'dark' ? 'text-[#9DB0A6]' : 'text-[#3D5245]'
                }`}
              >
                {t.branding.coBrandBadge}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="font-medium">{t.footer.rights}</span>

            {/* Staff Admin Login Button */}
            {isAdminAuthenticated ? (
              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1.5 text-[#D93829] hover:underline font-bold transition-colors cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>{t.footer.logoutAdmin}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openAdminLoginModal}
                className={`inline-flex items-center gap-1.5 font-bold transition-colors border px-3.5 py-1.5 rounded-xl shadow-xs cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#16241F] hover:bg-[#243B32] text-[#9DB0A6] border-[#243B32]'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <Lock className="w-4 h-4 text-slate-700 dark:text-[#34D399]" />
                <span>{t.footer.staffAdminLogin}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
