/**
 * @projectbillion/motion — main entry point.
 * Exports core utilities. For framework-specific features, import from subpaths.
 *
 * @example
 * import { spring, SpringValue } from '@projectbillion/motion';
 * import { Motion, useSpringValue } from '@projectbillion/motion/react';
 * import { useSpring, vMotion } from '@projectbillion/motion/vue';
 * import { animate, scroll } from '@projectbillion/motion/vanilla';
 */

export { SpringValue, stepSpring, isAtRest, animateSpring, resolveSpringConfig, springPresets } from './core/spring.js';
export type { SpringConfig, SpringState, SpringPresetName } from './core/spring.js';

export { animate, animateStagger, sequence } from './core/animate.js';
export type { MotionValue, AnimateOptions, AnimatableValue } from './core/animate.js';

export { makeDraggable, makeHoverable, makeTappable } from './core/gesture.js';
export type { DragOptions, DragInfo, HoverOptions, TapOptions } from './core/gesture.js';

export {
  createScrollProgress,
  scrollTrigger,
  staggerScrollTrigger,
  parallax,
  scrollLinked,
} from './core/scroll.js';
export type { ScrollProgressOptions, ScrollTriggerOptions, ParallaxOptions } from './core/scroll.js';
