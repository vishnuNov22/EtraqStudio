import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { Marquee } from '@/components/sections/Marquee';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { ProjectIndex } from '@/components/sections/ProjectIndex';
import { MaquetteSection } from '@/components/sections/MaquetteSection';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { CtaBand } from '@/components/sections/CtaBand';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'home', '/');
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <ProjectShowcase />
      <ProjectIndex />
      <MaquetteSection />
      <ApproachSection />
      <CtaBand />
    </>
  );
}
