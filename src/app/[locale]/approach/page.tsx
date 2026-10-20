import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import type { AssetKey } from '@/data/assets';
import { pageMetadata } from '@/lib/metadata';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { DraftNote } from '@/components/ui/DraftNote';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { CtaBand } from '@/components/sections/CtaBand';

type Props = { params: Promise<{ locale: Locale }> };

const pillars: { key: 'matter' | 'light' | 'green' | 'everyday'; asset: AssetKey; position: string }[] = [
  { key: 'matter', asset: 'stoneSteps', position: '50% 50%' },
  { key: 'light', asset: 'cactus', position: '50% 60%' },
  { key: 'green', asset: 'stairGarden', position: '35% 50%' },
  { key: 'everyday', asset: 'redRoom', position: '50% 40%' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'approach', '/approach');
}

export default async function ApproachPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Approach' });

  return (
    <>
      <section aria-labelledby="approach-page-title" className="container-x pb-20 pt-40 md:pb-32 md:pt-52">
        <Reveal onLoad>
          <p className="eyebrow mb-6 text-muted">{t('eyebrow')}</p>
        </Reveal>
        <SplitHeading as="h1" id="approach-page-title" onLoad text={t('title')} className="font-display display-lg max-w-5xl" />
        <Reveal onLoad delay={0.5} className="mt-8 flex flex-col items-start gap-5">
          <p className="max-w-md text-[1.0625rem] leading-[1.75] text-ink/85">{t('lead')}</p>
          <DraftNote message={t('draftNote')} />
        </Reveal>
      </section>

      <ol aria-label={t('pillarsLabel')} className="flex flex-col gap-24 pb-24 md:gap-40 md:pb-40">
        {pillars.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={p.key} className="container-x grid items-center gap-8 md:grid-cols-12 md:gap-10">
              <div className={`md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}>
                <Photo asset={p.asset} ratio="4 / 5" sizes="(min-width: 768px) 42vw, 94vw" position={p.position} parallax />
              </div>
              <div className={`md:col-span-5 ${flip ? 'md:order-1 md:col-start-2' : 'md:col-start-7'}`}>
                <Reveal className="flex flex-col gap-5">
                  <p aria-hidden className="eyebrow text-muted">0{i + 1}</p>
                  <h2 className="font-display display-md">{t(`pillars.${p.key}.title`)}</h2>
                  <p className="max-w-md text-[1.0625rem] leading-[1.8] text-ink/90">{t(`pillars.${p.key}.body`)}</p>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="container-x pb-24 md:pb-32">
        <ArrowLink href="/projects">{t('cta')}</ArrowLink>
      </div>

      <CtaBand />
    </>
  );
}
