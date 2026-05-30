import * as THREE from 'three';

// --- Инициализация ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111122);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// --- Объекты ---
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xaa44ff, roughness: 0.3 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(3, 3);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x336699, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.6;
plane.receiveShadow = true;
scene.add(plane);

// --- Освещение ---
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 5, 2);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xff6600, 0.5);
pointLight.position.set(1, 2, 2);
scene.add(pointLight);

// --- Raycaster для кликов ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);
    if (intersects.length > 0) {
        cube.material.color.setHex(Math.floor(Math.random() * 0xffffff));
        directionalLight.intensity = 1.5;
        setTimeout(() => directionalLight.intensity = 1, 200);
    }
});

// --- Анимация и FPS ---
let time = 0;
let frameCount = 0;
let lastTime = performance.now();

function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    
    time += 0.02;
    pointLight.intensity = 0.5 + Math.sin(time) * 0.3;
    
    // FPS счётчик
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
        document.getElementById('fps').innerText = `FPS: ${frameCount}`;
        frameCount = 0;
        lastTime = now;
    }
    
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});