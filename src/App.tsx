import { SchoolProvider, useSchool } from './context/SchoolContext';

import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { DualCurriculum } from './components/DualCurriculum';
import { LearningCorner } from './components/LearningCorner';
import { GradeRoadMap } from './components/GradeRoadMap';
import { CampusGallery } from './components/CampusGallery';
import { EligibilityChecker } from './components/EligibilityChecker';
import { NoticeBoard } from './components/NoticeBoard';
import { ContactFooter } from './components/ContactFooter';
import { AdmissionModal } from './components/AdmissionModal';
import { CampusVisitModal } from './components/CampusVisitModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDock } from './components/AdminDock';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function AppContent() {
  const { theme, language } = useSchool();

  return (
    <div
      lang={language}
      data-lang={language}
      className={`w-full min-h-screen flex flex-col transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#0E1714] text-[#F3F7F4]' : 'bg-[#F4F7F5] text-slate-900'
      }`}
    >
      {/* Top Scrolling Notification Bar */}
      <TopBar />

      {/* Main Dual-Brand Header */}
      <Navbar />

      {/* Main Body */}
      <main className="flex-1 w-full">
        {/* Hero Section with Animated Starburst */}
        <Hero />

        {/* About Heritage & Philosophy Section */}
        <AboutSection />

        {/* Dual Curriculum 2-Column Bento Grid */}
        <DualCurriculum />

        {/* Interactive 5-Language & Daily Sunnah Learning Corner */}
        <LearningCorner />

        {/* Grade Progression Roadmap (Pre-KG to 5th Std) */}
        <GradeRoadMap />

        {/* Admin-Managed Campus Life & Photo Gallery */}
        <CampusGallery />

        {/* Age & Grade Eligibility Checker + Document Checklist */}
        <EligibilityChecker />

        {/* Live School Notice Board */}
        <NoticeBoard />
      </main>

      {/* Contact & Kaspa Vellore Location Footer */}
      <ContactFooter />

      {/* Modals & Interactive Overlays */}
      <AdmissionModal />
      <CampusVisitModal />
      <AdminLoginModal />

      {/* Floating Admin Dock (Active when logged in with admin / olive2026) */}
      <AdminDock />

      {/* Floating Direct WhatsApp Action */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}
