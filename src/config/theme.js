// =====================================================================
//  ASTYV — Theme adapter (back-compat with existing imports)
// =====================================================================
//  This file used to be the source of truth. It now derives from
//  design.js so there's only ONE place to edit colors/fonts.
//  See src/config/design.js for the editable tokens.
// =====================================================================
import design from './design.js';

const { colors, fonts, particles } = design;

const theme = {
    colors: {
        primary: colors.primary,
        background: colors.background,
        text: { ...colors.text, accent: colors.primary[500] },
        accent: {
            glow: colors.glow.soft,
            glowStrong: colors.glow.strong,
            gradient: colors.gradient.primary,
        },
        border: colors.border,
        success: colors.semantic.success,
        error:   colors.semantic.error,
        warning: colors.semantic.warning,
    },
    fonts: {
        heading: `'${fonts.heading}', system-ui, sans-serif`,
        body:    `'${fonts.body}', system-ui, sans-serif`,
        mono:    `'${fonts.mono}', 'Fira Code', monospace`,
    },
    particles: {
        baseColor: particles.baseColor,
        hoverColor: particles.hoverColor,
        connectionColor: particles.connectionColor,
        count: particles.countDesktop,
        countMobile: particles.countMobile,
        countTablet: particles.countTablet,
        connectionDistance: particles.connectionDistance,
        mouseRadius: particles.mouseRadius,
        particleSize: particles.particleSize,
        speed: particles.speed,
    },
};

export default theme;
