import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ARViewer = ({ modelUrl, roomPhotoUrl }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !modelUrl || !roomPhotoUrl) return;

    // Initialize 8th Wall
    const initAR = async () => {
      try {
        const XR8 = window.XR8;
        if (!XR8) {
          console.error('8th Wall not loaded');
          return;
        }

        // Initialize scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Set up camera and renderer
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Load room photo as background
        const textureLoader = new THREE.TextureLoader();
        const texture = await new Promise((resolve) => textureLoader.load(roomPhotoUrl, resolve));
        scene.background = texture;

        // Load 3D model
        const loader = new GLTFLoader();
        loader.load(modelUrl, (gltf) => {
          const model = gltf.scene;
          scene.add(model);

          // Position the model
          model.position.set(0, 0, -5);
          model.scale.set(1, 1, 1);

          // Add lights
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
          directionalLight.position.set(0, 1, 1);
          scene.add(ambientLight, directionalLight);

          // Animation loop
          const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };
          animate();
        });

        // Handle window resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
          }
        };
      } catch (error) {
        console.error('Error initializing AR:', error);
      }
    };

    initAR();
  }, [modelUrl, roomPhotoUrl]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative'
      }}
    />
  );
};

export default ARViewer;
