import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//cherry model , works and moves with mouse
export default function ThreeModelScene() {
  const mountRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    let model = null;
    const mouse = { x: 0, y: 0 };

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      95,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load model & fit camera
    const loader = new GLTFLoader();
    loader.load(
      '/models/bike/scene.gltf',
      (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // Center and fit model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = maxDim / (2 * Math.tan(fov / 2));
        camera.position.set(0, 0, cameraZ * 2);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // Mouse move listener
    const onMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    mountRef.current.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate model toward mouse
      if (model) {
        model.rotation.y += (mouse.x * Math.PI - model.rotation.y) * 0.05;
        model.rotation.x += (mouse.y * Math.PI - model.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    // Cleanup
return () => {
  if (mountRef.current) {
    mountRef.current.removeEventListener('mousemove', onMouseMove);
  }
  window.removeEventListener('resize', handleResize);
  renderer.dispose();
  if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
    mountRef.current.removeChild(renderer.domElement);
  }
};

  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'relative', // keeps footer flow
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        zIndex: 0,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    />
  );
}
