"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 → target over `duration` ms (ease-out cubic).
 * `delay` lets you stagger multiple counters on the same page.
 */
export function useCountUp(target: number, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(null);

  useEffect(() => {
    const startAt = performance.now() + delay;

    const tick = (now: number) => {
      if (now < startAt) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = Math.min(now - startAt, duration);
      const t = elapsed / duration;
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
}

/**
 * Returns false on first render, true after `delay` ms.
 * Use to trigger CSS enter-animations after the first paint.
 */
export function useMounted(delay = 80) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return mounted;
}
