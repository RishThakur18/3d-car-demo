import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import { Ground } from "./components/ground";
import { Rings } from "./components/rings";
import { FloatingGrid } from "./components/floatingGrid";
import { Car } from "./components/car";

function CarShowMain() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>

        <OrbitControls
          minDistance={4}
          maxDistance={8}
          target={[0, 0.35, 0]}
          maxPolarAngle={Math.PI / 2}
        />

        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

        <color args={[0, 0, 0]} attach="background" />

        <CubeCamera resolution={256} frames={Infinity}>
          {(texture) => (
            <>
              <Environment map={texture} />
              <Car />
            </>
          )}
        </CubeCamera>

        <spotLight
          color={[1, 0.25, 0.7]}
          intensity={150}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <spotLight
          color={[0.20, 0.5, 1]}
          intensity={200}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <Ground />
        <FloatingGrid />
        <Rings />

        <EffectComposer>
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={0.3} 
            width={300} 
            height={300} 
            kernelSize={5} 
            luminanceThreshold={0.15} 
            luminanceSmoothing={0.025} 
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL} 
            offset={[0.0005, 0.0012]} 
          />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}

export default CarShowMain;
