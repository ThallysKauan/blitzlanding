import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import "./ThreeScene.css";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let mounted = true;

    // === 1️⃣ CENA ===
    const scene = new THREE.Scene();

    // === 2️⃣ CÂMERA ===
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // === 3️⃣ RENDERER ===
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // 🔥 escurece levemente a cena
    mountRef.current.appendChild(renderer.domElement);

    // === 4️⃣ LUZES ===
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2); // 🔽 menos intensa
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x99ccff, 1.0);
    fillLight.position.set(-5, 2, 2);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xff9999, 0.8);
    backLight.position.set(0, 5, -5);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // 🔽 reduzido
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 0.9); // 🔽 menos brilho no topo
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // === 5️⃣ HDRI PARA REFLEXOS ===
    new RGBELoader().load("/Models/envmap.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.background = null;
    });

    // === 6️⃣ CONFIGURAÇÃO DOS MODELOS ===
    const modelsConfig = [
      {
        path: "/Models/coingg.glb",
        scale: 1.8,
        position: { x: -3, y: 3, z: 0 },
        floatAmplitude: 0.08,
        floatSpeed: 1.2,
        rotationX: 0.3,
        rotationY: -1,
        rotationZ: 0.8,
        rotationAmplitude: 0.02,
        rotationSpeed: 1.2,
      },
      {
        path: "/Models/coingg.glb",
        scale: 0.6,
        position: { x: 0, y: 2, z: 0 },
        floatAmplitude: 0.03,
        floatSpeed: 1.0,
        rotationX: 0,
        rotationY: -0.5,
        rotationZ: -0.8,
        rotationAmplitude: 0.015,
        rotationSpeed: 1.0,
      },
      {
        path: "/Models/coingg2.glb",
        scale: 2,
        position: { x: 3, y: 4, z: 0 },
        floatAmplitude: 0.06,
        floatSpeed: 1,
        rotationX: 0.4,
        rotationY: -2,
        rotationZ: 0.8,
        rotationAmplitude: 0.15,
        rotationSpeed: 0.8,
      },

    ];

    const loader = new GLTFLoader();
    const loadedModels = [];

    modelsConfig.forEach((config) => {
      loader.load(
        config.path,
        (gltf) => {
          if (!mounted) return;

          const model = gltf.scene;
          model.scale.set(config.scale, config.scale, config.scale);
          model.position.set(config.position.x, config.position.y, config.position.z);

          model.traverse((child) => {
            if (child.isMesh && child.material) {
              child.material.metalness = 0.2;
              child.material.roughness = 0.6;
              child.material.envMapIntensity = 1.5; // 🔽 reflexos menos fortes
              child.material.needsUpdate = true;
            }
          });

          scene.add(model);

          loadedModels.push({
            model,
            initialY: config.position.y,
            floatAmplitude: config.floatAmplitude,
            floatSpeed: config.floatSpeed,
            rotationX: config.rotationX,
            rotationY: config.rotationY,
            rotationZ: config.rotationZ,
            rotationAmplitude: config.rotationAmplitude,
            rotationSpeed: config.rotationSpeed,
          });

          if (loadedModels.length === modelsConfig.length) animate();
        },
        undefined,
        (error) => console.error("Erro ao carregar modelo:", error)
      );
    });

    // === ANIMAÇÃO ===
    const clock = new THREE.Clock();

    const animate = () => {
      if (!mounted) return;
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      loadedModels.forEach((item) => {
        const {
          model,
          initialY,
          floatAmplitude,
          floatSpeed,
          rotationX,
          rotationY,
          rotationZ,
          rotationAmplitude,
          rotationSpeed,
        } = item;

        model.position.y = initialY + Math.sin(elapsed * floatSpeed) * floatAmplitude;
        model.rotation.x = rotationX + Math.sin(elapsed * rotationSpeed) * rotationAmplitude;
        model.rotation.y = rotationY + Math.sin(elapsed * rotationSpeed) * rotationAmplitude;
        model.rotation.z = rotationZ + Math.sin(elapsed * rotationSpeed) * rotationAmplitude;
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="cena1" />;
}
