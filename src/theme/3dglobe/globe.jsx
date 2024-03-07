import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Effects, useTexture } from '@react-three/drei'
import { LUTPass, LUTCubeLoader } from 'three-stdlib'
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

extend({ LUTPass })

function Grading() {
  const { texture3D } = useLoader(LUTCubeLoader, import.meta.env.BASE_URL + "/cubicle-99.CUBE")
  return (
    <Effects>
      <lUTPass lut={texture3D} intensity={0.75} />
    </Effects>
  )
}

function Sphere(props) {

  const globeTexture = useMemo(() => new THREE.TextureLoader().load('/globe.jpeg'), []);
  const uniforms = {
    globeTexture: {
      value: globeTexture
    }
  }

  const starVertices = []
  for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -(Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }

  const position = { position: new THREE.Float32BufferAttribute(starVertices, 3) };

  const groupRef = useRef();
  const globeRef = useRef();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  useFrame(() => {
    const { x, y } = mousePosition;
    if (groupRef.current) {
      groupRef.current.rotation.x = y * 0.5;
      groupRef.current.rotation.y = x * 0.5;
    }

    if (globeRef.current) {
      globeRef.current.rotation.x += 0.001;
      globeRef.current.rotation.y += 0.001;
    }
  });


  return (
    <>
      <group ref={groupRef} {...props}>
        <mesh ref={globeRef} {...props}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
          />
        </mesh>
      </group>
      <mesh {...props}>
        <sphereGeometry args={[1, 64, 64]} scale={[1.1, 1.1, 1.1]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <points {...props}>
        <bufferGeometry attributes={position} />
        <pointsMaterial />
      </points>
    </>
  )
}

export default function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Sphere />
      <Grading />
      <Environment preset="night" background blur={0.5} />
    </Canvas>
  )
}
