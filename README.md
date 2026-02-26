| | |
|---|---|
| ДПО | Фронтенд и бэкенд разработка |
| ДИСЦИПЛИНА | Основы фронтенд-разработки |
| ВИД УЧЕБНОГО МАТЕРИАЛА | Методические указания к практическим занятиям |

## **Практическое занятие 15: JS-фреймворки + CSS-фреймворки

---

### **Цель занятия**
Научиться подключать и использовать современные CSS-фреймворки в проектах на популярных JavaScript-фреймворках (Vue 3 и React), освоить базовые приёмы стилизации с помощью готовых классов, создавать адаптивные интерфейсы без написания собственного CSS. В результате разбора задачи-примера будет создано небольшое приложение, стилизованное с помощью одного из популярных CSS-фреймворков (Tailwind CSS, Bootstrap или Bulma). Основной пример будет реализован на Vue.

---

### **Теоретическая справка**

#### **Зачем нужны CSS-фреймворки?**

CSS-фреймворки предоставляют готовые стили и компоненты, которые ускоряют разработку, обеспечивают согласованность дизайна и упрощают создание адаптивных интерфейсов. Основные подходы:

- **Utility-first** (например, Tailwind CSS) – набор утилитарных классов (margin, padding, flex, цвета), из которых «собирается» интерфейс прямо в разметке.
- **Компонентные** (например, Bootstrap, Bulma) – готовые стилизованные компоненты (кнопки, карточки, навигация) и сетка.

Интеграция с Vue или React обычно происходит через подключение CSS-файла фреймворка (CDN или через npm) и использование его классов в шаблонах компонентов.

#### **Популярные CSS-фреймворки для frontend-проектов**

| Фреймворк | Тип | Особенности |
|-----------|-----|-------------|
| **Tailwind CSS** | Utility-first | Гибкая настройка, минимальный размер в production, отличная документация, поддерживается в Vue и React |
| **Bootstrap** | Компонентный | Классика, огромная экосистема, готовые JS-компоненты (требуют Bootstrap JS или React Bootstrap / BootstrapVue) |
| **Bulma** | Компонентный | Чистый CSS, только стили, без JS, простой синтаксис |
| **Foundation** | Компонентный | Мощная сетка, гибкость |
| **UI библиотеки** (Vuetify, PrimeVue, Material-UI и др.) | Готовые компоненты | Полноценные библиотеки компонентов для конкретного фреймворка, но требуют изучения API |

В этом занятии мы рассмотрим подключение **Tailwind CSS** (как наиболее гибкий вариант) в проекте на Vue.

#### **Установка и настройка CSS-фреймворков**

##### **Для Vue 3 (проект на Vite)**

**Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
В `tailwind.config.js` указать пути:
```js
content: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
],
```
В главный CSS (например, `src/style.css`) добавить директивы:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Импортировать в `main.js`:
```js
import './style.css'
```

**Bootstrap:**
```bash
npm install bootstrap
```
Импортировать CSS в `main.js`:
```js
import 'bootstrap/dist/css/bootstrap.min.css'
```

##### **Для React (проект на Vite или Create React App)**

**Tailwind CSS (аналогично Vue):**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
В `tailwind.config.js`:
```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```
В главный CSS (например, `src/index.css`) добавить директивы Tailwind и импортировать в `index.js` или `main.jsx`.

**Bootstrap:**
```bash
npm install bootstrap
```
Импортировать CSS в `index.js`:
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

Для использования интерактивных компонентов Bootstrap в React удобно использовать библиотеку `react-bootstrap` (компоненты, обёрнутые в React), но на начальном этапе можно ограничиться только CSS-стилями.

---

### **Разбор примера: Список задач (Todo) на Vue + Tailwind CSS**

Создадим простое приложение для управления списком дел, стилизованное с помощью Tailwind CSS. Проект будет состоять из формы добавления и списка задач с возможностью отметить выполненной и удалить.

#### **Шаг 1: Создание проекта и установка Tailwind**

1. Создайте новый проект Vite + Vue:
   ```bash
   npm create vite@latest todo-app -- --template vue
   cd todo-app
   npm install
   ```

2. Установите Tailwind CSS и зависимости (как описано выше).

3. Настройте файлы конфигурации.

#### **Шаг 2: Создание компонентов**

**App.vue**
```vue
<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
        Список задач
      </h1>

      <TodoForm @add-task="addTask" />
      <TodoList 
        :tasks="tasks" 
        @toggle-task="toggleTask"
        @delete-task="deleteTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

const tasks = ref([])

const addTask = (title) => {
  tasks.value.push({
    id: Date.now(),
    title,
    completed: false
  })
}

const toggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.completed = !task.completed
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>
```

**TodoForm.vue**
```vue
<template>
  <form @submit.prevent="handleSubmit" class="mb-6 flex gap-2">
    <input
      v-model="newTask"
      type="text"
      placeholder="Новая задача..."
      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
    <button
      type="submit"
      class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Добавить
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])
const newTask = ref('')

const handleSubmit = () => {
  emit('add-task', newTask.value)
  newTask.value = ''
}
</script>
```

**TodoList.vue**
```vue
<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50"
    >
      <div class="flex items-center gap-3">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle-task', task.id)"
          class="w-5 h-5 text-blue-500 rounded focus:ring-blue-400"
        />
        <span
          :class="[
            'text-lg',
            task.completed ? 'line-through text-gray-400' : 'text-gray-700'
          ]"
        >
          {{ task.title }}
        </span>
      </div>
      <button
        @click="$emit('delete-task', task.id)"
        class="text-red-500 hover:text-red-700 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div v-if="tasks.length === 0" class="p-8 text-center text-gray-500">
      Пока нет задач. Добавьте первую!
    </div>
  </div>
</template>

<script setup>
defineProps(['tasks'])
defineEmits(['toggle-task', 'delete-task'])
</script>
```

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



