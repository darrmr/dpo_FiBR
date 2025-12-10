|||
|---|---|
|ДПО|Фронтенд и бэкенд разработка|
|ДИСЦИПЛИНА|Основы фронтенд-разработки|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|

---

### **Практическое занятие 5: Проработка мобильного интерфейса**

---

### **Цель:**  
Освоить принципы проектирования мобильных интерфейсов с учетом гайдлайнов HIG (Human Interface Guidelines) и MD (Material Design). Научиться создавать удобный для использования одним пальцем интерфейс, продумывать навигацию и обеспечивать обратную связь (feedback) для пользовательских действий

---

### **Введение и теоретическая база**

Перед выполнением практики обязательно ознакомьтесь с основными гайдлайнами и лекционным материалом:

- **[Apple HIG (Human Interface Guidelines)](https://developer.apple.com/design/human-interface-guidelines/)** — основы навигации, жесты, размеры touch-элементов, обратная связь.
- **[Google MD (Material Design)](https://m3.material.io/)** — принципы Material Design, адаптивность, интерактивность, анимации.
- **[WCAG (Web Content Accessibility Guidelines)](https://www.w3.org/WAI/standards-guidelines/wcag/)** — доступность, контрастность, размеры текста.

Примеры реализации рассматриваемых элементов можете найти в [ветке](https://github.com/darrmr/dpo_FiBR/tree/pr_5)

---

### **Последовательность выполнения работы**

#### **Шаг 1: Подготовка проекта**

1. Продолжайте работу в том же репозитории, что и в предыдущих занятиях.
2. Убедитесь, что у вас есть мобильная версия макета (или адаптивная вёрстка).
3. Создайте отдельный CSS-файл для мобильных стилей (например, `mobile.css`) или используйте медиазапросы в основном файле.
4. Подготовьте файл `menu.js` для работы гамбургер-меню.

**Структура файлов:**
```
project/
├── index.html
├── styles/
│   ├── style.css (основные стили)
│   └── mobile.css (мобильные стили)
├── scripts/
│   └── menu.js (скрипт меню)
└── README.md
```

---

#### **Шаг 2: Полная реализация адаптивного меню (Desktop → Tablet → Mobile)**

**HTML-структура (index.html):**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мобильный интерфейс</title>
    <!-- Подключение шрифтов -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- Основные стили -->
    <link rel="stylesheet" href="styles/style.css">
    <!-- Мобильные стили -->
    <link rel="stylesheet" href="styles/mobile.css" media="screen and (max-width: 1024px)">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header__inner">
                <a href="#" class="logo">
                    <img src="logo.svg" alt="Логотип" width="120" height="40">
                </a>
                
                <!-- Гамбургер-кнопка (видна на планшетах и мобильных) -->
                <button class="menu-toggle" id="menuToggle" aria-label="Открыть меню" aria-expanded="false">
                    <span class="menu-toggle__line"></span>
                    <span class="menu-toggle__line"></span>
                    <span class="menu-toggle__line"></span>
                </button>
                
                <!-- Основная навигация -->
                <nav class="nav" id="mainNav">
                    <ul class="nav__list">
                        <li class="nav__item">
                            <a href="#" class="nav__link active">Главная</a>
                        </li>
                        <li class="nav__item">
                            <a href="#" class="nav__link">О проекте</a>
                        </li>
                        <li class="nav__item">
                            <a href="#" class="nav__link">Услуги</a>
                        </li>
                        <li class="nav__item">
                            <a href="#" class="nav__link">Портфолио</a>
                        </li>
                        <li class="nav__item">
                            <a href="#" class="nav__link">Контакты</a>
                        </li>
                    </ul>
                </nav>
                
                <!-- Кнопка CTA (только для десктопа) -->
                <button class="btn btn--primary header__cta">Заказать</button>
            </div>
        </div>
    </header>
    
    <main class="main">
        <!-- Контент страницы -->
    </main>
    
    <!-- Подключение JavaScript -->
    <script src="scripts/menu.js"></script>
</body>
</html>
```

**Основные стили (styles/style.css):**

```css
/* Базовые настройки */
:root {
    --primary-color: #2c5530;
    --secondary-color: #f0f0f0;
    --text-color: #333;
    --font-family: 'Roboto', sans-serif;
    --transition: all 0.3s ease;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    font-size: 16px; /* Минимум для MD */
    line-height: 1.5;
    color: var(--text-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Десктопное меню */
.header {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
}

/* Логотип */
.logo {
    display: flex;
    align-items: center;
    text-decoration: none;
}

/* Основная навигация (десктоп) */
.nav__list {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav__link {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    font-size: 17px; /* HIG рекомендация */
    padding: 8px 16px;
    border-radius: 6px;
    transition: var(--transition);
}

.nav__link:hover,
.nav__link.active {
    background: var(--secondary-color);
    color: var(--primary-color);
}

/* Кнопки */
.btn {
    min-width: 44px;
    min-height: 44px;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.btn--primary {
    background: var(--primary-color);
    color: white;
}

.btn--primary:hover {
    background: #1e3a23;
    transform: translateY(-2px);
}

.btn--primary:active {
    transform: scale(0.98);
}

/* Гамбургер-кнопка (скрыта на десктопе) */
.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 44px;
    height: 44px;
    background: transparent;
    border: none;
    padding: 12px 10px;
    cursor: pointer;
    z-index: 1001;
}

.menu-toggle__line {
    width: 100%;
    height: 3px;
    background: var(--text-color);
    border-radius: 2px;
    transition: var(--transition);
}

/* Состояние открытого меню */
.menu-toggle.active .menu-toggle__line:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
}

.menu-toggle.active .menu-toggle__line:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active .menu-toggle__line:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
}

/* CTA кнопка в шапке */
.header__cta {
    margin-left: 20px;
}
```

**Мобильные стили (styles/mobile.css):**

```css
/* Планшет (1024px и меньше) */
@media (max-width: 1024px) {
    .container {
        padding: 0 15px;
    }
    
    .header__inner {
        padding: 15px 0;
    }
    
    .nav__list {
        gap: 20px;
    }
    
    .header__cta {
        display: none; /* Скрываем CTA на планшетах */
    }
}

/* Планшет и мобильные (768px и меньше) */
@media (max-width: 768px) {
    .menu-toggle {
        display: flex; /* Показываем гамбургер */
    }
    
    /* Основная навигация (скрыта по умолчанию) */
    .nav {
        position: fixed;
        top: 0;
        right: -100%;
        width: 300px;
        height: 100vh;
        background: white;
        box-shadow: -5px 0 15px rgba(0,0,0,0.1);
        padding: 80px 30px 30px;
        transition: right 0.4s ease;
        z-index: 1000;
        overflow-y: auto;
    }
    
    .nav.active {
        right: 0;
    }
    
    .nav__list {
        flex-direction: column;
        gap: 0;
    }
    
    .nav__item {
        width: 100%;
    }
    
    .nav__link {
        display: block;
        width: 100%;
        padding: 15px 0;
        font-size: 18px; /* Увеличиваем для мобильных */
        border-bottom: 1px solid #eee;
    }
    
    .nav__link:hover,
    .nav__link.active {
        background: transparent;
        color: var(--primary-color);
        padding-left: 10px;
    }
    
    /* Затемнение фона при открытом меню */
    .nav-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    }
    
    .nav-overlay.active {
        display: block;
    }
    
    /* Увеличиваем touch-зоны */
    .btn {
        min-width: 120px;
    }
}

/* Мобильные (480px и меньше) */
@media (max-width: 480px) {
    .nav {
        width: 100%;
    }
    
    .logo img {
        width: 100px;
        height: auto;
    }
    
    body {
        font-size: 17px; /* iOS рекомендация */
    }
}
```

**JavaScript для меню (scripts/menu.js):**

```javascript
// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Блокируем скролл при открытом меню
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

// Обработчики событий
menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Закрытие меню при изменении размера окна (если перешли на десктоп)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});
```

---

#### **Шаг 3: Проверка размеров шрифтов**

Проверьте размеры шрифтов для основного контента. 
Рекомендуемые гайдлайнами минимальные размеры шрифтов для основного текста:
- **Material Design:** 16px (12sp)
- **HIG (iOS):** 17px
- **WCAG:** 14px (для нормального зрения)

---

#### **Шаг 4: Фиксация меню в верхней части экрана для мобильной версии**

Добавим свойство `position: sticky` для мобильной версии, чтобы меню всегда было доступно при скролле.

**Добавьте в `mobile.css`:**

```css
/* Мобильные (768px и меньше) */
@media (max-width: 768px) {
    .header {
        position: sticky;
    }
}
```

---

#### **Шаг 5: Добавление кнопки «Наверх» (Scroll to Top)**

Кнопка будет появляться, когда пользователь прокрутил страницу вниз, и позволит мгновенно вернуться к началу.

**Добавьте в `index.html` перед закрывающим тегом `</body>`:**

```html
<!-- Кнопка "Наверх" -->
<button class="scroll-top" id="scrollTop" aria-label="Наверх">
    ↑
</button>
```

**Добавьте стили в `style.css`:**

```css
/* Кнопка "Наверх" */
.scroll-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 56px;
    height: 56px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.scroll-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-top:hover {
    background: #1e3a23;
    transform: scale(1.1);
}

.scroll-top:active {
    transform: scale(0.95);
}

/* Для мобильных устройств */
@media (max-width: 768px) {
    .scroll-top {
        width: 52px;
        height: 52px;
        bottom: 20px;
        right: 20px;
        font-size: 22px;
    }
}
```

**Добавьте скрипт в `menu.js` (в конец файла):**

```javascript
// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

// Показываем кнопку после скролла
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// Прокрутка к началу страницы
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
```

---


#### **Шаг 6: Публикация и отчёт**

1. Зафиксируйте изменения в Git:
   ```bash
   git add .
   git commit -m "Реализация мобильного интерфейса с гамбургер-меню"
   git push origin main
   ```

2. Опубликуйте на GitHub Pages через настройки репозитория.

3. **Обязательно сгенерируйте QR-код** для вашего GitHub Pages по ссылке: [https://qr-online.ru/](https://qr-online.ru/)


---

### **Формат отчёта**

В область для загрузки прикреплена:
   - Ссылка на GitHub Pages
   - **QR-код на GitHub Pages**

---

### **Чек-лист самопроверки**

Перед отправкой работы проверьте:

- [ ] Навигация удобна для использования одним пальцем
- [ ] Есть визуальный feedback при нажатии на элементы
- [ ] Гамбургер-меню работает корректно на мобильных устройствах
- [ ] Шрифты соответствуют выбранным гайдлайнам (мин. 16px для MD, 17px для HIG)
- [ ] Контент адаптируется под экраны 
- [ ] Нет горизонтального скролла на мобильных устройствах
- [ ] Код проходит валидацию (HTML/CSS/JS)
- [ ] Меню фиксируется вверху на мобильных устройствах
- [ ] Кнопка «Наверх» появляется после прокрутки
- [ ] Кнопка «Наверх» плавно прокручивает страницу в начало
- [ ] Кнопка «Наверх» адаптирована под touch-устройства (достаточный размер)
- [ ] **QR-код корректно ведёт на GitHub Pages**

---

### **Как создать QR-код:**
1. Перейдите на [https://qr-online.ru/](https://qr-online.ru/)
2. Вставьте ссылку на ваш GitHub Pages
3. Скачайте изображение QR-кода
4. Добавьте его в область загрузки ответа или в README.md

---

**Важно:** QR-код позволяет быстро протестировать вашу мобильную версию прямо с телефона, что соответствует цели занятия — проработке мобильного интерфейса.

