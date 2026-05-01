import siteContent from '../../config/siteContent';

/**
 * BrandLogo — single point of entry for rendering Astyv's logo.
 * Pass `variant` to pick the right asset:
 *   - 'wordmark'  → Raginy script "Astyv" word only (default)
 *   - 'icon'      → "A" mark only
 *   - 'iconDark'  → "A" mark with built-in dark background
 *   - 'iconWhite' → white outline "A" mark for dark contexts
 *   - 'full'      → wordmark + tagline ("Building What's Next")
 *   - 'fullDark'  → full lockup with dark background
 *
 * Uses brand asset paths from siteContent.brand.logos so swapping logos
 * is a single-file edit.
 */
export default function BrandLogo({
    variant = 'wordmark',
    height,
    width,
    className = '',
    alt = 'Astyv — Building What\'s Next',
    ...rest
}) {
    const src = siteContent.brand.logos[variant] || siteContent.brand.logos.wordmark;
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
