import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import theme from '../../config/theme';

export default function ParticleField({ count = 2000, mouse, subtle = false }) {
    const pointsRef = useRef();
    const linesRef = useRef();
    const { viewport } = useThree();

    const actualCount = subtle ? Math.floor(count * 0.3) : count;

    // Initialize particle positions and velocities
    const [positions, velocities, originalPositions, colors, sizes] = useMemo(() => {
        const pos = new Float32Array(actualCount * 3);
        const vel = new Float32Array(actualCount * 3);
        const orig = new Float32Array(actualCount * 3);
        const col = new Float32Array(actualCount * 3);
        const siz = new Float32Array(actualCount);

        const baseColor = new THREE.Color(theme.particles.baseColor);
        const spread = subtle ? 15 : 20;

        for (let i = 0; i < actualCount; i++) {
            const i3 = i * 3;
            pos[i3] = (Math.random() - 0.5) * spread;
            pos[i3 + 1] = (Math.random() - 0.5) * spread;
            pos[i3 + 2] = (Math.random() - 0.5) * 8;

            orig[i3] = pos[i3];
            orig[i3 + 1] = pos[i3 + 1];
            orig[i3 + 2] = pos[i3 + 2];

            vel[i3] = (Math.random() - 0.5) * 0.005;
            vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
            vel[i3 + 2] = (Math.random() - 0.5) * 0.002;

            col[i3] = baseColor.r;
            col[i3 + 1] = baseColor.g;
            col[i3 + 2] = baseColor.b;

            siz[i] = Math.random() * 2 + 0.5;
        }
        return [pos, vel, orig, col, siz];
    }, [actualCount, subtle]);

    // Line connections
    const linePositions = useMemo(() => new Float32Array(actualCount * 6 * 3), [actualCount]);
    const lineColors = useMemo(() => new Float32Array(actualCount * 6 * 3), [actualCount]);

    const hoverColor = useMemo(() => new THREE.Color(theme.particles.hoverColor), []);
    const baseColor = useMemo(() => new THREE.Color(theme.particles.baseColor), []);

    const mouseRadius = theme.particles.mouseRadius / 100;

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        const posAttr = pointsRef.current.geometry.attributes.position;
        const colAttr = pointsRef.current.geometry.attributes.color;
        const posArray = posAttr.array;
        const colArray = colAttr.array;

        const mx = mouse?.current?.x ?? 0;
        const my = mouse?.current?.y ?? 0;
        const mouseX = mx * (viewport.width / 2);
        const mouseY = my * (viewport.height / 2);

        const time = state.clock.elapsedTime;
        let lineIdx = 0;
        const maxConnections = subtle ? 2 : 4;
        const connDist = theme.particles.connectionDistance / 100;

        for (let i = 0; i < actualCount; i++) {
            const i3 = i * 3;

            // Brownian drift
            posArray[i3] += velocities[i3] + Math.sin(time * 0.3 + i) * 0.001;
            posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i) * 0.001;
            posArray[i3 + 2] += velocities[i3 + 2];

            // Soft boundary - drift back toward origin
            posArray[i3] += (originalPositions[i3] - posArray[i3]) * 0.001;
            posArray[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * 0.001;
            posArray[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * 0.002;

            // Mouse repulsion
            const dx = posArray[i3] - mouseX;
            const dy = posArray[i3 + 1] - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius && dist > 0) {
                const force = (1 - dist / mouseRadius) * 0.08;
                posArray[i3] += (dx / dist) * force;
                posArray[i3 + 1] += (dy / dist) * force;

                // Color shift toward hover color
                const t = 1 - dist / mouseRadius;
                colArray[i3] = baseColor.r + (hoverColor.r - baseColor.r) * t;
                colArray[i3 + 1] = baseColor.g + (hoverColor.g - baseColor.g) * t;
                colArray[i3 + 2] = baseColor.b + (hoverColor.b - baseColor.b) * t;
            } else {
                // Fade back to base color
                colArray[i3] += (baseColor.r - colArray[i3]) * 0.02;
                colArray[i3 + 1] += (baseColor.g - colArray[i3 + 1]) * 0.02;
                colArray[i3 + 2] += (baseColor.b - colArray[i3 + 2]) * 0.02;
            }

            // Draw connections to nearby particles
            let connectionCount = 0;
            for (let j = i + 1; j < actualCount && connectionCount < maxConnections; j++) {
                const j3 = j * 3;
                const cdx = posArray[i3] - posArray[j3];
                const cdy = posArray[i3 + 1] - posArray[j3 + 1];
                const cdz = posArray[i3 + 2] - posArray[j3 + 2];
                const cdist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);
                if (cdist < connDist) {
                    const alpha = 1 - cdist / connDist;
                    const li = lineIdx * 6;
                    linePositions[li] = posArray[i3];
                    linePositions[li + 1] = posArray[i3 + 1];
                    linePositions[li + 2] = posArray[i3 + 2];
                    linePositions[li + 3] = posArray[j3];
                    linePositions[li + 4] = posArray[j3 + 1];
                    linePositions[li + 5] = posArray[j3 + 2];

                    lineColors[li] = colArray[i3] * alpha;
                    lineColors[li + 1] = colArray[i3 + 1] * alpha;
                    lineColors[li + 2] = colArray[i3 + 2] * alpha;
                    lineColors[li + 3] = colArray[j3] * alpha;
                    lineColors[li + 4] = colArray[j3 + 1] * alpha;
                    lineColors[li + 5] = colArray[j3 + 2] * alpha;

                    lineIdx++;
                    connectionCount++;
                }
            }
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;

        if (linesRef.current) {
            linesRef.current.geometry.attributes.position.needsUpdate = true;
            linesRef.current.geometry.attributes.color.needsUpdate = true;
            linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
        }
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={actualCount}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        array={colors}
                        count={actualCount}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-size"
                        array={sizes}
                        count={actualCount}
                        itemSize={1}
                    />
                </bufferGeometry>
                <pointsMaterial
                    vertexColors
                    size={theme.particles.particleSize / 100}
                    sizeAttenuation
                    transparent
                    opacity={subtle ? 0.4 : 0.8}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={linePositions}
                        count={linePositions.length / 3}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        array={lineColors}
                        count={lineColors.length / 3}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={subtle ? 0.1 : 0.2}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}
