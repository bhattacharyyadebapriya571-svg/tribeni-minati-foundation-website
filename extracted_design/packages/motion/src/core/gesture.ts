/**
 * Gesture controls — drag, tap, hover, pan with spring physics.
 * Works with mouse, touch, and pointer events.
 */

import { SpringValue, SpringConfig } from './spring.js';

export interface DragOptions {
  axis?: 'x' | 'y' | 'both';
  bounds?: { left?: number; right?: number; top?: number; bottom?: number };
  spring?: SpringConfig;
  snapTo?: number[];
  snapThreshold?: number;
  onDragStart?: (info: DragInfo) => void;
  onDrag?: (info: DragInfo) => void;
  onDragEnd?: (info: DragInfo) => void;
}

export interface DragInfo {
  point: { x: number; y: number };
  delta: { x: number; y: number };
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

export interface HoverOptions {
  scale?: number;
  y?: number;
  x?: number;
  spring?: SpringConfig;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export interface TapOptions {
  scale?: number;
  spring?: SpringConfig;
  onTap?: (e: PointerEvent) => void;
  onTapStart?: (e: PointerEvent) => void;
  onTapCancel?: () => void;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function findNearestSnap(value: number, snapTo: number[], threshold: number): number | null {
  let nearest: number | null = null;
  let minDist = Infinity;
  for (const snap of snapTo) {
    const dist = Math.abs(value - snap);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = snap;
    }
  }
  return nearest;
}

/**
 * Adds drag behavior to a DOM element with spring physics.
 * Returns a cleanup function.
 *
 * @example
 * const cleanup = makeDraggable(el, { axis: 'x', bounds: { left: -200, right: 200 } });
 */
export function makeDraggable(el: HTMLElement, options: DragOptions = {}): () => void {
  const { axis = 'both', bounds = {}, spring, snapTo, snapThreshold = 50 } = options;

  const xSpring = new SpringValue(0, spring);
  const ySpring = new SpringValue(0, spring);

  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;
  let prevX = 0;
  let prevY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let lastTime = 0;
  let isDragging = false;

  function applyTransform() {
    el.style.transform = `translate3d(${xSpring.get()}px, ${ySpring.get()}px, 0)`;
    el.style.willChange = 'transform';
  }

  const unsubX = xSpring.subscribe(applyTransform);
  const unsubY = ySpring.subscribe(applyTransform);

  function onPointerDown(e: PointerEvent) {
    isDragging = true;
    el.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startY = e.clientY;
    offsetX = xSpring.get();
    offsetY = ySpring.get();
    prevX = e.clientX;
    prevY = e.clientY;
    lastTime = e.timeStamp;

    options.onDragStart?.({
      point: { x: e.clientX, y: e.clientY },
      delta: { x: 0, y: 0 },
      offset: { x: offsetX, y: offsetY },
      velocity: { x: 0, y: 0 },
    });
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;

    const dt = Math.max(e.timeStamp - lastTime, 1) / 1000;
    const rawX = e.clientX - startX + offsetX;
    const rawY = e.clientY - startY + offsetY;

    velocityX = (e.clientX - prevX) / dt;
    velocityY = (e.clientY - prevY) / dt;
    prevX = e.clientX;
    prevY = e.clientY;
    lastTime = e.timeStamp;

    let targetX = rawX;
    let targetY = rawY;

    if (bounds.left !== undefined) targetX = Math.max(targetX, bounds.left);
    if (bounds.right !== undefined) targetX = Math.min(targetX, bounds.right);
    if (bounds.top !== undefined) targetY = Math.max(targetY, bounds.top);
    if (bounds.bottom !== undefined) targetY = Math.min(targetY, bounds.bottom);

    if (axis === 'x' || axis === 'both') xSpring.jump(targetX);
    if (axis === 'y' || axis === 'both') ySpring.jump(targetY);

    options.onDrag?.({
      point: { x: e.clientX, y: e.clientY },
      delta: { x: e.clientX - prevX, y: e.clientY - prevY },
      offset: { x: targetX, y: targetY },
      velocity: { x: velocityX, y: velocityY },
    });
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;

    let finalX = xSpring.get();
    let finalY = ySpring.get();

    if (snapTo && axis !== 'y') {
      const snap = findNearestSnap(finalX, snapTo, snapThreshold);
      if (snap !== null) finalX = snap;
    }
    if (snapTo && axis === 'y') {
      const snap = findNearestSnap(finalY, snapTo, snapThreshold);
      if (snap !== null) finalY = snap;
    }

    if (axis === 'x' || axis === 'both') xSpring.set(finalX);
    if (axis === 'y' || axis === 'both') ySpring.set(finalY);

    options.onDragEnd?.({
      point: { x: e.clientX, y: e.clientY },
      delta: { x: 0, y: 0 },
      offset: { x: finalX, y: finalY },
      velocity: { x: velocityX, y: velocityY },
    });
  }

  el.style.touchAction = axis === 'x' ? 'pan-y' : axis === 'y' ? 'pan-x' : 'none';
  el.style.userSelect = 'none';
  el.style.cursor = 'grab';

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointermove', onPointerMove);
  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('pointercancel', onPointerUp);

  return () => {
    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointermove', onPointerMove);
    el.removeEventListener('pointerup', onPointerUp);
    el.removeEventListener('pointercancel', onPointerUp);
    unsubX();
    unsubY();
    xSpring.destroy();
    ySpring.destroy();
  };
}

/**
 * Adds spring hover effects to a DOM element.
 * Returns a cleanup function.
 *
 * @example
 * const cleanup = makeHoverable(el, { scale: 1.04, y: -4 });
 */
export function makeHoverable(el: HTMLElement, options: HoverOptions = {}): () => void {
  const { scale = 1.04, y = -4, x = 0, spring } = options;

  const scaleSpring = new SpringValue(1, spring);
  const ySpring = new SpringValue(0, spring);
  const xSpring = new SpringValue(0, spring);

  function applyTransform() {
    el.style.transform = `translate3d(${xSpring.get()}px, ${ySpring.get()}px, 0) scale(${scaleSpring.get()})`;
    el.style.willChange = 'transform';
  }

  const unsubScale = scaleSpring.subscribe(applyTransform);
  const unsubY = ySpring.subscribe(applyTransform);
  const unsubX = xSpring.subscribe(applyTransform);

  function onEnter() {
    scaleSpring.set(scale);
    ySpring.set(y);
    xSpring.set(x);
    options.onHoverStart?.();
  }

  function onLeave() {
    scaleSpring.set(1);
    ySpring.set(0);
    xSpring.set(0);
    options.onHoverEnd?.();
  }

  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
    unsubScale();
    unsubY();
    unsubX();
    scaleSpring.destroy();
    ySpring.destroy();
    xSpring.destroy();
  };
}

/**
 * Adds spring tap/press feedback to a DOM element.
 * Returns a cleanup function.
 *
 * @example
 * const cleanup = makeTappable(el, { scale: 0.97, onTap: () => console.log('tapped') });
 */
export function makeTappable(el: HTMLElement, options: TapOptions = {}): () => void {
  const { scale = 0.97, spring } = options;

  const scaleSpring = new SpringValue(1, spring);
  const unsubScale = scaleSpring.subscribe((v) => {
    el.style.transform = `scale(${v})`;
    el.style.willChange = 'transform';
  });

  let isPressed = false;

  function onDown(e: PointerEvent) {
    isPressed = true;
    scaleSpring.set(scale);
    options.onTapStart?.(e);
  }

  function onUp(e: PointerEvent) {
    if (!isPressed) return;
    isPressed = false;
    scaleSpring.set(1);
    options.onTap?.(e);
  }

  function onCancel() {
    if (!isPressed) return;
    isPressed = false;
    scaleSpring.set(1);
    options.onTapCancel?.();
  }

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onCancel);
  el.addEventListener('pointerleave', onCancel);

  return () => {
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('pointerup', onUp);
    el.removeEventListener('pointercancel', onCancel);
    el.removeEventListener('pointerleave', onCancel);
    unsubScale();
    scaleSpring.destroy();
  };
}
