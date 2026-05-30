import * as THREE from 'three';

// Параметры сцены
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);
scene.fog = new THREE.FogExp2(0x050510, 0.008);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 4, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Освещение
const ambientLight = new THREE.AmbientLight(0x333366);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(3, 5, 2);
dirLight.castShadow = true;
scene.add(dirLight);
const backLight = new THREE.PointLight(0x4466ff, 0.5);
backLight.position.set(-2, 1, -3);
scene.add(backLight);

// Визуальные границы: полупрозрачный куб-ограничитель (только для красоты, не для физики)
const boundsVisual = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(6, 6, 6), new THREE.MeshBasicMaterial({ visible: false })), 0x88aaff);
scene.add(boundsVisual);

// Пол и задняя стена (для ориентира)
const gridHelper = new THREE.GridHelper(12, 20, 0x88aaff, 0x335588);
gridHelper.position.y = -2;
scene.add(gridHelper);

const backWallMat = new THREE.MeshStandardMaterial({ color: 0x226688, roughness: 0.5, transparent: true, opacity: 0.3 });
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), backWallMat);
backWall.position.set(0, 0, -3);
backWall.receiveShadow = true;
scene.add(backWall);

// Границы отскока (X: -3..3, Y: -1.5..2.5, Z: -2.5..2.5)
const bounds = {
    xMin: -2.8, xMax: 2.8,
    yMin: -1.5, yMax: 2.5,
    zMin: -2.5, zMax: 2.5
};

// Создание шариков
const ballCount = 8;
const balls = [];

const colors = [0xff3333, 0x33ff33, 0x3399ff, 0xffcc33, 0xff33cc, 0x33ffcc, 0xcc66ff, 0xff9933];

for (let i = 0; i < ballCount; i++) {
    const geometry = new THREE.SphereGeometry(0.35, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], roughness: 0.2, metalness: 0.8 });
    const ball = new THREE.Mesh(geometry, material);
    ball.castShadow = true;
    ball.receiveShadow = false;
    
    // Случайная позиция внутри границ
    ball.position.x = (Math.random() - 0.5) * 5;
    ball.position.y = (Math.random() - 0.5) * 3;
    ball.position.z = (Math.random() - 0.5) * 4;
    
    // Случайная скорость
    const speed = {
        x: (Math.random() - 0.5) * 0.08,
        y: (Math.random() - 0.5) * 0.08,
        z: (Math.random() - 0.5) * 0.08
    };
    
    scene.add(ball);
    balls.push({ mesh: ball, speed });
}

// Счётчик отскоков
let bounceCount = 0;
const statsDiv = document.getElementById('stats');

// Анимация
function animate() {
    requestAnimationFrame(animate);
    
    let bounced = false;
    
    for (let b of balls) {
        // Обновляем позицию
        b.mesh.position.x += b.speed.x;
        b.mesh.position.y += b.speed.y;
        b.mesh.position.z += b.speed.z;
        
        // Проверка столкновений со стенами
        if (b.mesh.position.x > bounds.xMax) {
            b.mesh.position.x = bounds.xMax - (b.mesh.position.x - bounds.xMax);
            b.speed.x = -b.speed.x;
            bounced = true;
        } else if (b.mesh.position.x < bounds.xMin) {
            b.mesh.position.x = bounds.xMin - (b.mesh.position.x - bounds.xMin);
            b.speed.x = -b.speed.x;
            bounced = true;
        }
        
        if (b.mesh.position.y > bounds.yMax) {
            b.mesh.position.y = bounds.yMax - (b.mesh.position.y - bounds.yMax);
            b.speed.y = -b.speed.y;
            bounced = true;
        } else if (b.mesh.position.y < bounds.yMin) {
            b.mesh.position.y = bounds.yMin - (b.mesh.position.y - bounds.yMin);
            b.speed.y = -b.speed.y;
            bounced = true;
        }
        
        if (b.mesh.position.z > bounds.zMax) {
            b.mesh.position.z = bounds.zMax - (b.mesh.position.z - bounds.zMax);
            b.speed.z = -b.speed.z;
            bounced = true;
        } else if (b.mesh.position.z < bounds.zMin) {
            b.mesh.position.z = bounds.zMin - (b.mesh.position.z - bounds.zMin);
            b.speed.z = -b.speed.z;
            bounced = true;
        }
    }
    
    if (bounced) {
        bounceCount++;
        statsDiv.innerText = `Отскоков: ${bounceCount}`;
        // Небольшой эффект: увеличить интенсивность фонового света
        backLight.intensity = 0.8;
        setTimeout(() => backLight.intensity = 0.5, 100);
    }
    
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});