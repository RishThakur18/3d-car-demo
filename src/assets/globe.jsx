import { Canvas, extend, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Effects, useTexture } from '@react-three/drei'
import { LUTPass, LUTCubeLoader } from 'three-stdlib'

extend({ LUTPass })

function Grading() {
  const { texture3D } = useLoader(LUTCubeLoader, '/cubicle-99.CUBE')
  return (
    <Effects>
      <lUTPass lut={texture3D} intensity={0.75} />
    </Effects>
  )
}

function Sphere(props) {
  const texture = useTexture('/terrazo.png')
  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial map={texture} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.5} />
    </mesh>
  )
}

export default function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={1} />
      <Sphere />
      <Grading />
      <Environment preset="night" background blur={0.5} />
      <OrbitControls />
    </Canvas>
  )
}
