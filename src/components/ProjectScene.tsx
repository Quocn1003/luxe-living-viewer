import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Building3D from "./Building3D";
import type { Project } from "@/data/projects";

interface ProjectSceneProps {
  project: Project;
  direction: number;
}

const ProjectScene = ({ project, direction }: ProjectSceneProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <Canvas
          shadows
          camera={{ position: [5, 3, 5], fov: 45 }}
          className="touch-none"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <directionalLight position={[-5, 5, -5]} intensity={0.3} />
            
            <Building3D type={project.mockup3dType} />
            
            <ContactShadows
              position={[0, -1.6, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4}
            />
            
            <Environment preset="city" />
            
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.2}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectScene;
