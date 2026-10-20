'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { getAsset } from '@/data/assets';
import { siteConfig } from '@/config/site';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic opening. The photograph is the hero: a restrained inset-to-full reveal, gentle scroll
 * parallax, and staggered type. With reduced motion (or no JS) the same composition renders statically.
 */
export function Hero() {
  const t = useTranslations('Hero');
  const ti = useTranslations('Images');
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const asset = getAsset('pergola');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%']);

  return (
    <section
      ref={ref}
      className="on-dark relative isolate flex min-h-[640px] h-[100svh] flex-col justify-end overflow-hidden bg-charcoal text-ivory"
    >
      <motion.div
        data-reveal
        className="absolute inset-0 -z-20"
        initial={reduce ? false : { clipPath: 'inset(7% 7% 7% 7%)', scale: 1.06 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={{ y }}>
          <Image
            src={asset.src}
            alt={ti('pergola')}
            fill
            priority
            sizes="100vw"
            quality={82}
            placeholder="blur"
            blurDataURL={asset.blurDataURL}
            className="object-cover"
            style={{ objectPosition: '50% 48%' }}
          />
        </motion.div>
      </motion.div>

      {/* Scrim: guarantees contrast for the type without covering the photograph with a card. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-charcoal/25"
      />

      <div className="container-x pb-10 md:pb-14">
        <motion.p
          data-reveal
          className="eyebrow mb-5 opacity-90 md:mb-7"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
        >
          {t('discipline')} · {t('location')}
        </motion.p>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <h1 className="font-display leading-[0.85] tracking-[-0.03em] text-[clamp(5.25rem,21vw,19rem)]">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                data-reveal
                className="inline-block"
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.4, delay: 0.55, ease: EASE }}
              >
                {siteConfig.wordmark}
                <span className="ml-[0.08em] align-baseline text-[0.2em] italic tracking-normal opacity-75">
                  {siteConfig.wordmarkSuffix}
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            data-reveal
            className="max-w-xs md:pb-5 md:text-right"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.15, ease: EASE }}
          >
            <p className="font-display text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.12]">
              {t('statement')}
            </p>
          </motion.div>
        </div>

        <motion.a
          data-reveal
          href="#studio-intro"
          className="mt-10 inline-flex items-center gap-4 eyebrow opacity-80 transition-opacity hover:opacity-100"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-ivory/30">
            <span className="scroll-cue absolute inset-0 block bg-ivory" />
          </span>
          {t('scroll')}
        </motion.a>
      </div>
    </section>
  );
}
