import React from 'react';
import { Award, TreePine, CheckCircle } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const AboutSection: React.FC = () => {
  const { language, t, theme } = useSchool();

  const content = {
    en: {
      estBadge: 'Est. 2013 • Kaspa, Vellore',
      heroCardTitle: '13+ Years of Nurturing Noble Character & Academic Minds',
      heroCardDesc:
        'Founded with a clear vision: to give every child a joyful, values-based early education combining modern academic supremacy with authentic Islamic Tarbiyah in a proper Sunnah way.',
      ratioLabel: 'Teacher-Student Ratio',
      tarbiyahLabel: 'Sunnah Tarbiyah',
      badge: 'About Our Philosophy',
      heading: 'Why Parents Choose Olive Tree School',
      description:
        'At Olive Tree School (in association with Brainy Stars International School), early education shapes the child’s intellect, character, and soul. Our dual-curriculum methodology ensures students excel in competitive academics while standing firmly rooted in noble Islamic manners (Akhlaq), loving respect for parents, and Sunnah values.',
      f1Title: 'Multilingual Fluency',
      f1Desc: 'Five languages taught actively — English, Tamil, Urdu, Arabic, and Hindi to build confident communicative mastery.',
      f2Title: 'Quran with Tajweed & Hadith',
      f2Desc: 'Daily tilawat with accurate phonetics (Makharij), short Surahs memorization, and practical Sunnah Duas for everyday life.',
      f3Title: 'Akhlaq Towards Parents',
      f3Desc: 'Instilling deep reverence, gentleness, empathy, and gratitude towards parents and elders as a daily living habit.',
      f4Title: 'Interactive Smart Lab & STEM',
      f4Desc: 'Touch typing, foundational computer logic, scientific experiments, and mental math in modern air-conditioned learning rooms.',
    },
    ta: {
      estBadge: 'தொடக்கம் 2013 • கஸ்பா, வேலூர்',
      heroCardTitle: '13+ ஆண்டுகால நற்பண்பும் நவீன கல்வியும் இணைந்த சேவை',
      heroCardDesc:
        'ஒவ்வொரு குழந்தைக்கும் சுன்னாஹ் வழியிலான இஸ்லாமிய தர்பிய்யா மற்றும் நவீன கல்விச் சிறப்பின் சமநிலையான இணைப்பில் மகிழ்ச்சியான ஆரம்பக் கல்வியை வழங்குவதே எங்கள் நோக்கம்.',
      ratioLabel: 'ஆசிரியர்-மாணவர் விகிதம்',
      tarbiyahLabel: 'சுன்னாஹ் தர்பிய்யா',
      badge: 'எங்கள் கல்விக் கோட்பாடு',
      heading: 'பெற்றோர்கள் ஏன் ஆலிவ் ட்ரீ பள்ளியைத் தேர்ந்தெடுக்கிறார்கள்?',
      description:
        'ஆலிவ் ட்ரீ பள்ளியில் (பிரைனி ஸ்டார்ஸ் இன்டர்நேஷனல் பள்ளியுடன் இணைந்து), ஆரம்பக் கல்வி என்பது குழந்தையின் அறிவு, ஆளுமை மற்றும் ஆன்மாவை செம்மைப்படுத்துகிறது. எங்கள் இருமுனை கல்வி முறை, மாணவர்கள் நவீன கல்விப் போட்டிகளில் சிறந்து விளங்கவும், உன்னதமான நன்னடத்தை (அக்லாக்), பெற்றோர் மீதான அன்பு மற்றும் சுன்னாஹ் விழுமியங்களில் நிலைத்திருக்கவும் உறுதி செய்கிறது.',
      f1Title: 'பன்மொழிப் புலமை',
      f1Desc: '5 மொழிகள் தொடக்கத்திலிருந்தே பயிற்றுவிக்கப்படுகின்றன — ஆங்கிலம், தமிழ், உருது, அரபி, இந்தி.',
      f2Title: 'தஜ்வீதுடன் குர்ஆன் & ஹதீஸ்',
      f2Desc: 'துல்லியமான உச்சரிப்புடன் கூடிய தினசரி குர்ஆன் திலாவத், சூராக்கள் மனனம் மற்றும் அன்றாட மஸ்னூன் துஆக்கள்.',
      f3Title: 'பெற்றோர் மீதான நற்பண்பு',
      f3Desc: 'பெற்றோரை கண்ணியப்படுத்துதல், கனிவாகப் பேசுதல், பணிவிடை செய்தல் மற்றும் நன்றியுணர்வை வளர்த்தல்.',
      f4Title: 'ஸ்மார்ட் கணினி ஆய்வகம் & அறிவியல்',
      f4Desc: 'கணினி அடிப்படைகள், தட்டச்சு பயிற்சி, எளிய அறிவியல் சோதனைகள் மற்றும் மனக்கணக்கு பயிற்சி.',
    },
    ur: {
      estBadge: 'قیام: 2013 • کاسپا، ویلور',
      heroCardTitle: '13+ سالہ اعلیٰ اخلاق و تعلیمی فضیلت کا سفر',
      heroCardDesc:
        'ایک پرخلوص عزم کے ساتھ قائم کردہ ادارہ تاکہ ہر بچے کو مسنون اسلامی تربیت اور عصری تعلیمی کمال کے متوازن امتزاج سے پرمسرت ماحول فراہم کیا جا سکے۔',
      ratioLabel: 'استاد و طالب علم کا تناسب',
      tarbiyahLabel: 'مسنون اسلامی تربیت',
      badge: 'ہمارا تعلیمی و فکری نظریہ',
      heading: 'والدین اولیو ٹری اسکول کا انتخاب کیوں کرتے ہیں؟',
      description:
        'اولیو ٹری اسکول (برینی اسٹارز انٹرنیشنل اسکول کے اشتراک سے) میں ابتدائی تعلیم بچے کے ذہن، اخلاق اور روح کو سنوارتی ہے۔ ہمارا دوہرا تعلیمی نصاب اس بات کو یقینی بناتا ہے کہ طلباء جدید عصری تعلیم میں نمایاں مقام حاصل کریں اور ساتھ ہی اسلامی آداب، والدین کا احترام اور سنتِ نبویؐ کے سانچے میں ڈھلیں۔',
      f1Title: 'کثیر لسانی مہارت',
      f1Desc: 'ابتدائی کلاسز سے ہی 5 زبانوں کی عملی تدریس — انگریزی، اردو، تمل، عربی اور ہندی تاکہ خود اعتمادی پیدا ہو۔',
      f2Title: 'تجوید کے ساتھ قرآن و احادیث',
      f2Desc: 'درست مخارج کے ساتھ روزانہ تلاوت، سورتوں کا حفظ اور روزمرہ زندگی کی مسنون دعائیں اور آداب۔',
      f3Title: 'والدین کا ادب و احترام',
      f3Desc: 'والدین کی دل سے تعظیم، ان کے سامنے نرم گفتاری، خدمت گزاری اور شکر گزاری کو روزمرہ عمل بنانا۔',
      f4Title: 'اسمارٹ کمپیوٹر لیب و سائنس',
      f4Desc: 'کمپیوٹر کی بنیادی تعلیم، ٹائپنگ کی مشق، سائنسی تجربات اور ذہنی ریاضی کے پریکٹیکلز۔',
    },
  };

  const c = content[language] || content.en;

  return (
    <section
      id="about"
      className={`py-20 relative overflow-hidden transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#121E19] text-[#F3F7F4]' : 'bg-[#EBF2EE] text-slate-900'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-start">
          {/* Left Column: Academic Heritage Showcase */}
          <div className="lg:col-span-5 relative">
            <div
              className={`relative rounded-3xl p-8 sm:p-10 border shadow-md shadow-slate-900/5 overflow-hidden transition-colors ${
                theme === 'dark'
                  ? 'bg-[#16241F] border-[#243B32] text-[#F3F7F4]'
                  : 'bg-white border-slate-200/90 text-slate-900'
              }`}
            >
              <div
                className={`absolute top-0 end-0 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
                  theme === 'dark' ? 'bg-amber-400/10' : 'bg-amber-500/10'
                }`}
              />

              <div className="relative z-10 text-start">
                <div className="w-14 h-14 rounded-2xl bg-emerald-700 flex items-center justify-center text-amber-300 mb-6 shadow-md">
                  <TreePine className="w-8 h-8" />
                </div>

                <span
                  className={`text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                    theme === 'dark' ? 'text-[#FDE68A]' : 'text-amber-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-600" /> {c.estBadge}
                </span>

                <h3
                  className={`font-heading text-2xl sm:text-3xl font-extrabold mt-2 leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {c.heroCardTitle}
                </h3>

                <p
                  className={`text-base mt-4 leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {c.heroCardDesc}
                </p>

                <div
                  className={`mt-8 pt-6 border-t grid grid-cols-2 gap-4 text-center ${
                    theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <div
                    className={`rounded-2xl p-4 border shadow-xs ${
                      theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="font-heading text-3xl font-black text-emerald-700 dark:text-emerald-400">
                      {t.stats.stat3Value}
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-extrabold mt-0.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
                      }`}
                    >
                      {c.ratioLabel}
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl p-4 border shadow-xs ${
                      theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="font-heading text-3xl font-black text-amber-600 dark:text-amber-400">
                      {t.stats.stat4Value}
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-extrabold mt-0.5 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
                      }`}
                    >
                      {c.tarbiyahLabel}
                    </div>
                  </div>
                </div>

                {/* Co-Brand Banner in Normal Document Flow - Zero Overlap */}
                <div
                  className={`mt-6 pt-5 border-t border-slate-200 dark:border-emerald-700/20 flex items-center justify-between gap-4 rounded-2xl p-3.5 ${
                    theme === 'dark'
                      ? 'bg-[#0E1714]/60 text-white'
                      : 'bg-slate-50 text-slate-900 border border-slate-200'
                  }`}
                >
                  <img
                    src="/brainy-stars-logo.jpeg"
                    alt="Brainy Stars International School"
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-auto object-contain rounded-md shrink-0 shadow-xs"
                  />
                  <div className="text-start">
                    <div
                      className={`text-xs font-bold leading-tight ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {t.branding.coBrandName}
                    </div>
                    <div
                      className={`text-[11px] font-bold mt-0.5 ${
                        theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                      }`}
                    >
                      ★ {t.branding.coBrandMotto}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission & 4 Core Strengths */}
          <div className="lg:col-span-7 text-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 bg-amber-100 text-amber-950 border border-amber-300 shadow-xs">
              <Award className="w-4 h-4 text-amber-700" />
              <span>{c.badge}</span>
            </div>

            <h2
              className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              } ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
            >
              {c.heading}
            </h2>

            <p
              className={`mt-4 text-lg sm:text-xl font-medium leading-relaxed ${
                theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
              } ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
            >
              {c.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              <div
                className={`p-5 rounded-3xl border transition-colors shadow-sm text-start ${
                  theme === 'dark'
                    ? 'bg-[#16241F] border-[#243B32] text-[#F3F7F4] hover:border-[#385B4D]'
                    : 'bg-white border-slate-200/90 text-slate-900 hover:border-emerald-700'
                }`}
              >
                <div
                  className={`flex items-center gap-2.5 font-bold text-base mb-1.5 ${
                    theme === 'dark' ? 'text-[#A7F3D0]' : 'text-emerald-800'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-[#A7F3D0] shrink-0" />
                  <span>{c.f1Title}</span>
                </div>
                <p
                  className={`text-sm sm:text-base leading-normal ${
                    theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                  }`}
                >
                  {c.f1Desc}
                </p>
              </div>

              <div
                className={`p-5 rounded-3xl border transition-colors shadow-sm text-start ${
                  theme === 'dark'
                    ? 'bg-[#16241F] border-[#243B32] text-[#F3F7F4] hover:border-[#385B4D]'
                    : 'bg-white border-slate-200/90 text-slate-900 hover:border-emerald-700'
                }`}
              >
                <div
                  className={`flex items-center gap-2.5 font-bold text-base mb-1.5 ${
                    theme === 'dark' ? 'text-[#A7F3D0]' : 'text-emerald-800'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-[#A7F3D0] shrink-0" />
                  <span>{c.f2Title}</span>
                </div>
                <p
                  className={`text-sm sm:text-base leading-normal ${
                    theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                  }`}
                >
                  {c.f2Desc}
                </p>
              </div>

              <div
                className={`p-5 rounded-3xl border transition-colors shadow-sm text-start ${
                  theme === 'dark'
                    ? 'bg-[#16241F] border-[#243B32] text-[#F3F7F4] hover:border-[#385B4D]'
                    : 'bg-white border-slate-200/90 text-slate-900 hover:border-emerald-700'
                }`}
              >
                <div
                  className={`flex items-center gap-2.5 font-bold text-base mb-1.5 ${
                    theme === 'dark' ? 'text-[#A7F3D0]' : 'text-emerald-800'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-[#A7F3D0] shrink-0" />
                  <span>{c.f3Title}</span>
                </div>
                <p
                  className={`text-sm sm:text-base leading-normal ${
                    theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                  }`}
                >
                  {c.f3Desc}
                </p>
              </div>

              <div
                className={`p-5 rounded-3xl border transition-colors shadow-sm text-start ${
                  theme === 'dark'
                    ? 'bg-[#16241F] border-[#243B32] text-[#F3F7F4] hover:border-[#385B4D]'
                    : 'bg-white border-slate-200/90 text-slate-900 hover:border-emerald-700'
                }`}
              >
                <div
                  className={`flex items-center gap-2.5 font-bold text-base mb-1.5 ${
                    theme === 'dark' ? 'text-[#A7F3D0]' : 'text-emerald-800'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-700 dark:text-[#A7F3D0] shrink-0" />
                  <span>{c.f4Title}</span>
                </div>
                <p
                  className={`text-sm sm:text-base leading-normal ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {c.f4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
