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
    scene.add(sphere);

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

    // const group = new THREE.Group();
    // group.add(sphere);
    // scene.add(group);

    camera.position.z = 15;

    const mouse = {
      x: undefined,
      y: undefined
    }

    function animate(){
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.0025;
      sphere.rotation.x += 0.0025;
      // group.rotation.y =+ mouse.y;
    }
    animate();
  }, []);

  return (
  <div className="canvas-wrapper"> 
    <canvas id="main-canvas"></canvas>
  </div>
  );
}

export default MyThree;
