'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { getAsset, type AssetKey } from '@/data/assets';

interface PhotoProps {
  asset: AssetKey;
  sizes: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Defaults to the photograph's own ratio. */
  ratio?: string;
  /** CSS object-position for the crop. */
  position?: string;
  priority?: boolean;
  /** Clip-path reveal when scrolled into view. */
  reveal?: boolean;
  className?: string;
  /** Hover zoom. */
  zoom?: boolean;
}

/** Optimised, translated-alt photograph with an optional masked reveal. */
export function Photo({
  asset,
  sizes,
  ratio,
  position = '50% 50%',
  priority = false,
  reveal = true,
  zoom = true,
  className = '',
}: PhotoProps) {
  const t = useTranslations('Images');
  const reduce = useReducedMotion();
  const a = getAsset(asset);
  const aspectRatio = ratio ?? `${a.width} / ${a.height}`;

  const image = (
    <Image
      src={a.src}
      alt={t(asset)}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={a.blurDataURL}
      quality={82}
      className="object-cover"
      style={{ objectPosition: position }}
    />
  );

  const base = `relative block w-full overflow-hidden bg-limestone ${zoom ? 'photo-zoom' : ''} ${className}`;

  if (!reveal) {
    return (
      <div className={base} style={{ aspectRatio }}>
        {image}
      </div>
    );
  }

  return (
    <motion.div
      data-reveal
      className={base}
      style={{ aspectRatio }}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {image}
    </motion.div>
  );
}
