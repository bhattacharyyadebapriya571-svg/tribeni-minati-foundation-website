/**
 * Scroll-linked animations and scroll-triggered entry effects.
 * Uses IntersectionObserver for entry and scroll events for progress linking.
 */

import { SpringValue, SpringConfig } from './spring.js';
import { MotionValue, animate } from './animate.js';

export interface ScrollProgressOptions {
  container?: HTMLElement | Window;
  axis?: 'y' | 'x';
  spring?: SpringConfig;
  onProgress?: (progress: number) => void;
}

export interface ScrollTriggerOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
  from?: MotionValue;
  to?: MotionValue;
  spring?: SpringConfig;
  onEnter?: (entry: IntersectionObserverEntry) => void;
  onLeave?: (entry: IntersectionObserverEntry) => void;
  stagger?: number;
}

export interface ParallaxOptions {
  speed?: number;
  axis?: 'y' | 'x';
  container?: HTMLElement | Window;
}

/**
 * Returns a reactive ScrollValue (0–1) that tracks scroll progress.
 * Drives via a spring for smooth, inertial following.
 *
 * @example
 * const { progress, destroy } = createScrollProgress();
 * progress.subscribe(v => { el.style.opacity = String(v); });
 */
export function createScrollProgress(options: ScrollProgressOptions = {}): {
  progress: SpringValue;
  rawProgress: () => number;
  destroy: () => void;
} {
  const { container = window, axis = 'y', spring, onProgress } = options;
  const progress = new SpringValue(0, spring ?? { stiffness: 120, damping: 24 });

  function getProgress(): number {
    if (container instanceof Window) {
      if (axis === 'y') {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        return total <= 0 ? 0 : window.scrollY / total;
      } else {
        const total = document.documentElement.scrollWidth - window.innerWidth;
        return total <= 0 ? 0 : window.scrollX / total;
      }
    } else {
      if (axis === 'y') {
        const total = container.scrollHeight - container.clientHeight;
        return total <= 0 ? 0 : container.scrollTop / total;
      } else {
        const total = container.scrollWidth - container.clientWidth;
        return total <= 0 ? 0 : container.scrollLeft / total;
      }
    }
  }

  function onScroll() {
    const raw = getProgress();
    progress.set(raw);
    onProgress?.(raw);
  }

  container.addEventListener('scroll', onScroll, { passive: true });

  return {
    progress,
    rawProgress: getProgress,
    destroy: () => {
      container.removeEventListener('scroll', onScroll);
      progress.destroy();
    },
  };
}

/**
 * Triggers a spring animation when an element enters or leaves the viewport.
 * Returns a cleanup function.
 *
 * @example
 * const cleanup = scrollTrigger(el, {
 *   from: { opacity: 0, y: 32 },
 *   to: { opacity: 1, y: 0 },
 *   once: true,
 * });
 */
export function scrollTrigger(el: HTMLElement, options: ScrollTriggerOptions = {}): () => void {
  const {
    threshold = 0.1,
    rootMargin = '-60px',
    once = true,
    from,
    to,
    spring,
    onEnter,
    onLeave,
  } = options;

  let hasEntered = false;
  let cancelAnimation: (() => void) | null = null;

  if (from) {
    for (const [key, value] of Object.entries(from) as [keyof MotionValue, number][]) {
      if (key === 'opacity') el.style.opacity = String(value);
      else if (key === 'y') el.style.transform = `translateY(${value}px)`;
      else if (key === 'x') el.style.transform = `translateX(${value}px)`;
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (once && hasEntered) continue;
          hasEntered = true;
          cancelAnimation?.();
          if (to) cancelAnimation = animate(el, to, { spring });
          onEnter?.(entry);
          if (once) observer.unobserve(el);
        } else {
          if (!once && from) {
            cancelAnimation?.();
            cancelAnimation = animate(el, from, { spring });
          }
          onLeave?.(entry);
        }
      }
    },
    { threshold, rootMargin },
  );

  observer.observe(el);

  return () => {
    observer.disconnect();
    cancelAnimation?.();
  };
}

/**
 * Applies scroll-triggered effects to a list of elements with stagger.
 * Returns a cleanup function.
 *
 * @example
 * const cleanup = staggerScrollTrigger(cards, {
 *   from: { opacity: 0, y: 24 },
 *   to: { opacity: 1, y: 0 },
 *   stagger: 60,
 * });
 */
export function staggerScrollTrigger(
  elements: HTMLElement[],
  options: ScrollTriggerOptions,
): () => void {
  const { stagger = 60, ...rest } = options;

  const cleanups = elements.map((el, i) =>
    scrollTrigger(el, {
      ...rest,
      spring: rest.spring ?? { stiffness: 300, damping: 30 },
      onEnter: (entry) => {
        setTimeout(() => {
          if (rest.to) animate(el, rest.to, { spring: rest.spring });
          rest.onEnter?.(entry);
        }, i * stagger);
      },
    }),
  );

  return () => cleanups.forEach(c => c());
}

/**
 * Applies a parallax scroll effect to an element.
 * Returns a cleanup function.
 *
 * @example
 * // Element moves at half the scroll speed (subtle depth effect)
 * const cleanup = parallax(heroImage, { speed: -0.3 });
 */
export function parallax(el: HTMLElement, options: ParallaxOptions = {}): () => void {
  const { speed = -0.2, axis = 'y', container = window } = options;

  el.style.willChange = 'transform';

  function onScroll() {
    const scrollPos = axis === 'y'
      ? (container instanceof Window ? window.scrollY : (container as HTMLElement).scrollTop)
      : (container instanceof Window ? window.scrollX : (container as HTMLElement).scrollLeft);

    const offset = scrollPos * speed;
    el.style.transform = axis === 'y'
      ? `translate3d(0, ${offset}px, 0)`
      : `translate3d(${offset}px, 0, 0)`;
  }

  container.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // apply initial position

  return () => {
    container.removeEventListener('scroll', onScroll);
    el.style.transform = '';
    el.style.willChange = '';
  };
}

/**
 * Links an element's style property to scroll progress (0–1).
 * Returns a cleanup function.
 *
 * @example
 * // Fade an element from fully visible to transparent as user scrolls
 * const cleanup = scrollLinked(el, 'opacity', [1, 0]);
 */
export function scrollLinked(
  el: HTMLElement,
  property: string,
  range: [number, number],
  options: ScrollProgressOptions & { unit?: string } = {},
): () => void {
  const { unit = '', ...progressOptions } = options;
  const [from, to] = range;

  const { progress, destroy } = createScrollProgress(progressOptions);

  const unsub = progress.subscribe((p) => {
    const value = from + (to - from) * p;
    if (property === 'transform') {
      el.style.transform = `${unit}(${value})`;
    } else {
      (el.style as Record<string, string>)[property] = `${value}${unit}`;
    }
  });

  return () => {
    unsub();
    destroy();
  };
}
