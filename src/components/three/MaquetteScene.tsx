'use client';

import { useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';

/*
 * Abstract architectural study — NOT a model of a built project.
 * Three ideas drawn from the studio's photographs, rendered in neutral materials:
 *   1. stepped stone volumes in a spiral (the rough semicircular stone steps)
 *   2. a timber-and-steel pergola over a timber deck (the covered garden walkway)
 *   3. planters with low planting (living green as architecture)
 * One red steel beam echoes the red frames seen in the coffee-bar project.
 */

const COLORS = {
  limestone: '#d9d0c0',
  stone: '#8d8679',
  oak: '#b88a4f',
  steel: '#242320',
  moss: '#55624a',
  rojo: '#9c3a2a',
} as const;

function SpiralSteps() {
  const steps = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const angle = i * 0.58;
        const height = 0.26 * (i + 1);
        return {
          position: [Math.cos(angle) * 1.0, height / 2, Math.sin(angle) * 1.0] as [number, number, number],
          height,
          rotation: -angle,
        };
      }),
    [],
  );

  return (
    <group position={[-1.7, 0, 0.1]}>
      {steps.map((s, i) => (
        <mesh key={i} position={s.position} rotation={[0, s.rotation, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.62, 0.62, s.height, 40]} />
          <meshStandardMaterial color={COLORS.stone} roughness={0.95} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

function Pergola() {
  const posts: [number, number][] = [
    [-1.2, -0.85],
    [1.2, -0.85],
    [-1.2, 0.85],
    [1.2, 0.85],
  ];
  const beamsAlongX = [-0.85, -0.425, 0, 0.425, 0.85];
  const beamsAlongZ = [-1.0, -0.5, 0, 0.5, 1.0];

  return (
    <group position={[1.9, 0, 0]}>
      {/* timber deck */}
      <mesh position={[0, 0.04, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.9, 0.08, 2.1]} />
        <meshStandardMaterial color={COLORS.oak} roughness={0.7} />
      </mesh>

      {posts.map(([x, z], i) => (
        <mesh key={i} position={[x, 1.1, z]} castShadow>
          <boxGeometry args={[0.1, 2.1, 0.1]} />
          <meshStandardMaterial color={COLORS.steel} roughness={0.55} metalness={0.4} />
        </mesh>
      ))}

      {/* red steel beam */}
      <mesh position={[0, 2.12, -0.85]} castShadow>
        <boxGeometry args={[2.7, 0.08, 0.08]} />
        <meshStandardMaterial color={COLORS.rojo} roughness={0.6} metalness={0.3} />
      </mesh>

      {beamsAlongX.map((z, i) => (
        <mesh key={`x${i}`} position={[0, 2.2, z]} castShadow>
          <boxGeometry args={[2.6, 0.08, 0.1]} />
          <meshStandardMaterial color={COLORS.oak} roughness={0.75} />
        </mesh>
      ))}
      {beamsAlongZ.map((x, i) => (
        <mesh key={`z${i}`} position={[x * 1.2, 2.29, 0]} castShadow>
          <boxGeometry args={[0.07, 0.08, 2.0]} />
          <meshStandardMaterial color={COLORS.oak} roughness={0.75} />
        </mesh>
      ))}

      {/* translucent roof panel */}
      <mesh position={[0, 2.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.7, 2.0]} />
        <meshStandardMaterial color="#f4f0e8" transparent opacity={0.22} roughness={0.2} side={2} />
      </mesh>

      {/* planters + low planting */}
      {[-1.0, 1.0].map((z) => (
        <group key={z} position={[0, 0.08, z * 0.95]}>
          <mesh position={[0, 0.17, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.3, 0.34, 0.28]} />
            <meshStandardMaterial color={COLORS.steel} roughness={0.6} metalness={0.3} />
          </mesh>
          {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
            <mesh key={i} position={[x, 0.45 + (i % 2) * 0.05, 0]} scale={[1, 0.8 + (i % 3) * 0.15, 1]} castShadow>
              <icosahedronGeometry args={[0.2, 1]} />
              <meshStandardMaterial color={COLORS.moss} roughness={0.9} flatShading />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Plinth() {
  return (
    <mesh position={[0, -0.1, 0]} receiveShadow>
      <boxGeometry args={[7.4, 0.2, 4.6]} />
      <meshStandardMaterial color={COLORS.limestone} roughness={1} />
    </mesh>
  );
}

/** Keep vertical swipes scrolling the page on touch devices; horizontal drags rotate the model. */
function TouchScrollFix() {
  const dom = useThree((s) => s.gl.domElement);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      dom.style.touchAction = 'pan-y';
    });
    return () => cancelAnimationFrame(id);
  }, [dom]);
  return null;
}

export interface MaquetteSceneProps {
  /** Render loop runs only while the section is on screen. */
  active: boolean;
  reduceMotion: boolean;
  /** Small screens: cheaper pixel ratio, no real-time shadows. */
  lowPower: boolean;
  onReady: () => void;
  onFail: () => void;
}

export default function MaquetteScene({ active, reduceMotion, lowPower, onReady, onFail }: MaquetteSceneProps) {
  return (
    <Canvas
      shadows={!lowPower}
      dpr={lowPower ? [1, 1.5] : [1, 2]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [6.6, 4.3, 7.4], fov: 31 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          onFail();
        });
        onReady();
      }}
      style={{ touchAction: 'pan-y' }}
    >
      <hemisphereLight args={['#fff4e2', '#8d8679', 0.95]} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={2.3}
        color="#fff1dc"
        castShadow={!lowPower}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-camera-near={1}
        shadow-camera-far={24}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-6, 3, -4]} intensity={0.55} color="#cfd8e6" />

      <Plinth />
      <SpiralSteps />
      <Pergola />
      {lowPower ? (
        <ContactShadows position={[0, 0.002, 0]} opacity={0.4} scale={12} blur={2.6} far={4} frames={1} />
      ) : null}

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.06}
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.55}
        minPolarAngle={0.65}
        maxPolarAngle={1.42}
        target={[0, 0.9, 0]}
      />
      <TouchScrollFix />
    </Canvas>
  );
}
