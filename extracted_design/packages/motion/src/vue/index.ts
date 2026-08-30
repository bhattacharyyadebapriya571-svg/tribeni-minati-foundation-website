/**
 * Vue 3 adapter for @projectbillion/motion.
 * Composables and directives with spring physics.
 */

import {
  ref,
  onMounted,
  onUnmounted,
  Ref,
  DirectiveBinding,
  App,
  ComputedRef,
  computed,
} from 'vue';

import { SpringValue, SpringConfig, springPresets } from '../core/spring.js';
import { animate, MotionValue } from '../core/animate.js';
import { makeDraggable, makeHoverable, makeTappable, DragOptions } from '../core/gesture.js';
import { scrollTrigger, createScrollProgress, parallax } from '../core/scroll.js';

// ---------------------------------------------------------------------------
// Composables
// ---------------------------------------------------------------------------

/**
 * useSpring — reactive spring value for Vue.
 *
 * @example
 * const { value, set, jump } = useSpring(0, { stiffness: 300, damping: 30 });
 * set(100); // animate to 100
 */
export function useSpring(initialValue: number, config?: SpringConfig) {
  const spring = new SpringValue(initialValue, config);
  const value: Ref<number> = ref(initialValue);

  const unsubscribe = spring.subscribe((v) => { value.value = v; });

  onUnmounted(() => {
    unsubscribe();
    spring.destroy();
  });

  return {
    value: value as Readonly<Ref<number>>,
    set: (target: number, newConfig?: SpringConfig) => spring.set(target, newConfig),
    jump: (v: number) => spring.jump(v),
    get: () => spring.get(),
    _spring: spring,
  };
}

/**
 * useMotion — animate a Vue template ref with spring physics.
 *
 * @example
 * const { motionRef, animate } = useMotion();
 * onMounted(() => animate({ opacity: 1, y: 0 }));
 * // In template: <div ref="motionRef">
 */
export function useMotion(config?: SpringConfig) {
  const motionRef: Ref<HTMLElement | null> = ref(null);
  let cancelCurrent: (() => void) | null = null;

  function animateTo(to: MotionValue, options?: { spring?: SpringConfig; delay?: number }) {
    if (!motionRef.value) return () => {};
    cancelCurrent?.();
    cancelCurrent = animate(motionRef.value, to, {
      spring: options?.spring ?? config,
      delay: options?.delay,
    });
    return cancelCurrent;
  }

  onUnmounted(() => cancelCurrent?.());

  return { motionRef, animate: animateTo };
}

/**
 * useScrollProgress — reactive scroll progress (0–1) with spring smoothing.
 *
 * @example
 * const { progress } = useScrollProgress();
 * // progress.value is a reactive number from 0–1
 */
export function useScrollProgress(config?: SpringConfig) {
  const progress: Ref<number> = ref(0);
  let cleanup: (() => void) | null = null;

  onMounted(() => {
    const { progress: springVal, rawProgress, destroy } = createScrollProgress({ spring: config });
    const unsub = springVal.subscribe((v) => { progress.value = v; });
    cleanup = () => { unsub(); destroy(); };
  });

  onUnmounted(() => cleanup?.());

  return { progress: progress as Readonly<Ref<number>> };
}

/**
 * useInView — returns a ref and a reactive boolean.
 *
 * @example
 * const { elRef, inView } = useInView({ once: true });
 */
export function useInView(options?: { threshold?: number; rootMargin?: string; once?: boolean }) {
  const elRef: Ref<HTMLElement | null> = ref(null);
  const inView: Ref<boolean> = ref(false);
  const { threshold = 0.1, rootMargin = '-60px', once = true } = options ?? {};
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!elRef.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView.value = true;
          if (once) observer?.unobserve(elRef.value!);
        } else if (!once) {
          inView.value = false;
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(elRef.value);
  });

  onUnmounted(() => observer?.disconnect());

  return { elRef, inView: inView as Readonly<Ref<boolean>> };
}

/**
 * useParallax — parallax scroll effect for a Vue template ref.
 *
 * @example
 * const { elRef } = useParallax({ speed: -0.3 });
 */
export function useParallax(options?: { speed?: number; axis?: 'x' | 'y' }) {
  const elRef: Ref<HTMLElement | null> = ref(null);
  let cleanup: (() => void) | null = null;

  onMounted(() => {
    if (!elRef.value) return;
    cleanup = parallax(elRef.value, options);
  });

  onUnmounted(() => cleanup?.());

  return { elRef };
}

/**
 * useDrag — makes a template ref element draggable.
 *
 * @example
 * const { elRef } = useDrag({ axis: 'x' });
 */
export function useDrag(options?: DragOptions) {
  const elRef: Ref<HTMLElement | null> = ref(null);
  let cleanup: (() => void) | null = null;

  onMounted(() => {
    if (!elRef.value) return;
    cleanup = makeDraggable(elRef.value, options);
  });

  onUnmounted(() => cleanup?.());

  return { elRef };
}

// ---------------------------------------------------------------------------
// Directives
// ---------------------------------------------------------------------------

/**
 * v-motion directive — animates an element from initial to target values on mount.
 *
 * @example
 * <div v-motion="{ initial: { opacity: 0, y: 32 }, enter: { opacity: 1, y: 0 } }" />
 */
export const vMotion = {
  mounted(el: HTMLElement, binding: DirectiveBinding<{
    initial?: MotionValue;
    enter?: MotionValue;
    spring?: SpringConfig | keyof typeof springPresets;
    delay?: number;
  }>) {
    const { initial, enter, spring, delay = 0 } = binding.value ?? {};
    const config: SpringConfig = typeof spring === 'string'
      ? springPresets[spring]
      : (spring ?? springPresets.default);

    if (initial) {
      animate(el, initial, { spring: { stiffness: 10000, damping: 1000 } });
    }

    if (enter) {
      setTimeout(() => animate(el, enter, { spring: config }), delay);
    }
  },
};

/**
 * v-hover directive — spring hover effect.
 *
 * @example
 * <div v-hover="{ scale: 1.04, y: -4 }" />
 */
export const vHover = {
  mounted(el: HTMLElement, binding: DirectiveBinding<MotionValue & { spring?: SpringConfig }>) {
    const { spring, ...to } = binding.value ?? {};
    const config = spring ?? springPresets.snappy;

    const onEnter = () => animate(el, to, { spring: config });
    const onLeave = () => {
      const base: MotionValue = {};
      for (const k of Object.keys(to) as (keyof MotionValue)[]) {
        (base as Record<string, number>)[k] = k === 'opacity' ? 1 : k.startsWith('scale') ? 1 : 0;
      }
      animate(el, base, { spring: config });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    (el as HTMLElement & { _motionHoverCleanup?: () => void })._motionHoverCleanup = () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  },
  unmounted(el: HTMLElement) {
    (el as HTMLElement & { _motionHoverCleanup?: () => void })._motionHoverCleanup?.();
  },
};

/**
 * v-in-view directive — animates when element enters viewport.
 *
 * @example
 * <div v-in-view="{ from: { opacity: 0, y: 32 }, to: { opacity: 1, y: 0 } }" />
 */
export const vInView = {
  mounted(el: HTMLElement, binding: DirectiveBinding<{
    from?: MotionValue;
    to?: MotionValue;
    once?: boolean;
    margin?: string;
    spring?: SpringConfig;
  }>) {
    const { from, to, once = true, margin = '-60px', spring } = binding.value ?? {};
    const cleanup = scrollTrigger(el, { from, to, once, rootMargin: margin, spring });
    (el as HTMLElement & { _motionInViewCleanup?: () => void })._motionInViewCleanup = cleanup;
  },
  unmounted(el: HTMLElement) {
    (el as HTMLElement & { _motionInViewCleanup?: () => void })._motionInViewCleanup?.();
  },
};

// ---------------------------------------------------------------------------
// Plugin install
// ---------------------------------------------------------------------------

export interface MotionPluginOptions {
  directives?: boolean;
}

export const MotionPlugin = {
  install(app: App, options: MotionPluginOptions = {}) {
    const { directives = true } = options;

    if (directives) {
      app.directive('motion', vMotion);
      app.directive('hover', vHover);
      app.directive('in-view', vInView);
    }
  },
};
