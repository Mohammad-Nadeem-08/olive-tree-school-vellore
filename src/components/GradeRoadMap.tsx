import React, { useState } from 'react';
import {
  Baby,
  Smile,
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

export const GradeRoadMap: React.FC = () => {
  const { t, language, openAdmissionModal, theme } = useSchool();
  const [selectedGrade, setSelectedGrade] = useState<'prekg' | 'lkg' | 'ukg' | 'primary'>('prekg');

  const gradeDetails = {
    prekg: {
      id: 'prekg',
      tabLabel: 'Pre-KG',
      title: t.grades.preKgTitle,
      age: t.grades.preKgAge,
      description: t.grades.preKgDesc,
      icon: Baby,
      skills: {
        en: [
          'Sensory Play & Montessori Touch Tools',
          'Fine Motor Skills & Finger Grip Training',
          'Joyful Phonics & Rhymes (English & Tamil)',
          'Basic Masnoon Duas (Bismillah, Alhamdu Lillah)',
          'Warm, Caring Caregiver Ratio (1:10)',
        ],
        ta: [
          'தொடுவுணர்வு விளையாட்டு & மாண்டிசோரி பயிற்சிகள்',
          'விரல் பிடிப்பு மற்றும் நுண் இயக்கத் திறன் மேம்பாடு',
          'மகிழ்ச்சியான ஒலிப்புமுறை & மழலையர் பாடல்கள் (ஆங்கிலம், தமிழ்)',
          'அடிப்படை மஸ்னூன் துஆக்கள் (பிஸ்மில்லாஹ், அல்ஹம்துலில்லாஹ்)',
          'அன்பான தனித்துவக் கவனிப்பு (1:10 விகிதம்)',
        ],
        ur: [
          'حسی کھیل اور مونٹیسوری طریقہ تدریس',
          'فائن موٹر مہارتیں اور لکھائی کی ابتدائی گرفت',
          'خوشگوار فونکس اور نظمیں (انگریزی اور تمل)',
          'بنیادی مسنون دعائیں (بسم اللہ، الحمد للہ)',
          'انتہائی مشفقانہ دیکھ بھال (1:10 کا تناسب)',
        ],
      },
      routine: {
        en: [
          { time: '09:00 AM', event: 'Morning Welcome & Warm-up Circle' },
          { time: '10:00 AM', event: 'Sensory Craft & Phonics Singing' },
          { time: '11:15 AM', event: 'Healthy Snack & Table Manners' },
          { time: '12:00 PM', event: 'Islamic Stories & Playful Rhymes' },
        ],
        ta: [
          { time: 'காலை 09:00', event: 'காலை வரவேற்பு & உடற்பயிற்சி வட்டம்' },
          { time: 'காலை 10:00', event: 'புலன்சார் கைவினை & ஒலிப்புமுறை பாட்டு' },
          { time: 'காலை 11:15', event: 'சிற்றுண்டி நேரம் & சுன்னாஹ் உணவு முறை' },
          { time: 'மதியம் 12:00', event: 'இஸ்லாமிய கதைகள் & மழலையர் பாடல்கள்' },
        ],
        ur: [
          { time: '09:00 صبح', event: 'صبح کا استقبال اور تعارفی سرگرمیاں' },
          { time: '10:00 صبح', event: 'حسی فن پارے اور فونکس کی مشق' },
          { time: '11:15 صبح', event: 'صحت بخش ناشتہ اور کھانے کے آداب' },
          { time: '12:00 دوپہر', event: 'اسلامی کہانیاں اور تعلیمی نظمیں' },
        ],
      },
    },
    lkg: {
      id: 'lkg',
      tabLabel: 'LKG',
      title: t.grades.lkgTitle,
      age: t.grades.lkgAge,
      description: t.grades.lkgDesc,
      icon: Smile,
      skills: {
        en: [
          'Alphabet Writing & Letter Phonics Foundations',
          'Arabic Alphabet Primer & Recognition',
          'Counting 1 to 50 & Number Sense Tools',
          'Daily Sunnah Etiquettes of Drinking & Eating',
          'Colors, Shapes & Environmental Awareness',
        ],
        ta: [
          'எழுத்துப் பயிற்சி & தொடக்க ஒலிப்பு முறை',
          'அரபி எழுத்துக்கள் அறிமுகம் & வாசிப்பு',
          'எண்கள் 1 முதல் 50 வரை அறிதல் & கணித அடிப்படைகள்',
          'உணவு, நீர் அருந்துவதற்கான சுன்னாஹ் ஒழுக்கங்கள்',
          'வண்ணங்கள், வடிவங்கள் மற்றும் சுற்றுச்சூழல் விழிப்புணர்வு',
        ],
        ur: [
          'حروف تہجی کی پہچان اور درست تلفظ',
          'عربی قاعدہ اور ابتدائی مخارج شناسی',
          'گنتی 1 تا 50 اور ریاضی کی بنیادی سمجھ',
          'کھانے پینے کی روزمرہ مسنون سنتیں',
          'رنگ، اشکال اور ماحولیاتی شعور کی بیداری',
        ],
      },
      routine: {
        en: [
          { time: '09:00 AM', event: 'Assembly & Morning Adhkar Recitation' },
          { time: '10:00 AM', event: 'English & Tamil Literacy Workstations' },
          { time: '11:30 AM', event: 'Arabic Alphabet & Tajweed Primer' },
          { time: '01:00 PM', event: 'Number Play & Creative Expression' },
        ],
        ta: [
          { time: 'காலை 09:00', event: 'காலை அசெம்பிளி & திக்ர் ஓதுதல்' },
          { time: 'காலை 10:00', event: 'ஆங்கிலம் & தமிழ் மொழி பயிற்சி' },
          { time: 'காலை 11:30', event: 'அரபி எழுத்துக்கள் & தஜ்வீது தொடக்கம்' },
          { time: 'மதியம் 01:00', event: 'எண் விளையாட்டு & படைப்பாற்றல் பயிற்சி' },
        ],
        ur: [
          { time: '09:00 صبح', event: 'مارننگ اسمبلی اور صبح کے مسنون اذکار' },
          { time: '10:00 صبح', event: 'انگریزی اور تمل زبان کی عملی کلاسز' },
          { time: '11:30 صبح', event: 'عربی حروف شناسی اور تجوید کا تعارف' },
          { time: '01:00 دوپہر', event: 'اعداد کا کھیل اور تخلیقی سرگرمیاں' },
        ],
      },
    },
    ukg: {
      id: 'ukg',
      tabLabel: 'UKG',
      title: t.grades.ukgTitle,
      age: t.grades.ukgAge,
      description: t.grades.ukgDesc,
      icon: Award,
      skills: {
        en: [
          'Early Sight Words & Fluent Sentence Reading',
          'Basic Addition, Subtraction & Math Puzzles',
          'Quranic Phonetics & Short Surahs (Juz Amma)',
          'Polite Akhlaq & Loving Respect for Parents',
          'Public Speaking & Confidence in Assembly',
        ],
        ta: [
          'சொற்கள் வாசிப்பு & சரளமான வாக்கியப் பயிற்சி',
          'அடிப்படை கூட்டல், கழித்தல் & கணிதப் புதிர்கள்',
          'தஜ்வீதுடன் குர்ஆன் ஓதுதல் & ஜுஸ்வு அம்மா சூராக்கள்',
          'பெற்றோர் மீது பணிவும் நற்பண்புகளும்',
          'அசெம்பிளியில் மேடைப் பேச்சு மற்றும் தன்னம்பிக்கை',
        ],
        ur: [
          'آسان الفاظ کی روانی اور جملہ خوانی کی مشق',
          'بنیادی جمع و تفریق اور ذہنی پہیلیاں',
          'تجوید کے ساتھ قرآن ناظرہ اور جزء عم کی سورتیں',
          'والدین کا بے پایاں ادب اور شائستہ اخلاق',
          'اسٹیج پر بولنے کی صلاحیت اور خود اعتمادی',
        ],
      },
      routine: {
        en: [
          { time: '09:00 AM', event: 'Assembly, Tilawat & Morning Dua' },
          { time: '09:45 AM', event: 'Reading, Sight Words & Handwriting' },
          { time: '11:15 AM', event: 'Math Operations & Logical Blocks' },
          { time: '01:30 PM', event: 'Quran Tajweed & Daily Hadees' },
        ],
        ta: [
          { time: 'காலை 09:00', event: 'அசெம்பிளி, திலாவத் & காலை துஆ' },
          { time: 'காலை 09:45', event: 'வாசிப்புப் பயிற்சி & அழகிய கையெழுத்து' },
          { time: 'காலை 11:15', event: 'கணித செயல்பாடுகள் & தர்க்க பயிற்சி' },
          { time: 'மதியம் 01:30', event: 'தஜ்வீதுடன் குர்ஆன் & எளிய ஹதீஸ்' },
        ],
        ur: [
          { time: '09:00 صبح', event: 'اسمبلی، تلاوتِ کلام پاک اور مسنون دعا' },
          { time: '09:45 صبح', event: 'خوشخطی، الفاظ شناسی اور عبارت خوانی' },
          { time: '11:15 صبح', event: 'ریاضی کے بنیادی سوالات اور منطق' },
          { time: '01:30 دوپہر', event: 'تجوید القرآن اور روزانہ حدیث کی تعلیم' },
        ],
      },
    },
    primary: {
      id: 'primary',
      tabLabel: '1st - 5th Std',
      title: t.grades.primaryTitle,
      age: t.grades.primaryAge,
      description: t.grades.primaryDesc,
      icon: GraduationCap,
      skills: {
        en: [
          'Complete 10-Subject Comprehensive Curriculum',
          'Smart Interactive Computer Lab & Touch Typing',
          '5 Languages Fluency (En, Ta, Ur, Ar, Hi)',
          'Quran Recitation with Tajweed & Hadith Mastery',
          'Science Experiments, Math Olympiad & GK Quizzes',
        ],
        ta: [
          '10 பாடங்கள் கொண்ட விரிவான கல்வித் திட்டம்',
          'ஸ்மார்ட் கணினி ஆய்வகம் & தட்டச்சு பயிற்சி',
          '5 மொழிகள் சரளமாக பேசும் எழுதும் திறன்',
          'முறையான தஜ்வீதுடன் குர்ஆன் & ஹதீஸ் மனனம்',
          'அறிவியல் செய்முறைகள், கணித ஒலிம்பியாட் & பொது அறிவு',
        ],
        ur: [
          'مکمل 10 عصری مضامین پر مبنی مضبوط نصاب',
          'اسمارٹ کمپیوٹر لیب اور ٹائپنگ کی باقاعدہ مشق',
          '5 زبانوں (انگریزی، اردو، تمل، عربی، ہندی) میں روانی',
          'تجوید کے ساتھ تلاوت اور منتخب احادیث کا حفظ',
          'عملی سائنسی تجربات، ریاضی اولمپیاڈ اور معلومات عامہ',
        ],
      },
      routine: {
        en: [
          { time: '09:00 AM', event: 'Assembly, National Anthem & Daily Dua' },
          { time: '09:30 AM', event: 'Core Academic Classes (Math, Sci, English)' },
          { time: '11:45 AM', event: 'Language Mastery & Computer Lab' },
          { time: '01:45 PM', event: 'Quran Tajweed, Tarbiyah & Akhlaq' },
        ],
        ta: [
          { time: 'காலை 09:00', event: 'அசெம்பிளி, தேசிய கீதம் & தினசரி துஆ' },
          { time: 'காலை 09:30', event: 'முக்கிய பாடங்கள் (கணிதம், அறிவியல், ஆங்கிலம்)' },
          { time: 'காலை 11:45', event: 'மொழித் திறன் & கணினி ஆய்வக பயிற்சி' },
          { time: 'மதியம் 01:45', event: 'குர்ஆன் தஜ்வீத், தர்பிய்யா & நன்னடத்தை' },
        ],
        ur: [
          { time: '09:00 صبح', event: 'مارننگ اسمبلی، قومی ترانہ اور دعائے صبح' },
          { time: '09:30 صبح', event: 'اہم تدریسی پیریڈز (ریاضی، سائنس، انگریزی)' },
          { time: '11:45 صبح', event: 'زبانوں کی مہارت اور کمپیوٹر لیب کلاس' },
          { time: '01:45 دوپہر', event: 'تجوید القرآن، اخلاق و آداب اور مسنون تربیت' },
        ],
      },
    },
  };

  const current = gradeDetails[selectedGrade];
  const IconComponent = current.icon;

  const currentSkills = current.skills[language] || current.skills.en;
  const currentRoutine = current.routine[language] || current.routine.en;

  return (
    <section
      id="grades"
      className={`py-20 relative transition-colors ${
        theme === 'dark' ? 'bg-[#0E1714] text-[#F3F7F4]' : 'bg-[#F4F7F5] text-slate-900'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 shadow-xs">
            <Layers className="w-4 h-4 text-amber-300" />
            <span>{t.grades.tagline}</span>
          </div>

          <h2
            className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            } tracking-tight ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
          >
            {t.grades.title}
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg font-medium ${
              theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
            } leading-relaxed ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
          >
            {t.grades.description}
          </p>

          {/* Interactive Grade Tab Selector */}
          <div
            className={`mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2 rounded-2xl max-w-2xl mx-auto border ${
              theme === 'dark' ? 'bg-[#16241F] border-[#243B32]' : 'bg-white border-slate-200'
            }`}
          >
            {(['prekg', 'lkg', 'ukg', 'primary'] as const).map((gradeKey) => {
              const item = gradeDetails[gradeKey];
              const isSelected = selectedGrade === gradeKey;
              return (
                <button
                  key={gradeKey}
                  type="button"
                  onClick={() => setSelectedGrade(gradeKey)}
                  className={`py-3.5 px-3 rounded-xl text-sm sm:text-base font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : theme === 'dark'
                      ? 'text-[#9DB0A6] hover:text-white hover:bg-[#0E1714]'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={`font-editorial font-bold ${isSelected ? 'text-amber-200' : ''}`}>
                    {item.tabLabel}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      isSelected
                        ? 'text-white/80'
                        : theme === 'dark'
                        ? 'text-[#9DB0A6]'
                        : 'text-slate-500'
                    }`}
                  >
                    {item.age}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Grade Detailed Showcase Card */}
        <div
          className={`rounded-3xl border p-8 sm:p-12 shadow-md shadow-slate-900/5 relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
              : 'bg-white border-slate-200/90 text-slate-900'
          }`}
        >
          {/* Top accent hairline */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-700" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-start">
            {/* Left 7 Columns: Core Description & Key Highlights */}
            <div className="lg:col-span-7 text-start">
              <div className="flex flex-wrap items-center gap-3.5 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl shadow-xs border flex items-center justify-center text-white ${
                    theme === 'dark'
                      ? 'bg-[#0E1714] border-[#243B32]'
                      : 'bg-emerald-700 border-emerald-800'
                  }`}
                >
                  <IconComponent className="w-7 h-7 text-amber-300" />
                </div>
                <div>
                  <h3
                    className={`font-editorial text-2xl sm:text-3xl font-extrabold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    } ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
                  >
                    {current.title}
                  </h3>
                  <span className="inline-block mt-1 text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-700 text-white shadow-xs">
                    {current.age}
                  </span>
                </div>
              </div>

              <p
                className={`text-base sm:text-lg leading-relaxed mb-8 ${
                  theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                } ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
              >
                {current.description}
              </p>

              {/* Skills and Outcomes Checklist with generous font size */}
              <div className="space-y-3 mb-8">
                <h4
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-500'
                  }`}
                >
                  {t.grades.milestonesHeading}:
                </h4>
                {currentSkills.map((skill, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 text-sm sm:text-base font-medium ${
                      theme === 'dark' ? 'text-[#F3F7F4]' : 'text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-[#34D399] shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={openAdmissionModal}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#D93829] hover:bg-[#b92c1e] text-white font-bold text-base transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>
                  Admissions for {current.tabLabel} (2026–27) →
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </button>
            </div>

            {/* Right 5 Columns: Typical Daily Schedule Card */}
            <div className="lg:col-span-5 text-start">
              <div
                className={`rounded-3xl p-7 border shadow-xs ${
                  theme === 'dark'
                    ? 'bg-[#0E1714] border-[#243B32] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <div
                  className={`flex items-center justify-between pb-5 border-b ${
                    theme === 'dark' ? 'border-[#243B32]' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <h4 className="font-editorial font-bold text-lg text-slate-900 dark:text-white">
                      {t.grades.dayIn} {current.tabLabel}
                    </h4>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-md shadow-xs ${
                      theme === 'dark'
                        ? 'bg-[#16241F] text-[#9DB0A6] border border-[#243B32]'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    {t.grades.hoursRange}
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  {currentRoutine.map((slot, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-4 relative">
                      {rIdx !== currentRoutine.length - 1 && (
                        <div
                          className={`absolute start-2.5 top-6 w-0.5 h-10 ${
                            theme === 'dark' ? 'bg-[#243B32]' : 'bg-slate-200'
                          }`}
                        />
                      )}
                      <div className="w-5 h-5 rounded-full bg-[#D97706]/20 border-2 border-[#D97706] shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-mono font-bold text-[#D97706] uppercase tracking-wide block">
                          {slot.time}
                        </span>
                        <span
                          className={`text-sm sm:text-base font-bold mt-0.5 block ${
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {slot.event}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`mt-8 p-4 rounded-2xl border text-sm font-medium ${
                  theme === 'dark'
                    ? 'border-[#243B32] bg-[#16241F] text-[#9DB0A6]'
                    : 'border-slate-200 bg-white text-slate-800'
                }`}>
                  <span className="font-bold text-[#D97706] dark:text-[#FDE68A]">
                    {t.grades.personalizedCareTitle}:
                  </span>{' '}
                  {t.grades.personalizedCareDesc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
