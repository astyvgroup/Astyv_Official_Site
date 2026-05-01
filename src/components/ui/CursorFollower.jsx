import { useEffect, useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import useMousePosition from '../../hooks/useMousePosition';

export default function CursorFollower() {
    const { x, y } = useMousePosition();
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');

    useEffect(() => {
        if (isMobile) return;

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [data-cursor]');
            if (target) {
                setIsHovering(true);
                setHoverText(target.getAttribute('data-cursor') || '');
            } else {
                setIsHovering(false);
                setHoverText('');
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        return () => document.removeEventListener('mouseover', handleMouseOver);
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* Outer ring */}
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: isHovering ? 60 : 40,
                    height: isHovering ? 60 : 40,
                    border: '1px solid rgba(124, 58, 237, 0.5)',
                    borderRadius: '50%',
                    transform: `translate(${x - (isHovering ? 30 : 20)}px, ${y - (isHovering ? 30 : 20)}px)`,
                    transition: 'width 0.3s, height 0.3s, transform 0.15s ease-out',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {hoverText && (
                    <span className="text-[10px] text-primary-400 font-medium uppercase tracking-wider">
                        {hoverText}
                    </span>
                )}
            </div>
            {/* Inner dot */}
            <div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width: 6,
                    height: 6,
                    backgroundColor: '#7C3AED',
                    borderRadius: '50%',
                    transform: `translate(${x - 3}px, ${y - 3}px)`,
                }}
            />
        </>
    );
}
