// =====================================================================
//  ASTYV — DESIGN TOKENS (single source of truth)
// =====================================================================
//  EDIT THIS FILE TO CHANGE FONTS OR COLORS SITE-WIDE.
//  Used by: tailwind.config.js, vite.config.js (HTML transform), globals.css
//
//  HOW TO CHANGE FONTS:
//    1. Pick a Google Font at https://fonts.google.com (or self-host below)
//    2. Update fonts.heading + fonts.body + fonts.googleFontsHref
//    3. Run: npm run build && npm run deploy
//
//  HOW TO CHANGE PRIMARY COLOR:
//    1. Update colors.primary[500] to your brand hex
//    2. (Optional) Adjust the surrounding shades for a tonal palette
//    3. Rebuild
// =====================================================================

const design = {
  // -------------------------------------------------------------------
  // FONTS — change these three lines to swap the entire site's typography
  // -------------------------------------------------------------------
  // Current pairing:
  //   Headings: Space Grotesk — geometric, distinctive, modern (free, Google Fonts)
  //   Body:     Inter         — best-in-class readable sans (free, Google Fonts)
  //   Mono:     JetBrains Mono — distinctive code/numeric font
  //
  // Other "feels special" alternatives you can swap in:
  //   Bricolage Grotesque (playful, variable)
  //   Outfit              (geometric, uniform)
  //   Sora                (geometric, modern)
  //   General Sans        (paid via fontshare.com — no Google URL)
  fonts: {
    heading: 'Space Grotesk',
    body: 'Space Grotesk',  // single-family typography — body uses 300-500, headings 600-700
    mono: 'JetBrains Mono',

    // Google Fonts URL — must include every weight referenced.
    // Space Grotesk for everything (300, 400, 500, 600, 700).
    googleFontsHref:
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',

    // If you license real Gilroy/Raginy later, drop the .woff2 files in
    // /public/fonts/ and uncomment selfHostedCss to load them. The Google
    // Fonts URL above will still load too — you can keep both, or set
    // googleFontsHref to '' to skip it.
    selfHostedCss: '',
    // Example:
    // selfHostedCss: `
    //   @font-face { font-family: 'Gilroy'; src: url('/fonts/Gilroy-Regular.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
    //   @font-face { font-family: 'Gilroy'; src: url('/fonts/Gilroy-Bold.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }
    // `,
  },

  // -------------------------------------------------------------------
  // COLORS — brand purple palette derived from #852BED
  // -------------------------------------------------------------------
  colors: {
    primary: {
      50:  '#f7f0ff',
      100: '#ede0ff',
      200: '#d9b8ff',
      300: '#c189ff',
      400: '#a558ff',
      500: '#852BED', // brand primary
      600: '#7022d6',
      700: '#5b1bb0',
      800: '#461486',
      900: '#320e60',
      950: '#1f0840',
    },
    background: {
      primary:   '#0A0A0A',
      secondary: '#111111',
      tertiary:  '#1A1A1A',
      elevated:  '#222222',
    },
    text: {
      primary:   '#FFFFFF',
      secondary: '#A1A1AA',
      tertiary:  '#71717A',
      accent:    '#852BED',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      medium: 'rgba(255, 255, 255, 0.10)',
      strong: 'rgba(255, 255, 255, 0.20)',
      accent: 'rgba(133, 43, 237, 0.30)',
    },
    glow: {
      soft:   'rgba(133, 43, 237, 0.40)',
      strong: 'rgba(133, 43, 237, 0.70)',
    },
    gradient: {
      primary:  'linear-gradient(135deg, #852BED 0%, #A558FF 50%, #C189FF 100%)',
      subtle:   'linear-gradient(135deg, rgba(133,43,237,0.15) 0%, rgba(165,88,255,0.05) 100%)',
      aurora:   'radial-gradient(ellipse at 20% 0%, rgba(133,43,237,0.25), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(165,88,255,0.20), transparent 50%)',
    },
    semantic: {
      success: '#10B981',
      error:   '#EF4444',
      warning: '#F59E0B',
      info:    '#3B82F6',
    },
  },

  // -------------------------------------------------------------------
  // SPACING & LAYOUT
  // -------------------------------------------------------------------
  layout: {
    navHeight: '80px',
    sectionPadding: '120px',
    sectionPaddingMobile: '80px',
    containerMax: '1280px',
  },

  // -------------------------------------------------------------------
  // PARTICLE SYSTEM (Three.js hero)
  // -------------------------------------------------------------------
  particles: {
    baseColor: '#852BED',
    hoverColor: '#A558FF',
    connectionColor: 'rgba(133, 43, 237, 0.18)',
    countDesktop: 2000,
    countTablet: 1000,
    countMobile: 500,
    connectionDistance: 120,
    mouseRadius: 200,
    particleSize: 1.5,
    speed: 0.3,
  },
};

export default design;
