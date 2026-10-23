import type { AssetKey } from './assets';
<<<<<<< HEAD
import type { ThemeName } from '@/config/themes';
=======
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470

/**
 * Project data layer. Text (titles, types, descriptions) lives in the translation files under
 * `Projects.items.<slug>`; this file holds structure only, so it is identical in every language.
 *
<<<<<<< HEAD
 * Images are the renders and photographs supplied by the studio. Only what is visible in them is
 * described. `location` and `year` stay `null` until the studio confirms them — the UI omits null
 * values rather than inventing them. All titles are descriptive WORKING TITLES (`titleVerified: false`)
 * until the studio supplies the real project names.
 *
 * `theme` picks the page palette (see src/config/themes.ts) from the project's own materials.
 */

export const projectSlugs = [
  'cafe',
  'desierto',
  'billar',
  'bano',
  'azotea',
  'cine',
  'oficina',
  'terraza',
  'sala',
  'cocina',
  'vestidor',
  'fachada',
=======
 * Only facts visible in the supplied photographs are recorded. `location` and `year` stay `null`
 * until the studio confirms them — the UI omits null values rather than inventing them.
 *
 * `titleVerified`:
 *   true  -> the name is legible in the photographs / profile highlights (Yale, Buna)
 *   false -> a descriptive WORKING TITLE; the UI shows a draft note until the studio confirms it
 */

export const projectSlugs = [
  'buna',
  'yale',
  'escalera',
  'pergola',
  'rojo',
  'cactus',
  'cocina',
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export type MaterialKey =
<<<<<<< HEAD
  | 'timber' | 'stone' | 'steel' | 'concrete' | 'ceramic' | 'plaster' | 'plants'
  | 'translucent' | 'paint' | 'terrazzo' | 'canopy' | 'textile' | 'leather' | 'brass' | 'glass';
=======
  | 'timber'
  | 'stone'
  | 'steel'
  | 'concrete'
  | 'ceramic'
  | 'plaster'
  | 'plants'
  | 'translucent'
  | 'paint'
  | 'terrazzo'
  | 'canopy';
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470

export type FeatureLayout = 'wide' | 'portraitLeft' | 'portraitRight' | 'full';

export interface Project {
  slug: ProjectSlug;
  /** First image is the cover. */
  images: AssetKey[];
  materials: MaterialKey[];
  titleVerified: boolean;
  /** Confirmed only — otherwise null and hidden. */
  location: string | null;
  year: number | null;
  /** Editorial layout used on the home page. */
  layout: FeatureLayout;
<<<<<<< HEAD
  /** Page palette for the project's detail page. */
  theme: ThemeName;
=======
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
  /** CSS object-position for the cover crop. */
  coverPosition: string;
}

export const projects: Project[] = [
  {
<<<<<<< HEAD
    slug: 'cafe',
    images: ['cafe', 'basin'],
    materials: ['plaster', 'timber', 'steel', 'translucent', 'ceramic'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'full',
    theme: 'leather',
    coverPosition: '50% 55%',
  },
  {
    slug: 'desierto',
    images: ['desiertoWide', 'desiertoDoor', 'desiertoDrape'],
    materials: ['plaster', 'timber', 'steel', 'textile', 'plants'],
=======
    slug: 'buna',
    images: ['bunaBar', 'basin'],
    materials: ['ceramic', 'steel', 'stone', 'canopy', 'plants'],
    titleVerified: true,
    location: null,
    year: null,
    layout: 'full',
    coverPosition: '50% 55%',
  },
  {
    slug: 'yale',
    images: ['yale'],
    materials: ['timber', 'stone'],
    titleVerified: true,
    location: null,
    year: null,
    layout: 'wide',
    coverPosition: '50% 50%',
  },
  {
    slug: 'escalera',
    images: ['stairGarden'],
    materials: ['concrete', 'timber', 'steel', 'stone', 'plants'],
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitRight',
<<<<<<< HEAD
    theme: 'cognac',
    coverPosition: '50% 50%',
  },
  {
    slug: 'billar',
    images: ['billar', 'billarLounge'],
    materials: ['paint', 'timber', 'leather', 'brass', 'plants'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'full',
    theme: 'green',
    coverPosition: '50% 55%',
  },
  {
    slug: 'bano',
    images: ['banoB', 'banoA'],
    materials: ['ceramic', 'timber', 'glass', 'stone', 'plants'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'wide',
    theme: 'green',
    coverPosition: '50% 50%',
  },
  {
    slug: 'azotea',
    images: ['azotea', 'recamara', 'estarA', 'estarB'],
    materials: ['timber', 'steel', 'plants', 'concrete', 'textile'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitLeft',
    theme: 'sage',
    coverPosition: '50% 50%',
  },
  {
    slug: 'cine',
    images: ['cine'],
    materials: ['timber', 'plaster', 'steel', 'leather'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'wide',
    theme: 'leather',
    coverPosition: '50% 50%',
  },
  {
    slug: 'oficina',
    images: ['oficinaEscalera', 'oficinaAlta'],
    materials: ['steel', 'translucent', 'timber', 'plants', 'concrete'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitRight',
    theme: 'sage',
    coverPosition: '50% 50%',
  },
  {
    slug: 'terraza',
    images: ['terraza'],
=======
    coverPosition: '40% 50%',
  },
  {
    slug: 'pergola',
    images: ['pergola'],
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
    materials: ['timber', 'steel', 'translucent', 'plants'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitLeft',
<<<<<<< HEAD
    theme: 'green',
    coverPosition: '50% 55%',
  },
  {
    slug: 'sala',
    images: ['sala'],
    materials: ['timber', 'steel', 'textile', 'paint'],
=======
    coverPosition: '50% 50%',
  },
  {
    slug: 'rojo',
    images: ['redRoom'],
    materials: ['paint', 'timber', 'steel'],
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
    titleVerified: false,
    location: null,
    year: null,
    layout: 'wide',
<<<<<<< HEAD
    theme: 'ivory',
    coverPosition: '50% 55%',
  },
  {
    slug: 'cocina',
    images: ['cocina'],
    materials: ['timber', 'stone', 'plants'],
=======
    coverPosition: '50% 40%',
  },
  {
    slug: 'cactus',
    images: ['cactus'],
    materials: ['timber', 'plaster', 'plants'],
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitRight',
<<<<<<< HEAD
    theme: 'sage',
    coverPosition: '50% 50%',
  },
  {
    slug: 'vestidor',
    images: ['vestidor'],
    materials: ['timber'],
=======
    coverPosition: '50% 60%',
  },
  {
    slug: 'cocina',
    images: ['kitchen'],
    materials: ['timber', 'terrazzo', 'stone', 'plants'],
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitLeft',
<<<<<<< HEAD
    theme: 'cognac',
    coverPosition: '50% 50%',
  },
  {
    slug: 'fachada',
    images: ['fachada'],
    materials: ['timber', 'steel', 'paint'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'wide',
    theme: 'leather',
    coverPosition: '50% 60%',
  },
=======
    coverPosition: '50% 50%',
  },
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: ProjectSlug) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    index: i,
    total: projects.length,
    next: projects[(i + 1) % projects.length],
  };
}

/** Projects featured on the home page, in editorial order. */
<<<<<<< HEAD
export const featuredSlugs: ProjectSlug[] = ['cafe', 'billar', 'desierto', 'bano', 'azotea'];
=======
export const featuredSlugs: ProjectSlug[] = ['buna', 'yale', 'escalera', 'pergola', 'cactus'];
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
