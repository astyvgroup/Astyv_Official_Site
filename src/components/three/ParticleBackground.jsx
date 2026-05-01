import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import useMediaQuery from '../../hooks/useMediaQuery';
import theme from '../../config/theme';

export default function ParticleBackground({ fullScreen = false, subtle = false }) {
    const mouse = useRef({ x: 0, y: 0 });
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

    // Adapts to viewport: more particles on big screens, fewer on phones
    const count = isMobile
        ? theme.particles.countMobile
        : isTablet
            ? theme.particles.countTablet
            : theme.particles.count;

    const handlePointerMove = (e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e) => {
        if (e.touches[0]) {
            mouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    };

    return (
        <div
            className={`absolute inset-0 ${fullScreen ? 'h-screen' : subtle ? 'h-[50vh]' : 'h-full'}`}
            style={{ zIndex: 0 }}
            onPointerMove={handlePointerMove}
            onTouchMove={handleTouchMove}
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <ParticleField count={count} mouse={mouse} subtle={subtle} />
                </Suspense>
            </Canvas>
        </div>
    );
}
