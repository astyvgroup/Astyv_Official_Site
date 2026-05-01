import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import BrandLogo from '../../ui/BrandLogo';
import useTheme from '../../../hooks/useTheme';

// Global mouse tracking so it works even when canvas is behind content
const globalMouse = { x: 0, y: 0, active: false };
if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        globalMouse.active = true;
    });

    // Add touch support for mobile interaction
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            globalMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            globalMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            globalMouse.active = true;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            globalMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            globalMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            globalMouse.active = true;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        // Optional: you could reset it so particles drift back, but it's cool if they stick to the last touch
        globalMouse.active = false;
    });
}

function PointCloud({ count = 10000, color = "#9b6dff", size = 0.03, blending = THREE.AdditiveBlending, opacity = 1 }) {
    const geomRef = useRef();
    const { camera } = useThree();

    // Pre-calculate 3 different shapes for morphing
    const { scatterPos, spherePos, wavePos, randomOffs } = useMemo(() => {
        const scatterPos = new Float32Array(count * 3);
        const spherePos = new Float32Array(count * 3);
        const wavePos = new Float32Array(count * 3);
        const randomOffs = new Float32Array(count * 3);

        const sphereRadius = 4;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // 1. Scatter (FullScreen)
            scatterPos[i3] = (Math.random() - 0.5) * 40;
            scatterPos[i3 + 1] = (Math.random() - 0.5) * 40;
            scatterPos[i3 + 2] = (Math.random() - 0.5) * 20;

            // 2. Sphere Distribution
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            // Allow some depth variance for a fuller sphere
            const r = sphereRadius * Math.cbrt(Math.random() * 0.5 + 0.5);
            spherePos[i3] = r * Math.sin(phi) * Math.cos(theta);
            spherePos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            spherePos[i3 + 2] = r * Math.cos(phi);

            // 3. DNA / Torus / Wave (Torus-like wave)
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const tube = 1.5;
            const mainRadius = 6;

            wavePos[i3] = (mainRadius + tube * Math.cos(v)) * Math.cos(u) + Math.sin(u * 5) * 0.5;
            wavePos[i3 + 1] = (mainRadius + tube * Math.cos(v)) * Math.sin(u) + Math.cos(v * 4) * 0.5;
            wavePos[i3 + 2] = tube * Math.sin(v);

            // Random offsets for organic movement
            randomOffs[i3] = Math.random() * Math.PI * 2;
            randomOffs[i3 + 1] = Math.random() * Math.PI * 2;
            randomOffs[i3 + 2] = (Math.random() * 0.5) + 0.1; // Speed multiplier
        }
        return { scatterPos, spherePos, wavePos, randomOffs };
    }, [count]);

    // Use initial positions as scatter
    const currentPositions = useMemo(() => new Float32Array(scatterPos), [scatterPos]);

    // Animate points
    useFrame((state) => {
        if (!geomRef.current) return;

        const time = state.clock.getElapsedTime();
        const positionsAttrib = geomRef.current.attributes.position;
        const positionsArray = positionsAttrib.array;

        // Convert global mouse screen coordinates to world coordinates
        const vector = new THREE.Vector3(globalMouse.x, globalMouse.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const mousePos = camera.position.clone().add(dir.multiplyScalar(distance));

        // Determine morph targets based on scroll
        const scrollY = window.scrollY;

        // We will blend shapes together. 
        // 0-600px -> scatter to sphere
        // 1200-1800px -> sphere to wave
        // 2400-3000px -> wave to scatter

        let shape1 = scatterPos;
        let shape2 = scatterPos;
        let mix = 0;

        const section1 = 600;
        const section2 = 1200;
        const section3 = 1800;
        const section4 = 2400;
        const section5 = 3000;

        if (scrollY < section1) {
            shape1 = scatterPos;
            shape2 = spherePos;
            mix = scrollY / section1;
        } else if (scrollY < section2) {
            shape1 = spherePos;
            shape2 = spherePos;
            mix = 0;
        } else if (scrollY < section3) {
            shape1 = spherePos;
            shape2 = wavePos;
            mix = (scrollY - section2) / (section3 - section2);
        } else if (scrollY < section4) {
            shape1 = wavePos;
            shape2 = wavePos;
            mix = 0;
        } else if (scrollY < section5) {
            shape1 = wavePos;
            shape2 = scatterPos;
            mix = (scrollY - section4) / (section5 - section4);
        } else {
            shape1 = scatterPos;
            shape2 = scatterPos;
            mix = 0;
        }

        // Apply easing to mix for smoother shape transitions
        const easedMix = mix * mix * (3 - 2 * mix);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Interpolate target
            const tx = shape1[i3] + (shape2[i3] - shape1[i3]) * easedMix;
            const ty = shape1[i3 + 1] + (shape2[i3 + 1] - shape1[i3 + 1]) * easedMix;
            const tz = shape1[i3 + 2] + (shape2[i3 + 2] - shape1[i3 + 2]) * easedMix;

            const ox = randomOffs[i3];
            const oy = randomOffs[i3 + 1];
            const speed = randomOffs[i3 + 2];

            let cx = currentPositions[i3];
            let cy = currentPositions[i3 + 1];
            let cz = currentPositions[i3 + 2];

            // Add slight gentle organic wave movements
            const finalTargetX = tx + Math.sin(time * speed + ox) * 0.5;
            const finalTargetY = ty + Math.cos(time * speed + oy) * 0.5;
            const finalTargetZ = tz + Math.sin(time * speed + ox) * 0.5;

            // Mouse repel logic
            const dxToMouse = cx - mousePos.x;
            const dyToMouse = cy - mousePos.y;
            const distToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);

            const repelRadius = 5;
            let repelForceX = 0;
            let repelForceY = 0;

            if (distToMouse < repelRadius && distToMouse > 0.1) {
                const force = Math.pow(1 - distToMouse / repelRadius, 2) * 8;
                repelForceX = (dxToMouse / distToMouse) * force;
                repelForceY = (dyToMouse / distToMouse) * force;
            }

            // Apply repulsion + move smoothly to target
            cx += (finalTargetX + repelForceX - cx) * 0.05;
            cy += (finalTargetY + repelForceY - cy) * 0.05;
            cz += (finalTargetZ - cz) * 0.05;

            currentPositions[i3] = cx;
            currentPositions[i3 + 1] = cy;
            currentPositions[i3 + 2] = cz;

            // Optional: apply overall container rotation to point cloud
            // This is done by simulating it in the buffer arrays, but here we can just write cx, cy, cz to positionsArray
            // But we can let a <group> handle the rotation, so we just write cx,cy,cz directly
            positionsArray[i3] = cx;
            positionsArray[i3 + 1] = cy;
            positionsArray[i3 + 2] = cz;
        }

        positionsAttrib.needsUpdate = true;
    });

    return (
        <points>
            <bufferGeometry ref={geomRef}>
                <bufferAttribute
                    attach="attributes-position"
                    count={currentPositions.length / 3}
                    array={new Float32Array(currentPositions)}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color={color}
                opacity={opacity}
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                blending={blending}
            />
        </points>
    );
}

// Global fixed background canvas component.
//
// Particle blending switches per theme:
//  - Dark: AdditiveBlending — bright glowy purples on near-black bg
//  - Light: NormalBlending — opaque deep purples that stay visible on white
// Additive blending on a white background saturates to white, making
// particles invisible — that's why we swap.
function FixedBackground() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const lightCfg = [
        { count: 8000, color: '#5b1bb0', size: 0.04, opacity: 0.85 }, // primary-700
        { count: 5000, color: '#461486', size: 0.05, opacity: 0.95 }, // primary-800
        { count: 2000, color: '#852BED', size: 0.035, opacity: 0.9 },  // primary-500
    ];
    const darkCfg = [
        { count: 8000, color: '#9b6dff', size: 0.03, opacity: 1 },
        { count: 5000, color: '#7C3AED', size: 0.04, opacity: 1 },
        { count: 2000, color: '#ffffff', size: 0.02, opacity: 1 },
    ];
    const cfg = isLight ? lightCfg : darkCfg;
    const blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;

    return (
        <div className="fixed inset-0 z-[-1] bg-dark-primary pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ width: '100vw', height: '100vh' }}>
                <ambientLight intensity={0.5} />
                <group rotation={[0.2, 0, 0]}>
                    {cfg.map((c, i) => (
                        <PointCloud key={`${theme}-${i}`} count={c.count} color={c.color} size={c.size} opacity={c.opacity} blending={blending} />
                    ))}
                </group>
            </Canvas>
            <div
                className="absolute inset-0 bg-radial-gradient"
                style={{ background: 'radial-gradient(circle at center, transparent 0%, var(--color-bg-primary) 85%)' }}
            />
        </div>
    );
}

export default function PointCloudHero() {
    return (
        <>
            <FixedBackground />

            <section className="relative min-h-screen w-full flex items-center justify-center pt-[calc(var(--nav-height)+2rem)]">
                <div className="relative z-10 container-custom flex flex-col items-center text-center px-4 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="drop-shadow-[0_0_60px_rgba(133,43,237,0.45)]"
                    >
                        <BrandLogo
                            variant="fullTransparent"
                            alt="Astyv — Building What's Next"
                            className="h-32 sm:h-40 md:h-52 lg:h-64 w-auto"
                        />
                        {/* Visually hidden but readable by screen readers and SEO crawlers */}
                        <h1 className="sr-only">Astyv — Building What's Next</h1>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
