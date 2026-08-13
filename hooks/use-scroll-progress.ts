'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export interface ScrollProgressState {
  /** 0–1 progress through the entire tracked element */
  global: number;
  /** Index of the active panel segment */
  panelIndex: number;
  /** 0–1 progress within the active panel segment */
  panelProgress: number;
}

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  panelCount: number,
): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    global: 0,
    panelIndex: 0,
    panelProgress: 0,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || panelCount <= 0) return;

    const measure = () => {
      rafRef.current = null;
      const rect = element.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrolled = -rect.top;
      const total = Math.max(rect.height - viewportH, 1);
      const global = clamp(scrolled / total, 0, 1);
      const exact = global * panelCount;
      const panelIndex = clamp(Math.floor(exact), 0, panelCount - 1);
      const panelProgress = clamp(exact - panelIndex, 0, 1);

      setState((prev) => {
        if (
          prev.global === global &&
          prev.panelIndex === panelIndex &&
          prev.panelProgress === panelProgress
        ) {
          return prev;
        }
        return { global, panelIndex, panelProgress };
      });
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [ref, panelCount]);

  return state;
}
