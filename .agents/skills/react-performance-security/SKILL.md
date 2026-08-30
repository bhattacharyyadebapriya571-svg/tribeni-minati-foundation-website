---
name: react-performance-security
description: >-
  Production React 19, TypeScript & Vite Performance & Security Skill.
  Enforces zero-warning strict builds, tree-shaking, WebGL/Three.js cleanup,
  Edge runtime optimization, and OWASP web security standards.
---

# React Performance & Security Skill

## Purpose
Guarantees robust, lightning-fast, and hardened production execution for the Tribeni Minati Foundation web portal.

## Performance Directives
1. **Build & Bundle Hygiene**:
   - Maintain 0 TypeScript compilation errors and 0 linting warnings under `tsc -b`.
   - Keep build completion times under 3.5 seconds on modern Vite Rollup engines.
   - Code-split heavy dependencies (`three`, `framer-motion`, `react-pdf`) via dynamic imports.

2. **Memory & Animation Cleanup**:
   - Always dispose Three.js geometries, textures, and requestAnimationFrame loops in `useEffect` cleanup.
   - Guard 3D WebGL canvases with `prefers-reduced-motion` media queries.

3. **Security Standards**:
   - Strict Content Security Policy (CSP) and HTTP security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`).
   - Zero hardcoded API secrets in frontend bundles; isolate keys to serverless edge environment variables.
