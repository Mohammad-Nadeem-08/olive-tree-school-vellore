import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  BookOpen,
  HeartHandshake,
  CheckCircle2,
  Square,
  Sparkles,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

interface SunnahHabit {
  id: string;
  duaNumber: number;
  badge: { en: string; ta: string; ur: string };
  title: { en: string; ta: string; ur: string };
  arabic: string;
  transliteration: string;
  source: string;
  audioUrl: string;
  meaning: { en: string; ta: string; ur: string };
  habitAction: { en: string; ta: string; ur: string };
}

const SUNNAH_HABITS: SunnahHabit[] = [
  {
    id: 'knowledge-dua',
    duaNumber: 1,
    badge: { en: '1. Seeking Knowledge', ta: '1. கல்வி தேடுதல்', ur: '1. حصول علم کی دعا' },
    title: {
      en: 'Dua for Seeking Knowledge - "Rabbi Zidni \'Ilma"',
      ta: 'கல்வி தேடுவதற்கான துஆ - "ரப்பீ ஜித்னீ இல்மா"',
      ur: 'حصول علم کی دعا - "رَّبِّ زِدْنِي عِلْمًا"',
    },
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi Zidni \'Ilma',
    source: 'Surah Ta-Ha (20:114)',
    audioUrl: '/audio/dua-1-ar.mp3',
    meaning: {
      en: '"O my Lord! Increase me in knowledge, beneficial wisdom, and noble understanding."',
      ta: '"என் இறைவா! எனக்கு கல்வியையும், பயனுள்ள ஞானத்தையும் அதிகப்படுத்துவாயாக."',
      ur: '"اے میرے پروردگار! مجھے علم و دانائی اور فہم و فراست میں مزید اضافہ عطا فرما۔"',
    },
    habitAction: {
      en: 'Students begin each morning assembly and study session by reciting this dua with focused minds, fostering humility and a lifelong passion for beneficial learning.',
      ta: 'மாணவர்கள் ஒவ்வொரு காலை அசெம்பிளியையும் பாடவேளையையும் இந்த துஆவுடன் தொடங்கி, கல்வியில் ஆர்வமும் இறைபக்தியும் பெறுகிறார்கள்.',
      ur: 'طلبہ ہر صبح کی اسمبلی اور کلاس روم کا آغاز اس دعا سے کرتے ہیں، جس سے علم کا شوق، عاجزی اور سچی طلب پیدا ہوتی ہے۔',
    },
  },
  {
    id: 'parents-respect',
    duaNumber: 2,
    badge: { en: '2. Respect to Parents', ta: '2. பெற்றோருக்கு மரியாதை', ur: '2. والدین کا احترام' },
    title: {
      en: 'Dua for Parents - "Rabbir-hamhuma"',
      ta: 'பெற்றோருக்கான துஆ - "ரப்பிர் ஹம்ஹுமா"',
      ur: 'والدین کے لیے دعا - "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا"',
    },
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhuma kama rabbayani sagheera',
    source: 'Surah Al-Isra (17:24)',
    audioUrl: '/audio/dua-2-ar.mp3',
    meaning: {
      en: '"My Lord! Bestow on them Your Mercy even as they cherished and raised me in childhood."',
      ta: '"என் இறைவா! நான் சிறுவனாக இருந்தபோது என்னை அவர்கள் வளர்த்தது போல், அவர்கள் மீது கருணை காட்டுவாயாக."',
      ur: '"اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے مجھے بچپن میں ناز و نعم سے پالا۔"',
    },
    habitAction: {
      en: 'Students are taught to kiss their parents\' hands, speak with gentle deference, listen attentively, and recite this dua after daily prayers.',
      ta: 'மாணவர்கள் பெற்றோரின் கைகளை முத்தமிட்டு சலாம் கூறவும், கனிவான குரலில் பேசவும், தொழுகைக்குப் பின் இந்த துஆவை ஓதவும் பயிற்றுவிக்கப்படுகிறார்கள்.',
      ur: 'طلبہ کو روزانہ سکول آتے وقت والدین کے ہاتھ چومنے، دھیمے لہجے میں گفتگو کرنے اور نماز کے بعد یہ دعا پڑھنے کی تربیت دی جاتی ہے۔',
    },
  },
  {
    id: 'world-hereafter-dua',
    duaNumber: 3,
    badge: { en: '3. Goodness in Both Worlds', ta: '3. இரு உலக நன்மை', ur: '3. دنیا و آخرت کی بھلائی' },
    title: {
      en: 'Dua for Goodness in This World & Hereafter',
      ta: 'இவ்வுலக மற்றும் மறுமை நன்மைக்கான துஆ',
      ur: 'دنیا اور آخرت کی بھلائی اور عذاب سے نجات کی دعا',
    },
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar',
    source: 'Surah Al-Baqarah (2:201)',
    audioUrl: '/audio/dua-3-ar.mp3',
    meaning: {
      en: '"Our Lord! Grant us good in this world and good in the Hereafter, and save us from the torment of the Fire."',
      ta: '"எங்கள் இறைவா! எங்களுக்கு இவ்வுலகிலும் நன்மையை அருள்வாயாக; மறுமையிலும் நன்மையை அருள்வாயாக; மேலும் நரக வேதனையிலிருந்து எங்களை காத்தருள்வாயாக."',
      ur: '"اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔"',
    },
    habitAction: {
      en: 'Recited daily after prayers and collective assemblies, instilling balanced ambition for both academic excellence in this life and noble character for eternal reward.',
      ta: 'தினசரி தொழுகைக்குப் பின்னும் காலை கூட்டத்திலும் ஓதப்பட்டு, கல்வியில் வெற்றியும் நற்குணங்கள் வழியே மறுமைப் பேறும் பெற மாணவர்களை வழிநடத்துகிறது.',
      ur: 'نماز اور اسمبلی کے بعد روزانہ پڑھی جاتی ہے، جس سے دنیاوی علم و ترقی اور اخروی نجات کا متوازن تصور پختہ ہوتا ہے۔',
    },
  },
];

export const LearningCorner: React.FC = () => {
  const { language, theme } = useSchool();
  const [activeHabitIndex, setActiveHabitIndex] = useState(0);
  const [speakingTrack, setSpeakingTrack] = useState<'arabic' | 'meaning' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeHabit = SUNNAH_HABITS[activeHabitIndex];

  // Stop speech synthesis and HTML5 audio element
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingTrack(null);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectHabit = (idx: number) => {
    stopAudio();
    setActiveHabitIndex(idx);
  };

  // Smart SpeechSynthesis fallback if Arabic MP3 fails
  const playArabicFallback = (habit: SunnahHabit) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeakingTrack(null);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find((v) => v.lang.toLowerCase().startsWith('ar'));

      if (arabicVoice) {
        const utterance = new SpeechSynthesisUtterance(habit.arabic);
        utterance.voice = arabicVoice;
        utterance.lang = arabicVoice.lang;
        utterance.rate = 0.85;
        utterance.onstart = () => setSpeakingTrack('arabic');
        utterance.onend = () => setSpeakingTrack(null);
        utterance.onerror = () => setSpeakingTrack(null);
        window.speechSynthesis.speak(utterance);
      } else {
        // Fallback: Read phonetic Arabic transliteration clearly using default voice
        const utterance = new SpeechSynthesisUtterance(habit.transliteration);
        utterance.rate = 0.8;
        utterance.onstart = () => setSpeakingTrack('arabic');
        utterance.onend = () => setSpeakingTrack(null);
        utterance.onerror = () => setSpeakingTrack(null);
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      setSpeakingTrack(null);
    }
  };

  // Smart SpeechSynthesis fallback for meaning if MP3 fails
  const playMeaningFallback = (meaningText: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeakingTrack(null);
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const voices = window.speechSynthesis.getVoices();
      const targetPrefix = language === 'ta' ? 'ta' : language === 'ur' ? 'ur' : 'en';
      const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix));

      const utterance = new SpeechSynthesisUtterance(meaningText);
      if (matchedVoice) {
        utterance.voice = matchedVoice;
        utterance.lang = matchedVoice.lang;
      }
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.onstart = () => setSpeakingTrack('meaning');
      utterance.onend = () => setSpeakingTrack(null);
      utterance.onerror = () => setSpeakingTrack(null);
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeakingTrack(null);
    }
  };

  // 1. Listen to Arabic Dua: Play local /audio/dua-${activeDua.duaNumber}-ar.mp3 using managed audioRef.current
  const handleSpeakArabic = (habit: SunnahHabit) => {
    if (typeof window === 'undefined') return;

    if (speakingTrack === 'arabic') {
      stopAudio();
      return;
    }

    stopAudio();

    try {
      const audioPath = `/audio/dua-${habit.duaNumber}-ar.mp3`;
      const audio = new Audio(audioPath);
      audioRef.current = audio;
      setSpeakingTrack('arabic');

      audio.onended = () => {
        setSpeakingTrack(null);
        audioRef.current = null;
      };

      audio.onerror = () => {
        audioRef.current = null;
        playArabicFallback(habit);
      };

      audio.play().catch(() => {
        audioRef.current = null;
        playArabicFallback(habit);
      });
    } catch {
      playArabicFallback(habit);
    }
  };

  // 2. Listen to Meaning: Play local /audio/dua-${activeDua.duaNumber}-${language}.mp3 using managed audioRef.current
  const handleSpeakMeaning = (habit: SunnahHabit) => {
    if (typeof window === 'undefined') return;

    if (speakingTrack === 'meaning') {
      stopAudio();
      return;
    }

    stopAudio();

    try {
      const audioPath = `/audio/dua-${habit.duaNumber}-${language}.mp3`;
      const audio = new Audio(audioPath);
      audioRef.current = audio;
      setSpeakingTrack('meaning');

      audio.onended = () => {
        setSpeakingTrack(null);
        audioRef.current = null;
      };

      audio.onerror = () => {
        audioRef.current = null;
        playMeaningFallback(habit.meaning[language]);
      };

      audio.play().catch(() => {
        audioRef.current = null;
        playMeaningFallback(habit.meaning[language]);
      });
    } catch {
      playMeaningFallback(habit.meaning[language]);
    }
  };

  const labels = {
    tagline: {
      en: 'AUTHENTIC ISLAMIC TARBIYAH & DAILY SUNNAH',
      ta: 'நம்பகமான இஸ்லாமிய தர்பியா & தினசரி சுன்னாஹ்',
      ur: 'مستند اسلامی تربیت و روزمرہ سنت نبویﷺ',
    },
    heading: {
      en: 'Daily Masnoon Dua & Sunnah Tarbiyah Showcase',
      ta: 'தினசரி மஸ்னூன் துஆ & சுன்னாஹ் தர்பியா அரங்கம்',
      ur: 'روزمرہ مسنون دعائیں اور سنت نبویﷺ کا عملی نمونہ',
    },
    subheading: {
      en: 'Listen to clear Arabic recitation and hear the noble meaning spoken in your preferred language. Cultivating authentic prophetic habits daily.',
      ta: 'தெளிவான அரபி துஆ ஓதுதலைக் கேட்டு, உங்களுக்கு விருப்பமான மொழியில் அதன் உன்னத அர்த்தத்தை செவிமடுங்கள். தினசரி சுன்னாஹ் ஒழுக்கங்களை வளர்த்தல்.',
      ur: 'واضح عربی تلاوت سنیں اور اپنی منتخب زبان میں اس کے مبارک معنی سماعت فرمائیں۔ روزمرہ نبوی عادات کی پختگی۔',
    },
    chooseTeaching: {
      en: 'Choose Daily Sunnah Supplication:',
      ta: 'தினசரி சுன்னாஹ் துஆவைத் தேர்வுசெய்க:',
      ur: 'روزمرہ مسنون دعا منتخب کیجئے:',
    },
    practiceTitle: {
      en: 'How Students Practice this Daily at Olive Tree:',
      ta: 'மாணவர்கள் ஆலிவ் ட்ரீ பள்ளியில் இதை அன்றாடம் எவ்வாறு பின்பற்றுகிறார்கள்:',
      ur: 'اولیو ٹری سکول میں طلبہ کی روزمرہ عملی مشق:',
    },
    listenArabic: {
      en: '🔊 Listen to Arabic Dua',
      ta: '🔊 அரபி துஆவைக் கேட்க',
      ur: '🔊 عربی دعا سنیں',
    },
    listenMeaning: {
      en: '🔊 Listen to Meaning (English)',
      ta: '🔊 பொருள் கேட்க (தமிழ்)',
      ur: '🔊 ترجمہ سنیں (اردو)',
    },
    stopAudio: {
      en: 'Stop Audio',
      ta: 'ஆடியோவை நிறுத்து',
      ur: 'آواز بند کریں',
    },
  };

  return (
    <section
      id="learning-corner"
      className={`py-20 relative overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-[#0E1714] text-[#F3F7F4]' : 'bg-[#EBF2EE] text-slate-900'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 shadow-xs">
            <Volume2 className="w-4 h-4 text-amber-300" />
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
        </div>

        {/* Centerpiece Showcase Container */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-3xl p-6 sm:p-10 border transition-all text-start relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#16241F] border-[#243B32] text-white shadow-2xl'
                : 'bg-white border-slate-200/90 text-slate-900 shadow-md shadow-slate-900/5'
            }`}
          >
            {/* Top Arabesque Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-700" />

            {/* Card Header Banner */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b gap-4 ${
                theme === 'dark' ? 'border-[#243B32]' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-amber-300 shadow-sm shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    Authentic Islamic Tarbiyah
                  </span>
                  <h3
                    className={`font-editorial text-xl sm:text-2xl font-bold ${
                      theme === 'dark' ? 'text-[#FDE68A]' : 'text-slate-900'
                    }`}
                  >
                    Daily Masnoon Dua & Sunnah
                  </h3>
                </div>
              </div>

              {/* High-Contrast Badges */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-700 text-white shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Sunnah Tarbiyah
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 shadow-xs">
                  {activeHabit.source}
                </span>
              </div>
            </div>

            {/* 3 Dua Selectors / Tabs in a clean 3-column row */}
            <div className="mt-6">
              <span
                className={`text-xs font-bold uppercase tracking-wider block mb-3 ${
                  theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                }`}
              >
                {labels.chooseTeaching[language]}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SUNNAH_HABITS.map((habit, hIdx) => {
                  const isSelected = activeHabitIndex === hIdx;
                  return (
                    <button
                      key={habit.id}
                      type="button"
                      onClick={() => handleSelectHabit(hIdx)}
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer border ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
                          : theme === 'dark'
                          ? 'bg-[#0E1714] text-[#9DB0A6] border-[#243B32] hover:text-white hover:border-[#3D5245]'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {habit.badge[language]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dua Main Display Box */}
            <div
              className={`mt-6 p-6 sm:p-8 rounded-2xl border text-center transition-all ${
                theme === 'dark'
                  ? 'bg-[#0E1714] border-[#243B32]'
                  : 'bg-slate-50 border-slate-200/90 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-4 text-xs sm:text-sm">
                <span className="font-bold text-emerald-800 dark:text-[#34D399]">
                  {activeHabit.title[language]}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-700 text-white font-mono text-xs font-bold shadow-xs">
                  {activeHabit.source}
                </span>
              </div>

              {/* Big Arabic Calligraphy Text */}
              <div className="my-6 py-2">
                <div
                  dir="rtl"
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-emerald-950 dark:text-[#FDE68A] font-serif leading-loose"
                >
                  {activeHabit.arabic}
                </div>
                <div className="mt-3 text-base sm:text-lg font-bold text-amber-700 dark:text-amber-400 tracking-wide font-mono">
                  "{activeHabit.transliteration}"
                </div>
              </div>

              {/* Working Voice-Over Audio Control Bar */}
              <div className="mt-6 mb-6 pt-5 border-t border-slate-200 dark:border-[#243B32] flex flex-wrap items-center justify-center gap-3">
                {/* Button 1: Listen to Arabic Dua (Real MP3 Recitation + Fallback) */}
                <button
                  type="button"
                  onClick={() => handleSpeakArabic(activeHabit)}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md ${
                    speakingTrack === 'arabic'
                      ? 'bg-amber-600 text-white ring-4 ring-amber-500/30 animate-pulse'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95'
                  }`}
                  title="Listen to authentic Arabic Quranic recitation (Mishary Alafasy MP3)"
                >
                  {speakingTrack === 'arabic' ? (
                    <>
                      <div className="flex items-center gap-1 h-4">
                        <span className="w-1 bg-white rounded-full animate-bounce h-3" />
                        <span className="w-1 bg-white rounded-full animate-bounce h-4" />
                        <span className="w-1 bg-white rounded-full animate-bounce h-2.5" />
                      </div>
                      <span>Reciting Arabic MP3... (Click to Stop)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-300" />
                      <span>{labels.listenArabic[language]}</span>
                    </>
                  )}
                </button>

                {/* Button 2: Listen to Meaning */}
                <button
                  type="button"
                  onClick={() => handleSpeakMeaning(activeHabit)}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md ${
                    speakingTrack === 'meaning'
                      ? 'bg-amber-600 text-white ring-4 ring-amber-500/30 animate-pulse'
                      : 'bg-blue-700 hover:bg-blue-800 text-white active:scale-95'
                  }`}
                  title="Listen to translated meaning in active language"
                >
                  {speakingTrack === 'meaning' ? (
                    <>
                      <div className="flex items-center gap-1 h-4">
                        <span className="w-1 bg-white rounded-full animate-bounce h-3" />
                        <span className="w-1 bg-white rounded-full animate-bounce h-4" />
                        <span className="w-1 bg-white rounded-full animate-bounce h-2.5" />
                      </div>
                      <span>
                        {language === 'ta'
                          ? 'பொருள் கேட்கப்படுகிறது... (நிறுத்த கிளிக் செய்க)'
                          : language === 'ur'
                          ? 'ترجمہ سن رہے ہیں... (روکنے کے لیے کلک کریں)'
                          : 'Playing Meaning MP3... (Click to Stop)'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-white" />
                      <span>{labels.listenMeaning[language]}</span>
                    </>
                  )}
                </button>

                {/* Stop Audio Toggle Button (Visible when playing) */}
                {speakingTrack !== null && (
                  <button
                    type="button"
                    onClick={stopAudio}
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-rose-700 hover:bg-rose-800 text-white transition-all cursor-pointer shadow-md"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>{labels.stopAudio[language]}</span>
                  </button>
                )}
              </div>

              {/* Translation Quote Box */}
              <div
                className={`p-4 rounded-xl border text-sm sm:text-base font-semibold leading-relaxed ${
                  theme === 'dark'
                    ? 'bg-[#16241F] border-[#243B32] text-[#F3F7F4]'
                    : 'bg-white border-slate-200 text-slate-800'
                } ${language === 'ur' ? 'font-urdu leading-[2]' : ''}`}
              >
                {activeHabit.meaning[language]}
              </div>
            </div>

            {/* Akhlaq in Practice Action */}
            <div
              className={`mt-6 p-5 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-[#0E1714] border-[#243B32]'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-[#34D399]">
                <HeartHandshake className="w-5 h-5 text-amber-600" />
                <span>{labels.practiceTitle[language]}</span>
              </div>
              <p
                className={`text-sm sm:text-base leading-relaxed font-medium ${
                  theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
                } ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
              >
                {activeHabit.habitAction[language]}
              </p>
            </div>

            {/* Card Footer */}
            <div
              className={`mt-6 pt-5 border-t flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-2 ${
                theme === 'dark' ? 'border-[#243B32] text-[#9DB0A6]' : 'border-slate-200 text-slate-600'
              }`}
            >
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-[#34D399]" />
                Authentic Quranic Supplications & Mishary Alafasy Recitations
              </span>
              <span className="font-bold px-3 py-1 rounded-full bg-emerald-700 text-white">
                100% Sunnah-Compliant Tarbiyah
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
