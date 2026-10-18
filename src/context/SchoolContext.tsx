import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Theme, SiteConfig, NoticeItem, TranslationSchema, GalleryPhoto } from '../types';
import { translations, defaultNotices } from '../data/translations';
import { defaultGalleryPhotos } from '../data/defaultGallery';

const DEFAULT_CONFIG: SiteConfig = {
  admissionYear: '2026-2027',
  yearsOfExcellence: '13+',
  primaryPhone: '86101 13160',
  secondaryPhone: '96290 49907',
  altPhone: '89037 99660',
  email: 'olivetreeschool032013@gmail.com',
  address: 'Chinayya Layout, Behind Janipoonthattam, Kaspa, Vellore - 632 001',
  officeHours: '9:00 AM to 4:00 PM on all Working Days',
  tickerAnnouncementEn:
    'Admissions Open 2026-2027 for Pre-KG to 5th Std • Office Hours: 9:00 AM – 4:00 PM on all Working Days • Call 86101 13160 / 96290 49907',
  tickerAnnouncementTa:
    '2026-2027 மாணவர் சேர்க்கை ஆரம்பம் (Pre-KG முதல் 5-ஆம் வகுப்பு வரை) • அலுவலக நேரம்: காலை 9:00 - மாலை 4:00 • தொடர்பு: 86101 13160 / 96290 49907',
  tickerAnnouncementUr:
    'تعلیمی سال 2026-2027 کے داخلے جاری ہیں (پری کے جی تا پنجم) • دفتری اوقات: صبح 9:00 تا شام 4:00 • رابطہ: 86101 13160 / 96290 49907',
};

interface SchoolContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  isRtl: boolean;

  theme: Theme;
  toggleTheme: () => void;

  siteConfig: SiteConfig;
  updateSiteConfig: (partial: Partial<SiteConfig>) => void;

  notices: NoticeItem[];
  addNotice: (notice: Omit<NoticeItem, 'id'>) => void;
  deleteNotice: (id: string) => void;

  galleryPhotos: GalleryPhoto[];
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (id: string) => void;

  isAdminAuthenticated: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;

  liveEditMode: boolean;
  setLiveEditMode: (val: boolean) => void;

  isAdmissionModalOpen: boolean;
  openAdmissionModal: () => void;
  closeAdmissionModal: () => void;

  isVisitModalOpen: boolean;
  openVisitModal: () => void;
  closeVisitModal: () => void;

  isAdminLoginModalOpen: boolean;
  openAdminLoginModal: () => void;
  closeAdminLoginModal: () => void;

  resetDemoData: () => void;
}

const SchoolContext = createContext<SchoolContextValue | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ots_language') as Language;
    return saved === 'ta' || saved === 'ur' ? saved : 'en';
  });

  const isRtl = language === 'ur';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ots_language', lang);
  };

  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('ots_theme') as Theme;
    return saved === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    const update = () => {
      setTheme((prev) => {
        const nextTheme: Theme = prev === 'light' ? 'dark' : 'light';
        localStorage.setItem('ots_theme', nextTheme);
        return nextTheme;
      });
    };

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(update);
    } else {
      update();
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync HTML element attributes for font, direction, and localized title
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    if (language === 'ur') {
      document.body.classList.add('lang-ur');
      document.body.classList.remove('lang-ta');
      document.title = 'اولیو ٹری اسکول، ویلور | داخلے جاری ہیں تعلیمی سال 2026–2027 (عصری و دینی تعلیم)';
    } else if (language === 'ta') {
      document.body.classList.add('lang-ta');
      document.body.classList.remove('lang-ur');
      document.title = 'ஆலிவ் ட்ரீ பள்ளி, வேலூர் | மாணவர் சேர்க்கை 2026–2027 (பொதுக்கல்வி & இஸ்லாமிய தர்பிய்யா)';
    } else {
      document.body.classList.remove('lang-ta', 'lang-ur');
      document.title = 'Olive Tree School, Vellore | Pre-KG to 5th Std Admissions Open 2026–2027 (Academic & Islamic Education)';
    }
  }, [language]);

  // 2. Site Config
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('ots_site_config');
      return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const updateSiteConfig = (partial: Partial<SiteConfig>) => {
    setSiteConfig((prev) => {
      const updated = { ...prev, ...partial };
      localStorage.setItem('ots_site_config', JSON.stringify(updated));
      return updated;
    });
  };

  // 3. Notices
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    try {
      const saved = localStorage.getItem('ots_notices');
      return saved ? JSON.parse(saved) : defaultNotices;
    } catch {
      return defaultNotices;
    }
  });

  const addNotice = (notice: Omit<NoticeItem, 'id'>) => {
    const newNotice: NoticeItem = {
      ...notice,
      id: `notice-${Date.now()}`,
    };
    setNotices((prev) => {
      const updated = [newNotice, ...prev];
      localStorage.setItem('ots_notices', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      localStorage.setItem('ots_notices', JSON.stringify(updated));
      return updated;
    });
  };

  // 3b. Campus Gallery Photos
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('ots_gallery');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 6 && parsed[0]?.id === 'gallery-1') {
          return defaultGalleryPhotos;
        }
        return parsed;
      }
      return defaultGalleryPhotos;
    } catch {
      return defaultGalleryPhotos;
    }
  });

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `photo-${Date.now()}`,
    };
    setGalleryPhotos((prev) => {
      const updated = [newPhoto, ...prev];
      localStorage.setItem('ots_gallery', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('ots_gallery', JSON.stringify(updated));
      return updated;
    });
  };

  // 4. Admin Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ots_admin_logged') === 'true';
  });

  const [liveEditMode, setLiveEditMode] = useState<boolean>(() => {
    return localStorage.getItem('ots_live_edit') === 'true';
  });

  const loginAdmin = (user: string, pass: string): boolean => {
    if (user.trim() === 'admin' && pass.trim() === 'olive2026') {
      setIsAdminAuthenticated(true);
      setLiveEditMode(true);
      localStorage.setItem('ots_admin_logged', 'true');
      localStorage.setItem('ots_live_edit', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setLiveEditMode(false);
    localStorage.removeItem('ots_admin_logged');
    localStorage.removeItem('ots_live_edit');
  };

  const toggleLiveEdit = (val: boolean) => {
    setLiveEditMode(val);
    localStorage.setItem('ots_live_edit', val ? 'true' : 'false');
  };

  // 5. Modal Controls
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  const resetDemoData = () => {
    setSiteConfig(DEFAULT_CONFIG);
    setNotices(defaultNotices);
    setGalleryPhotos(defaultGalleryPhotos);
    localStorage.removeItem('ots_site_config');
    localStorage.removeItem('ots_notices');
    localStorage.removeItem('ots_inquiries');
    localStorage.removeItem('ots_gallery');
  };

  return (
    <SchoolContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        isRtl,
        theme,
        toggleTheme,
        siteConfig,
        updateSiteConfig,
        notices,
        addNotice,
        deleteNotice,
        galleryPhotos,
        addGalleryPhoto,
        deleteGalleryPhoto,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        liveEditMode,
        setLiveEditMode: toggleLiveEdit,
        isAdmissionModalOpen,
        openAdmissionModal: () => setIsAdmissionModalOpen(true),
        closeAdmissionModal: () => setIsAdmissionModalOpen(false),
        isVisitModalOpen,
        openVisitModal: () => setIsVisitModalOpen(true),
        closeVisitModal: () => setIsVisitModalOpen(false),
        isAdminLoginModalOpen,
        openAdminLoginModal: () => setIsAdminLoginModalOpen(true),
        closeAdminLoginModal: () => setIsAdminLoginModalOpen(false),
        resetDemoData,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
