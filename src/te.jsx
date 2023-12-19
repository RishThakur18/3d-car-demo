import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from "react";

import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl';

function MyThree() {
  const [mouse, setMouse] = useState({ x: undefined, y: undefined });
  const globeTexture = useMemo(() => new THREE.TextureLoader().load('/globe.jpeg'), []);
  const canvasWrapperRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;
  var canvasWrapper = null;
  var renderer = null;

  useEffect(() => {

    canvasWrapper = canvasWrapperRef.current;
    camera = new THREE.PerspectiveCamera(
      75,
      canvasWrapper.offsetWidth / canvasWrapper.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setSize(canvasWrapper.offsetWidth, canvasWrapper.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);


  if (!canvasWrapperRef.current || !renderer) {
    return;
  }

    const scene = new THREE.Scene();

    // globe
    var geometry = new THREE.SphereGeometry(5, 50, 50);
    var material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: globeTexture
        }
      }
    });
    const sphere = new THREE.Mesh(geometry, material);

    const group = new THREE.Group();
    group.add(sphere);
    scene.add(group);

    // atmosphere
    var ageometry = new THREE.SphereGeometry(5, 50, 50);
    var amaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(ageometry, amaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0Xffffff
    })

    const starVertices = []
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -(Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);


    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.001;
      sphere.rotation.x += 0.001;
      group.rotation.x = mouse.y * 0.5;
      group.rotation.y = mouse.x * 0.5;
    }
    animate();

    function handleMouseMove(event, type) {
      if (type === "mouse") {
        setMouse({
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight
        });
      }
      else {
        const touch = event.touches[0];
        setMouse({
          x: touch.clientX / window.innerWidth,
          y: touch.clientY / window.innerHeight
        });
      }
    }

    document.addEventListener('mousemove', (e) => handleMouseMove(e, 'mouse'));
    document.addEventListener('touchmove', (e) => handleMouseMove(e, 'touch'));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
    };

  }, [mouse, canvasWrapperRef.current, renderer]);


  return (
    <div ref={canvasWrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default MyThree;
