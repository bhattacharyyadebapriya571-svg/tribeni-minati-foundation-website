/**
 * Vanilla JavaScript adapter for @projectbillion/motion.
 * No framework dependencies. Works with any HTML page.
 */

import { SpringValue, SpringConfig, springPresets } from '../core/spring.js';
import { animate as coreAnimate, MotionValue, AnimateOptions, animateStagger, sequence } from '../core/animate.js';
import { makeDraggable, makeHoverable, makeTappable, DragOptions, HoverOptions, TapOptions } from '../core/gesture.js';
import { scrollTrigger, staggerScrollTrigger, createScrollProgress, parallax, scrollLinked, ScrollTriggerOptions } from '../core/scroll.js';

export { springPresets };
export type { SpringConfig, MotionValue, AnimateOptions, DragOptions, HoverOptions, TapOptions };

// ---------------------------------------------------------------------------
// createMotion — main factory for vanilla usage
// ---------------------------------------------------------------------------

export interface MotionInstance {
  el: HTMLElement;
  animate(to: MotionValue, options?: AnimateOptions): () => void;
  hover(to: MotionValue, spring?: SpringConfig): () => void;
  tap(options?: TapOptions): () => void;
  drag(options?: DragOptions): () => void;
  inView(to: MotionValue, from?: MotionValue, options?: Omit<ScrollTriggerOptions, 'to' | 'from'>): () => void;
  parallax(options?: { speed?: number; axis?: 'x' | 'y' }): () => void;
  spring(initial: number, config?: SpringConfig): SpringValue;
  destroy(): void;
}

/**
 * Create a motion instance for an element.
 *
 * @example
 * const card = createMotion('#my-card');
 * card.animate({ y: 0, opacity: 1 });
 * card.hover({ scale: 1.04, y: -4 });
 */
export function createMotion(
  target: string | HTMLElement,
  options?: { initial?: MotionValue },
): MotionInstance {
  const el = typeof target === 'string'
    ? (document.querySelector<HTMLElement>(target) ?? (() => { throw new Error(`Element not found: ${target}`); })())
    : target;

  const cleanups: (() => void)[] = [];

  if (options?.initial) {
    coreAnimate(el, options.initial, { spring: { stiffness: 10000, damping: 1000 } });
  }

  function registerCleanup(fn: () => void): () => void {
    cleanups.push(fn);
    return fn;
  }

  return {
    el,

    animate(to, animOptions) {
      return registerCleanup(coreAnimate(el, to, animOptions));
    },

    hover(to, spring) {
      const config = spring ?? springPresets.snappy;
      const rest: MotionValue = {};
      for (const k of Object.keys(to) as (keyof MotionValue)[]) {
        (rest as Record<string, number>)[k] = k === 'opacity' ? 1 : k.startsWith('scale') ? 1 : 0;
      }

      const onEnter = () => coreAnimate(el, to, { spring: config });
      const onLeave = () => coreAnimate(el, rest, { spring: config });

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      const cleanup = () => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      };
      return registerCleanup(cleanup);
    },

    tap(tapOptions) {
      return registerCleanup(makeTappable(el, tapOptions));
    },

    drag(dragOptions) {
      return registerCleanup(makeDraggable(el, dragOptions));
    },

    inView(to, from, inViewOptions) {
      return registerCleanup(
        scrollTrigger(el, { to, from, ...inViewOptions }),
      );
    },

    parallax(parallaxOptions) {
      return registerCleanup(parallax(el, parallaxOptions));
    },

    spring(initial, config) {
      const sv = new SpringValue(initial, config);
      cleanups.push(() => sv.destroy());
      return sv;
    },

    destroy() {
      cleanups.forEach(c => c());
      cleanups.length = 0;
    },
  };
}

// ---------------------------------------------------------------------------
// animate — direct function for one-off animations
// ---------------------------------------------------------------------------

/**
 * Animate an element or selector to target values.
 *
 * @example
 * animate('#hero', { opacity: 1, y: 0 }, { spring: 'gentle' });
 */
export function animate(
  target: string | HTMLElement,
  to: MotionValue,
  options?: AnimateOptions,
): () => void {
  const el = typeof target === 'string'
    ? document.querySelector<HTMLElement>(target)
    : target;
  if (!el) return () => {};
  return coreAnimate(el, to, options);
}

/**
 * Animate multiple elements with a stagger delay.
 *
 * @example
 * stagger('.card', { opacity: 1, y: 0 }, { stagger: 60 });
 */
export function stagger(
  target: string | HTMLElement[],
  to: MotionValue,
  options?: AnimateOptions & { stagger?: number },
): () => void {
  const elements = typeof target === 'string'
    ? Array.from(document.querySelectorAll<HTMLElement>(target))
    : target;
  return animateStagger(elements, to, options);
}

// ---------------------------------------------------------------------------
// scroll — scroll-related utilities
// ---------------------------------------------------------------------------

export const scroll = {
  /**
   * Trigger an animation when an element enters the viewport.
   *
   * @example
   * scroll.trigger('#section', { to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 32 } });
   */
  trigger(
    target: string | HTMLElement,
    options: ScrollTriggerOptions,
  ): () => void {
    const el = typeof target === 'string'
      ? document.querySelector<HTMLElement>(target)
      : target;
    if (!el) return () => {};
    return scrollTrigger(el, options);
  },

  /**
   * Stagger-trigger multiple elements on scroll entry.
   *
   * @example
   * scroll.stagger('.feature-card', { from: { opacity: 0, y: 24 }, to: { opacity: 1, y: 0 }, stagger: 60 });
   */
  stagger(
    target: string | HTMLElement[],
    options: ScrollTriggerOptions,
  ): () => void {
    const elements = typeof target === 'string'
      ? Array.from(document.querySelectorAll<HTMLElement>(target))
      : target;
    return staggerScrollTrigger(elements, options);
  },

  /**
   * Get a reactive scroll progress value (0–1).
   *
   * @example
   * const { progress, destroy } = scroll.progress();
   * progress.subscribe(v => console.log(v));
   */
  progress: createScrollProgress,

  /**
   * Apply a parallax effect to an element.
   *
   * @example
   * scroll.parallax('#hero-image', { speed: -0.3 });
   */
  parallax(target: string | HTMLElement, options?: { speed?: number; axis?: 'x' | 'y' }): () => void {
    const el = typeof target === 'string'
      ? document.querySelector<HTMLElement>(target)
      : target;
    if (!el) return () => {};
    return parallax(el, options);
  },

  /**
   * Link a CSS property to scroll progress.
   *
   * @example
   * scroll.linked('#nav', 'background-color', [0, 1]); // opacity: 0 → 1
   */
  linked(
    target: string | HTMLElement,
    property: string,
    range: [number, number],
    options?: Parameters<typeof scrollLinked>[3],
  ): () => void {
    const el = typeof target === 'string'
      ? document.querySelector<HTMLElement>(target)
      : target;
    if (!el) return () => {};
    return scrollLinked(el, property, range, options);
  },
};

// ---------------------------------------------------------------------------
// spring — standalone spring value factory
// ---------------------------------------------------------------------------

/**
 * Create a reactive spring value.
 *
 * @example
 * const opacity = spring(0, { stiffness: 300, damping: 30 });
 * opacity.subscribe(v => { el.style.opacity = String(v); });
 * opacity.set(1);
 */
export function spring(initial: number, config?: SpringConfig): SpringValue {
  return new SpringValue(initial, config);
}

// ---------------------------------------------------------------------------
// Re-export core types and utilities
// ---------------------------------------------------------------------------

export { SpringValue, animateStagger, sequence };
export { makeDraggable, makeHoverable, makeTappable };
export { scrollTrigger, staggerScrollTrigger, createScrollProgress, parallax, scrollLinked };
