/**
 * Spring physics engine.
 * Implements a damped harmonic oscillator that drives all animations.
 * GPU-accelerated via requestAnimationFrame + transform/opacity only.
 */

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  restDelta?: number;
  restSpeed?: number;
}

export interface SpringState {
  value: number;
  velocity: number;
}

const DEFAULTS: Required<SpringConfig> = {
  stiffness: 300,
  damping: 30,
  mass: 1,
  restDelta: 0.001,
  restSpeed: 0.01,
};

export const springPresets = {
  snappy: { stiffness: 400, damping: 35, mass: 1 },
  default: { stiffness: 300, damping: 30, mass: 1 },
  gentle: { stiffness: 200, damping: 28, mass: 1.2 },
  bouncy: { stiffness: 350, damping: 18, mass: 0.8 },
  float: { stiffness: 60, damping: 12, mass: 1 },
  stiff: { stiffness: 500, damping: 50, mass: 1 },
  slow: { stiffness: 120, damping: 25, mass: 1.5 },
} as const satisfies Record<string, SpringConfig>;

export type SpringPresetName = keyof typeof springPresets;

/**
 * Advances a spring simulation by `dt` seconds.
 * Returns the next [value, velocity] pair.
 */
export function stepSpring(
  value: number,
  velocity: number,
  target: number,
  config: Required<SpringConfig>,
  dt: number,
): SpringState {
  const { stiffness, damping, mass } = config;

  // Semi-implicit Euler integration — stable for all spring configs
  const springForce = -stiffness * (value - target);
  const dampingForce = -damping * velocity;
  const acceleration = (springForce + dampingForce) / mass;

  const newVelocity = velocity + acceleration * dt;
  const newValue = value + newVelocity * dt;

  return { value: newValue, velocity: newVelocity };
}

/**
 * Checks whether a spring has come to rest.
 */
export function isAtRest(
  value: number,
  velocity: number,
  target: number,
  config: Required<SpringConfig>,
): boolean {
  return (
    Math.abs(velocity) < config.restSpeed &&
    Math.abs(value - target) < config.restDelta
  );
}

/**
 * Merges user config with defaults.
 */
export function resolveSpringConfig(config?: SpringConfig): Required<SpringConfig> {
  return { ...DEFAULTS, ...config };
}

/**
 * Creates a one-shot spring simulation that runs a callback every frame
 * until the spring reaches rest. Returns a cancel function.
 */
export function animateSpring(
  from: number,
  to: number,
  onUpdate: (value: number) => void,
  config?: SpringConfig,
  onComplete?: () => void,
): () => void {
  const resolvedConfig = resolveSpringConfig(config);
  let value = from;
  let velocity = 0;
  let lastTime: number | null = null;
  let rafId: number;
  let cancelled = false;

  function tick(time: number) {
    if (cancelled) return;

    if (lastTime === null) {
      lastTime = time;
      rafId = requestAnimationFrame(tick);
      return;
    }

    const dt = Math.min((time - lastTime) / 1000, 0.064); // cap at ~4 frames
    lastTime = time;

    const next = stepSpring(value, velocity, to, resolvedConfig, dt);
    value = next.value;
    velocity = next.velocity;

    onUpdate(value);

    if (isAtRest(value, velocity, to, resolvedConfig)) {
      onUpdate(to);
      onComplete?.();
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

/**
 * A reactive spring value that can be driven to a target at any time.
 * Subscribers receive the current value on every frame.
 */
export class SpringValue {
  private _value: number;
  private _velocity = 0;
  private _target: number;
  private _config: Required<SpringConfig>;
  private _subscribers = new Set<(v: number) => void>();
  private _rafId: number | null = null;
  private _lastTime: number | null = null;

  constructor(initialValue: number, config?: SpringConfig) {
    this._value = initialValue;
    this._target = initialValue;
    this._config = resolveSpringConfig(config);
  }

  get(): number {
    return this._value;
  }

  set(target: number, config?: SpringConfig): void {
    this._target = target;
    if (config) this._config = resolveSpringConfig(config);
    this._startLoop();
  }

  jump(value: number): void {
    this._target = value;
    this._value = value;
    this._velocity = 0;
    this._stopLoop();
    this._notify();
  }

  subscribe(fn: (v: number) => void): () => void {
    this._subscribers.add(fn);
    return () => this._subscribers.delete(fn);
  }

  destroy(): void {
    this._stopLoop();
    this._subscribers.clear();
  }

  private _notify(): void {
    for (const fn of this._subscribers) fn(this._value);
  }

  private _startLoop(): void {
    if (this._rafId !== null) return;
    this._lastTime = null;
    this._rafId = requestAnimationFrame(this._tick);
  }

  private _stopLoop(): void {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  private _tick = (time: number): void => {
    if (this._lastTime === null) {
      this._lastTime = time;
      this._rafId = requestAnimationFrame(this._tick);
      return;
    }

    const dt = Math.min((time - this._lastTime) / 1000, 0.064);
    this._lastTime = time;

    const next = stepSpring(this._value, this._velocity, this._target, this._config, dt);
    this._value = next.value;
    this._velocity = next.velocity;
    this._notify();

    if (isAtRest(this._value, this._velocity, this._target, this._config)) {
      this._value = this._target;
      this._velocity = 0;
      this._notify();
      this._stopLoop();
      return;
    }

    this._rafId = requestAnimationFrame(this._tick);
  };
}
