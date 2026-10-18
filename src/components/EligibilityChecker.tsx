import React, { useState } from 'react';
import {
  FileCheck2,
  GraduationCap,
  Download,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface GradeMilestone {
  ageLabel: string;
  gradeKey: string;
  gradeTitle: { en: string; ta: string; ur: string };
  badge: { en: string; ta: string; ur: string };
  timing: string;
  ratio: string;
  milestones: { en: string[]; ta: string[]; ur: string[] };
  requiresTc: boolean;
}

const ELIGIBILITY_DATA: GradeMilestone[] = [
  {
    ageLabel: '2.5 - 3.5 Years',
    gradeKey: 'Pre-KG',
    gradeTitle: { en: 'Pre-Kindergarten (Pre-KG)', ta: 'முன் மழலையர் பள்ளி (Pre-KG)', ur: 'پری کے جی (Pre-KG)' },
    badge: { en: 'Sensory Play & Montessori', ta: 'புலன்சார் & மாண்டிசோரி', ur: 'حسی کھیل اور مونٹیسوری' },
    timing: '09:00 AM - 12:30 PM',
    ratio: '1:10 Caregiver Ratio',
    milestones: {
      en: [
        'Sensory development & Montessori tactile tools',
        'Fine motor skills & pencil grip preparation',
        'Basic Masnoon Duas (Bismillah, Alhamdu Lillah)',
        'English & Tamil conversational rhymes',
      ],
      ta: [
        'தொடுவுணர்வு விளையாட்டு & மாண்டிசோரி பயிற்சிகள்',
        'விரல் பிடிப்பு மற்றும் நுண் இயக்கத் திறன் மேம்பாடு',
        'அடிப்படை மஸ்னூன் துஆக்கள் (பிஸ்மில்லாஹ், அல்ஹம்துலில்லாஹ்)',
        'ஆங்கிலம் மற்றும் தமிழ் மழலையர் பாடல்கள்',
      ],
      ur: [
        'حسی نشوونما اور مونٹیسوری طریقہ تدریس',
        'فائن موٹر مہارتیں اور لکھائی کی ابتدائی گرفت',
        'بنیادی مسنون دعائیں (بسم اللہ، الحمد للہ)',
        'انگریزی اور تمل تعلیمی نظمیں',
      ],
    },
    requiresTc: false,
  },
  {
    ageLabel: '3.5 - 4.5 Years',
    gradeKey: 'LKG',
    gradeTitle: { en: 'Lower Kindergarten (LKG)', ta: 'இள மழலையர் பள்ளி (LKG)', ur: 'ایل کے جی (LKG)' },
    badge: { en: 'Phonics & Arabic Primer', ta: 'எழுத்து ஒலிப்பு & அரபி அறிமுகம்', ur: 'فونکس اور عربی قاعدہ' },
    timing: '09:00 AM - 01:00 PM',
    ratio: '1:12 Teacher Ratio',
    milestones: {
      en: [
        'Alphabet phonics & pre-writing stroke exercises',
        'Arabic alphabet recognition with Makharij',
        'Counting 1 to 50 & early mathematical logic',
        'Sunnah eating, drinking & hygiene etiquette',
      ],
      ta: [
        'எழுத்து ஒலிப்புமுறை & ஆரம்ப எழுத்துப் பயிற்சிகள்',
        'மஃக்ரிஜுடன் கூடிய அரபி எழுத்துக்கள் அறிமுகம்',
        'எண்கள் 1 முதல் 50 வரை & கணித தர்க்க அடிப்படைகள்',
        'உணவு, நீர் அருந்துவதற்கான சுன்னாஹ் ஒழுக்கங்கள்',
      ],
      ur: [
        'حروف تہجی کی صوتی پہچان اور فونکس کی مشق',
        'مخارج کے ساتھ عربی قاعدہ کی درست پہچان',
        'گنتی 1 تا 50 اور ابتدائی ریاضیاتی تفہیم',
        'کھانے پینے کے مسنون آداب اور صفائی ستھرائی',
      ],
    },
    requiresTc: false,
  },
  {
    ageLabel: '4.5 - 5.5 Years',
    gradeKey: 'UKG',
    gradeTitle: { en: 'Upper Kindergarten (UKG)', ta: 'முதுநிலை மழலையர் பள்ளி (UKG)', ur: 'یو کے جی (UKG)' },
    badge: { en: 'Fluent Reading & Tajweed Primer', ta: 'வாசிப்பு & தஜ்வீத் பயிற்சி', ur: 'روانی سے پڑھائی اور تجوید' },
    timing: '09:00 AM - 02:30 PM',
    ratio: '1:15 Teacher Ratio',
    milestones: {
      en: [
        'CVC word blending & sight word sentence reading',
        'Arabic Qaida word joining & Tajweed rules',
        'Addition, subtraction & measurement shapes',
        '15+ Daily Masnoon Duas & Seerah bedtime stories',
      ],
      ta: [
        'சொற்கள் இணைத்தல் & வாக்கியங்கள் சரளமாக வாசித்தல்',
        'அரபி காயிதா எழுத்துக்கள் இணைத்தல் & தஜ்வீத் விதிகள்',
        'கூட்டல், கழித்தல் & வடிவங்கள் அறிதல்',
        '15+ தினசரி மஸ்னூன் துஆக்கள் & நபிகளாரின் வரலாற்று கதைகள்',
      ],
      ur: [
        'جملے روانی سے پڑھنا اور بنیادی انگریزی تحریر',
        'حروف کو جوڑ کر پڑھنا اور تجوید کے ابتدائی قواعد',
        'جمع اور تفریق کے بنیادی سوالات کا حل',
        '15 سے زائد مسنون دعائیں اور سیرت النبیﷺ کی کہانیاں',
      ],
    },
    requiresTc: false,
  },
  {
    ageLabel: '5.5 - 6.5 Years',
    gradeKey: '1st Std',
    gradeTitle: { en: '1st Standard (Primary)', ta: '1-ஆம் வகுப்பு (தொடக்கப்பள்ளி)', ur: 'پہلی جماعت (پرائمری)' },
    badge: { en: 'Cambridge STEM & 5 Languages', ta: 'கேம்பிரிட்ஜ் STEM & 5 மொழிகள்', ur: 'کیمبرج نصاب اور 5 زبانیں' },
    timing: '09:00 AM - 03:45 PM',
    ratio: '1:15 Class Ratio',
    milestones: {
      en: [
        'CBSE / Cambridge aligned Math and Science syllabus',
        'Active introduction to 5 languages (En, Ta, Ur, Ar, Hi)',
        'Quran reading with Tajweed & Juz Amma memorization',
        'Introduction to hands-on Computer Lab skills',
      ],
      ta: [
        'கணிதம் மற்றும் அறிவியல் பாடத்திட்ட அடிப்படைகள்',
        '5 மொழிகள் அறிமுகம் (ஆங்கிலம், தமிழ், உருது, அரபி, இந்தி)',
        'குர்ஆன் தஜ்வீத் & ஜூஸ்வு அம்மா மனனம் தொடக்கம்',
        'கணினி ஆய்வக செயல்முறை அறிமுகம்',
      ],
      ur: [
        'سی بی ایس ای اور کیمبرج کے ہم آہنگ نصابِ ریاضی و سائنس',
        '5 زبانوں (انگریزی، تمل، اردو، عربی، ہندی) کا باضابطہ آغاز',
        'درست تجوید کے ساتھ ناظرہ قرآن اور جزء عم کا حفظ',
        'کمپیوٹر لیب اور عملی مشقوں کا تعارف',
      ],
    },
    requiresTc: true,
  },
  {
    ageLabel: '6.5 - 7.5 Years',
    gradeKey: '2nd Std',
    gradeTitle: { en: '2nd Standard (Primary)', ta: '2-ஆம் வகுப்பு (தொடக்கப்பள்ளி)', ur: 'دوسری جماعت (پرائمری)' },
    badge: { en: 'Advanced STEM & English Grammar', ta: 'மேம்பட்ட STEM & இலக்கணம்', ur: 'اعلیٰ تعلیمی معیار اور گرامر' },
    timing: '09:00 AM - 03:45 PM',
    ratio: '1:15 Class Ratio',
    milestones: {
      en: [
        'Multiplication tables, word problems & critical thinking',
        'English creative writing & spelling bee preparation',
        'Daily morning Quran recitation with teacher feedback',
        'Basic coding concepts & keyboard typing proficiency',
      ],
      ta: [
        'பெருக்கல் வாய்பாடுகள், கணித புதிர்கள் & தர்க்க சிந்தனை',
        'ஆங்கில கட்டுரை எழுத்துப் பயிற்சி & எழுத்துப்பிழை திருத்தம்',
        'தினசரி காலை குர்ஆன் திலாவத் & ஆசிரியர் வழிகாட்டல்',
        'கணினி தட்டச்சு பயிற்சி & அடிப்படைக் குறியீட்டு முறை',
      ],
      ur: [
        'ضرب کے پہاڑے اور حسابی سوالات کی تفہیم',
        'تخلیقی تحریر اور ذخیرہ الفاظ میں اضافہ',
        'روزانہ صبح کی تلاوت قرآن اور استاد کی رہنمائی',
        'کی بورڈ ٹائپنگ اور بنیادی کمپیوٹر مہارتیں',
      ],
    },
    requiresTc: true,
  },
  {
    ageLabel: '7.5 - 8.5 Years',
    gradeKey: '3rd Std',
    gradeTitle: { en: '3rd Standard (Primary)', ta: '3-ஆம் வகுப்பு (தொடக்கப்பள்ளி)', ur: 'تیسری جماعت (پرائمری)' },
    badge: { en: 'Science Exploration & Robotics', ta: 'அறிவியல் ஆராய்ச்சி & ரோபாட்டிக்ஸ்', ur: 'سائنسی تحقیق اور روانی' },
    timing: '09:00 AM - 03:45 PM',
    ratio: '1:15 Class Ratio',
    milestones: {
      en: [
        'Hands-on science experiments in AC Smart Lab',
        'Advanced fractions, geometry shapes & mental math',
        'Hadith study: 20 short prophetic sayings with moral actions',
        'Debate & public presentation in morning school assembly',
      ],
      ta: [
        'குளிர்சாதன ஸ்மார்ட் ஆய்வகத்தில் அறிவியல் சோதனைகள்',
        'பின்னங்கள், வடிவியல் & மனக்கணக்கு பயிற்சிகள்',
        '20 நபிமொழிகள் மனனம் & நற்பண்பு நடைமுறை பயன்பாடுகள்',
        'காலை அசெம்பிளியில் உரை நிகழ்த்துதல் & விவாதப் பயிற்சி',
      ],
      ur: [
        'سمارٹ سائنس لیب میں عملی تجربات کا مشاہدہ',
        'کسور (Fractions) اور ہندسہ کے ابتدائی اصول',
        '20 مسنون احادیث کا فہم اور عملی کردار پر تطبیق',
        'مارننگ اسمبلی میں تقریری مقابلے اور خود اعتمادی',
      ],
    },
    requiresTc: true,
  },
  {
    ageLabel: '8.5 - 9.5 Years',
    gradeKey: '4th Std',
    gradeTitle: { en: '4th Standard (Primary)', ta: '4-ஆம் வகுப்பு (தொடக்கப்பள்ளி)', ur: 'چوتھی جماعت (پرائمری)' },
    badge: { en: 'Scientific Inquiry & Moral Leadership', ta: 'அறிவியல் கூர்மை & தலைமைப் பண்பு', ur: 'سائنسی تفتیش اور اخلاقی قیادت' },
    timing: '09:00 AM - 03:45 PM',
    ratio: '1:15 Class Ratio',
    milestones: {
      en: [
        'Environmental science projects, ecology & plant biology',
        'Long division, perimeter calculations & multi-step problems',
        'Seerah biography essay writing and moral analysis',
        'Digital presentation slides & typing speed mastery',
      ],
      ta: [
        'சுற்றுச்சூழல் அறிவியல் திட்டங்கள் & தாவர உயிரியல்',
        'நீண்ட வகுத்தல் & பலபடி கணித வினாக்கள் தீர்த்தல்',
        'நபிகளாரின் வாழ்க்கை வரலாற்று கட்டுரை எழுதுதல்',
        'டிஜிட்டல் விளக்கக்காட்சிகள் & விரைவு தட்டச்சு பயிற்சி',
      ],
      ur: [
        'ماحولیاتی سائنس اور حیاتیات کے بنیادی تصورات',
        'طویل تقسیم اور الجبرا کے ابتدائی مراحل',
        'سیرت النبیﷺ پر مضامین اور اخلاقی تجزیہ',
        'پاور پوائنٹ پریزنٹیشن اور ٹائپنگ میں مہارت',
      ],
    },
    requiresTc: true,
  },
  {
    ageLabel: '9.5 - 10.5 Years',
    gradeKey: '5th Std',
    gradeTitle: { en: '5th Standard (Senior Primary)', ta: '5-ஆம் வகுப்பு (மூத்த தொடக்கப்பள்ளி)', ur: 'پانچویں جماعت (سینئر پرائمری)' },
    badge: { en: 'Primary Graduate & High School Prep', ta: 'தொடக்கப்பள்ளி பட்டப்படிப்பு', ur: 'پرائمری گریجویشن اور مڈل سکول تیاری' },
    timing: '09:00 AM - 03:45 PM',
    ratio: '1:15 Class Ratio',
    milestones: {
      en: [
        'Comprehensive 6th-grade entrance & competitive readiness',
        'Trilingual fluency: essay writing in English, Tamil & Urdu',
        'Fiqh essentials (cleanliness, wudu, salah & daily etiquette)',
        'Student council leadership & sports event management',
      ],
      ta: [
        '6-ஆம் வகுப்பு சேர்க்கைக்கான போட்டித் தேர்வு தயார்நிலை',
        'மும்மொழிப் புலமை: ஆங்கிலம், தமிழ், உருது கட்டுரைத் திறன்',
        'அடிப்படை ஃபிக்ஹ் (தூய்மை, உளூ, தொழுகை & நன்னடத்தை)',
        'மாணவர் மன்றத் தலைமை & விளையாட்டு நிகழ்வு ஒருங்கிணைப்பு',
      ],
      ur: [
        'چھٹی جماعت میں داخلے کے لیے تمام بنیادی مضامین میں مکمل تیاری',
        'تین زبانوں میں خود اعتمادی سے تقریر اور مضمون نگاری',
        'بنیادی فقہی احکام (طہارت، وضو، نماز) کی مکمل آگاہی',
        'سکول کلبز، کھیلوں اور انتظامی سرگرمیوں میں قائدانہ کردار',
      ],
    },
    requiresTc: true,
  },
];

export const EligibilityChecker: React.FC = () => {
  const { language, theme, openAdmissionModal } = useSchool();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = ELIGIBILITY_DATA[selectedIndex];

  const labels = {
    tagline: {
      en: 'ADMISSIONS 2026-2027 • AGE & GRADE ELIGIBILITY',
      ta: 'சேர்க்கை 2026-2027 • வயது & வகுப்பு தகுதி',
      ur: 'داخلہ 2026-2027 • عمر اور جماعت کی اہلیت',
    },
    heading: {
      en: 'Age-to-Grade Eligibility Calculator & Document Checklist',
      ta: 'வயது-வகுப்பு தகுதி கணிப்பான் & ஆவண சரிபார்ப்பு பட்டியல்',
      ur: 'عمر کے مطابق جماعت کی اہلیت کا جائزہ اور مطلوبہ دستاویزات',
    },
    subheading: {
      en: 'Select your child’s age to immediately see the eligible class, key learning milestones, and required documents for the 2026-2027 admission session.',
      ta: 'உங்கள் குழந்தையின் வயதைத் தேர்ந்தெடுத்து, தகுதியான வகுப்பு, முக்கிய கற்றல் மைல்கற்கள் மற்றும் தேவையான ஆவணங்களை உடனடியாக அறிந்திடுங்கள்.',
      ur: 'اپنے بچے کی عمر منتخب کریں اور فوری طور پر اہل جماعت، نصابی خصوصیات اور داخلے کے لیے ضروری کاغذات جانیے۔',
    },
    selectAgeTitle: {
      en: 'Select Child’s Age (as of 1st June 2026):',
      ta: 'குழந்தையின் வயதைத் தேர்ந்தெடுக்கவும் (1 ஜூன் 2026 நிலவரப்படி):',
      ur: 'بچے کی عمر منتخب کیجئے (یکم جون 2026 کے مطابق):',
    },
    milestonesTitle: {
      en: 'Key Learning Milestones for this Grade:',
      ta: 'இவ்வகுப்பிற்கான முக்கிய கற்றல் மைல்கற்கள்:',
      ur: 'اس جماعت کی اہم تعلیمی و تربیتی خصوصیات:',
    },
    checklistTitle: {
      en: 'Required Documents Checklist for Verification:',
      ta: 'சரிபார்ப்பிற்கான அத்தியாவசிய ஆவண பட்டியல்:',
      ur: 'تصدیق کے لیے مطلوبہ دستاویزات کی چیک لسٹ:',
    },
    doc1: {
      en: 'Original Birth Certificate issued by Municipal Corporation / Panchayat (+ 2 photocopies)',
      ta: 'நகராட்சி / பஞ்சாயத்தால் வழங்கப்பட்ட அசல் பிறப்புச் சான்றிதழ் (+ 2 நகல்கள்)',
      ur: 'میونسپل کارپوریشن یا مجاز ادارے سے جاری شدہ اصل پیدائش سرٹیفکیٹ (+ 2 فوٹو کاپیاں)',
    },
    doc2: {
      en: '3 Recent Passport-size Color Photographs of the child (white background)',
      ta: 'குழந்தையின் அண்மைய பாஸ்போர்ட் அளவு வண்ண புகைப்படங்கள் (3 பிரதிகள்)',
      ur: 'طالب علم کی 3 عدد حالیہ پاسپورٹ سائز رنگین تصاویر (سفید پس منظر)',
    },
    doc3: {
      en: 'Student & Both Parents Aadhaar Card Copies (Self-attested)',
      ta: 'மாணவர் மற்றும் பெற்றோர் இருவரின் ஆதார் அட்டை நகல்கள்',
      ur: 'طالب علم اور والدین کے آدھار کارڈ / شناختی کارڈ کی نقول',
    },
    doc4: {
      en: 'Previous School Transfer Certificate (TC) & Report Card (Mandatory for Grade 1 to 5)',
      ta: 'முந்தைய பள்ளியின் மாற்றுச் சான்றிதழ் (TC) & மதிப்பெண் அட்டை (வகுப்பு 1 முதல் 5 வரை கட்டாயம்)',
      ur: 'پچھلے سکول کا ٹرانسفر سرٹیفکیٹ (TC) اور رپورٹ کارڈ (پہلی تا پانچویں جماعت کے لیے لازمی)',
    },
    applyBtn: {
      en: 'Apply for Admission in',
      ta: 'சேர்க்கைக்கு விண்ணப்பிக்க',
      ur: 'داخلے کے لیے درخواست دیں برائے',
    },
    downloadBtn: {
      en: '📥 Download Official 2026–27 Admission Pamphlet',
      ta: '📥 அதிகாரப்பூர்வ 2026–27 சேர்க்கை சிற்றேட்டைப் பதிவிறக்குக',
      ur: '📥 سرکاری تعلیمی بروشر 2026–27 ڈاؤنلوڈ کیجئے',
    },
    pamphletSub: {
      en: 'Includes complete dual-curriculum syllabus breakdown, fee guidelines & campus facilities.',
      ta: 'முழு பாடத்திட்ட விவரங்கள், கட்டண வழிகாட்டுதல் மற்றும் பள்ளி வசதிகள் கொண்ட முழு வண்ண சிற்றேடு.',
      ur: 'جامع نصاب، فیس کی تفصیلات اور کیمپس سہولیات کا باضابطہ تصدیق شدہ بروشر۔',
    },
  };

  return (
    <section
      id="eligibility"
      className={`py-20 relative transition-colors ${
        theme === 'dark' ? 'bg-[#0E1714] text-[#F3F7F4]' : 'bg-[#F4F7F5] text-slate-900'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 shadow-xs">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>{labels.tagline[language]}</span>
          </div>

          <h2
            className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            } tracking-tight ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
          >
            {labels.heading[language]}
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg font-medium ${
              theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
            } leading-relaxed ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
          >
            {labels.subheading[language]}
          </p>

          {/* Interactive Age Pills Selection Bar */}
          <div className="mt-8 text-start w-full">
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider block mb-3 text-center sm:text-start"
              style={{ color: theme === 'dark' ? '#9DB0A6' : '#64748B' }}
            >
              {labels.selectAgeTitle[language]}
            </span>
            <div className={`flex flex-wrap items-center justify-center sm:justify-start gap-2.5 p-2 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#16241F] border-[#243B32]' : 'bg-white border-slate-200'
            }`}>
              {ELIGIBILITY_DATA.map((item, idx) => (
                <button
                  key={item.gradeKey}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    selectedIndex === idx
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : theme === 'dark'
                      ? 'bg-[#0E1714] text-[#9DB0A6] hover:text-white border-[#243B32]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-editorial">{item.ageLabel}</span>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded-md font-bold ${
                      selectedIndex === idx
                        ? 'bg-amber-400 text-slate-950 font-extrabold'
                        : theme === 'dark'
                        ? 'bg-[#16241F] text-[#9DB0A6]'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {item.gradeKey}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Bento Grid: Grade Milestones & Document Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-start">
          {/* LEFT 6 COLUMNS: Eligible Grade & Learning Milestones */}
          <div
            className={`lg:col-span-6 rounded-3xl p-8 border flex flex-col justify-between transition-all relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-700" />

            <div>
              <div className={`flex items-center justify-between pb-5 border-b ${
                theme === 'dark' ? 'border-[#243B32]' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
                    <GraduationCap className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider block"
                      style={{ color: theme === 'dark' ? '#9DB0A6' : '#64748B' }}
                    >
                      Eligible Class
                    </span>
                    <h3 className={`font-editorial text-2xl font-extrabold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {selected.gradeKey}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-blue-700 text-white shadow-xs">
                  {selected.ageLabel}
                </span>
              </div>

              {/* Title & Badge */}
              <div className="mt-6">
                <span className="inline-block px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase tracking-wide bg-amber-100 text-amber-950 border border-amber-300 shadow-xs mb-2">
                  {selected.badge[language]}
                </span>
                <h4
                  className={`font-editorial text-xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-[#FDE68A]' : 'text-slate-900'
                  } ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
                >
                  {selected.gradeTitle[language]}
                </h4>
              </div>

              {/* Specifications: Timing & Ratio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div
                  className="p-3 rounded-2xl border flex items-center gap-2.5"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1E293B' : '#F1F5F9',
                    borderColor: theme === 'dark' ? '#243B32' : '#E2E8F0',
                  }}
                >
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="text-xs">
                    <span
                      className="block font-semibold"
                      style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                    >
                      School Hours:
                    </span>
                    <span
                      className="font-bold font-mono text-sm"
                      style={{ color: theme === 'dark' ? '#F8FAFC' : '#0F172A' }}
                    >
                      {selected.timing}
                    </span>
                  </div>
                </div>

                <div
                  className="p-3 rounded-2xl border flex items-center gap-2.5"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1E293B' : '#F1F5F9',
                    borderColor: theme === 'dark' ? '#243B32' : '#E2E8F0',
                  }}
                >
                  <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div className="text-xs">
                    <span
                      className="block font-semibold"
                      style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                    >
                      Teacher Ratio:
                    </span>
                    <span
                      className="font-bold font-mono text-sm"
                      style={{ color: theme === 'dark' ? '#F8FAFC' : '#0F172A' }}
                    >
                      {selected.ratio}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Learning Milestones */}
              <div className="mt-6">
                <h5
                  className="text-xs font-mono font-bold uppercase tracking-wider mb-3"
                  style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                >
                  {labels.milestonesTitle[language]}
                </h5>
                <div className="space-y-2.5">
                  {selected.milestones[language].map((milestone, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl border flex items-start gap-2.5"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1E293B' : '#F1F5F9',
                        borderColor: theme === 'dark' ? '#243B32' : '#E2E8F0',
                      }}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span
                        className="text-sm font-medium leading-snug"
                        style={{ color: theme === 'dark' ? '#F8FAFC' : '#0F172A' }}
                      >
                        {milestone}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className={`mt-8 pt-5 border-t ${
              theme === 'dark' ? 'border-[#243B32]' : 'border-slate-200'
            }`}>
              <button
                type="button"
                onClick={openAdmissionModal}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#D93829] hover:bg-[#b92c1e] text-white font-bold text-base transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>
                  {labels.applyBtn[language]} {selected.gradeKey} (2026–27)
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT 6 COLUMNS: Required Documents Checklist & Download Pamphlet */}
          <div
            className={`lg:col-span-6 rounded-3xl p-8 border flex flex-col justify-between transition-all relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#16241F] border-[#243B32] text-white shadow-xl'
                : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-700 via-blue-500 to-emerald-700" />

            <div>
              <div className={`flex items-center justify-between pb-5 border-b ${
                theme === 'dark' ? 'border-[#243B32]' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-700 flex items-center justify-center text-white shadow-xs">
                    <FileCheck2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider block"
                      style={{ color: theme === 'dark' ? '#93C5FD' : '#1D4ED8' }}
                    >
                      Verification Dossier
                    </span>
                    <h3 className={`font-editorial text-xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {labels.checklistTitle[language]}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-700 text-white shadow-xs">
                  Office Desk
                </span>
              </div>

              {/* 4 Core Verification Checklist Items */}
              <div className="mt-6 space-y-3.5">
                {/* 1. Birth Certificate */}
                <div
                  className="p-4 rounded-2xl border flex items-start gap-3"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1E293B' : '#F1F5F9',
                    borderColor: theme === 'dark' ? '#243B32' : '#E2E8F0',
                  }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: theme === 'dark' ? '#F8FAFC' : '#0F172A' }}
                    >
                      1. Birth Certificate
                    </div>
                    <div
                      className="text-xs mt-0.5 leading-relaxed font-medium"
                      style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                    >
                      {labels.doc1[language]}
                    </div>
                  </div>
                </div>

                {/* 2. 3 Passport Size Photos */}
                <div
                  className="p-4 rounded-2xl border flex items-start gap-3"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1E293B' : '#F1F5F9',
                    borderColor: theme === 'dark' ? '#243B32' : '#E2E8F0',
                  }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: theme === 'dark' ? '#F8FAFC' : '#0F172A' }}
                    >
                      2. 3 Passport Size Photographs
                    </div>
                    <div
                      className="text-xs mt-0.5 leading-relaxed font-medium"
                      style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                    >
                      {labels.doc2[language]}
                    </div>
                  </div>
                </div>

                {/* 3. Student & Parent Aadhaar Copy */}
                <div
                  className="p-4 rounded-2xl border flex items-start gap-3"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1E293B' : '#F1F5F9',
                    borderColor: theme === 'dark' ? '#243B32' : '#E2E8F0',
                  }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: theme === 'dark' ? '#F8FAFC' : '#0F172A' }}
                    >
                      3. Student & Parent Aadhaar Card Copies
                    </div>
                    <div
                      className="text-xs mt-0.5 leading-relaxed font-medium"
                      style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                    >
                      {labels.doc3[language]}
                    </div>
                  </div>
                </div>

                {/* 4. Previous School TC (If applicable) */}
                <div
                  className="p-4 rounded-2xl border flex items-start gap-3"
                  style={{
                    backgroundColor: selected.requiresTc
                      ? (theme === 'dark' ? 'rgba(229,154,35,0.15)' : '#FEF3C7')
                      : (theme === 'dark' ? '#1E293B' : '#F1F5F9'),
                    borderColor: selected.requiresTc
                      ? (theme === 'dark' ? 'rgba(229,154,35,0.4)' : '#FDE68A')
                      : (theme === 'dark' ? '#243B32' : '#E2E8F0'),
                  }}
                >
                  <CheckCircle
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      selected.requiresTc ? 'text-amber-600' : 'text-emerald-700'
                    }`}
                  />
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: theme === 'dark' ? '#F8FAFC' : '#0F172A' }}
                    >
                      4. Transfer Certificate (TC) & Marksheet
                    </div>
                    <div
                      className="text-xs mt-0.5 leading-relaxed font-medium"
                      style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                    >
                      {labels.doc4[language]}
                    </div>
                    {selected.requiresTc ? (
                      <span
                        className="text-xs font-mono font-bold block mt-1"
                        style={{ color: theme === 'dark' ? '#FBBF24' : '#B45309' }}
                      >
                        Required for {selected.gradeKey} admission
                      </span>
                    ) : (
                      <span
                        className="text-xs block mt-1"
                        style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                      >
                        (Not required for Pre-KG, LKG & UKG entry)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Download Official 2026-27 Admission Pamphlet Action */}
            <div
              className={`mt-8 p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                theme === 'dark'
                  ? 'bg-[#0E1714] border-[#243B32]'
                  : 'bg-[#123524] text-[#FBF9F5] border-[#123524]'
              }`}
            >
              <div className="text-start w-full sm:w-auto">
                <h4 className="font-editorial text-sm font-bold">
                  {labels.downloadBtn[language]}
                </h4>
                <p className={`text-xs mt-0.5 ${
                  theme === 'dark' ? 'text-[#9DB0A6]' : 'text-[#FBF9F5]/80'
                }`}>
                  {labels.pamphletSub[language]}
                </p>
              </div>

              <a
                href="/olive-pamphlet-2026.jpg"
                target="_blank"
                rel="noopener noreferrer"
                download="Olive_Tree_School_Admission_Pamphlet_2026-27.jpg"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D97706] hover:bg-[#b45309] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {language === 'ta'
                    ? 'சிற்றேடு பதிவிறக்குக'
                    : language === 'ur'
                    ? 'بروشر ڈاؤنلوڈ کریں'
                    : 'Download Brochure'}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
