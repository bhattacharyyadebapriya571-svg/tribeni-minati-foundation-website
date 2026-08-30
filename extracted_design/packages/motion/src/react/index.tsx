/**
 * React adapter for @projectbillion/motion.
 * Declarative components and hooks with spring physics.
 */

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  HTMLAttributes,
  CSSProperties,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { animateSpring, SpringConfig, SpringValue, springPresets } from '../core/spring.js';
import { animate, MotionValue, AnimateOptions } from '../core/animate.js';
import { makeDraggable, makeHoverable, makeTappable, DragOptions, HoverOptions, TapOptions } from '../core/gesture.js';
import { scrollTrigger, ScrollTriggerOptions, createScrollProgress, parallax } from '../core/scroll.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MotionProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  // Initial state (before mount animation)
  initial?: MotionValue;
  // Target state to animate to on mount
  animate?: MotionValue;
  // State when exiting (requires AnimatePresence parent)
  exit?: MotionValue;
  // State on hover
  whileHover?: MotionValue;
  // State while pressed/tapped
  whileTap?: MotionValue;
  // State while dragging
  whileDrag?: MotionValue;
  // Spring configuration or preset name
  transition?: SpringConfig | keyof typeof springPresets;
  // Enable drag
  drag?: boolean | 'x' | 'y';
  dragOptions?: Omit<DragOptions, 'axis'>;
  // Scroll trigger
  whileInView?: MotionValue;
  viewport?: { once?: boolean; margin?: string; threshold?: number };
  // Layout animation (re-animates on layout change)
  layout?: boolean;
  style?: CSSProperties;
}

// ---------------------------------------------------------------------------
// <Motion> component
// ---------------------------------------------------------------------------

export const Motion = forwardRef<HTMLElement, MotionProps>(function Motion(props, ref) {
  const {
    as: Tag = 'div',
    initial,
    animate: animateTo,
    exit: _exit,
    whileHover,
    whileTap,
    whileDrag: _whileDrag,
    transition,
    drag,
    dragOptions,
    whileInView,
    viewport,
    layout: _layout,
    style,
    children,
    ...rest
  } = props;

  const elRef = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => elRef.current!);

  const springConfig: SpringConfig = typeof transition === 'string'
    ? springPresets[transition]
    : (transition ?? springPresets.default);

  // Mount animation
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Apply initial values instantly
    if (initial) {
      animate(el, initial, { spring: { stiffness: 10000, damping: 1000 } });
    }

    if (!animateTo) return;

    const cancel = animate(el, animateTo, { spring: springConfig });
    return cancel;
  }, []); // intentionally empty — runs once on mount

  // Hover
  useEffect(() => {
    const el = elRef.current;
    if (!el || !whileHover) return;

    const onEnter = () => animate(el, whileHover, { spring: springConfig });
    const onLeave = () => {
      const base: MotionValue = {};
      for (const key of Object.keys(whileHover) as (keyof MotionValue)[]) {
        (base as Record<string, number>)[key] = key === 'opacity' ? 1 : key.startsWith('scale') ? 1 : 0;
      }
      animate(el, base, { spring: springConfig });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [whileHover]);

  // Tap
  useEffect(() => {
    const el = elRef.current;
    if (!el || !whileTap) return;

    const tapConfig = whileTap;
    const onDown = () => animate(el, tapConfig, { spring: springConfig });
    const onUp = () => {
      const base: MotionValue = {};
      for (const key of Object.keys(tapConfig) as (keyof MotionValue)[]) {
        (base as Record<string, number>)[key] = key === 'opacity' ? 1 : key.startsWith('scale') ? 1 : 0;
      }
      animate(el, base, { spring: springConfig });
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, [whileTap]);

  // Drag
  useEffect(() => {
    const el = elRef.current;
    if (!el || !drag) return;

    const axis = drag === true ? 'both' : drag;
    return makeDraggable(el, { ...dragOptions, axis });
  }, [drag]);

  // Scroll trigger
  useEffect(() => {
    const el = elRef.current;
    if (!el || !whileInView) return;

    const from = initial ?? {};
    return scrollTrigger(el, {
      to: whileInView,
      from,
      spring: springConfig,
      once: viewport?.once ?? true,
      rootMargin: viewport?.margin ?? '-60px',
      threshold: viewport?.threshold ?? 0.1,
    });
  }, [whileInView]);

  return React.createElement(
    Tag as string,
    { ...rest, ref: elRef, style: { willChange: 'transform', ...style } },
    children,
  );
});

// ---------------------------------------------------------------------------
// Typed shorthand components
// ---------------------------------------------------------------------------

export const MotionDiv = forwardRef<HTMLDivElement, MotionProps>((props, ref) => (
  <Motion as="div" ref={ref as React.Ref<HTMLElement>} {...props} />
));
MotionDiv.displayName = 'MotionDiv';

export const MotionSpan = forwardRef<HTMLSpanElement, MotionProps>((props, ref) => (
  <Motion as="span" ref={ref as React.Ref<HTMLElement>} {...props} />
));
MotionSpan.displayName = 'MotionSpan';

export const MotionButton = forwardRef<HTMLButtonElement, MotionProps>((props, ref) => (
  <Motion as="button" ref={ref as React.Ref<HTMLElement>} {...props} />
));
MotionButton.displayName = 'MotionButton';

export const MotionSection = forwardRef<HTMLElement, MotionProps>((props, ref) => (
  <Motion as="section" ref={ref as React.Ref<HTMLElement>} {...props} />
));
MotionSection.displayName = 'MotionSection';

export const MotionImg = forwardRef<HTMLImageElement, MotionProps>((props, ref) => (
  <Motion as="img" ref={ref as React.Ref<HTMLElement>} {...props} />
));
MotionImg.displayName = 'MotionImg';

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * useSpringValue — reactive spring value usable in React.
 *
 * @example
 * const opacity = useSpringValue(0);
 * useEffect(() => { opacity.set(1); }, []);
 * // Read the value in a style: style={{ opacity: opacity.get() }}
 */
export function useSpringValue(initialValue: number, config?: SpringConfig): SpringValue {
  const springRef = useRef<SpringValue | null>(null);
  const [, forceRender] = useState(0);

  if (springRef.current === null) {
    springRef.current = new SpringValue(initialValue, config);
  }

  useEffect(() => {
    const spring = springRef.current!;
    return spring.subscribe(() => forceRender(n => n + 1));
  }, []);

  useEffect(() => {
    return () => springRef.current?.destroy();
  }, []);

  return springRef.current;
}

/**
 * useAnimate — returns a ref and a function to imperatively animate it.
 *
 * @example
 * const [ref, animateEl] = useAnimate<HTMLDivElement>();
 * animateEl({ x: 100, opacity: 0.5 });
 */
export function useAnimate<T extends HTMLElement = HTMLElement>(): [
  React.RefObject<T>,
  (to: MotionValue, options?: AnimateOptions) => () => void,
] {
  const ref = useRef<T>(null);

  const animateEl = useCallback(
    (to: MotionValue, options?: AnimateOptions) => {
      if (!ref.current) return () => {};
      return animate(ref.current, to, options);
    },
    [],
  );

  return [ref, animateEl];
}

/**
 * useScrollProgress — returns a spring-smoothed scroll progress (0–1).
 *
 * @example
 * const { progress } = useScrollProgress();
 * // progress is a SpringValue; subscribe or read it
 */
export function useScrollProgress(config?: SpringConfig): {
  progress: SpringValue;
  rawProgress: () => number;
} {
  const ref = useRef<ReturnType<typeof createScrollProgress> | null>(null);
  const [, forceRender] = useState(0);

  if (ref.current === null) {
    ref.current = createScrollProgress({ spring: config });
  }

  useEffect(() => {
    return ref.current!.progress.subscribe(() => forceRender(n => n + 1));
  }, []);

  useEffect(() => {
    return () => ref.current?.destroy();
  }, []);

  return {
    progress: ref.current.progress,
    rawProgress: ref.current.rawProgress,
  };
}

/**
 * useInView — returns true when the element is in the viewport.
 *
 * @example
 * const [ref, inView] = useInView({ once: true });
 */
export function useInView<T extends HTMLElement = HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.1, rootMargin = '-60px', once = true } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/**
 * useParallax — applies a parallax scroll effect via a ref.
 * Returns the ref to attach to the element.
 *
 * @example
 * const ref = useParallax({ speed: -0.3 });
 * return <div ref={ref} />;
 */
export function useParallax<T extends HTMLElement = HTMLElement>(options?: {
  speed?: number;
  axis?: 'x' | 'y';
}): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return parallax(el, options);
  }, []);

  return ref;
}

// ---------------------------------------------------------------------------
// AnimatePresence (basic implementation for exit animations)
// ---------------------------------------------------------------------------

interface AnimatePresenceProps {
  children: React.ReactNode;
  mode?: 'sync' | 'wait';
}

export function AnimatePresence({ children, mode: _mode = 'sync' }: AnimatePresenceProps) {
  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// Stagger list helper
// ---------------------------------------------------------------------------

export interface StaggerListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  stagger?: number;
  from?: MotionValue;
  to?: MotionValue;
  transition?: SpringConfig | keyof typeof springPresets;
  className?: string;
  itemClassName?: string;
  as?: keyof JSX.IntrinsicElements;
  itemAs?: keyof JSX.IntrinsicElements;
  getKey: (item: T) => string | number;
}

export function StaggerList<T>({
  items,
  renderItem,
  stagger = 60,
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  transition,
  className,
  itemClassName,
  as: ListTag = 'ul',
  itemAs: ItemTag = 'li',
  getKey,
}: StaggerListProps<T>) {
  return React.createElement(
    ListTag as string,
    { className },
    items.map((item, i) =>
      React.createElement(
        ItemTag as string,
        { key: getKey(item), className: itemClassName },
        React.createElement(
          Motion,
          {
            initial: from,
            animate: to,
            transition: typeof transition === 'string'
              ? springPresets[transition]
              : (transition ?? { type: 'spring', stiffness: 300, damping: 30, delay: i * stagger / 1000 } as SpringConfig),
          },
          renderItem(item, i),
        ),
      ),
    ),
  );
}
