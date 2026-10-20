import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { MaquetteLoader } from '@/components/three/MaquetteLoader';

/** Signature 3D feature: an abstract study of volumes, clearly labelled as not a built project. */
export function MaquetteSection() {
  const t = useTranslations('Maquette');

  return (
    <section aria-labelledby="maquette-title" className="on-dark grain bg-charcoal py-24 text-ivory md:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6 opacity-70">{t('eyebrow')}</p>
          </Reveal>
          <SplitHeading as="h2" id="maquette-title" text={t('title')} className="font-display display-lg" />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-[1.0625rem] leading-[1.75] opacity-85">{t('body')}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="rule mt-10 max-w-md pt-5 text-[0.875rem] leading-[1.7] opacity-65">{t('caption')}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <MaquetteLoader />
        </div>
      </div>
    </section>
  );
}
