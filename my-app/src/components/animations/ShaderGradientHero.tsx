import React, { useEffect, useRef, useState } from 'react';

interface ShaderGradientHeroProps {
  className?: string;
  speed?: number;
  opacity?: number;
  interactive?: boolean;
}

export const ShaderGradientHero: React.FC<ShaderGradientHeroProps> = ({
  className = 'absolute inset-0 pointer-events-none',
  speed = 0.0015,
  opacity = 0.45,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasWebGlError, setHasWebGlError] = useState(false);

  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const gl = canvas.getContext('webgl', { powerPreference: 'low-power', alpha: true });
      if (!gl) {
        setHasWebGlError(true);
        return;
      }

      // Vertex shader
      const vsSource = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      // Fragment shader: Fluid Multi-Color Organic Shader Mesh
      const fsSource = `
        precision mediump float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        vec3 colorA = vec3(0.294, 0.255, 0.882); // #4b41e1 Indigo
        vec3 colorB = vec3(0.961, 0.620, 0.043); // #F59E0B Amber
        vec3 colorC = vec3(0.063, 0.725, 0.506); // #10B981 Emerald
        vec3 colorD = vec3(0.075, 0.106, 0.180); // #131b2e Deep Slate

        void main() {
          vec2 st = gl_FragCoord.xy / uResolution.xy;
          st.x *= uResolution.x / uResolution.y;

          vec2 mouse = uMouse / uResolution;
          float d = distance(st, mouse);
          float t = uTime * 0.8;

          float wave1 = sin(st.x * 3.0 + t + sin(st.y * 2.0 + t * 0.5)) * 0.5 + 0.5;
          float wave2 = cos(st.y * 4.0 - t * 0.7 + cos(st.x * 3.5 - t * 0.3)) * 0.5 + 0.5;
          float wave3 = sin((st.x + st.y) * 2.5 + t * 0.4) * 0.5 + 0.5;

          vec3 mixedColor = mix(colorA, colorB, wave1);
          mixedColor = mix(mixedColor, colorC, wave2 * 0.6);
          mixedColor = mix(mixedColor, colorD, wave3 * 0.4);

          float ripple = smoothstep(0.4, 0.0, d) * 0.12;
          mixedColor += vec3(ripple);

          gl_FragColor = vec4(mixedColor, 1.0);
        }
      `;

      function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
        const shader = glCtx.createShader(type);
        if (!shader) return null;
        glCtx.shaderSource(shader, source);
        glCtx.compileShader(shader);
        if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
          glCtx.deleteShader(shader);
          return null;
        }
        return shader;
      }

      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
      if (!vertexShader || !fragmentShader) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return;
      }

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const positionLocation = gl.getAttribLocation(program, 'position');
      const uTimeLocation = gl.getUniformLocation(program, 'uTime');
      const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
      const uMouseLocation = gl.getUniformLocation(program, 'uMouse');

      let animationFrameId: number;
      let startTime = performance.now();
      const mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

      const handleMouseMove = (e: MouseEvent) => {
        if (!interactive) return;
        mousePos.x = e.clientX;
        mousePos.y = window.innerHeight - e.clientY;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      const resize = () => {
        if (!canvas) return;
        const width = canvas.parentElement?.clientWidth || window.innerWidth;
        const height = canvas.parentElement?.clientHeight || window.innerHeight;
        canvas.width = Math.max(10, Math.floor(width / 3)); // ultra lightweight
        canvas.height = Math.max(10, Math.floor(height / 3));
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      resize();
      window.addEventListener('resize', resize);

      const render = (now: number) => {
        const elapsedTime = (now - startTime) * speed;

        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1f(uTimeLocation, elapsedTime);
        gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
        gl.uniform2f(uMouseLocation, mousePos.x / 3, mousePos.y / 3);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resize);
        if (program) gl.deleteProgram(program);
      };
    } catch {
      setHasWebGlError(true);
    }
  }, [prefersReducedMotion, speed, interactive]);

  if (prefersReducedMotion || hasWebGlError) {
    return (
      <div
        className={`${className} bg-gradient-to-tr from-indigo-500/10 via-amber-500/5 to-emerald-500/10 blur-3xl`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`${className} overflow-hidden blur-[80px]`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ShaderGradientHero;
