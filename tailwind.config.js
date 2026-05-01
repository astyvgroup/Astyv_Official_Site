/** @type {import('tailwindcss').Config} */
import design from './src/config/design.js';

const { fonts, colors, layout } = design;

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.primary,
                dark: colors.background,
                accent: {
                    DEFAULT: colors.primary[500],
                    glow: colors.glow.soft,
                    'glow-strong': colors.glow.strong,
                },
                semantic: colors.semantic,
            },
            fontFamily: {
                heading: [`'${fonts.heading}'`, 'system-ui', 'sans-serif'],
                body:    [`'${fonts.body}'`,    'system-ui', 'sans-serif'],
                display: [`'${fonts.heading}'`, 'system-ui', 'sans-serif'],
                mono:    [`'${fonts.mono}'`,    "'Fira Code'", 'monospace'],
                sans:    [`'${fonts.body}'`,    'system-ui', 'sans-serif'],
            },
            fontSize: {
                hero: 'clamp(2.5rem, 8vw, 7rem)',
                'display-xl': 'clamp(3rem, 9vw, 8rem)',
                'display-lg': 'clamp(2.25rem, 6vw, 5rem)',
                'display-md': 'clamp(1.875rem, 4vw, 3.5rem)',
            },
            spacing: {
                section: layout.sectionPadding,
                'section-mobile': layout.sectionPaddingMobile,
                nav: layout.navHeight,
            },
            maxWidth: {
                container: layout.containerMax,
            },
            borderRadius: {
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                '2xl': '24px',
                '3xl': '32px',
            },
            transitionTimingFunction: {
                spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
                'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            boxShadow: {
                glow: `0 0 40px ${colors.glow.soft}`,
                'glow-strong': `0 0 60px ${colors.glow.strong}`,
                'glow-sm': `0 0 12px ${colors.glow.soft}`,
            },
            backgroundImage: {
                'gradient-primary': colors.gradient.primary,
                'gradient-subtle': colors.gradient.subtle,
                'gradient-aurora': colors.gradient.aurora,
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 9s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'gradient-flow': 'gradientFlow 8s ease infinite',
                'breath': 'breath 4s ease-in-out infinite',
                'orbit': 'orbit 12s linear infinite',
                'sheen': 'sheen 3s ease-in-out infinite',
                'marquee': 'marquee 40s linear infinite',
                'marquee-slow': 'marquee 80s linear infinite',
                'blob-morph': 'blobMorph 14s ease-in-out infinite',
                'stagger-rise': 'staggerRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'spin-slow': 'spinSlow 12s linear infinite',
            },
        },
    },
    plugins: [],
};
