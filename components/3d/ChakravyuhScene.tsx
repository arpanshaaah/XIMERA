import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Environment, Sparkles, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { GameStage } from '../../types';

interface SceneProps {
  gameStage: GameStage;
  currentLayer: number;
}

interface FormationRingProps {
  radius: number;
  count: number;
  isActive: boolean;
  layerIndex: number;
}

// Represents a single ring of the Chakravyuh
const FormationRing: React.FC<FormationRingProps> = ({ radius, count, isActive, layerIndex }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Color logic
  const color = isActive ? new THREE.Color('#fbbf24') : new THREE.Color('#78350f'); // Gold vs Dark Red/Brown
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotate the ring slowly
    meshRef.current.rotation.y += 0.002 * (layerIndex % 2 === 0 ? 1 : -1); // Alternate rotation
    
    // Pulse effect if active
    if (isActive) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      meshRef.current.scale.set(scale, 1, scale);
    }
  });

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      dummy.position.set(x, 0, z);
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [count, radius, dummy, color]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      <boxGeometry args={[0.8, 2.5, 0.8]} />
      <meshStandardMaterial 
        roughness={0.4} 
        metalness={0.6}
        emissive={isActive ? '#d97706' : '#000000'}
        emissiveIntensity={isActive ? 0.5 : 0}
      />
    </instancedMesh>
  );
};

// The Warrior (Player)
const Warrior = ({ layer, stage }: { layer: number; stage: GameStage }) => {
  const ref = useRef<THREE.Group>(null);
  const targetRadius = useMemo(() => {
    if (stage === GameStage.INTRO || stage === GameStage.TEAM_ENTRY || stage === GameStage.RULES) return 60; // Outside
    if (stage === GameStage.VICTORY) return 80; // Exit
    return 45 - (layer - 1) * 6; // Moving inward: 45, 39, 33...
  }, [layer, stage]);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Smooth lerp to target radius
    const currentPos = ref.current.position.z;
    ref.current.position.z = THREE.MathUtils.lerp(currentPos, targetRadius, 0.05);
    
    // Bobbing animation (riding horse)
    ref.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
  });

  return (
    <group ref={ref} position={[0, 1, 60]}>
      {/* Abstract Horse/Warrior representation - Golden Beacon */}
      <pointLight color="#fbbf24" intensity={2} distance={10} decay={2} />
      <mesh castShadow>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#fcd34d" metalness={0.9} roughness={0.1} />
      </mesh>
      <Sparkles count={20} scale={3} size={4} speed={0.4} opacity={0.5} color="#fbbf24" />
    </group>
  );
};

// Controls the camera based on game state
const CameraController = ({ stage, layer }: { stage: GameStage; layer: number }) => {
  const { camera } = useThree();
  const vec = new THREE.Vector3();

  useFrame((state) => {
    let targetPos = new THREE.Vector3(0, 40, 60); // Default Intro
    let lookAtPos = new THREE.Vector3(0, 0, 0);

    if (stage === GameStage.INTRO) {
        // Rotating Aerial View
        const t = state.clock.getElapsedTime() * 0.1;
        targetPos.set(Math.sin(t) * 80, 50, Math.cos(t) * 80);
    } else if (stage === GameStage.TEAM_ENTRY || stage === GameStage.RULES) {
        // Closer to warrior outside
        targetPos.set(0, 10, 75);
        lookAtPos.set(0, 5, 50);
    } else if (stage === GameStage.PLAYING) {
        // Isometric Strategy View focused on current layer
        const layerRadius = 45 - (layer - 1) * 6;
        targetPos.set(0, 25, layerRadius + 20);
        lookAtPos.set(0, 0, layerRadius - 10);
    } else if (stage === GameStage.VICTORY) {
        // Looking up at warrior exiting
        targetPos.set(0, 5, 90);
        lookAtPos.set(0, 5, 70);
    }

    // Smooth transition
    camera.position.lerp(targetPos, 0.02);
    // Standard OrbitControls might fight this, so we update lookAt manually if not using OrbitControls for logic
    // But since we use OrbitControls for user panning, we might want to restrict this or use a custom camera rig.
    // For this demo, we'll manually set lookAt every frame which overrides controls briefly or works if controls are disabled.
    camera.lookAt(lookAtPos);
  });

  return null;
};

export const ChakravyuhScene: React.FC<SceneProps> = ({ gameStage, currentLayer }) => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 50, 80]} fov={50} />
      <CameraController stage={gameStage} layer={currentLayer} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} color="#7c2d12" />
      <directionalLight 
        position={[50, 50, 25]} 
        intensity={1.5} 
        castShadow 
        color="#fbbf24" 
        shadow-bias={-0.0001}
      />
      <fog attach="fog" args={['#270a05', 20, 120]} />

      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="sunset" />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#451a03" roughness={0.8} />
      </mesh>

      {/* The Chakravyuh Formation - 7 Rings */}
      {Array.from({ length: 7 }).map((_, i) => (
        <FormationRing 
          key={i} 
          layerIndex={i}
          radius={45 - i * 6} // 45, 39, 33...
          count={40 - i * 4} // Fewer soldiers as we go in
          isActive={gameStage === GameStage.PLAYING && currentLayer === i + 1}
        />
      ))}

      {/* Warrior Character */}
      <Warrior layer={currentLayer} stage={gameStage} />

      {/* Decorative center piece */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 5, 0]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} wireframe />
        </mesh>
      </Float>
      
      {/* Sand particles */}
      <Sparkles color="#fcd34d" count={100} size={5} scale={[100, 20, 100]} position={[0, 10, 0]} />

    </Canvas>
  );
};