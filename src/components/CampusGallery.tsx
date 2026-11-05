import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Camera,
  Plus,
  Trash2,
  X,
  Upload,
  Link as LinkIcon,
  Check,
  Calendar,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Images,
  ArrowLeft,
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import type { GalleryPhoto } from '../types';

// Curated 6 representative photographs for homepage preview
const CURATED_HOMEPAGE_PHOTO_IDS = [
  'gallery-2', // UKG Kindergarten & Montessori Sensory Exploration
  'gallery-1', // Primary Grade 1 Academic Classroom — Value-Based Learning
  'gallery-5', // Class 2 Tarbiyah, Islamic Akhlaq & Classroom Etiquette
  'gallery-4', // Campus Playground — Slides, Swings & Healthy Physical Fitness
  'gallery-10', // Classroom Building Veranda, Yellow Pillars & Green Lawn
  'gallery-6', // School Campus Entrance Gate & Administration
];

export const CampusGallery: React.FC = () => {
  const {
    t,
    language,
    theme,
    galleryPhotos,
    addGalleryPhoto,
    deleteGalleryPhoto,
    isAdminAuthenticated,
    liveEditMode,
  } = useSchool();

  // Mode: Curated 6-photo homepage preview vs. Full 12-photo gallery
  const [isFullGallery, setIsFullGallery] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'classrooms' | 'tarbiyah' | 'activities'>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mobile carousel slide index (0 to 5 for curated photos)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Touch tracking for mobile carousel
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Touch tracking for lightbox swipe
  const [lbTouchStartX, setLbTouchStartX] = useState<number | null>(null);
  const [lbTouchEndX, setLbTouchEndX] = useState<number | null>(null);

  // Form state for adding photos (Admin)
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [captionEn, setCaptionEn] = useState('');
  const [captionTa, setCaptionTa] = useState('');
  const [captionUr, setCaptionUr] = useState('');
  const [category, setCategory] = useState<'classrooms' | 'tarbiyah' | 'activities'>('classrooms');
  const [dateTag, setDateTag] = useState('Academic Year 2026–27');
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  // 6 Curated photos
  const curatedPhotos = useMemo(() => {
    const selected = galleryPhotos.filter((p) => CURATED_HOMEPAGE_PHOTO_IDS.includes(p.id));
    if (selected.length === 6) return selected;
    return galleryPhotos.slice(0, 6);
  }, [galleryPhotos]);

  // Full gallery filtered photos
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return galleryPhotos;
    return galleryPhotos.filter((p) => p.category === activeCategory);
  }, [galleryPhotos, activeCategory]);

  // Active photo set for lightbox navigation based on current view
  const activeLightboxPhotos = useMemo(() => {
    return isFullGallery ? filteredPhotos : curatedPhotos;
  }, [isFullGallery, filteredPhotos, curatedPhotos]);

  // Lock body scroll when Lightbox or Add Modal is open
  useEffect(() => {
    if (lightboxPhoto || isAddModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxPhoto, isAddModalOpen]);

  // Navigation between photos in Lightbox
  const handlePrevPhoto = useCallback(() => {
    if (!lightboxPhoto || activeLightboxPhotos.length <= 1) return;
    const currentIndex = activeLightboxPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + activeLightboxPhotos.length) % activeLightboxPhotos.length;
    setLightboxPhoto(activeLightboxPhotos[prevIndex]);
  }, [lightboxPhoto, activeLightboxPhotos]);

  const handleNextPhoto = useCallback(() => {
    if (!lightboxPhoto || activeLightboxPhotos.length <= 1) return;
    const currentIndex = activeLightboxPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % activeLightboxPhotos.length;
    setLightboxPhoto(activeLightboxPhotos[nextIndex]);
  }, [lightboxPhoto, activeLightboxPhotos]);

  const openLightbox = (photo: GalleryPhoto) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement;
    setLightboxPhoto(photo);
  };

  const closeLightbox = () => {
    setLightboxPhoto(null);
    if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus();
    }
  };

  // Lightbox keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
        setIsAddModalOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevPhoto, handleNextPhoto]);

  // Touch handlers for mobile carousel
  const minSwipeDistance = 45;
  const onCarouselTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const onCarouselTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const onCarouselTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      setCurrentSlide((prev) => (prev + 1) % curatedPhotos.length);
    } else if (distance < -minSwipeDistance) {
      setCurrentSlide((prev) => (prev - 1 + curatedPhotos.length) % curatedPhotos.length);
    }
  };

  // Touch handlers for Lightbox swipe
  const onLbTouchStart = (e: React.TouchEvent) => {
    setLbTouchEndX(null);
    setLbTouchStartX(e.targetTouches[0].clientX);
  };
  const onLbTouchMove = (e: React.TouchEvent) => {
    setLbTouchEndX(e.targetTouches[0].clientX);
  };
  const onLbTouchEnd = () => {
    if (!lbTouchStartX || !lbTouchEndX) return;
    const distance = lbTouchStartX - lbTouchEndX;
    if (distance > minSwipeDistance) {
      handleNextPhoto();
    } else if (distance < -minSwipeDistance) {
      handlePrevPhoto();
    }
  };

  // HTML5 Canvas image compressor for Admin photo upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setIsCompressing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setPreviewUrl(compressedDataUrl);
          setImageUrl(compressedDataUrl);
        }
        setIsCompressing(false);
      };
      img.onerror = () => {
        setIsCompressing(false);
        setErrorMsg('Failed to process image file. Please try another image.');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      setErrorMsg('Please select an image file or provide an image URL.');
      return;
    }
    if (!captionEn.trim()) {
      setErrorMsg('Please provide at least an English caption.');
      return;
    }

    addGalleryPhoto({
      url: imageUrl.trim(),
      captionEn: captionEn.trim(),
      captionTa: captionTa.trim() || captionEn.trim(),
      captionUr: captionUr.trim() || captionEn.trim(),
      category,
      date: dateTag.trim() || 'Academic Year 2026–27',
    });

    // Reset form
    setImageUrl('');
    setPreviewUrl('');
    setCaptionEn('');
    setCaptionTa('');
    setCaptionUr('');
    setDateTag('Academic Year 2026–27');
    setIsAddModalOpen(false);
    setErrorMsg('');
  };

  const getLocalizedCaption = (p: GalleryPhoto) => {
    if (language === 'ta' && p.captionTa) return p.captionTa;
    if (language === 'ur' && p.captionUr) return p.captionUr;
    return p.captionEn;
  };

  const getCategoryBadgeLabel = (cat: 'classrooms' | 'tarbiyah' | 'activities') => {
    switch (cat) {
      case 'classrooms':
        return t.gallery.filterClassrooms;
      case 'tarbiyah':
        return t.gallery.filterTarbiyah;
      case 'activities':
        return t.gallery.filterActivities;
      default:
        return cat;
    }
  };

  return (
    <section
      id="gallery"
      className={`py-12 sm:py-20 relative overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-[#121E19] text-[#F3F7F4]' : 'bg-[#EBF2EE] text-slate-900'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* ========================================================
            GALLERY SECTION HEADER
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 text-start">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 shadow-xs">
              <Camera className="w-4 h-4 text-amber-300" />
              <span>{t.gallery.tagline}</span>
            </div>

            <h2
              className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              } tracking-tight ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
            >
              {isFullGallery ? t.gallery.title : (t.gallery.glimpseTitle || 'A Glimpse Into Olive Tree School')}
            </h2>

            <p
              className={`mt-3 sm:mt-4 text-base sm:text-lg font-medium ${
                theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
              } leading-relaxed ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
            >
              {t.gallery.description}
            </p>
          </div>

          {/* Action Button Cluster: View All Photos toggle + Admin Upload */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isFullGallery ? (
              <button
                type="button"
                onClick={() => {
                  setIsFullGallery(false);
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-[#16241F] text-emerald-800 dark:text-emerald-300 border border-emerald-700/40 hover:bg-emerald-50 dark:hover:bg-[#1E2E28] font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.gallery.showHighlights || '← Back to Curated Highlights'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsFullGallery(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Images className="w-4 h-4 text-amber-300" />
                <span>{t.gallery.viewAllPhotos || 'View All Photos (12)'}</span>
              </button>
            )}

            {/* Admin Upload Trigger Button */}
            {(isAdminAuthenticated || liveEditMode) && (
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#D93829] hover:bg-[#b82e20] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.gallery.addPhoto}</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================
            VIEW 1: HOMEPAGE CURATED 6-PHOTO PREVIEW
            ======================================================== */}
        {!isFullGallery && (
          <div>
            {/* Desktop 3-Column Grid (hidden on mobile, visible on sm and up) */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {curatedPhotos.map((photo) => {
                const caption = getLocalizedCaption(photo);
                return (
                  <div
                    key={photo.id}
                    className={`group relative rounded-3xl overflow-hidden border shadow-md shadow-slate-900/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-start ${
                      theme === 'dark'
                        ? 'bg-[#16241F] border-[#243B32]'
                        : 'bg-white border-slate-200/90'
                    }`}
                  >
                    {/* Photo Container */}
                    <div
                      className="relative aspect-4/3 overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800"
                      onClick={() => openLightbox(photo)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Enlarge photo: ${caption}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLightbox(photo);
                        }
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={caption}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <div className="w-full flex items-center justify-between text-white">
                          <span className="text-xs font-bold flex items-center gap-1.5">
                            <Maximize2 className="w-4 h-4 text-amber-300" />
                            <span>View Fullscreen</span>
                          </span>
                          <span className="text-xs font-mono text-amber-950 bg-amber-100 border border-amber-300 font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                            {photo.date}
                          </span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3.5 start-3.5 z-10">
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm bg-emerald-700 text-white border border-emerald-800">
                          {getCategoryBadgeLabel(photo.category)}
                        </span>
                      </div>
                    </div>

                    {/* Caption & Metadata Footer */}
                    <div className="p-5">
                      <p
                        className={`font-editorial font-bold text-base leading-snug line-clamp-2 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        } ${language === 'ur' ? 'font-urdu leading-[1.6]' : ''}`}
                      >
                        {caption}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-[#243B32] flex items-center justify-between text-xs text-slate-500 dark:text-[#9DB0A6]">
                        <span className="flex items-center gap-1 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>{photo.date}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => openLightbox(photo)}
                          className="font-bold text-[#D93829] hover:underline cursor-pointer"
                        >
                          Enlarge ↗
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipeable Carousel (<640px) */}
            <div className="sm:hidden">
              {curatedPhotos.length > 0 && (
                <div
                  className={`rounded-3xl border overflow-hidden shadow-lg transition-all text-start ${
                    theme === 'dark' ? 'bg-[#16241F] border-[#243B32]' : 'bg-white border-slate-200'
                  }`}
                  onTouchStart={onCarouselTouchStart}
                  onTouchMove={onCarouselTouchMove}
                  onTouchEnd={onCarouselTouchEnd}
                >
                  {/* Active Slide Image */}
                  <div
                    className="relative aspect-4/3 overflow-hidden cursor-pointer bg-slate-900"
                    onClick={() => openLightbox(curatedPhotos[currentSlide])}
                    role="button"
                    tabIndex={0}
                    aria-label={`Enlarge photo: ${getLocalizedCaption(curatedPhotos[currentSlide])}`}
                  >
                    <img
                      src={curatedPhotos[currentSlide].url}
                      alt={getLocalizedCaption(curatedPhotos[currentSlide])}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 start-3.5 z-10">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm bg-emerald-700 text-white border border-emerald-800">
                        {getCategoryBadgeLabel(curatedPhotos[currentSlide].category)}
                      </span>
                    </div>

                    {/* Slide Counter on Image */}
                    <div className="absolute top-3.5 end-3.5 z-10">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-amber-300 border border-white/20">
                        {currentSlide + 1} / {curatedPhotos.length}
                      </span>
                    </div>

                    {/* Tap to Enlarge Indicator */}
                    <div className="absolute bottom-3 end-3 z-10">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black/60 text-white backdrop-blur-xs border border-white/20">
                        <Maximize2 className="w-3 h-3 text-amber-300" /> Tap to Enlarge
                      </span>
                    </div>
                  </div>

                  {/* Caption & Controls Area */}
                  <div className="p-4.5">
                    <p
                      className={`font-editorial font-bold text-base leading-snug line-clamp-2 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      } ${language === 'ur' ? 'font-urdu leading-[1.6]' : ''}`}
                    >
                      {getLocalizedCaption(curatedPhotos[currentSlide])}
                    </p>

                    <div className="mt-2 text-xs text-slate-500 dark:text-[#9DB0A6] flex items-center gap-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{curatedPhotos[currentSlide].date}</span>
                    </div>

                    {/* Carousel Navigation Toolbar */}
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#243B32] flex items-center justify-between">
                      {/* Prev Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentSlide(
                            (prev) => (prev - 1 + curatedPhotos.length) % curatedPhotos.length
                          )
                        }
                        className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-emerald-950/80 hover:bg-slate-200 dark:hover:bg-emerald-900 text-slate-800 dark:text-emerald-200 flex items-center justify-center transition-all active:scale-95 cursor-pointer border border-slate-200 dark:border-emerald-800/60"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Slide Dots Indicator */}
                      <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
                        {curatedPhotos.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              currentSlide === idx
                                ? 'w-6 bg-emerald-600 dark:bg-emerald-400'
                                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-selected={currentSlide === idx}
                            role="tab"
                          />
                        ))}
                      </div>

                      {/* Next Button */}
                      <button
                        type="button"
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % curatedPhotos.length)}
                        className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-emerald-950/80 hover:bg-slate-200 dark:hover:bg-emerald-900 text-slate-800 dark:text-emerald-200 flex items-center justify-center transition-all active:scale-95 cursor-pointer border border-slate-200 dark:border-emerald-800/60"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom "View All Photos" CTA Banner */}
            <div className="mt-10 sm:mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsFullGallery(true);
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer group"
              >
                <Images className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>{t.gallery.viewAllPhotos || 'View All Photos (12)'}</span>
                <span className="text-xs bg-emerald-900/80 px-2.5 py-0.5 rounded-full text-emerald-200 font-mono">
                  {galleryPhotos.length}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 2: FULL 12-PHOTO EXPANDED CAMPUS GALLERY
            ======================================================== */}
        {isFullGallery && (
          <div>
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer border ${
                  activeCategory === 'all'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : theme === 'dark'
                    ? 'bg-[#16241F] text-[#9DB0A6] border-[#243B32] hover:text-white'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t.gallery.filterAll} ({galleryPhotos.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('classrooms')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer border ${
                  activeCategory === 'classrooms'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : theme === 'dark'
                    ? 'bg-[#16241F] text-[#9DB0A6] border-[#243B32] hover:text-white'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t.gallery.filterClassrooms}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('tarbiyah')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer border ${
                  activeCategory === 'tarbiyah'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : theme === 'dark'
                    ? 'bg-[#16241F] text-[#9DB0A6] border-[#243B32] hover:text-white'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t.gallery.filterTarbiyah}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('activities')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer border ${
                  activeCategory === 'activities'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : theme === 'dark'
                    ? 'bg-[#16241F] text-[#9DB0A6] border-[#243B32] hover:text-white'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t.gallery.filterActivities}
              </button>
            </div>

            {/* Complete Gallery Grid */}
            {filteredPhotos.length === 0 ? (
              <div className="py-20 text-center rounded-3xl border border-dashed border-slate-300 dark:border-[#243B32]">
                <Camera className="w-12 h-12 mx-auto text-slate-400 dark:text-[#9DB0A6] mb-3 stroke-1" />
                <p className="text-base font-semibold text-slate-600 dark:text-[#9DB0A6]">{t.gallery.empty}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredPhotos.map((photo) => {
                  const caption = getLocalizedCaption(photo);
                  return (
                    <div
                      key={photo.id}
                      className={`group relative rounded-3xl overflow-hidden border shadow-md shadow-slate-900/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-start ${
                        theme === 'dark'
                          ? 'bg-[#16241F] border-[#243B32]'
                          : 'bg-white border-slate-200/90'
                      }`}
                    >
                      {/* Photo Container */}
                      <div
                        className="relative aspect-4/3 overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800"
                        onClick={() => openLightbox(photo)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Enlarge photo: ${caption}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openLightbox(photo);
                          }
                        }}
                      >
                        <img
                          src={photo.url}
                          alt={caption}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                          <div className="w-full flex items-center justify-between text-white">
                            <span className="text-xs font-bold flex items-center gap-1.5">
                              <Maximize2 className="w-4 h-4 text-amber-300" />
                              <span>View Fullscreen</span>
                            </span>
                            <span className="text-xs font-mono text-amber-950 bg-amber-100 border border-amber-300 font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                              {photo.date}
                            </span>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3.5 start-3.5 z-10">
                          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm bg-emerald-700 text-white border border-emerald-800">
                            {getCategoryBadgeLabel(photo.category)}
                          </span>
                        </div>

                        {/* Admin Delete Action Button */}
                        {(isAdminAuthenticated || liveEditMode) && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to delete this campus photo?')) {
                                deleteGalleryPhoto(photo.id);
                              }
                            }}
                            className="absolute top-3.5 end-3.5 z-10 p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all active:scale-90"
                            title={t.gallery.deletePhoto}
                            aria-label="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Caption & Metadata Footer */}
                      <div className="p-5">
                        <p
                          className={`font-editorial font-bold text-base leading-snug line-clamp-2 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                          } ${language === 'ur' ? 'font-urdu leading-[1.6]' : ''}`}
                        >
                          {caption}
                        </p>

                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-[#243B32] flex items-center justify-between text-xs text-slate-500 dark:text-[#9DB0A6]">
                          <span className="flex items-center gap-1 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                            <span>{photo.date}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => openLightbox(photo)}
                            className="font-bold text-[#D93829] hover:underline cursor-pointer"
                          >
                            Enlarge ↗
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Back to Curated Highlights CTA */}
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsFullGallery(false);
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#16241F] text-emerald-800 dark:text-emerald-300 border border-emerald-700/40 hover:bg-emerald-50 dark:hover:bg-[#1E2E28] font-bold text-sm shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.gallery.showHighlights || '← Back to Curated Highlights'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          SLIDESHOW / LIGHTBOX MODAL
          ======================================================== */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#0E1714]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200 overflow-y-auto cursor-pointer"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image Slideshow Lightbox"
        >
          <div
            className="relative max-w-5xl w-full bg-[#16241F] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white flex flex-col my-auto max-h-[92vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="p-3 sm:p-4.5 flex items-center justify-between border-b border-white/10 bg-[#0E1714]/80">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#133829] text-[#34D399] border border-emerald-500/30">
                  {getCategoryBadgeLabel(lightboxPhoto.category)}
                </span>
                <span className="text-xs text-amber-300 font-mono font-bold">
                  Photo {activeLightboxPhotos.findIndex((p) => p.id === lightboxPhoto.id) + 1} of{' '}
                  {activeLightboxPhotos.length}
                </span>
                <span className="text-xs text-stone-300 font-mono hidden sm:inline">
                  • {lightboxPhoto.date}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer active:scale-95"
                title={t.gallery.lightboxClose}
                aria-label="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Stage with Previous & Next Controls and Touch Swiping */}
            <div
              className="relative max-h-[66vh] sm:max-h-[72vh] flex items-center justify-center bg-black/80 overflow-hidden select-none"
              onTouchStart={onLbTouchStart}
              onTouchMove={onLbTouchMove}
              onTouchEnd={onLbTouchEnd}
            >
              <img
                src={lightboxPhoto.url}
                alt={getLocalizedCaption(lightboxPhoto)}
                className="max-h-[66vh] sm:max-h-[72vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Prev / Next Navigation Controls */}
              {activeLightboxPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevPhoto();
                    }}
                    className="absolute start-2 sm:start-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-95 shadow-lg"
                    aria-label="Previous Photo (Left Arrow)"
                    title="Previous Photo (←)"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextPhoto();
                    }}
                    className="absolute end-2 sm:end-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-95 shadow-lg"
                    aria-label="Next Photo (Right Arrow)"
                    title="Next Photo (→)"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Footer: Caption & Keyboard Guidance */}
            <div className="p-3.5 sm:p-5 border-t border-white/10 bg-[#0E1714]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-start">
              <p
                className={`font-editorial font-bold text-sm sm:text-base text-white ${
                  language === 'ur' ? 'font-urdu' : ''
                }`}
              >
                {getLocalizedCaption(lightboxPhoto)}
              </p>
              <div className="text-[11px] text-stone-400 font-mono flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline">Use ← / → keys or swipe</span>
                <span className="text-amber-400 font-semibold">{lightboxPhoto.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          ADMIN PHOTO UPLOAD MODAL
          ======================================================== */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#16241F] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-[#243B32] text-slate-900 dark:text-[#F3F7F4] relative my-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#243B32]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-lg font-bold">{t.gallery.modalTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Mode Tabs */}
            <div className="mt-4 flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  uploadMode === 'file'
                    ? 'bg-white dark:bg-[#121E19] text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{t.gallery.uploadTab}</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  uploadMode === 'url'
                    ? 'bg-white dark:bg-[#121E19] text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>{t.gallery.urlTab}</span>
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="mt-4 space-y-4 text-xs">
              {/* File upload input */}
              {uploadMode === 'file' ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-[#243B32] hover:border-emerald-600 dark:hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30"
                  >
                    {isCompressing ? (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="font-semibold text-slate-600 dark:text-slate-300">
                          Compressing & Optimizing image...
                        </span>
                      </div>
                    ) : previewUrl ? (
                      <div className="relative aspect-16/9 rounded-xl overflow-hidden max-h-40 mx-auto">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold opacity-0 hover:opacity-100 transition-opacity text-xs">
                          Click to choose different image
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
                        <Upload className="w-8 h-8 mb-2 stroke-1 text-emerald-600" />
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                          Click to select an image from your device
                        </span>
                        <span className="text-[11px] mt-1">PNG, JPG, WEBP up to 10MB</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">
                    {t.gallery.uploadHint}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block font-bold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-[#243B32] bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {previewUrl && (
                    <div className="mt-2 relative aspect-16/9 rounded-xl overflow-hidden max-h-36">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setErrorMsg('Cannot load image from this URL.')}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block font-bold mb-1">{t.gallery.categoryLabel}</label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as 'classrooms' | 'tarbiyah' | 'activities')
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-[#243B32] bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="classrooms">{t.gallery.filterClassrooms}</option>
                  <option value="tarbiyah">{t.gallery.filterTarbiyah}</option>
                  <option value="activities">{t.gallery.filterActivities}</option>
                </select>
              </div>

              {/* Date / Grade Tag */}
              <div>
                <label className="block font-bold mb-1">Date / Class Tag</label>
                <input
                  type="text"
                  value={dateTag}
                  onChange={(e) => setDateTag(e.target.value)}
                  placeholder="e.g. Academic Year 2026–27"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-[#243B32] bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Captions */}
              <div>
                <label className="block font-bold mb-1">{t.gallery.captionEnLabel}</label>
                <input
                  type="text"
                  required
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                  placeholder="e.g. Students engaged in Montessori phonics activities"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-[#243B32] bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">{t.gallery.captionTaLabel}</label>
                <input
                  type="text"
                  value={captionTa}
                  onChange={(e) => setCaptionTa(e.target.value)}
                  placeholder="வகுப்பறை கற்றல் செயல்முறை"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-[#243B32] bg-white dark:bg-slate-800 text-xs font-tamil focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">{t.gallery.captionUrLabel}</label>
                <input
                  type="text"
                  value={captionUr}
                  onChange={(e) => setCaptionUr(e.target.value)}
                  placeholder="کلاس روم تدریسی سرگرمیاں"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-[#243B32] bg-white dark:bg-slate-800 text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-[#243B32]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {t.gallery.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isCompressing}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.gallery.save}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
