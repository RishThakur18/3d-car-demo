import * as THREE from 'three';
import { useEffect, useRef } from "react";

import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl';

function MyThree() {
  const refContainer = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvasWrapper = document.querySelector(".canvas-wrapper");
    const refCanvas = document.querySelector("#main-canvas");

    const camera = new THREE.PerspectiveCamera(
      75, 
      canvasWrapper.offsetWidth / canvasWrapper.offsetHeight, 
      0.1, 
      1000
    );
   
    const renderer = new THREE.WebGLRenderer({
       canvas: refCanvas,
       antialias: true
    });
    renderer.setSize(canvasWrapper.offsetWidth, canvasWrapper.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // globe
    var geometry = new THREE.SphereGeometry(5, 50, 50);
    var material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load('/globe.jpeg')
        }
      }
    });
    const sphere = new THREE.Mesh(geometry, material);
    
    const group = new THREE.Group();
    group.add(sphere);// Set a visible scale
    scene.add(group);

    //atmosphere
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
    for(let i=0; i < 1000; i++){
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -(Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    camera.position.z = 15;

    const mouse = {
      x: undefined,
      y: undefined
    }

    function animate(){
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.001;
      sphere.rotation.x += 0.001;
      group.rotation.x = mouse.y * 0.5;
      group.rotation.y = mouse.x * 0.5;
    }
    animate();
    
    document.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / innerWidth);
      mouse.y = (event.clientY / innerHeight);
    });
  }, []);

  return (
  <div className="canvas-wrapper"> 
    <canvas id="main-canvas"></canvas>
  </div>
  );
}

export default MyThree;
