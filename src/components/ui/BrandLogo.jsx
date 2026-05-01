import siteContent from '../../config/siteContent';
import useTheme from '../../hooks/useTheme';

/**
 * BrandLogo — single point of entry for rendering Astyv's logo.
 * Pass `variant` to pick the right asset:
 *   - 'wordmark'  → Raginy script "Astyv" word only (default)
 *   - 'icon'      → "A" mark only
 *   - 'iconDark'  → "A" mark with built-in dark background
 *   - 'iconWhite' → white outline "A" mark for dark contexts
 *   - 'full'      → wordmark + tagline ("Building What's Next")
 *   - 'fullDark'  → full lockup with dark background
 *   - 'fullTransparent' → auto-themes: white tagline in dark mode,
 *                         dark tagline in light mode
 *
 * Uses brand asset paths from siteContent.brand.logos so swapping logos
 * is a single-file edit.
 */

// Variants whose tagline color needs to flip per theme. The map points
// the dark-mode variant to its light-mode counterpart.
const lightModeOverrides = {
    fullTransparent: 'fullTransparentLight',
};

export default function BrandLogo({
    variant = 'wordmark',
    height,
    width,
    className = '',
    alt = 'Astyv — Building What\'s Next',
    ...rest
}) {
    const { theme } = useTheme();
    const effectiveVariant =
        theme === 'light' && lightModeOverrides[variant]
            ? lightModeOverrides[variant]
            : variant;
    const src = siteContent.brand.logos[effectiveVariant] || siteContent.brand.logos.wordmark;
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="eager"
            decoding="async"
            className={`select-none ${className}`}
            draggable={false}
            {...rest}
        />
    );
}
