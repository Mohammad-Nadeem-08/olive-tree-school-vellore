# Asset Mapping Specification — Olive Tree School, Vellore

This document provides a precise, file-by-file mapping for all replacement assets required for the Olive Tree School website.

---

## 1. Directory Structure Overview

All replacement assets are organized inside `public/assets/` to ensure clean separation from source code and direct static serving via Vite:

```
public/
└── assets/
    ├── branding/
    │   ├── olive-tree-logo.png             # Primary horizontal logo (Navbar, OpenGraph, Schema)
    │   ├── olive-tree-logo-dark.png        # (Optional) Light/white text variant for dark mode
    │   ├── olive-tree-emblem.png           # Square icon/crest (WhatsApp avatar, mobile, app icon)
    │   ├── favicon.svg                     # Browser tab vector favicon
    │   └── favicon.ico                     # Fallback browser favicon (32x32)
    │
    ├── brochure/
    │   ├── olive-tree-school-brochure-2026.pdf      # Official downloadable admission brochure
    │   └── olive-tree-school-brochure-preview.webp  # (Optional) High-res cover preview
    │
    └── school/
        ├── hero/
        │   └── hero-students-classroom.webp         # Primary homepage hero photo (Polaroid frame)
        │
        ├── exterior/
        │   ├── school-building-facade.webp          # School main building / front elevation
        │   └── school-entrance-gate.webp            # Campus entrance & security gate
        │
        ├── classrooms/
        │   ├── primary-smart-classroom.webp         # Grade 1–5 academic smart classroom
        │   └── nursery-montessori-room.webp         # Pre-KG / LKG sensory play & Montessori room
        │
        ├── tarbiyah/
        │   ├── quran-tajweed-circle.webp            # Morning Quran recitation & Tajweed halaqah
        │   └── daily-sunnah-etiquettes.webp         # Character training, Akhlaq, & Sunnah manners
        │
        ├── activities/
        │   ├── sports-day-athletics.webp            # Sports day, running track, physical fitness
        │   └── arts-creative-activities.webp        # Islamic calligraphy, craft, science fair
        │
        └── facilities/
            ├── computer-smart-lab.webp              # Digital lab & touch typing computers
            └── outdoor-play-area.webp               # Campus playground, swings, & physical play
```

---

## 2. Asset Specification & Mapping Table

| Target Folder | Target Filename | Website Section / Component | Current Implementation | Expected Dimensions | Aspect Ratio | Recommended Format | Purpose & Client Instructions |
|---|---|---|---|---|---|---|---|
| `public/assets/branding/` | `olive-tree-logo.png` | **Navbar**, **Footer**, **SEO OpenGraph**, **JSON-LD Schema** | `/olive-logo.jpeg` (1280x578 JPEG with white background) | 1200 × 400 px (min 800 × 260 px) | ~3:1 (Horizontal) | **PNG** (24-bit with alpha transparency) or **SVG** | Official school logo with name and motto ("learn to live"). Must have a transparent background so it renders cleanly on both light and dark themes. |
| `public/assets/branding/` | `olive-tree-logo-dark.png` *(Optional)* | **Navbar (Dark Mode)** | Currently uses single JPEG | 1200 × 400 px | ~3:1 (Horizontal) | **PNG** (with transparent background) | Only needed if the primary logo has dark typography that lacks sufficient contrast against dark theme (`#0E1714`). |
| `public/assets/branding/` | `olive-tree-emblem.png` | **WhatsApp Simulator Modal** (`src/components/WhatsAppSimulatorModal.tsx`), Mobile Nav | `/olive-logo.jpeg` clipped into circle | 512 × 512 px | 1:1 (Square) | **PNG** (transparent background) | Square crest / olive tree symbol used for circular chat avatars, mobile navigation, and app icons. |
| `public/assets/branding/` | `favicon.svg` & `favicon.ico` | **Browser Tab Icon** (`index.html`) | Default Vite lightning bolt SVG | 512 × 512 px (SVG) / 32 × 32 px (ICO) | 1:1 (Square) | **SVG** & **ICO** | Clean vector tree/emblem visible on browser tabs and mobile bookmarks. |
| `public/assets/brochure/` | `olive-tree-school-brochure-2026.pdf` | **Eligibility & Admissions Section** (`src/components/EligibilityChecker.tsx`) | `/olive-pamphlet-2026.jpg` (Single JPEG 896x1200) | Printable A4 / Letter | Standard Multi-page / Bi-fold | **PDF** (Searchable vector text, CMYK/RGB optimized, < 8 MB) | Complete official school prospectus / admission pamphlet containing curriculum details, fee schedule, uniform guidelines, and admission criteria. |
| `public/assets/school/hero/` | `hero-students-classroom.webp` | **Hero Section Polaroid Showcase** (`src/components/Hero.tsx`) | External Unsplash URL (`photo-1588072432836-e10032774350`) | 1600 × 1200 px (min 1200 × 900 px) | 4:3 (Landscape) | **WebP** (Quality 85%) or **JPG** | High-energy, warm, professional photo of Olive Tree School students in real uniforms smiling, interacting, or reading together in a classroom. |
| `public/assets/school/classrooms/` | `primary-smart-classroom.webp` | **Campus Gallery — Category: Classrooms** (`src/data/defaultGallery.ts`) | External Unsplash URL (`photo-1580582932707-520aed937b7b`) | 1200 × 900 px | 4:3 (Landscape) | **WebP** / **JPG** | Authentic photograph of Grade 1–5 students seated in their classroom, showing desks, blackboard/smart screen, and teacher guidance. |
| `public/assets/school/tarbiyah/` | `quran-tajweed-circle.webp` | **Campus Gallery — Category: Tarbiyah** (`src/data/defaultGallery.ts`) | External Unsplash URL (`photo-1609599006353-e629aaabfeae` - generic Quran flatlay) | 1200 × 900 px | 4:3 (Landscape) | **WebP** / **JPG** | Authentic photograph of students sitting respectfully during morning Quran recitation, Tajweed practice, or Hadith session. |
| `public/assets/school/activities/` | `sports-day-athletics.webp` | **Campus Gallery — Category: Activities** (`src/data/defaultGallery.ts`) | External Unsplash URL (`photo-1577896851231-70ef18881754` - generic race track) | 1200 × 900 px | 4:3 (Landscape) | **WebP** / **JPG** | Authentic photograph of students participating in Sports Day events, outdoor games, or physical education exercises. |
| `public/assets/school/exterior/` | `school-building-facade.webp` | **Campus Gallery / Contact Section** | None currently implemented | 1200 × 900 px | 4:3 (Landscape) | **WebP** / **JPG** | Clear front elevation photograph of the Olive Tree School campus building in Kaspa, Vellore in daylight. |
| `public/assets/school/facilities/` | `computer-smart-lab.webp` | **Campus Gallery / Curriculum Section** | None currently implemented | 1200 × 900 px | 4:3 (Landscape) | **WebP** / **JPG** | Photograph of the student computer lab with monitors, keyboards, and students practicing digital skills. |
| `public/assets/school/classrooms/` | `nursery-montessori-room.webp` | **Campus Gallery — Category: Classrooms** | None currently implemented | 1200 × 900 px | 4:3 (Landscape) | **WebP** / **JPG** | Pre-KG / LKG colorful activity room with Montessori sensory learning tools, soft toys, and educational wall charts. |

---

## 3. Retained Brand Assets (No Replacement Required)

| Asset Path | Component Usage | Purpose | Status |
|---|---|---|---|
| `public/brainy-stars-logo.jpeg` | `src/components/Hero.tsx`, `src/components/AboutSection.tsx` | Institutional co-branding partner logo (*Brainy Stars International School*) | **RETAIN**. Do not delete or overwrite unless the client explicitly provides an updated official high-resolution vector from Brainy Stars. |
| `public/audio/*.mp3` (12 files) | `src/components/LearningCorner.tsx` | Audio recitations of Daily Sunnah Duas in Arabic, English, Tamil, and Urdu | **RETAIN**. Fully authentic, recorded audio files. |

---

## 4. Image Optimization Guidelines for Client Assets

To guarantee optimal Core Web Vitals (LCP < 2.0s, high performance on 4G mobile):

1. **Resolution**:
   - Landscape gallery/hero photos: Width between 1200px and 1600px.
   - Logo: Width 1200px (retina display 3x scaling for 400px CSS container).
2. **File Formats**:
   - Real photographs: Convert camera originals (raw/JPEG) to `.webp` with quality 82–85%, or optimized `.jpg`.
   - Logos & Graphics: Transparent `.png` or vector `.svg`.
3. **File Size Limits**:
   - Hero photo: < 250 KB
   - Gallery photos: < 180 KB each
   - Logo: < 60 KB
   - PDF Brochure: < 10 MB (printable vector PDF)
4. **Orientation & Framing**:
   - Hero & Gallery images should be **horizontal landscape** (4:3 or 16:9). Avoid vertical/portrait phone photos for the hero slot, as they crop awkwardly inside the 4:3 polaroid card container.

