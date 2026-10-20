import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Photo } from '@/components/ui/Photo';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { DraftNote } from '@/components/ui/DraftNote';

export const pillarKeys = ['matter', 'light', 'green', 'everyday'] as const;

/** Home-page version of the philosophy: four principles with fine separators. */
export function ApproachSection() {
  const t = useTranslations('Approach');

  return (
    <section aria-labelledby="approach-title" className="py-24 md:py-40">
      <div className="container-x grid gap-14 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6 text-muted">{t('eyebrow')}</p>
          </Reveal>
          <SplitHeading as="h2" id="approach-title" text={t('title')} className="font-display display-md" />
          <div className="mt-10 hidden md:block">
            <Photo asset="stoneSteps" ratio="4 / 5" sizes="40vw" position="50% 55%" />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="mb-10 max-w-md text-[1.0625rem] leading-[1.75] text-ink/85">{t('lead')}</p>
          </Reveal>
          <ol aria-label={t('pillarsLabel')}>
            {pillarKeys.map((key, i) => (
              <li key={key} className="rule">
                <Reveal className="grid gap-3 py-8 sm:grid-cols-[3rem_1fr] sm:gap-6 md:py-10" delay={0.05}>
                  <span aria-hidden className="eyebrow pt-2 text-muted">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display display-sm mb-3">{t(`pillars.${key}.title`)}</h3>
                    <p className="max-w-lg leading-[1.75] text-ink/85">{t(`pillars.${key}.body`)}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="rule flex flex-col items-start gap-6 pt-8">
            <DraftNote message={t('draftNote')} />
            <ArrowLink href="/approach">{t('cta')}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
