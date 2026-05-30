|||
|---|---|
|ДПО|Фронтенд и бэкенд разработка|
|ДИСЦИПЛИНА|Продвинутые технологии веб-разработки|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|

---

### **Практическое занятие 5: Введение в 3D-графику на вебе с Three.js**

---

### **Цель занятия:**
Познакомиться с основами библиотеки Three.js, научиться настраивать 3D-сцену, добавлять освещение, камеру и загружать внешнюю 3D-модель. Итогом работы станет собственная веб-страница с интерактивной 3D-моделью.

---

### **Краткая теория**

#### Что такое WebGL и Three.js?

**WebGL** — это технология, которая позволяет браузеру использовать видеокарту компьютера для отрисовки 2D и 3D графики. Без WebGL сложные 3D-сцены работали бы очень медленно.

**Three.js** — библиотека, которая упрощает работу с WebGL. Вместо написания сложных шейдеров и буферов вы используете готовые объекты: сцену, камеру, кубы, сферы, источники света и т.д.

#### Основные компоненты сцены Three.js

1. **Сцена (`Scene`)** — контейнер, в котором находятся все объекты, камеры и источники света.
2. **Камера (`Camera`)** — определяет, как пользователь видит сцену. Чаще всего используется **перспективная камера** (`PerspectiveCamera`), имитирующая зрение человека (дальние объекты меньше).
3. **Рендерер (`Renderer`)** — отрисовывает сцену в HTML-элемент `<canvas>`.
4. **Объекты (`Mesh`)** — видимые предметы, состоящие из:
   - **Геометрии** (форма: куб, сфера, плоскость, загруженная модель).
   - **Материала** (цвет, текстура, блеск).
5. **Источники света (`Light`)** — без света сцена будет чёрной. Основные типы:
   - `AmbientLight` — равномерный фоновый свет.
   - `DirectionalLight` — направленный свет (как солнце).
   - `PointLight` — точечный источник (как лампочка).
6. **Анимация** — создаётся с помощью функции, которая вызывается каждый кадр (`requestAnimationFrame`). Внутри неё можно менять положение, поворот, цвет объектов.

#### Загрузка 3D-моделей

Three.js поддерживает множество форматов, но самый удобный для веба — **glTF** (файлы `.gltf` или `.glb`). Это «JPEG для 3D»: оптимальный размер, встроенные текстуры и анимации.

Для загрузки модели используется класс `GLTFLoader`. Пример:

```javascript
const loader = new GLTFLoader();
loader.load('путь/к/модели.glb', 
    (gltf) => { scene.add(gltf.scene); },
    (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); },
    (error) => { console.error('Ошибка', error); }
);
```

> [!WARNING]
> Из-за политики безопасности браузера загрузка моделей с диска **не работает** при открытии HTML-файла двойным щелчком. Нужно запускать локальный веб-сервер (например, через Live Server в VS Code или командой `npx serve`).

---

### **Практическая часть: создание сцены с 3D-моделью**

Изначально рассмотрим примеры [GitHub-pages с примерами](https://darrmr.github.io/dpo_FiBR/) 
Можно клонировать с репозитория [GitHub-репозиторий](https://github.com/darrmr/dpo_FiBR/tree/pr_3_5) 

Вам предстоит создать простую веб-страницу, на которой будет отображаться загруженная 3D-модель с правильным освещением и возможностью вращать камеру мышью.

#### Шаг 1. Подготовка файлов

Создайте папку проекта `my-3d`. Внутри создайте два файла:
- `index.html`
- `main.js`

Также создайте папку `models` и положите в неё вашу 3D-модель в формате `.gltf` или `.glb`. Если у вас нет своей модели, скачайте бесплатную, например, с [Sketchfab](https://sketchfab.com/3d-models) (используйте фильтр «Downloadable»).

#### Шаг 2. Базовый HTML

Скопируйте в `index.html` следующий код:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя 3D-сцена</title>
    <style>
        body { margin: 0; overflow: hidden; font-family: Arial, Helvetica, sans-serif; }
        #info {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 8px 15px;
            border-radius: 8px;
            pointer-events: none;
            z-index: 100;
        }
    </style>
</head>
<body>
    <div id="info">Перетащите мышью, чтобы вращать камеру | Загруженная модель</div>
    
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.128.0/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.128.0/examples/jsm/"
            }
        }
    </script>
    <script type="module" src="main.js"></script>
</body>
</html>
```

#### Шаг 3. Код для сцены (main.js)

Вставьте следующий код в `main.js`. Обратите внимание на путь к вашей модели — измените его, если модель лежит в другой папке или имеет другое имя.

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- 1. Создаём сцену ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111122); // тёмно-синий фон

// --- 2. Камера (позиция: x=3, y=2, z=5) ---
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 2, 5);
camera.lookAt(0, 0, 0);

// --- 3. Рендерер ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // включаем тени
document.body.appendChild(renderer.domElement);

// --- 4. Управление камерой с помощью мыши (OrbitControls) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;      // плавное торможение
controls.dampingFactor = 0.05;
controls.autoRotate = false;
controls.enableZoom = true;

// --- 5. Освещение ---
// Фоновый свет
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

// Основной направленный свет
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 5, 2);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Дополнительный точечный свет для акцентов
const pointLight = new THREE.PointLight(0xffaa66, 0.5);
pointLight.position.set(1, 2, 2);
scene.add(pointLight);

// --- 6. Вспомогательная плоскость (пол) — необязательно, но помогает оценить позицию модели ---
const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x3a6b4b, side: THREE.DoubleSide, roughness: 0.7 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.8;
plane.receiveShadow = true;
scene.add(plane);

// --- 7. Загрузка вашей 3D-модели ---
const loader = new GLTFLoader();
// ЗДЕСЬ УКАЖИТЕ ПУТЬ К ВАШЕЙ МОДЕЛИ (относительно папки с index.html)
const modelPath = './models/my_model.glb';  // ИЗМЕНИТЕ НА СВОЙ ФАЙЛ

loader.load(modelPath,
    (gltf) => {
        const model = gltf.scene;
        // При необходимости подгоните масштаб и позицию
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -0.4, 0);
        // Включаем тени для всех частей модели
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
        // Показываем прогресс загрузки в консоли
        console.log(`Загружено ${Math.floor(xhr.loaded / xhr.total * 100)}%`);
    },
    (error) => {
        console.error('Ошибка загрузки модели:', error);
        document.getElementById('info').innerHTML += '<br>⚠️ Не удалось загрузить модель. Проверьте путь и локальный сервер.';
    }
);

// --- 8. Анимация (рендеринг сцены) ---
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // обновляем управление камерой
    renderer.render(scene, camera);
}
animate();

// --- 9. Адаптация при изменении размера окна ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
```

#### Шаг 4. Запуск и проверка

1. Проверьте работоспособность с помощью Live Server.
2. Убедитесь, что путь к модели указан правильно. Например, если модель `my_model.glb` лежит в папке `models`, то путь `'./models/my_model.glb'`.
3. Откройте браузер (обычно `http://127.0.0.1:5500`). Вы должны увидеть вашу 3D-модель на тёмно-синем фоне. Мышью можно вращать камеру (зажать левую кнопку и двигать), приближать/отдалять (колесико).

> [!TIP]
> Если модель не отображается, откройте консоль браузера (F12). Там будут видны ошибки: возможно, неправильный путь или модель слишком большая/маленькая — тогда измените масштаб в коде.

---

### **Задание**

Вам необходимо:

1. **Выбрать любую 3D-модель** в формате glTF/GLB (можно скачать бесплатно с указанных ниже сайтов).
2. **Настроить сцену** (освещение, фон, положение модели) по своему вкусу — можно изменить цвета, добавить дополнительные объекты (куб, сферу) для красоты.
3. **Запустить страницу через локальный сервер** и убедиться, что модель отображается и камера вращается.
4. **Сделать скриншот** вашей страницы с видимой 3D-моделью.
5. **Прикрепить скриншот к отчёту** (в СДО или в репозиторий).

> [!NOTE]
> Если у вас возникли трудности с поиском модели, воспользуйтесь готовым примером из моего репозитория (ссылку вставит преподаватель). Там вы найдёте рабочий код и модель для тестирования.

### **Формат сдачи**

В качестве ответа н азадание необходимо прикрепить скриншот вашей страницы с загруженной 3D-моделью.

---

### **Ресурсы для поиска моделей**

- [Sketchfab](https://sketchfab.com/3d-models) — используйте фильтр «Downloadable» и лицензию «Creative Commons».
- [Poly Haven](https://polyhaven.com/models) — высококачественные бесплатные модели.
- [Free3D](https://free3d.com/) — много простых объектов.

---

### **Примеры сайтов с Three.js**

- [Bruno Simon's Portfolio](https://bruno-simon.com/)
- [Globe.gl](https://globe.gl/)
- [Awwwards Three.js](https://www.awwwards.com/websites/three-js/)