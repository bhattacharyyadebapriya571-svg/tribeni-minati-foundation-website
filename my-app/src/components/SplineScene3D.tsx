import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SplineScene3DProps {
  className?: string;
}

export const SplineScene3D: React.FC<SplineScene3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;
    let handleResize: (() => void) | null = null;

    try {
      // 1. Scene & Camera Setup
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, Math.max(0.1, width / Math.max(1, height)), 0.1, 1000);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'default' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      // Group for entire 3D living NGO motif
      const group = new THREE.Group();
      scene.add(group);

      // 2. Central Radiant Golden Heart of Compassion
      const heartGeo = new THREE.SphereGeometry(0.9, 24, 24);
      const heartMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.8,
        roughness: 0.15,
        metalness: 0.85,
      });
      const heartCore = new THREE.Mesh(heartGeo, heartMat);
      group.add(heartCore);

      // 3. Vibrant Multicolored Protective Petals / Leaves of Life (6 Petals)
      const petalColors = [0x2563eb, 0x10b981, 0xf59e0b, 0xe11d48, 0x6366f1, 0x06b6d4];
      const leaves: THREE.Mesh[] = [];
      const leafCount = 6;

      for (let i = 0; i < leafCount; i++) {
        const leafGeo = new THREE.ConeGeometry(0.7, 1.9, 5);
        const leafMat = new THREE.MeshPhysicalMaterial({
          color: petalColors[i % petalColors.length],
          emissive: petalColors[i % petalColors.length],
          emissiveIntensity: 0.4,
          roughness: 0.2,
          metalness: 0.5,
          transparent: true,
          opacity: 0.9,
        });

        const leaf = new THREE.Mesh(leafGeo, leafMat);
        const angle = (i / leafCount) * Math.PI * 2;
        const radius = 1.35;

        leaf.position.x = Math.cos(angle) * radius;
        leaf.position.y = Math.sin(angle) * radius * 0.4;
        leaf.position.z = Math.sin(angle) * radius;

        leaf.rotation.z = -Math.cos(angle) * 0.5;
        leaf.rotation.x = Math.sin(angle) * 0.5;
        leaf.rotation.y = angle + Math.PI / 2;

        group.add(leaf);
        leaves.push(leaf);
      }

      // 4. Double Orbital Rings
      const ringGeo1 = new THREE.TorusGeometry(2.1, 0.035, 12, 50);
      const ringMat1 = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.7,
        roughness: 0.1,
        metalness: 0.9,
      });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ringGeo2 = new THREE.TorusGeometry(2.4, 0.025, 12, 50);
      const ringMat2 = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xb45309,
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.9,
      });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);

      // 5. Ambient Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(5, 5, 5);
      scene.add(keyLight);

      const goldPoint = new THREE.PointLight(0xf59e0b, 3.0, 10);
      goldPoint.position.set(0, 0, 0);
      scene.add(goldPoint);

      // 6. Mouse Gyro Physics
      let targetRotX = 0;
      let targetRotY = 0;
      let mouseX = 0;
      let mouseY = 0;

      handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      // 7. Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        targetRotY += (mouseX * 0.6 - targetRotY) * 0.05;
        targetRotX += (-mouseY * 0.4 - targetRotX) * 0.05;

        group.rotation.y = elapsedTime * 0.35 + targetRotY;
        group.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15 + targetRotX;

        const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
        heartCore.scale.set(pulse, pulse, pulse);

        ring1.rotation.z = elapsedTime * 0.4;
        ring2.rotation.z = -elapsedTime * 0.3;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      // 8. Resize Handler
      handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 500;
        const h = container.clientHeight || 500;
        camera.aspect = Math.max(0.1, w / Math.max(1, h));
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);
    } catch (e) {
      console.warn('ThreeJS canvas initialization bypassed:', e);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (container && renderer && renderer.domElement) {
        try {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        } catch (_) {}
      }
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
};
