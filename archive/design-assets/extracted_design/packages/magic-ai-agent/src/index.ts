#!/usr/bin/env node
/**
 * Magic AI Agent — MCP Server for frontend developers.
 *
 * Implements the Model Context Protocol so developers can type:
 *   /ui create a modern responsive navbar
 * inside Cursor, Windsurf, VS Code with Cline, or Claude
 * and get back a polished, editable React component.
 *
 * MCP spec: https://modelcontextprotocol.io
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import { generateComponent, detectComponentType } from './generator.js';
import { searchLogo, buildLogoComponent } from './svgl.js';
import { ComponentRequest, Framework, StyleSystem } from './types.js';

// ---------------------------------------------------------------------------
// Schema definitions (Zod)
// ---------------------------------------------------------------------------

const UIComponentSchema = z.object({
  description: z.string().min(3).describe('Natural language description of the component to generate'),
  framework: z.enum(['react', 'next', 'vue', 'svelte', 'html']).default('react').optional(),
  typescript: z.boolean().default(true).optional(),
  style: z.enum(['tailwind', 'css-modules', 'styled-components', 'vanilla-css']).default('vanilla-css').optional(),
  theme: z.object({
    primary: z.string().optional(),
    background: z.string().optional(),
    foreground: z.string().optional(),
    accent: z.string().optional(),
    radius: z.string().optional(),
    fontFamily: z.string().optional(),
  }).optional(),
});

const SearchLogoSchema = z.object({
  query: z.string().min(1).describe('Brand name to search for, e.g. "stripe" or "vercel"'),
  limit: z.number().int().min(1).max(20).default(5).optional(),
  asComponent: z.boolean().default(false).optional(),
});

const DetectTypeSchema = z.object({
  description: z.string().min(3).describe('Component description to analyze'),
});

// ---------------------------------------------------------------------------
// Server setup
// ---------------------------------------------------------------------------

const server = new Server(
  {
    name: 'magic-ai-agent',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  },
);

// ---------------------------------------------------------------------------
// Tool: list_tools
// ---------------------------------------------------------------------------

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'ui',
      description:
        'Generate a polished, production-ready React UI component from a natural language description. Supports navbars, heroes, cards, pricing tables, forms, modals, and more. Type `/ui create a responsive navbar with a logo and CTA` to get started.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          description: {
            type: 'string',
            description: 'What to build, e.g. "a modern responsive navbar with glassmorphism effect and two CTA buttons"',
          },
          framework: {
            type: 'string',
            enum: ['react', 'next', 'vue', 'svelte', 'html'],
            default: 'react',
            description: 'Frontend framework (default: react)',
          },
          typescript: {
            type: 'boolean',
            default: true,
            description: 'Whether to generate TypeScript (default: true)',
          },
          style: {
            type: 'string',
            enum: ['tailwind', 'css-modules', 'styled-components', 'vanilla-css'],
            default: 'vanilla-css',
            description: 'Styling approach (default: vanilla-css — inline styles, no dependencies)',
          },
          theme: {
            type: 'object',
            description: 'Optional theme overrides',
            properties: {
              primary: { type: 'string', description: 'Primary color hex, e.g. "#1C3D2F"' },
              background: { type: 'string' },
              foreground: { type: 'string' },
              accent: { type: 'string' },
              radius: { type: 'string', description: 'Border radius, e.g. "8px"' },
              fontFamily: { type: 'string' },
            },
          },
        },
        required: ['description'],
      },
    },
    {
      name: 'logo',
      description:
        'Search for a brand SVG logo from SVGL (svgl.app) and optionally generate a React component for it. Works for thousands of brands: Stripe, Vercel, GitHub, Google, etc.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          query: {
            type: 'string',
            description: 'Brand name to search for, e.g. "stripe" or "github"',
          },
          limit: {
            type: 'number',
            default: 5,
            description: 'Max results to return (1–20, default: 5)',
          },
          asComponent: {
            type: 'boolean',
            default: false,
            description: 'If true, also generates a React component for the first result',
          },
        },
        required: ['query'],
      },
    },
    {
      name: 'detect_type',
      description:
        'Analyze a component description and return the detected component type (navbar, hero, pricing, etc.).',
      inputSchema: {
        type: 'object' as const,
        properties: {
          description: {
            type: 'string',
            description: 'Component description to analyze',
          },
        },
        required: ['description'],
      },
    },
  ],
}));

// ---------------------------------------------------------------------------
// Tool: call_tool
// ---------------------------------------------------------------------------

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // ------ /ui tool ------
  if (name === 'ui') {
    const parsed = UIComponentSchema.safeParse(args);
    if (!parsed.success) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid parameters: ${parsed.error.issues.map(i => i.message).join(', ')}`,
      );
    }

    const { description, framework = 'react', typescript = true, style = 'vanilla-css', theme } = parsed.data;

    const componentType = detectComponentType(description);

    const req: ComponentRequest = {
      description,
      type: componentType,
      framework: framework as Framework,
      useTypeScript: typescript,
      style: style as StyleSystem,
      theme,
    };

    let component;
    try {
      component = generateComponent(req);
    } catch (err) {
      throw new McpError(
        ErrorCode.InternalError,
        `Component generation failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    const output = formatComponentOutput(component, description, componentType);

    return {
      content: [{ type: 'text' as const, text: output }],
    };
  }

  // ------ /logo tool ------
  if (name === 'logo') {
    const parsed = SearchLogoSchema.safeParse(args);
    if (!parsed.success) {
      throw new McpError(ErrorCode.InvalidParams, `Invalid parameters: ${parsed.error.message}`);
    }

    const { query, limit = 5, asComponent = false } = parsed.data;

    let logos;
    try {
      logos = await searchLogo(query, limit);
    } catch (err) {
      throw new McpError(
        ErrorCode.InternalError,
        `SVGL logo search failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    if (logos.length === 0) {
      return {
        content: [{
          type: 'text' as const,
          text: `No logos found for "${query}". Try a simpler brand name, e.g. "stripe" instead of "Stripe, Inc."`,
        }],
      };
    }

    let text = `## Found ${logos.length} logo(s) for "${query}"\n\n`;
    text += logos.map((l, i) => [
      `**${i + 1}. ${l.name}** (${l.category})`,
      `- SVG URL: \`${l.url}\``,
      l.wordmark ? `- Wordmark: \`${l.wordmark}\`` : null,
    ].filter(Boolean).join('\n')).join('\n\n');

    if (asComponent && logos[0]) {
      const componentCode = buildLogoComponent(logos[0], true);
      text += `\n\n---\n\n## React Component for ${logos[0].name}\n\n\`\`\`tsx\n${componentCode}\n\`\`\`\n\n`;
      text += `**Usage:**\n\`\`\`tsx\n<${logos[0].name.replace(/\s+/g, '')}Logo size={32} />\n// With wordmark:\n<${logos[0].name.replace(/\s+/g, '')}Logo size={24} useWordmark />\n\`\`\``;
    }

    return { content: [{ type: 'text' as const, text }] };
  }

  // ------ /detect_type tool ------
  if (name === 'detect_type') {
    const parsed = DetectTypeSchema.safeParse(args);
    if (!parsed.success) {
      throw new McpError(ErrorCode.InvalidParams, `Invalid parameters: ${parsed.error.message}`);
    }

    const componentType = detectComponentType(parsed.data.description);
    return {
      content: [{
        type: 'text' as const,
        text: `Detected component type: **${componentType}**\n\nDescription: "${parsed.data.description}"`,
      }],
    };
  }

  throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
});

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'magic://docs/quickstart',
      name: 'Quickstart Guide',
      description: 'Get started with Magic AI Agent in 2 minutes.',
      mimeType: 'text/markdown',
    },
    {
      uri: 'magic://docs/theme-reference',
      name: 'Theme Reference',
      description: 'All available theme tokens and how to customize them.',
      mimeType: 'text/markdown',
    },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === 'magic://docs/quickstart') {
    return {
      contents: [{
        uri,
        mimeType: 'text/markdown',
        text: QUICKSTART_DOC,
      }],
    };
  }

  if (uri === 'magic://docs/theme-reference') {
    return {
      contents: [{
        uri,
        mimeType: 'text/markdown',
        text: THEME_REFERENCE_DOC,
      }],
    };
  }

  throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatComponentOutput(
  component: ReturnType<typeof generateComponent>,
  description: string,
  type: string,
): string {
  const lines: string[] = [];

  lines.push(`## ${component.filename}`);
  lines.push(`*${component.description}*\n`);

  if (component.warnings.length > 0) {
    lines.push('> **Note:**');
    for (const w of component.warnings) lines.push(`> - ${w}`);
    lines.push('');
  }

  if (component.dependencies.length > 0) {
    const installCmd = `npm install ${component.dependencies.filter(d => d !== 'react').join(' ')}`;
    if (component.dependencies.filter(d => d !== 'react').length > 0) {
      lines.push(`**Install dependencies:**\n\`\`\`bash\n${installCmd}\n\`\`\`\n`);
    }
  }

  lines.push(`**Component code:**\n\`\`\`${component.language}\n${component.code}\n\`\`\``);

  if (component.usageExample) {
    lines.push(`\n**Usage:**\n\`\`\`tsx\n${component.usageExample}\n\`\`\``);
  }

  lines.push('\n---');
  lines.push(`*Generated by Magic AI Agent · Component type: \`${type}\`*`);

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Embedded docs
// ---------------------------------------------------------------------------

const QUICKSTART_DOC = `# Magic AI Agent — Quickstart

## Basic usage

In Cursor, Windsurf, VS Code (with Cline), or Claude:

\`\`\`
/ui create a modern responsive navbar with a logo and two CTA buttons
/ui build a hero section for a SaaS product with a headline and animated CTA
/ui generate a three-tier pricing table with annual/monthly toggle
/ui make a contact form with name, email, and message fields
\`\`\`

## With theme customization

\`\`\`
/ui create a navbar with theme={"primary": "#7C3AED"}
\`\`\`

## Finding brand logos

\`\`\`
/logo stripe
/logo github asComponent=true
/logo vercel limit=3
\`\`\`

## Tips

- Be specific: "a glassmorphism navbar with dark background" works better than just "navbar"
- The generator detects component types automatically — no need to specify
- All components use inline styles by default — zero external CSS dependencies
- TypeScript is on by default; pass \`typescript=false\` for plain JS
`;

const THEME_REFERENCE_DOC = `# Theme Reference

All components accept an optional \`theme\` object:

| Token | Default | Description |
|-------|---------|-------------|
| \`primary\` | \`#1C3D2F\` | Primary color for buttons, links, accents |
| \`background\` | \`#FFFFFF\` | Component background |
| \`foreground\` | \`#111111\` | Default text color |
| \`accent\` | \`#4E8B65\` | Highlight and interactive emphasis |
| \`radius\` | \`10px\` | Border radius for interactive elements |
| \`fontFamily\` | \`'Inter', sans-serif\` | Font stack |

## Example

\`\`\`
/ui create a navbar with theme={"primary":"#7C3AED","accent":"#A855F7","radius":"6px"}
\`\`\`
`;

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Magic AI Agent MCP server running on stdio');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
