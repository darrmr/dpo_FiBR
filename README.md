| | |
|---|---|
| ДПО | Фронтенд и бэкенд разработка |
| ДИСЦИПЛИНА | Основы фронтенд-разработки |
| ВИД УЧЕБНОГО МАТЕРИАЛА | Методические указания к практическим занятиям |

## **Практическое занятие 15: JS-фреймворки + CSS-фреймворки**

---

### **Цель занятия**
Научиться подключать и использовать современные CSS-фреймворки в проектах на популярных JavaScript-фреймворках (Vue 3 и React), освоить базовые приёмы стилизации с помощью готовых классов, создавать адаптивные интерфейсы без написания собственного CSS. 

---

### **Подключение**

В зависимости от выбранных фреймворкой варианты и срособы подключения могут отличаться. Рассмотрим один из таких вариантов.


### **Подключение Bootstrap**

1. **Создайте проект Vite + Vue** 
   ```bash
   npm create vite@latest my-app -- --template vue
   cd my-app
   npm install
   ```

2. **Установите Bootstrap**
   ```bash
   npm install bootstrap
   ```

3. **Импортируйте CSS Bootstrap** в `src/main.js`
   ```js
   import { createApp } from 'vue'
   import App from './App.vue'
   import 'bootstrap/dist/css/bootstrap.min.css'

   createApp(App).mount('#app')
   ```

4. **Запустите проект**
   ```bash
   npm run dev
   ```

---

### **Пример: карточки на Bootstrap**

Создадим мини-приложение для отображения карточек с использованием Bootstrap-классов.

#### **App.vue**
```vue
<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Моя коллекция</h1>
    
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="addBook" class="input-group mb-4">
          <input 
            v-model="newBook" 
            type="text" 
            class="form-control" 
            placeholder="Название"
            required
          >
          <button class="btn btn-primary" type="submit">Добавить</button>
        </form>
      </div>
    </div>

    <div class="row">
      <div 
        v-for="book in books" 
        :key="book.id" 
        class="col-md-4 mb-3"
      >
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <button 
              @click="removeBook(book.id)" 
              class="btn btn-sm btn-danger"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const books = ref([])
const newBook = ref('')

const addBook = () => {
  books.value.push({
    id: Date.now(),
    title: newBook.value
  })
  newBook.value = ''
}

const removeBook = (id) => {
  books.value = books.value.filter(book => book.id !== id)
}
</script>
```

**Что получилось:**
- Форма с инпутом и кнопкой (классы `form-control`, `btn-primary`).
- Сетка Bootstrap (`row`, `col-md-4`) для адаптивности.
- Карточки (`card`) для отображения.
- Кнопка удаления (`btn-danger`).

---

### **Задание для самостоятельной работы**

Разработайте простое приложение с использованием JS-фреймворка и CSS-фреймворка. 
Вы можете продолжить работу с примером из текуще практики ИЛИ модифицировать приложение из Прктического задания 8.
При дораотке примера из данной практики необходимо расширить функционал отображения коллекции (сортировка, добавление не только названия, но и описания, фото).


### **Формат отчёта**

В область для загрузки (Практическое задание 15) прикрепите ссылку на GitHub Pages с реализованным приложением. Страница должна быть проверена и работоспособна.

---

### **Полезные ссылки**
- [Bootstrap документация](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Гайд по деплою Vite-приложения на GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages)












---

### **Постановка задачи**

Необходимо разработать небольшое приложение с использованием любого современного JS-фреймворка (Vue 3 или React) и любого CSS-фреймворка на выбор (Tailwind CSS, Bootstrap, Bulma и др.). Тема приложения — **«Коллекция любимых фильмов»** (или книг, игр, рецептов — по желанию).

**Технические требования:**
- Использовать Composition API (`<script setup>`) для Vue или функциональные компоненты с хуками для React.
- Подключить выбранный CSS-фреймворк через npm (не CDN).
- Минимум собственных CSS-стилей (только если требуется переопределение).
- Код должен быть организован: как минимум два компонента (форма и карточка/список).
- Приложение должно быть задеплоено на GitHub Pages (инструкции по деплою для Vite-проектов см. в предыдущем занятии).

**Дополнительные задания (по желанию):**
- Добавить фильтрацию (например, показать только просмотренные).
- Использовать иконки из библиотеки фреймворка (Bootstrap Icons, Heroicons для Tailwind).
- Реализовать модальное окно для подтверждения удаления (с использованием JS-компонентов фреймворка, например, Bootstrap Modal или headlessui для React/Vue).

---

### **Полезные ссылки**

-  [Топ-10 CSS-фреймворков для React](https://www.geeksforgeeks.org/reactjs/top-10-css-frameworks-for-react/)  
-  [Лучшие CSS-фреймворки для использования в React (Dev.to)](https://dev.to/mourya_modugula/best-css-frameworks-to-use-in-reactjs-604)  
-  [Библиотеки и фреймворки компонентов Vue.js для ускорения разработки](https://notissimus.com/14-bibliotek-i-frejmvorkov-komponentov-polzovatelskogo-interfejsa-vuejs-dlya-uskoreniya-razrabotki/)


---

### **Формат отчёта**

В область загрузки (Практическое задание 15) прикрепите ссылку на GitHub Pages с работающим приложением, а также ссылку на репозиторий с исходным кодом (если требуется). Укажите, какой JS-фреймворк и какой CSS-фреймворк были использованы. Убедитесь, что приложение открывается, стили загружаются корректно, и все функции работают.



