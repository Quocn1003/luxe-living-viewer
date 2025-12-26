import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface Building3DProps {
  type: "tower" | "villa" | "penthouse";
}

const TowerBuilding = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Main tower body */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 4, 1.5]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.95}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#a8c5d9"
        />
      </mesh>
      
      {/* Tower crown */}
      <mesh position={[0, 4.3, 0]} castShadow>
        <boxGeometry args={[1.7, 0.4, 1.7]} />
        <meshStandardMaterial color="#c9a961" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.4, 2.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Floor lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0.5 + i * 0.5, 0.76]} castShadow>
          <boxGeometry args={[1.4, 0.02, 0.02]} />
          <meshStandardMaterial color="#c9a961" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

const VillaBuilding = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Main villa body */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 1.2, 2]} />
        <meshStandardMaterial color="#f5f0e8" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.5, 0.8, 4]} />
        <meshStandardMaterial color="#8b6914" metalness={0.3} roughness={0.6} />
      </mesh>
      
      {/* Columns */}
      {[-1, 1].map((x) => (
        <mesh key={x} position={[x * 1.2, 0.5, 1.1]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1, 8]} />
          <meshStandardMaterial color="#f5f0e8" metalness={0.1} roughness={0.5} />
        </mesh>
      ))}
      
      {/* Pool */}
      <mesh position={[0, 0, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.8]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          transmission={0.9}
          roughness={0}
          thickness={0.3}
          ior={1.33}
          color="#4da6d9"
        />
      </mesh>
      
      {/* Base/Garden */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#3d5c3d" metalness={0} roughness={0.9} />
      </mesh>
    </group>
  );
};

const PenthouseBuilding = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Lower floors - base building */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 2, 2]} />
        <meshStandardMaterial color="#404040" metalness={0.4} roughness={0.6} />
      </mesh>
      
      {/* Penthouse level */}
      <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1, 1.8]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.9}
          roughness={0.05}
          thickness={0.4}
          ior={1.5}
          chromaticAberration={0.03}
          color="#b8d4e8"
        />
      </mesh>
      
      {/* Terrace */}
      <mesh position={[0, 3.2, 0.5]} castShadow>
        <boxGeometry args={[2.4, 0.1, 1]} />
        <meshStandardMaterial color="#c9a961" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Glass railing */}
      <mesh position={[0, 3.5, 1]} castShadow>
        <boxGeometry args={[2.4, 0.5, 0.05]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          transmission={0.95}
          roughness={0}
          thickness={0.1}
          ior={1.5}
          color="#ffffff"
        />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[3, 0.2, 2.5]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
};

const Building3D = ({ type }: Building3DProps) => {
  switch (type) {
    case "tower":
      return <TowerBuilding />;
    case "villa":
      return <VillaBuilding />;
    case "penthouse":
      return <PenthouseBuilding />;
    default:
      return <TowerBuilding />;
  }
};

export default Building3D;
