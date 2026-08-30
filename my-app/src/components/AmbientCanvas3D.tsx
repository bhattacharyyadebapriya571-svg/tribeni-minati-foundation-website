import React, { useEffect, useRef } from 'react';

export const AmbientCanvas3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let cleanupListeners: (() => void) | null = null;

    try {
      const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

      if (gl) {
        // High-performance Stitch WebGL Organic Liquid Shader
        const syncSize = () => {
          if (!canvas) return;
          const w = window.innerWidth || 1280;
          const h = window.innerHeight || 720;
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }
        };
        syncSize();
        window.addEventListener('resize', syncSize);

        const vs = `
          attribute vec2 a_position;
          varying vec2 v_texCoord;
          void main() {
            v_texCoord = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
          }
        `;

        const fs = `
          precision mediump float;
          uniform float u_time;
          uniform vec2 u_resolution;
          uniform vec2 u_mouse;
          varying vec2 v_texCoord;

          void main() {
            vec2 uv = v_texCoord;
            
            // Subtle liquid wave motions
            float color = 0.0;
            color += sin(uv.x * 8.0 + u_time * 0.35);
            color += sin(uv.y * 6.0 + u_time * 0.25);
            color += sin((uv.x + uv.y) * 4.0 + u_time * 0.15);
            
            color = color * 0.5 + 0.5;
            
            // Soft institutional indigo & cool grey mix
            vec3 colorA = vec3(0.29, 0.25, 0.88); // #4B41E1 Indigo
            vec3 colorB = vec3(0.97, 0.98, 0.98); // #F7F9FB Canvas
            
            vec3 finalColor = mix(colorB, colorA, color * 0.05); // Ultra subtle
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `;

        const compileShader = (type: number, src: string) => {
          const s = gl.createShader(type);
          if (!s) return null;
          gl.shaderSource(s, src);
          gl.compileShader(s);
          return s;
        };

        const vShader = compileShader(gl.VERTEX_SHADER, vs);
        const fShader = compileShader(gl.FRAGMENT_SHADER, fs);
        const prog = gl.createProgram();

        if (vShader && fShader && prog) {
          gl.attachShader(prog, vShader);
          gl.attachShader(prog, fShader);
          gl.linkProgram(prog);
          gl.useProgram(prog);

          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
          );

          const pos = gl.getAttribLocation(prog, 'a_position');
          gl.enableVertexAttribArray(pos);
          gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

          const uTime = gl.getUniformLocation(prog, 'u_time');
          const uRes = gl.getUniformLocation(prog, 'u_resolution');
          const uMouse = gl.getUniformLocation(prog, 'u_mouse');

          let mouseX = canvas.width / 2;
          let mouseY = canvas.height / 2;

          const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
          };
          window.addEventListener('mousemove', handleMouseMove);

          const render = (t: number) => {
            gl.viewport(0, 0, canvas.width, canvas.height);
            if (uTime) gl.uniform1f(uTime, t * 0.001);
            if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
            if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationFrameId = requestAnimationFrame(render);
          };

          animationFrameId = requestAnimationFrame(render);

          cleanupListeners = () => {
            window.removeEventListener('resize', syncSize);
            window.removeEventListener('mousemove', handleMouseMove);
          };
        }
      }
    } catch (_) {}

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (cleanupListeners) cleanupListeners();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] w-full h-full opacity-60 transition-opacity duration-1000"
    />
  );
};
