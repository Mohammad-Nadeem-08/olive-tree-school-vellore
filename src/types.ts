export type Language = 'en' | 'ta' | 'ur';
export type Theme = 'light' | 'dark';

export interface SiteConfig {
  admissionYear: string;
  yearsOfExcellence: string;
  primaryPhone: string;
  secondaryPhone: string;
  altPhone: string;
  email: string;
  address: string;
  officeHours: string;
  tickerAnnouncementEn: string;
  tickerAnnouncementTa: string;
  tickerAnnouncementUr: string;
}

export interface NoticeItem {
  id: string;
  date: string;
  category: 'Admissions' | 'Academic' | 'Islamic' | 'Events' | 'Urgent';
  titleEn: string;
  titleTa: string;
  titleUr: string;
  contentEn: string;
  contentTa: string;
  contentUr: string;
  isImportant?: boolean;
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  grade: string;
  parentName: string;
  phone: string;
  email?: string;
  message?: string;
  submittedAt: string;
  status: 'new' | 'contacted';
}

export interface GalleryPhoto {
  id: string;
  url: string;
  captionEn: string;
  captionTa: string;
  captionUr: string;
  category: 'classrooms' | 'tarbiyah' | 'activities';
  date: string;
}

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    curriculum: string;
    grades: string;
    gallery: string;
    notices: string;
    contact: string;
    applyNow: string;
    adminLogin: string;
    adminLogout: string;
    adminMode: string;
    callNow: string;
    themeToggle: string;
  };
  branding: {
    schoolName: string;
    motto: string;
    coBrandPrefix: string;
    coBrandName: string;
    coBrandMotto: string;
    coBrandBadge: string;
  };
  hero: {
    badgeAdmission: string;
    yearsExcellence: string;
    headline: string;
    subheadline: string;
    gradeRange: string;
    applyCta: string;
    visitCta: string;
    watchTour: string;
    trustedBy: string;
    admissionsOpenPill: string;
    trustAdmissions: string;
    trustQuran: string;
    trustCampus: string;
    floatingExcellence: string;
    floatingDualCurriculum: string;
    floatingDualSub: string;
    floatingLanguages: string;
  };
  stats: {
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  curriculum: {
    tagline: string;
    title: string;
    description: string;
    academicTab: string;
    islamicTab: string;
    languagesHeading: string;
    stemHeading: string;
    islamicPillarsHeading: string;
    sunnahFoundation: string;
    exploreFullSyllabus: string;
    filterBoth: string;
    applyAcademicSeat: string;
    joinTarbiyahCohort: string;
    integratedSyllabus: string;
    sunnahDaily: string;
    syllabusPromptTitle: string;
    syllabusPromptDesc: string;
  };
  grades: {
    tagline: string;
    title: string;
    description: string;
    preKgTitle: string;
    preKgAge: string;
    preKgDesc: string;
    lkgTitle: string;
    lkgAge: string;
    lkgDesc: string;
    ukgTitle: string;
    ukgAge: string;
    ukgDesc: string;
    primaryTitle: string;
    primaryAge: string;
    primaryDesc: string;
    dayIn: string;
    milestonesHeading: string;
    enrollIn: string;
    personalizedCareTitle: string;
    personalizedCareDesc: string;
    hoursRange: string;
  };
  notices: {
    tagline: string;
    title: string;
    description: string;
    filterAll: string;
    catAdmissions: string;
    catAcademic: string;
    catIslamic: string;
    catEvents: string;
    readMore: string;
    publishedOn: string;
    importantBadge: string;
    noNotices: string;
    publishNotice: string;
    closeNotice: string;
  };
  contact: {
    tagline: string;
    title: string;
    description: string;
    addressLabel: string;
    addressValue: string;
    officeHoursLabel: string;
    officeHoursValue: string;
    officeHoursNotice: string;
    phonesLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    directionsLabel: string;
    directionsDesc: string;
    staffPortal: string;
    landmarkLabel: string;
    whatsAppDesk: string;
    chatOnWhatsApp: string;
    accessibleVellore: string;
    pincodeLabel: string;
    bookCampusTour: string;
  };
  modal: {
    title: string;
    subtitle: string;
    studentNameLabel: string;
    studentNamePlaceholder: string;
    gradeLabel: string;
    selectGrade: string;
    parentNameLabel: string;
    parentNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    closeButton: string;
    applicationRef: string;
    whatsappChatButton: string;
    studentLabel: string;
    targetGradeLabel: string;
    phoneLabelShort: string;
    campusLabel: string;
    dataProtected: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
    sitemap: string;
    staffAdminLogin: string;
    logoutAdmin: string;
  };
  gallery: {
    tagline: string;
    title: string;
    description: string;
    filterAll: string;
    filterClassrooms: string;
    filterTarbiyah: string;
    filterActivities: string;
    addPhoto: string;
    deletePhoto: string;
    empty: string;
    modalTitle: string;
    uploadTab: string;
    urlTab: string;
    categoryLabel: string;
    captionEnLabel: string;
    captionTaLabel: string;
    captionUrLabel: string;
    cancel: string;
    save: string;
    uploadHint: string;
    lightboxClose: string;
  };
}
