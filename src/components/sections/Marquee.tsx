import { useTranslations } from 'next-intl';

/** Slow, pausable ribbon of the studio's four themes. Purely decorative (hidden from assistive tech). */
export function Marquee() {
  const t = useTranslations('Marquee');
  const words = [t('a'), t('b'), t('c'), t('d')];

  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
      {words.map((word, i) => (
        <span key={`${key}-${word}`} className="flex items-center gap-10 md:gap-16">
<<<<<<< HEAD
          <span className={`font-display text-[clamp(3.5rem,9vw,8rem)] leading-none ${i % 2 ? 'outline-text' : ''}`}>
=======
          <span className={`font-display text-[clamp(3.5rem,9vw,8rem)] leading-none ${i % 2 ? 'outline-text italic' : ''}`}>
>>>>>>> 68307ba9e997c30ee9ec9d3694ab91c16fc47470
            {word}
          </span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-rojo" />
        </span>
      ))}
    </div>
  );

  return (
    <div aria-hidden className="marquee select-none overflow-hidden border-y border-line py-8 md:py-12">
      <div className="marquee-track flex w-max">
        {group('a')}
        {group('b')}
      </div>
    </div>
  );
}
