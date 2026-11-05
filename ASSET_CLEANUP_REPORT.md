# Asset Cleanup & Obsolete Asset Review Report
## Olive Tree School, Kaspa, Vellore

**Date:** November 2026  
**Safety Status:** Zero assets have been permanently deleted. Confirmed obsolete files have been safely staged into `public/assets/_obsolete_review/` awaiting final administrative sign-off.

---

## 1. Overview of Cleanup Actions

In accordance with Phase 3 guidelines, all code references across the application were redirected to newly organized, authentic client assets before moving obsolete assets. 

All raw uploads and superseded assets have been placed in:
`public/assets/_obsolete_review/`

---

## 2. Inventory of Obsolete Files Staged for Review

| Obsolete Asset (Current Location) | Original Location | File Size | Reason for Staging / Obsolete Classification | Replacement Asset in Production |
|---|---|---|---|---|
| `public/assets/_obsolete_review/olive-logo.jpeg` | `public/olive-logo.jpeg` | 63.5 KB | **Superseded School Logo:** Low-contrast legacy logo with raster compression and opaque background. | `public/assets/branding/olive-tree-logo.jpeg` |
| `public/assets/_obsolete_review/olive-pamphlet-2026.jpg` | `public/olive-pamphlet-2026.jpg` | 956 KB | **Superseded Brochure Image:** Replaced by newly supplied 2026–2027 official brochure and digital PDF. | `public/assets/brochure/olive-tree-school-brochure-2026.pdf` & `.jpeg` |
| `public/assets/_obsolete_review/favicon.svg` | `public/favicon.svg` | 9.5 KB | **Boilerplate Vite Logo:** Default Vite lightning bolt icon; replaced by authentic school olive tree crest. | `public/assets/branding/favicon.png` |
| `public/assets/_obsolete_review/icons.svg` | `public/icons.svg` | 5.0 KB | **Unused SVG Sprite:** Default Vite boilerplate symbols (Discord, Bluesky, GitHub, X). Never referenced in codebase. | None required (Lucide React handles UI icons) |
| `public/assets/_obsolete_review/hero.png` | `src/assets/hero.png` | 13.0 KB | **Unused Mockup:** Legacy file in `src/assets/`; unreferenced by any component. | `public/assets/school/exterior/school-entrance-gate.jpeg` |
| `public/assets/_obsolete_review/new-olive_logo.jpeg` | `public/new-olive_logo.jpeg` | 77.4 KB | **Raw Client Upload:** Standardized and moved to `branding/` folder. | `public/assets/branding/olive-tree-logo.jpeg` |
| `public/assets/_obsolete_review/Brochure.jpeg` | `public/Brochure.jpeg` | 443.7 KB | **Raw Client Upload:** Standardized and moved to `brochure/` folder; PDF generated. | `public/assets/brochure/olive-tree-school-brochure-2026.jpeg` & `.pdf` |
| `public/assets/_obsolete_review/School_Images_raw/` (12 files) | `public/School_Images/` | ~1.3 MB total | **Raw Client Uploads (WhatsApp timestamps):** All 12 authentic photos categorized with descriptive names. | Organized into `public/assets/school/` subfolders |

---

## 3. Retained Active Assets (Do Not Delete)

| Active Asset Path | Current Usage | Reason for Retention |
|---|---|---|
| `public/brainy-stars-logo.jpeg` | `Hero.tsx` & `AboutSection.tsx` | **Official Co-Branding Partner Logo:** Represents Brainy Stars International School partnership ("Nurturing Leaders"). |
| `public/audio/*.mp3` (12 files) | `LearningCorner.tsx` | **Authentic Trilingual Audio Duas:** High-quality voice recordings for Arabic, English, Tamil, and Urdu morning supplications. |
| `src/assets/react.svg` & `vite.svg` | None | Default template SVGs retained in source directory to avoid breaking any peripheral tool configurations. |

---

## 4. Duplicate Assets Audit
- **Duplicates Found:** No duplicate photographs were supplied. Each of the 12 photos represented a unique classroom or campus area:
  - Class LKG, Class UKG, Class 1, Class 2, Class 3, Class 4, Class 5
  - Entrance Gate, Office Room, Playground, Campus Panoramic Elevation, Campus Aerial View.
- **Hero Image Sourcing:** The Hero section polaroid utilizes `school-entrance-gate.jpeg`, which is also featured in the Campus Gallery under the Vellore campus tag. This is intentional to ensure the website hero immediately presents the authentic school signboards and entrance.

---

## 5. Unclassified Assets
- **Count:** 0.
- All 12 photographs supplied by the client have been positively identified and matched to specific academic standards and campus facilities.

---

## 6. Recommendations for Final Cleanup

Following client review and acceptance of the website changes:
1. Files in `public/assets/_obsolete_review/` can be archived into a cold-storage backup zip outside the repository.
2. The `_obsolete_review/` directory can then be removed to reduce repository size before production deployment.

