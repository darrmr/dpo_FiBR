// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Находим все элементы с классом 'text'
    const textElements = document.querySelectorAll('.text');
    console.log('Найдено элементов с классом text:', textElements.length);
    
    // 2. Для элемента с классом 'special' устанавливаем красный цвет текста
    // Используем querySelector, так как такой элемент один
    const specialElement = document.querySelector('.special');
    if (specialElement) {
        // Добавляем стиль через класс (рекомендуется)
        specialElement.classList.add('red-text');
        // Или напрямую: specialElement.style.color = 'red';
    }
    
    // 3. Для каждого третьего параграфа добавляем зелёный фон
    // Помним, что индексация в коллекции начинается с 0.
    // Нам нужен элемент с индексом 2 (третий по счету).
    if (textElements.length >= 3) {
        // Способ 1: Прямое обращение по индексу
        textElements[2].classList.add('bg-green');
        
        // Способ 2: Более правильный для демонстрации цикла
        // textElements.forEach((paragraph, index) => {
        //     if (index === 2) { // индекс 2 означает третий элемент
        //         paragraph.style.backgroundColor = 'lightgreen';
        //     }
        // });
    }
    
    // 4. Родительскому контейнеру добавляем рамку
    const container = document.getElementById('container');
    if (container) {
        container.classList.add('border-container');
    }
});