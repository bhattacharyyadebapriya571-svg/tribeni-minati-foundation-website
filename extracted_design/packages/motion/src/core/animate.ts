/**
 * Core animator — drives DOM elements with GPU-accelerated transforms.
 * Only touches `transform` and `opacity` to avoid layout/paint triggers.
 */

import { animateSpring, SpringConfig, springPresets, SpringPresetName } from './spring.js';

export type AnimatableValue = number;

export interface MotionValue {
  x?: number;
  y?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  skewX?: number;
  skewY?: number;
  opacity?: number;
}

export interface AnimateOptions {
  spring?: SpringConfig | SpringPresetName;
  duration?: number;
  delay?: number;
  onStart?: () => void;
  onComplete?: () => void;
  onUpdate?: (values: MotionValue) => void;
}

const GPU_TRANSFORM_KEYS: (keyof Omit<MotionValue, 'opacity'>)[] = [
  'x', 'y', 'scale', 'scaleX', 'scaleY',
  'rotate', 'rotateX', 'rotateY', 'skewX', 'skewY',
];

function buildTransform(values: MotionValue): string {
  const parts: string[] = [];
  if (values.x !== undefined || values.y !== undefined) {
    parts.push(`translate3d(${values.x ?? 0}px, ${values.y ?? 0}px, 0)`);
  }
  if (values.scale !== undefined) parts.push(`scale(${values.scale})`);
  if (values.scaleX !== undefined) parts.push(`scaleX(${values.scaleX})`);
  if (values.scaleY !== undefined) parts.push(`scaleY(${values.scaleY})`);
  if (values.rotate !== undefined) parts.push(`rotate(${values.rotate}deg)`);
  if (values.rotateX !== undefined) parts.push(`rotateX(${values.rotateX}deg)`);
  if (values.rotateY !== undefined) parts.push(`rotateY(${values.rotateY}deg)`);
  if (values.skewX !== undefined) parts.push(`skewX(${values.skewX}deg)`);
  if (values.skewY !== undefined) parts.push(`skewY(${values.skewY}deg)`);
  return parts.join(' ');
}

function applyValues(el: HTMLElement, values: MotionValue): void {
  const transform = buildTransform(values);
  if (transform) el.style.transform = transform;
  if (values.opacity !== undefined) el.style.opacity = String(values.opacity);
}

function resolveSpringConfig(spring?: SpringConfig | SpringPresetName): SpringConfig {
  if (!spring) return springPresets.default;
  if (typeof spring === 'string') return springPresets[spring] ?? springPresets.default;
  return spring;
}

function getCurrentValue(el: HTMLElement, key: keyof MotionValue): number {
  if (key === 'opacity') return parseFloat(el.style.opacity || '1');
  if (key === 'scale') return 1; // read from transform matrix is complex; default to 1
  if (key === 'x' || key === 'y') return 0;
  return key.startsWith('scale') ? 1 : 0;
}

/**
 * Animate an element from its current state to target values using spring physics.
 * Returns a cancel function.
 *
 * @example
 * const cancel = animate(el, { x: 100, scale: 1.05, opacity: 0.8 });
 * // later:
 * cancel();
 */
export function animate(
  el: HTMLElement,
  to: MotionValue,
  options: AnimateOptions = {},
): () => void {
  const springConfig = resolveSpringConfig(options.spring);
  const cancellers: (() => void)[] = [];
  const currentValues: MotionValue = { ...to };

  // Track current animated values
  for (const key of Object.keys(to) as (keyof MotionValue)[]) {
    (currentValues as Record<string, number>)[key] = getCurrentValue(el, key);
  }

  options.onStart?.();

  let completedCount = 0;
  const totalKeys = Object.keys(to).length;

  function checkComplete() {
    completedCount++;
    if (completedCount >= totalKeys) options.onComplete?.();
  }

  function startKey(key: keyof MotionValue) {
    const fromValue = (currentValues as Record<string, number>)[key] ?? (key === 'opacity' ? 1 : key.startsWith('scale') ? 1 : 0);
    const toValue = (to as Record<string, number>)[key]!;

    if (fromValue === toValue) {
      checkComplete();
      return;
    }

    const cancel = animateSpring(
      fromValue,
      toValue,
      (v) => {
        (currentValues as Record<string, number>)[key] = v;
        applyValues(el, currentValues);
        options.onUpdate?.(currentValues);
      },
      springConfig,
      checkComplete,
    );

    cancellers.push(cancel);
  }

  function start() {
    for (const key of Object.keys(to) as (keyof MotionValue)[]) {
      startKey(key);
    }
  }

  if (options.delay && options.delay > 0) {
    const timer = setTimeout(start, options.delay);
    return () => { clearTimeout(timer); cancellers.forEach(c => c()); };
  }

  start();
  return () => cancellers.forEach(c => c());
}

/**
 * Animate multiple elements with a stagger delay between each.
 */
export function animateStagger(
  elements: HTMLElement[],
  to: MotionValue,
  options: AnimateOptions & { stagger?: number } = {},
): () => void {
  const { stagger = 60, ...animOptions } = options;
  const cancellers = elements.map((el, i) =>
    animate(el, to, { ...animOptions, delay: (animOptions.delay ?? 0) + i * stagger }),
  );
  return () => cancellers.forEach(c => c());
}

/**
 * Sequence animations — each starts after the previous completes.
 */
export async function sequence(
  steps: Array<{ el: HTMLElement; to: MotionValue; options?: AnimateOptions }>,
): Promise<void> {
  for (const step of steps) {
    await new Promise<void>((resolve) => {
      animate(step.el, step.to, { ...step.options, onComplete: resolve });
    });
  }
}
