"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader, NearestFilter, LinearFilter } from "three";
import { useRef } from "react";

function RotatingTVScreen() {
  const meshRef = useRef<THREE.Group>(null);

  const screenTexture = useLoader(TextureLoader, "/assets/tv-screen.png");

  screenTexture.magFilter = NearestFilter; // Sharper on zoom
  screenTexture.minFilter = LinearFilter;  // Smooth when scaled down
  screenTexture.anisotropy = 16; // Improves clarity at angles

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={meshRef} scale={[1.2, 1.2, 1.2]}>
      {/* TV Body (black box) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.5, 2, 0.2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Screen Panel with IPTV UI Image */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[3.2, 1.8]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* TV Stand */}
      <mesh position={[0, -1.15, 0]}>
        <boxGeometry args={[1, 0.1, 0.3]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="h-[480px] w-full md:h-[600px]">
      <Canvas shadows camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} castShadow />
        <RotatingTVScreen />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
