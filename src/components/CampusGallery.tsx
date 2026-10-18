import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import type { GalleryPhoto } from '../types';

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

  const [activeCategory, setActiveCategory] = useState<'all' | 'classrooms' | 'tarbiyah' | 'activities'>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding photos
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

  // Filter photos
  const filteredPhotos = galleryPhotos.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  // Lightbox keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPhoto(null);
        setIsAddModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // HTML5 Canvas image compressor
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
      className={`py-20 relative overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-[#121E19] text-[#F3F7F4]' : 'bg-[#EBF2EE] text-slate-900'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 shadow-xs">
              <Camera className="w-4 h-4 text-amber-300" />
              <span>{t.gallery.tagline}</span>
            </div>

            <h2
              className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              } tracking-tight ${language === 'ur' ? 'font-urdu leading-[1.4]' : ''}`}
            >
              {t.gallery.title}
            </h2>

            <p
              className={`mt-4 text-base sm:text-lg font-medium max-w-2xl ${
                theme === 'dark' ? 'text-[#9DB0A6]' : 'text-slate-600'
              } leading-relaxed ${language === 'ur' ? 'font-urdu leading-[1.8]' : ''}`}
            >
              {t.gallery.description}
            </p>
          </div>

          {/* Admin Upload Trigger Button */}
          {(isAdminAuthenticated || liveEditMode) && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#D93829] hover:bg-[#b82e20] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.gallery.addPhoto}</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Tabs Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 text-xs sm:text-sm">
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

        {/* Gallery Bento Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-slate-300 dark:border-[#243B32]">
            <Camera className="w-12 h-12 mx-auto text-slate-400 dark:text-[#9DB0A6] mb-3 stroke-1" />
            <p className="text-base font-semibold text-slate-600 dark:text-[#9DB0A6]">{t.gallery.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    onClick={() => setLightboxPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
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

                    {/* Category Pill Badge (Always Visible on Top) */}
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
                        onClick={() => setLightboxPhoto(photo)}
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
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#0E1714]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 overflow-y-auto cursor-pointer"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#16241F] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white flex flex-col my-auto max-h-[90vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#0E1714]/60">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#133829] text-[#34D399] border border-emerald-500/30">
                  {getCategoryBadgeLabel(lightboxPhoto.category)}
                </span>
                <span className="text-xs text-stone-300 font-mono hidden sm:inline">
                  • {lightboxPhoto.date}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                title={t.gallery.lightboxClose}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Stage */}
            <div className="relative max-h-[65vh] flex items-center justify-center bg-black/60 overflow-hidden">
              <img
                src={lightboxPhoto.url}
                alt={getLocalizedCaption(lightboxPhoto)}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Lightbox Caption Footer */}
            <div className="p-5 sm:p-6 bg-[#16241F] text-start border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <h3
                  className={`font-editorial text-lg sm:text-xl font-bold text-white ${
                    language === 'ur' ? 'font-urdu leading-[1.6]' : ''
                  }`}
                >
                  {getLocalizedCaption(lightboxPhoto)}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Olive Tree School Campus Archive • Kaspa, Vellore
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN UPLOAD MODAL */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150 overflow-y-auto cursor-pointer"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-[#FBF9F5] dark:bg-[#16241F] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-[#243B32] text-stone-900 dark:text-[#FBF9F5] text-start relative my-auto max-h-[90vh] overflow-y-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* High-Visibility Sticky Close Button (X) */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="sticky top-2 float-right -mt-1 -me-1 z-20 w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-600 text-rose-700 hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-[#243B32]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#133829] text-[#E59A23] flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#133829] dark:text-[#FBF9F5]">
                    {t.gallery.modalTitle}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Live Admin Mode • Kaspa, Vellore
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Method Selector */}
            <div className="mt-5 flex items-center p-1 rounded-xl bg-stone-200/70 dark:bg-[#0E1714] border border-stone-300 dark:border-[#243B32] text-xs font-bold">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  uploadMode === 'file'
                    ? 'bg-white dark:bg-[#16241F] text-[#133829] dark:text-[#FBF9F5] shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-[#D93829]" />
                <span>{t.gallery.uploadTab}</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  uploadMode === 'url'
                    ? 'bg-white dark:bg-[#16241F] text-[#133829] dark:text-[#FBF9F5] shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5 text-[#E59A23]" />
                <span>{t.gallery.urlTab}</span>
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="mt-4 space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Source Input */}
              {uploadMode === 'file' ? (
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Select Local Photo
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#133829] file:text-white hover:file:bg-[#0E1714] text-xs text-stone-600 dark:text-stone-400 cursor-pointer"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">{t.gallery.uploadHint}</p>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    Image Direct URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-xs focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                  />
                </div>
              )}

              {/* Preview Box */}
              {previewUrl && (
                <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-stone-300 dark:border-[#243B32] bg-black/10">
                  <img
                    src={previewUrl}
                    alt="Upload Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 end-2 text-[10px] font-mono bg-black/70 text-white px-2 py-0.5 rounded-md">
                    {isCompressing ? 'Compressing...' : 'Ready'}
                  </span>
                </div>
              )}

              {/* Category & Date Tag */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {t.gallery.categoryLabel}
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as 'classrooms' | 'tarbiyah' | 'activities')
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-xs font-semibold focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                  >
                    <option value="classrooms">Classrooms & Learning</option>
                    <option value="tarbiyah">Islamic Tarbiyah & Events</option>
                    <option value="activities">Sports & Activities</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Date Tag / Event
                  </label>
                  <input
                    type="text"
                    value={dateTag}
                    onChange={(e) => setDateTag(e.target.value)}
                    placeholder="Academic Year 2026–27"
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-xs font-semibold focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Captions */}
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {t.gallery.captionEnLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                  placeholder="e.g., Annual Quran Recitation Assembly with Tajweed"
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-xs focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {t.gallery.captionTaLabel}
                  </label>
                  <input
                    type="text"
                    value={captionTa}
                    onChange={(e) => setCaptionTa(e.target.value)}
                    placeholder="தமிழ் விளக்கம்"
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-xs font-tamil focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {t.gallery.captionUrLabel}
                  </label>
                  <input
                    type="text"
                    value={captionUr}
                    onChange={(e) => setCaptionUr(e.target.value)}
                    placeholder="اردو تفصیل"
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-[#243B32] bg-white dark:bg-[#0E1714] text-xs font-urdu focus:ring-2 focus:ring-[#133829] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200 dark:border-[#243B32]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-white/10 font-semibold"
                >
                  {t.gallery.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isCompressing}
                  className="px-5 py-2.5 rounded-xl bg-[#D93829] hover:bg-[#b82e20] text-white font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
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
