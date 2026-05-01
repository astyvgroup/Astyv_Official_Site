import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import design from './src/config/design.js';

// Inject design tokens (fonts + CSS vars) into index.html at build time.
// Lets users swap the entire site's fonts/colors by editing one file.
function designTokensPlugin() {
  const { fonts, colors, layout } = design;

  const fontLink = fonts.googleFontsHref
    ? `<link rel="preconnect" href="https://fonts.googleapis.com" />\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n    <link href="${fonts.googleFontsHref}" rel="stylesheet" />`
    : '';

  const selfHostedStyle = fonts.selfHostedCss
    ? `<style id="astyv-self-hosted-fonts">${fonts.selfHostedCss}</style>`
    : '';

  // Generate :root CSS variable block from design tokens so every CSS file
  // can reference --font-heading, --color-primary, etc.
  const cssVarsBlock = `
    :root {
      --font-heading: '${fonts.heading}', system-ui, sans-serif;
      --font-body: '${fonts.body}', system-ui, sans-serif;
      --font-mono: '${fonts.mono}', 'Fira Code', monospace;
      --color-primary: ${colors.primary[500]};
      --color-primary-50: ${colors.primary[50]};
      --color-primary-100: ${colors.primary[100]};
      --color-primary-200: ${colors.primary[200]};
      --color-primary-300: ${colors.primary[300]};
      --color-primary-400: ${colors.primary[400]};
      --color-primary-500: ${colors.primary[500]};
      --color-primary-600: ${colors.primary[600]};
      --color-primary-700: ${colors.primary[700]};
      --color-primary-800: ${colors.primary[800]};
      --color-primary-900: ${colors.primary[900]};
      --color-primary-950: ${colors.primary[950]};
      --color-primary-hover: ${colors.primary[600]};
      --color-primary-active: ${colors.primary[700]};
      --color-primary-glow: ${colors.glow.soft};
      --color-primary-glow-strong: ${colors.glow.strong};
      --color-bg-primary: ${colors.background.primary};
      --color-bg-secondary: ${colors.background.secondary};
      --color-bg-tertiary: ${colors.background.tertiary};
      --color-bg-elevated: ${colors.background.elevated};
      --color-text-primary: ${colors.text.primary};
      --color-text-secondary: ${colors.text.secondary};
      --color-text-tertiary: ${colors.text.tertiary};
      --color-border-subtle: ${colors.border.subtle};
      --color-border-medium: ${colors.border.medium};
      --color-border-strong: ${colors.border.strong};
      --color-border-accent: ${colors.border.accent};
      --gradient-primary: ${colors.gradient.primary};
      --gradient-aurora: ${colors.gradient.aurora};
      --nav-height: ${layout.navHeight};
      --section-padding: ${layout.sectionPadding};
      --section-padding-mobile: ${layout.sectionPaddingMobile};
      --container-max: ${layout.containerMax};
    }
  `.replace(/\s+/g, ' ').trim();

  return {
    name: 'astyv-design-tokens',
    transformIndexHtml(html) {
      return html
        .replace('<!--ASTYV_FONTS-->', `${fontLink}\n    ${selfHostedStyle}`)
        .replace('<!--ASTYV_CSS_VARS-->', `<style id="astyv-design-vars">${cssVarsBlock}</style>`)
        .replace(/__ASTYV_THEME_COLOR__/g, colors.background.primary)
        .replace(/__ASTYV_PRIMARY__/g, colors.primary[500]);
    },
  };
}

export default defineConfig({
  plugins: [react(), designTokensPlugin()],
  // Custom domain serves from root (BrowserRouter requires this)
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'motion': ['framer-motion'],
        },
      },
    },
  },
});
