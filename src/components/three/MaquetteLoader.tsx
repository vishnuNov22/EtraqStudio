'use client';

import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Photo } from '@/components/ui/Photo';

// The three.js bundle is a separate chunk: nothing is downloaded until the section approaches the viewport.
const MaquetteScene = dynamic(() => import('./MaquetteScene'), { ssr: false });

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Lazy, resilient 3D viewport.
 * - Mounts only when scrolled near, and pauses its render loop when off-screen.
 * - Falls back to a photograph when WebGL is unavailable, the scene errors, or the GPU context is lost.
 * - Respects prefers-reduced-motion (no auto-rotation).
 */
export function MaquetteLoader() {
  const t = useTranslations('Maquette');
  const reduceMotion = useReducedMotion() ?? false;
  const box = useRef<HTMLDivElement>(null);

  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    setSupported(hasWebGL());
    setLowPower(window.matchMedia('(max-width: 767px), (pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: '240px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fail = useCallback(() => setFailed(true), []);
  const onReady = useCallback(() => setReady(true), []);

  const showFallback = supported === false || failed;
  const showScene = supported === true && near && !failed;

  return (
    <div
      ref={box}
      role="group"
      aria-label={t('regionLabel')}
      className="relative aspect-[4/5] w-full overflow-hidden bg-[#2a2926] sm:aspect-[5/4] lg:aspect-square"
    >
      {showScene ? (
        <SceneBoundary onError={fail}>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
            <MaquetteScene
              active={visible}
              reduceMotion={reduceMotion}
              lowPower={lowPower}
              onReady={onReady}
              onFail={fail}
            />
          </div>
        </SceneBoundary>
      ) : null}

      {showFallback ? (
        <>
          <Photo asset="stoneSteps" sizes="(min-width: 1024px) 45vw, 100vw" ratio="auto" reveal={false} zoom={false} className="absolute! inset-0 h-full" />
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-5 text-[0.875rem] leading-snug text-ivory">
            {t('fallbackNote')}
          </p>
        </>
      ) : null}

      {!showFallback && !ready ? (
        <p role="status" className="absolute inset-0 flex items-center justify-center text-[0.8125rem] tracking-[0.14em] text-ivory/70 uppercase">
          {t('loading')}
        </p>
      ) : null}

      {ready && !showFallback ? (
        <p aria-hidden className="pointer-events-none absolute bottom-4 left-5 eyebrow text-ivory/70">
          {t('hint')}
        </p>
      ) : null}
    </div>
  );
}
