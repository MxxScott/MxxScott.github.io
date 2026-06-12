'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';

/**
 * Monochrome morphing core: liquid-metal distorted sphere in a silver
 * wireframe shell. Persistent across the whole page — scroll makes it
 * slowly rotate, shrink, and drift aside so content stays readable.
 */
function Core({ scrollRef }) {
  const group = useRef();
  const shell = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current; // 0..1 over the entire page

    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;

    if (group.current) {
      group.current.rotation.y = t * 0.1 + scroll * Math.PI * 2;
      group.current.rotation.x = pointer.current.y * 0.25 + scroll * 0.5;
      group.current.position.x = pointer.current.x * 0.5 + scroll * 2.4;
      group.current.position.y = -scroll * 0.9;
      group.current.position.z = -scroll * 1.6;
      const s = 1 - scroll * 0.3;
      group.current.scale.set(s, s, s);
    }
    if (shell.current) {
      shell.current.rotation.y = -t * 0.18;
      shell.current.rotation.z = t * 0.08;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <sphereGeometry args={[1.7, 64, 64]} />
          <MeshDistortMaterial
            color="#1c3aa0"
            emissive="#0a1130"
            roughness={0.16}
            metalness={0.92}
            distort={0.42}
            speed={1.6}
          />
        </mesh>
        <mesh ref={shell} scale={1.55}>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial color="#6f96ff" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene({ scrollRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 4, 6]} intensity={45} color="#ffffff" />
      <pointLight position={[-6, -3, 4]} intensity={32} color="#2f63f0" />

      <Core scrollRef={scrollRef} />

      <Sparkles count={130} scale={[14, 9, 10]} size={2.1} speed={0.35} opacity={0.5} color="#8ca6ff" />
      <Stars radius={60} depth={40} count={1500} factor={3} saturation={0} fade speed={0.6} />
    </Canvas>
  );
}
