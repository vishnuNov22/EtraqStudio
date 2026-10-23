import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
<<<<<<< HEAD
import { ArrowLink } from '@/components/ui/ArrowLink';
import { StatsBand } from '@/components/sections/StatsBand';
import { TeamSection } from '@/components/sections/TeamSection';
=======
import { DraftNote } from '@/components/ui/DraftNote';
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
import { CtaBand } from '@/components/sections/CtaBand';

type Props = { params: Promise<{ locale: Locale }> };

<<<<<<< HEAD
=======
const disciplineKeys = ['architecture', 'interiors', 'landscape'] as const;

>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'studio', '/studio');
}

export default async function StudioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Studio' });
<<<<<<< HEAD
  const bold = (chunks: React.ReactNode) => <strong className="font-normal text-ink [font-weight:500]">{chunks}</strong>;

  return (
    <>
      <section aria-labelledby="studio-title" className="container-x pb-12 pt-36 md:pb-20 md:pt-52">
        <Reveal onLoad>
          <p className="eyebrow mb-6 text-muted">{t('eyebrow')}</p>
        </Reveal>
        <SplitHeading as="h1" id="studio-title" onLoad text={t('title')} className="font-display display-xl" />
      </section>

      <section className="container-x grid gap-12 pb-24 md:grid-cols-12 md:gap-x-10 md:pb-40">
        <div className="order-2 flex flex-col justify-end gap-7 md:order-1 md:col-span-5">
          <Reveal>
            <p className="text-[1.0625rem] leading-[1.8] text-muted">{t('body1')}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[1.0625rem] leading-[1.8] text-muted">{t.rich('body2', { b: bold })}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-[1.0625rem] leading-[1.8] text-muted">{t.rich('body3', { b: bold })}</p>
          </Reveal>
          <Reveal delay={0.24} className="pt-2">
            <ArrowLink href="/projects">{t('projectsCta')}</ArrowLink>
          </Reveal>
        </div>
        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <Photo asset="studioWalk" ratio="4 / 5" sizes="(min-width: 768px) 50vw, 94vw" position="50% 50%" parallax />
        </div>
      </section>

      <StatsBand />
      <TeamSection />
=======

  // Team: intentionally omitted — no verified team information has been supplied.
  return (
    <>
      <section aria-labelledby="studio-title" className="container-x pb-16 pt-40 md:pb-24 md:pt-52">
        <Reveal onLoad>
          <p className="eyebrow mb-6 text-muted">{t('eyebrow')}</p>
        </Reveal>
        <SplitHeading as="h1" id="studio-title" onLoad text={t('title')} className="font-display display-lg max-w-5xl" />
      </section>

      <section className="container-x grid gap-14 pb-24 md:grid-cols-12 md:gap-x-10 md:pb-40">
        <div className="md:col-span-5">
          <Photo asset="overhead" ratio="3 / 4" sizes="(min-width: 768px) 40vw, 94vw" position="50% 60%" parallax />
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-5 md:col-start-8">
          <Reveal>
            <p className="font-display display-sm">{t('lead')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[1.0625rem] leading-[1.8] text-ink/90">{t('body1')}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[1.0625rem] leading-[1.8] text-ink/90">{t('body2')}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <dl className="rule grid grid-cols-[7rem_1fr] gap-x-4 pt-6 text-[0.9375rem]">
              <dt className="eyebrow pt-1 text-muted">{t('locationLabel')}</dt>
              <dd>{t('locationValue')}</dd>
            </dl>
          </Reveal>
          <DraftNote message={t('draftNote')} />
        </div>
      </section>

      <section aria-labelledby="disciplines-title" className="container-x pb-24 md:pb-40">
        <Reveal>
          <h2 id="disciplines-title" className="eyebrow mb-10 text-muted">
            {t('disciplinesTitle')}
          </h2>
        </Reveal>
        <ul className="grid gap-x-10 gap-y-12 md:grid-cols-3">
          {disciplineKeys.map((key, i) => (
            <li key={key} className="rule pt-6">
              <Reveal delay={i * 0.08}>
                <h3 className="font-display display-sm mb-4">{t(`disciplines.${key}.title`)}</h3>
                <p className="max-w-xs leading-[1.75] text-ink/85">{t(`disciplines.${key}.body`)}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="gallery-title" className="pb-24 md:pb-40">
        <div className="container-x">
          <Reveal>
            <h2 id="gallery-title" className="eyebrow mb-10 text-muted">
              {t('galleryTitle')}
            </h2>
          </Reveal>
          <div className="grid items-start gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <Photo asset="basin" ratio="4 / 5" sizes="(min-width: 768px) 40vw, 94vw" position="60% 55%" />
            </div>
            <div className="md:col-span-4 md:mt-24">
              <Photo asset="stoneSteps" ratio="3 / 4" sizes="(min-width: 768px) 32vw, 94vw" />
            </div>
            <div className="md:col-span-3 md:mt-48">
              <Photo asset="redRoom" ratio="3 / 4" sizes="(min-width: 768px) 24vw, 94vw" position="50% 35%" />
            </div>
          </div>
        </div>
      </section>

>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
      <CtaBand />
    </>
  );
}
