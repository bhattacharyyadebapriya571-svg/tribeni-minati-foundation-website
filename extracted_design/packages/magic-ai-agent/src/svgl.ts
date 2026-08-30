/**
 * SVGL integration — fetches brand SVG logos from svgl.app.
 * SVGL is a free, open-source library of brand SVGs with no API key required.
 */

import { SVGLLogo } from './types.js';

const SVGL_BASE = 'https://svgl.app/api';

interface SVGLAPIItem {
  id: number;
  title: string;
  category: string;
  route: string | { light: string; dark: string };
  wordmark?: string | { light: string; dark: string };
  url?: string;
}

function resolveRoute(route: SVGLAPIItem['route']): string {
  if (typeof route === 'string') return route;
  return route.light ?? route.dark;
}

function resolveWordmark(wordmark?: SVGLAPIItem['wordmark']): string | undefined {
  if (!wordmark) return undefined;
  if (typeof wordmark === 'string') return wordmark;
  return wordmark.light ?? wordmark.dark;
}

/**
 * Search for a brand logo by name using the SVGL API.
 * Returns the closest matching logo(s).
 */
export async function searchLogo(query: string, limit = 5): Promise<SVGLLogo[]> {
  try {
    const url = `${SVGL_BASE}/svgs?search=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      throw new Error(`SVGL API returned ${res.status}: ${res.statusText}`);
    }

    const items: SVGLAPIItem[] = await res.json();

    return items.slice(0, limit).map((item) => ({
      id: String(item.id),
      name: item.title,
      category: item.category,
      url: resolveRoute(item.route),
      wordmark: resolveWordmark(item.wordmark),
    }));
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      throw new Error('SVGL API request timed out after 8 seconds.');
    }
    throw err;
  }
}

/**
 * Fetch all available logos from SVGL.
 */
export async function getAllLogos(category?: string): Promise<SVGLLogo[]> {
  const url = category
    ? `${SVGL_BASE}/svgs?category=${encodeURIComponent(category)}`
    : `${SVGL_BASE}/svgs`;

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`SVGL API error: ${res.status}`);

  const items: SVGLAPIItem[] = await res.json();
  return items.map((item) => ({
    id: String(item.id),
    name: item.title,
    category: item.category,
    url: resolveRoute(item.route),
    wordmark: resolveWordmark(item.wordmark),
  }));
}

/**
 * Build a React component that renders an SVGL logo via an <img> tag.
 * Uses the CDN URL directly — no assets to download.
 */
export function buildLogoComponent(logo: SVGLLogo, useTypeScript: boolean): string {
  const propsType = useTypeScript
    ? `interface ${logo.name.replace(/\s+/g, '')}LogoProps {\n  size?: number;\n  className?: string;\n  useWordmark?: boolean;\n}\n\n`
    : '';
  const fnSignature = useTypeScript
    ? `export function ${logo.name.replace(/\s+/g, '')}Logo({ size = 32, className = '', useWordmark = false }: ${logo.name.replace(/\s+/g, '')}LogoProps)`
    : `export function ${logo.name.replace(/\s+/g, '')}Logo({ size = 32, className = '', useWordmark = false })`;

  const wordmarkLine = logo.wordmark
    ? `  const src = useWordmark ? '${logo.wordmark}' : '${logo.url}';\n`
    : `  const src = '${logo.url}';\n`;

  return `${propsType}${fnSignature} {
${wordmarkLine}  return (
    <img
      src={src}
      alt="${logo.name} logo"
      width={useWordmark ? size * 3 : size}
      height={size}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}`;
}

/**
 * Build an inline SVG import statement for use in React.
 * For environments with SVG import support (Vite, CRA with SVGR).
 */
export function buildSVGImport(logo: SVGLLogo): string {
  const componentName = logo.name.replace(/[^a-zA-Z0-9]/g, '') + 'Logo';
  return `// Fetch this SVG and save it locally, then import it:
// import { ReactComponent as ${componentName} } from './logos/${logo.name.toLowerCase().replace(/\s+/g, '-')}.svg';
//
// Or use directly as an img src:
// const ${componentName.charAt(0).toLowerCase() + componentName.slice(1)}Src = '${logo.url}';`;
}
