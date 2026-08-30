/**
 * Shared types for Magic AI Agent.
 */

export interface ComponentRequest {
  description: string;
  type: ComponentType;
  framework: Framework;
  useTypeScript: boolean;
  style: StyleSystem;
  logoQuery?: string;
  existingCode?: string;
  theme?: ThemeOverride;
}

export type ComponentType =
  | 'navbar'
  | 'hero'
  | 'button'
  | 'card'
  | 'form'
  | 'modal'
  | 'sidebar'
  | 'footer'
  | 'table'
  | 'dropdown'
  | 'input'
  | 'badge'
  | 'avatar'
  | 'breadcrumb'
  | 'tabs'
  | 'accordion'
  | 'tooltip'
  | 'toast'
  | 'pricing'
  | 'testimonial'
  | 'feature-grid'
  | 'cta'
  | 'stats'
  | 'timeline'
  | 'custom';

export type Framework = 'react' | 'next' | 'vue' | 'svelte' | 'html';

export type StyleSystem = 'tailwind' | 'css-modules' | 'styled-components' | 'vanilla-css';

export interface ThemeOverride {
  primary?: string;
  background?: string;
  foreground?: string;
  accent?: string;
  radius?: string;
  fontFamily?: string;
}

export interface GeneratedComponent {
  code: string;
  filename: string;
  language: string;
  dependencies: string[];
  cssVariables?: string;
  usageExample?: string;
  description: string;
  warnings: string[];
}

export interface SVGLLogo {
  id: string;
  name: string;
  category: string;
  url: string;
  wordmark?: string;
}

export interface TwentyFirstComponent {
  id: string;
  name: string;
  description: string;
  code: string;
  dependencies: string[];
  preview?: string;
}

export interface ServerConfig {
  apiKey21st?: string;
  defaultFramework: Framework;
  defaultStyle: StyleSystem;
  outputDir?: string;
}
