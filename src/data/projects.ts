import type { AssetKey } from './assets';

/**
 * Project data layer. Text (titles, types, descriptions) lives in the translation files under
 * `Projects.items.<slug>`; this file holds structure only, so it is identical in every language.
 *
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
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export type MaterialKey =
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
  /** CSS object-position for the cover crop. */
  coverPosition: string;
}

export const projects: Project[] = [
  {
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
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitRight',
    coverPosition: '40% 50%',
  },
  {
    slug: 'pergola',
    images: ['pergola'],
    materials: ['timber', 'steel', 'translucent', 'plants'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitLeft',
    coverPosition: '50% 50%',
  },
  {
    slug: 'rojo',
    images: ['redRoom'],
    materials: ['paint', 'timber', 'steel'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'wide',
    coverPosition: '50% 40%',
  },
  {
    slug: 'cactus',
    images: ['cactus'],
    materials: ['timber', 'plaster', 'plants'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitRight',
    coverPosition: '50% 60%',
  },
  {
    slug: 'cocina',
    images: ['kitchen'],
    materials: ['timber', 'terrazzo', 'stone', 'plants'],
    titleVerified: false,
    location: null,
    year: null,
    layout: 'portraitLeft',
    coverPosition: '50% 50%',
  },
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
export const featuredSlugs: ProjectSlug[] = ['buna', 'yale', 'escalera', 'pergola', 'cactus'];
