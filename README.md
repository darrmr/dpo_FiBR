|||
|---|---|
|ДПО|Фронтенд и бэкенд разработка|
|ДИСЦИПЛИНА|Основы фронтенд-разработки|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|

---

### **Практическое занятие 8: Работа с CSS-фреймворками 2**

---

### **Цель:**  
Расширить одностраничный лендинг до полноценного многостраничного проекта с использованием CSS-фреймворка. Научиться создавать вспомогательные страницы и обеспечивать целостность навигации между страницами.

---

### **Введение и теоретическая база**

Перед выполнением практики повторите материалы Лекций 6 и 7 по работе с CSS-фреймворками, а также ознакомьтесь с принципами построения многостраничных сайтов.

---

### **Последовательность выполнения работы**

#### **Шаг 1: Подготовка проекта и навигации**

1. Продолжайте работу в том же репозитории, что и в Практическом занятии 7.
2. Обновите навигационное меню в хедере, добавив ссылки на новые страницы:
   - Главная
   - Контакты / Отзывы
   - FAQ (это может быть отдельный блок внутри другой страницы)
3. Создайте базовую структуру файлов:

```
project/
├── index.html          # Главная страница (уже есть)
├── contacts.html       # Страница контактов/отзывов
├── faq.html            # Страница FAQ (не нужно, если FAQ - это блок какой либо из страниц)
├── 404.html            # Страница 404
└── assets/             # Изображения, иконки
```

---

#### **Шаг 2: Создание страницы "Контакты" или "Отзывы" с формой**

Создайте файл `contacts.html` и реализуйте:

1. **Информационный блок** с контактными данными (адрес, телефон, email, соцсети).
2. **Форма обратной связи** с полями:
   - Имя (текстовое поле)
   - Email (email поле)
   - Тема (выпадающий список или текстовое поле)
   - Сообщение (textarea)
   - Чекбокс "Согласие на обработку данных"
   - Кнопка отправки

**Пример формы на Bulma:**

```html
<section class="section">
    <div class="container">
        <h2 class="title is-2">Оставьте отзыв</h2>
        <div class="columns">
            <div class="column is-6">
                <form id="feedbackForm">
                    <div class="field">
                        <label class="label">Имя</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Ваше имя" required>
                        </div>
                    </div>
                    
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" placeholder="example@email.com" required>
                        </div>
                    </div>
                    
                    <div class="field">
                        <label class="label">Тема</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select required>
                                    <option value="" disabled selected>Выберите тему</option>
                                    <option>Предложение</option>
                                    <option>Жалоба</option>
                                    <option>Вопрос</option>
                                    <option>Благодарность</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="field">
                        <label class="label">Сообщение</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Ваше сообщение..." rows="5" required></textarea>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" required>
                                Соглашаюсь на обработку персональных данных
                            </label>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary" type="submit">Отправить отзыв</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="column is-6">
                <div class="content">
                    <h3 class="title is-4">Контакты</h3>
                    <p><i class="fas fa-map-marker-alt"></i> Москва, ул. Примерная, 123</p>
                    <p><i class="fas fa-phone"></i> +7 (999) 123-45-67</p>
                    <p><i class="fas fa-envelope"></i> info@example.com</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

#### **Шаг 3: Создание страницы FAQ**

Создайте файл `faq.html` (или блок внутри другой страницы) с аккордеоном/спойлерами часто задаваемых вопросов.

**Пример FAQ на Bootstrap:**

```html
<section class="container py-5">
    <h2 class="text-center mb-5">Часто задаваемые вопросы</h2>
    
    <div class="accordion" id="faqAccordion">

        <div class="accordion-item">
            <h3 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    Как начать пользоваться сервисом?
                </button>
            </h3>
            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    Зарегистрируйтесь на сайте, подтвердите email и начните пользоваться бесплатным тарифом. Все функции доступны сразу после регистрации.
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h3 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    Есть ли мобильное приложение?
                </button>
            </h3>
            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    Да, наше приложение доступно в App Store и Google Play. Все функции синхронизируются между веб-версией и приложением.
                </div>
            </div>
        </div>
        
        <!-- Тут еще 3-5 вопросов -->
    </div>
</section>
```

---

#### **Шаг 4: Создание страницы 404**

Создайте креативную и полезную страницу 404 (`404.html`), которая поможет пользователю вернуться на сайт.

**Пример на Tailwind:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Страница не найдена | Название проекта</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="text-center px-4">
        <h1 class="text-9xl font-bold text-gray-800">404</h1>
        <h2 class="text-3xl font-semibold text-gray-700 mt-4">Ой! Страница не найдена</h2>
        <p class="text-gray-600 mt-2 max-w-md mx-auto">
            Возможно, эта страница была удалена или перемещена. Попробуйте вернуться на главную.
        </p>
        
        <div class="mt-8 space-x-4">
            <a href="index.html" 
               class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                На главную
            </a>
            <a href="contacts.html" 
               class="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                Связаться с нами
            </a>
        </div>
        
        <div class="mt-12">
            <p class="text-gray-500">Или воспользуйтесь навигацией:</p>
            <nav class="mt-4">
                <a href="index.html" class="text-blue-600 hover:underline mx-3">Главная</a>
                <a href="faq.html" class="text-blue-600 hover:underline mx-3">FAQ</a>
                <a href="contacts.html" class="text-blue-600 hover:underline mx-3">Контакты</a>
            </nav>
        </div>
    </div>
</body>
</html>
```

---

#### **Шаг 5: Единообразие дизайна и навигации**

1. Убедитесь, что на всех страницах одинаковые header и footer
2. Добавьте активное состояние для пунктов меню в зависимости от текущей страницы.
3. Проверьте, что все ссылки работают корректно.

---

#### **Шаг 6: Публикация и тестирование**

1. Зафиксируйте изменения в Git
2. Опубликуйте обновленный проект на GitHub Pages.
3. Протестируйте навигацию между страницами:
   - Переходы по меню
   - Ссылки в футере
   - Форма на странице контактов
   - Страница 404 при переходе на несуществующий URL

---

### **Формат отчёта**

В область для загрузки необходимо прикрепить ссылку на GitHub Pages

---

### **Чек-лист самопроверки**

- [ ] Страница/блок FAQ содержит аккордеон/спойлеры с вопросами и ответами
- [ ] Страница 404 стилизована и содержит полезные ссылки
- [ ] Навигационное меню едино для всех страниц
- [ ] Футер одинаков на всех страницах
- [ ] Все страницы используют один CSS-фреймворк
- [ ] Нет битых ссылок между страницами
- [ ] Проект опубликован на GitHub Pages

---

### **Рекомендации**

1. Страницу 404 можно сделать более интерактивной — добавить анимацию или поиск по сайту
2. На странице контактов можно добавить карту (через iframe от Яндекс.Карт или Google Maps)
3. Сохраняйте минималистичный дизайн, не перегружайте страницы элементами

---
