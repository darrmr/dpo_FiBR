import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111122);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 2, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Освещение
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);
const mainLight = new THREE.DirectionalLight(0xffffff, 1);
mainLight.position.set(2, 5, 3);
mainLight.castShadow = true;
scene.add(mainLight);
const fillLight = new THREE.PointLight(0xcc88ff, 0.3);
fillLight.position.set(1, 2, 2);
scene.add(fillLight);

// Добавляем простой пол
const planeGeometry = new THREE.PlaneGeometry(4, 4);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x5c9e5e, roughness: 0.8 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.6;
plane.receiveShadow = true;
scene.add(plane);

// 1. Инициализируем загрузчик
const loader = new GLTFLoader();

// 2. Указываем путь к вашей локальной модели. 
// ВАЖНО: путь должен быть правильным относительно файла main2.js
const modelPath = "glb100k.glb"; 

loader.load(modelPath,
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -0.4, 0);
        model.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        scene.add(model);
        console.log('Модель успешно загружена!');
    },
    (xhr) => {
        console.log(`Загружено ${(xhr.loaded / xhr.total * 100)}%`);
    },
    (error) => {
        console.error('Ошибка загрузки модели:', error);
    }
);

// 3. Оставьте функцию анимации, если она нужна
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});