|||
|---|---|
|ДПО|Фронтенд и бэкенд разработка|
|ДИСЦИПЛИНА|Основы фронтенд-разработки|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|

---

## **Практическое занятие 10: Валидация форм и работа с событиями**

---

### **Цель:**
Научиться добавлять валидацию на существующие формы веб-страниц, обрабатывать события отправки и выводить данные в консоль. Закрепить навыки подключения нескольких скриптов и разделения логики валидации и логирования.

---

### **Теоретическая справка**

#### **1. Получение формы на странице**
```javascript
// По идентификатору
const form = document.getElementById('feedbackForm');

// По селектору (первая найденная форма)
const form = document.querySelector('form');
```

#### **2. Отмена стандартной отправки формы**
```javascript
form.addEventListener('submit', function(event) {
    event.preventDefault(); // отменяет перезагрузку страницы
    // валидация и отправка данных
});
```

#### **3. Проверка полей ввода**

**ФИО (минимум 2 слова):**
```javascript
const fullname = document.getElementById('fullname').value.trim();
const words = fullname.split(' ').filter(word => word.length > 0);
if (words.length < 2) {
    // ошибка: недостаточно слов
}
```

**Телефон (только цифры):**
```javascript
const phone = document.getElementById('phone').value.trim();
const phoneDigits = phone.replace(/\D/g, ''); // удаляем все не-цифры
if (phoneDigits.length < 10) {
    // ошибка: недостаточно цифр
}
```

**Email (базовый формат):**
```javascript
const email = document.getElementById('email').value.trim();
// используем базовый шаблон для проверки почты
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
    // ошибка: неверный формат email
}
```

**Обязательное поле:**
```javascript
if (fullname === '') {
    // ошибка: поле не заполнено
}
```

#### **4. Визуальное отображение ошибок (рассмотрено на примере Bulma)**

Обратите внимание, у фреймворка, который используете в своем проекте, может отличаться синтаксис. Необходимо обратиться к докуентации при добавлении визуального отображения ошибок. 


```javascript
// Добавление класса ошибки
input.classList.add('is-danger');

// Удаление класса ошибки
input.classList.remove('is-danger');

// Добавление текстового сообщения об ошибке
const helpBlock = document.createElement('p');
helpBlock.classList.add('help', 'is-danger');
helpBlock.textContent = 'Сообщение об ошибке';
input.parentNode.appendChild(helpBlock);
```

---

### **Пример выполнения работы**

Ниже приведён пример реализации страницы с формой, валидацией и выводом в консоль. Данный код можно использовать как образец при выполнении собственной работы.

#### **Шаг 1: Базовая структура страницы (index.html)**

```html
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Форма обратной связи | Bulma</title>
    <!-- Bulma CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
    <!-- Font Awesome для иконок -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
</head>

<body>
    <header class="hero is-primary">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">Форма обратной связи</h1>
                <p class="subtitle">Заполните форму для отправки сообщения</p>
            </div>
        </div>
    </header>

    <main class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                     <form id="feedbackForm">
                    <!-- Тут будет форма -->
                     </form>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="content has-text-centered">
            <p>Учебный проект по фронтенд-разработке</p>
        </div>
    </footer>

    <script src="scripts/validation.js"></script>
    <script src="scripts/consoleLogger.js"></script>
</body>

</html>
    
```

---

#### **Шаг 2: Структура формы с различными типами полей**

Вставьте данный код внутрь тега `<form id="feedbackForm">`:

```html
                   
                        <!-- Поле ФИО (текстовое, обязательное) -->
                        <div class="field">
                            <label class="label">ФИО <span class="has-text-danger">*</span></label>
                            <div class="control has-icons-left">
                                <input class="input" type="text" id="fullname" placeholder="Иванов Иван Иванович">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div>
                            <p class="help" id="fullnameHelp">Введите фамилию, имя и отчество</p>
                        </div>

                        <!-- Поле Телефон (текстовое, маска, обязательное) -->
                        <div class="field">
                            <label class="label">Телефон <span class="has-text-danger">*</span></label>
                            <div class="control has-icons-left">
                                <input class="input" type="tel" id="phone" placeholder="+7 (___) ___-__-__">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-phone"></i>
                                </span>
                            </div>
                            <p class="help" id="phoneHelp">Формат: +7 (XXX) XXX-XX-XX</p>
                        </div>

                        <!-- Поле Email (email, обязательное) -->
                        <div class="field">
                            <label class="label">Email <span class="has-text-danger">*</span></label>
                            <div class="control has-icons-left">
                                <input class="input" type="email" id="email" placeholder="example@mail.ru">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope"></i>
                                </span>
                            </div>
                            <p class="help" id="emailHelp">Введите корректный email адрес</p>
                        </div>

                        <!-- Поле Сообщение (textarea, необязательное) -->
                        <div class="field">
                            <label class="label">Сообщение</label>
                            <div class="control">
                                <textarea class="textarea" id="message" placeholder="Текст сообщения..."></textarea>
                            </div>
                            <p class="help" id="messageHelp">До 500 символов</p>
                        </div>

                        <!-- Согласие на обработку данных (checkbox) -->
                        <div class="field">
                            <div class="control">
                                <label class="checkbox">
                                    <input type="checkbox" id="agreement" required>
                                    Я согласен на обработку персональных данных
                                </label>
                            </div>
                        </div>

                        <!-- Кнопка отправки -->
                        <div class="field is-grouped is-grouped-centered">
                            <div class="control">
                                <button type="submit" class="button is-primary">
                                    <span class="icon">
                                        <i class="fas fa-paper-plane"></i>
                                    </span>
                                    <span>Отправить</span>
                                </button>
                            </div>
                            <div class="control">
                                <button type="reset" class="button is-light">
                                    <span>Очистить</span>
                                </button>
                            </div>
                        </div>
                    
```

---

#### **Шаг 3: Добавление валидации (scripts/validation.js)**

```javascript
// validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
        
        let isValid = true;
        
        // 1. Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        
        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else if (fullnameValue.split(' ').length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }
        
        // 2. Проверка телефона (не пустой, 10 цифр)
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите 10 цифр номера');
            isValid = false;
        }
        
        // 3. Проверка email (не пустой, содержит @ и .)
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }
        
        // Если всё корректно - отправляем событие
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                message: document.getElementById('message').value.trim() || '(не заполнено)'
            };
            
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            alert('Форма отправлена! Данные в консоли.');
        }
    });
    
    // Функция показа ошибки
    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        input.parentNode.parentNode.appendChild(help);
    }
    
    // Сброс ошибки при вводе
    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const parent = this.parentNode.parentNode;
            const errors = parent.querySelectorAll('.help.is-danger');
            errors.forEach(el => el.remove());
        });
    });
});
```

---

#### **Шаг 4: Добавление скрипта вывода в консоль (scripts/consoleLogger.js)**

```javascript
// consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid, которое диспатчит validation.js
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы из события
        const formData = event.detail;
        
        // Очищаем консоль для наглядности (опционально)
        console.clear();
        
        // Построчный вывод данных
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Сообщение:', formData.message || '(не заполнено)');

        // Вывод временной метки
        const timestamp = new Date().toLocaleString();
        console.log('Время отправки:', timestamp);
    });
});
```

---

### **Задания для самостоятельного выполнения**

На основе приведённого примера реализуйте валидацию для своей страницы с формой (реализована в Практическом задании 8). Далее:

1. Зафиксируйте изменения в Git
2. Опубликуйте обновленный проект на GitHub Pages.
3. Протестируйте реализованный функционал.

---

### **Формат отчёта**

В область для загрузки необходимо прикрепить ссылку на GitHub Pages
