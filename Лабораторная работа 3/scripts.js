// ========================================
// Лабораторная работа №3
// Использование объектной модели документа (DOM)
// ========================================

// ========================================
// 1. ВЫДЕЛЕНИЕ РАЗДЕЛОВ ПРИ ВЫБОРЕ МЕНЮ
// ========================================

let currentHighlightedSection = null;

/**
 * Функция выделения раздела страницы при клике на пункт меню
 * @param {string} sectionId - ID секции для выделения
 */
function highlightSection(sectionId) {
    // Убираем выделение с предыдущего раздела
    if (currentHighlightedSection) {
        currentHighlightedSection.style.backgroundColor = '';
    }
    
    // Находим и выделяем новый раздел
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.backgroundColor = '#e3f2fd';
        section.style.transition = 'background-color 0.3s ease';
        currentHighlightedSection = section;
        
        // Плавная прокрутка к секции
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Инициализация обработчиков для навигационного меню
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Получаем href и извлекаем ID секции
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                highlightSection(sectionId);
            }
        });
    });
}

// ========================================
// 2. ВЫДЕЛЕНИЕ СТОЛБЦОВ ТАБЛИЦЫ
// ========================================

let currentHighlightedColumn = null;

/**
 * Функция выделения столбца таблицы тенью
 * @param {number} columnIndex - индекс столбца для выделения
 */
function highlightTableColumn(columnIndex) {
    const table = document.querySelector('.comparison-table');
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    
    // Если кликнули на уже выделенный столбец - снимаем выделение
    if (currentHighlightedColumn === columnIndex) {
        rows.forEach(row => {
            const cell = row.cells[columnIndex];
            if (cell && !cell.matches('th')) {
                cell.style.boxShadow = '';
                cell.style.backgroundColor = '';
            }
        });
        currentHighlightedColumn = null;
        return;
    }
    
    // Снимаем выделение с предыдущего столбца
    if (currentHighlightedColumn !== null) {
        rows.forEach(row => {
            const cell = row.cells[currentHighlightedColumn];
            if (cell && !cell.matches('th')) {
                cell.style.boxShadow = '';
                cell.style.backgroundColor = '';
            }
        });
    }
    
    // Выделяем новый столбец (только ячейки tbody, пропускаем заголовки)
    rows.forEach(row => {
        const cell = row.cells[columnIndex];
        if (cell && !cell.matches('th')) { // Пропускаем заголовки
            cell.style.boxShadow = '0 0 12px rgba(52, 152, 219, 0.8)';
            cell.style.backgroundColor = '#ebf5fb';
            cell.style.transition = 'box-shadow 0.3s ease, background-color 0.3s ease';
        }
    });
    
    currentHighlightedColumn = columnIndex;
}

/**
 * Инициализация обработчиков для таблицы
 */
function initializeTable() {
    const table = document.querySelector('.comparison-table');
    if (!table) {
        return;
    }
    
    // Получаем все заголовки таблицы (th)
    const headers = table.querySelectorAll('thead th');
    
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.style.userSelect = 'none';
        
        // Добавляем обработчик клика
        header.addEventListener('click', function() {
            highlightTableColumn(index);
        });
        
        // Визуальная подсказка при наведении
        header.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#2980b9';
        });
        
        header.addEventListener('mouseleave', function() {
            if (!this.matches(':hover')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// ========================================
// 3. ВСПЛЫВАЮЩИЕ ОКНА ДЛЯ <aside>
// ========================================

/**
 * Инициализация всплывающих окон для элементов <aside>
 */
function initializeAsideElements() {
    const asides = document.querySelectorAll('aside');
    
    if (asides.length === 0) {
        return;
    }
    
    asides.forEach((aside, index) => {
        aside.style.cursor = 'pointer';
        
        aside.addEventListener('click', function() {
            // Получаем текстовое содержимое элемента
            const heading = this.querySelector('h3')?.textContent || '';
            const content = this.querySelector('p')?.textContent || '';
            
            const fullContent = `${heading}\n\n${content}`;
            
            alert(fullContent.trim());
        });
        
        // Добавляем визуальный эффект
        aside.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        aside.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ========================================
// 4. ОБРАБОТКА ФОРМЫ
// ========================================

/**
 * Изменение цвета фона полей формы на указанное время
 * @param {NodeList} fields - список полей формы
 * @param {string} color - цвет фона
 * @param {number} duration - длительность в миллисекундах
 */
function changeFieldsBackground(fields, color, duration = 1000) {
    fields.forEach(field => {
        const originalBg = field.style.backgroundColor;
        field.style.backgroundColor = color;
        field.style.transition = 'background-color 0.3s ease';
        
        setTimeout(() => {
            field.style.backgroundColor = originalBg || '';
        }, duration);
    });
}

/**
 * Инициализация обработчиков формы
 */
function initializeFormHandling() {
    const form = document.querySelector('.contact-form');
    
    if (!form) {
        return;
    }
    
    // Получаем все поля формы
    const formFields = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select');
    
    // ========== ОБРАБОТКА КНОПКИ RESET ==========
    const resetButton = form.querySelector('input[type="reset"]');
    
    if (resetButton) {
        resetButton.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение
            
            // Показываем диалоговое окно подтверждения
            const confirmed = confirm('Вы действительно хотите очистить все поля формы?');
            
            if (confirmed) {
                // Пользователь подтвердил - сбрасываем форму
                form.reset();
                
                // Красный фон на 1 секунду
                changeFieldsBackground(formFields, '#ffcdd2', 1000);
            } else {
                // Пользователь отменил - зелёный фон на 1 секунду
                changeFieldsBackground(formFields, '#c8e6c9', 1000);
            }
        });
    }
    
    // ========== ОБРАБОТКА КНОПКИ SUBMIT ==========
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы
        
        // Синий фон на 1 секунду
        changeFieldsBackground(formFields, '#bbdefb', 1000);
        
        // Показываем сообщение после изменения фона
        setTimeout(() => {
            alert('✓ Данные успешно отправлены!\n\nСпасибо за обращение. Мы свяжемся с вами в ближайшее время.');
        }, 1000);
    });
}

// ========================================
// 5. ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

/**
 * Функция для показа сообщения о недоступности раздела
 * @param {string} sectionName - название раздела
 */
function showSectionUnavailable(sectionName) {
    alert(`⚠ Раздел "${sectionName}" временно недоступен!\n\nМы работаем над его улучшением.`);
    return false;
}

/**
 * Плавная прокрутка к элементу по ID
 * @param {string} elementId - ID элемента
 */
function scrollToSection(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

/**
 * Обработка формы поиска
 */
function initializeSearchForm() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const searchQuery = searchInput.value.trim();
            
            if (searchQuery) {
                alert(`🔍 Поиск: "${searchQuery}"\n\nФункция поиска находится в разработке.`);
            } else {
                alert('⚠ Введите запрос для поиска!');
            }
            
            searchInput.value = '';
        });
    }
}

// ========================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initializeNavigation();      // Задание №1
    initializeTable();           // Задание №2
    initializeAsideElements();   // Задание №3
    initializeFormHandling();    // Задание №4
    initializeSearchForm();      // Дополнительно
});

// ========================================
// ДОПОЛНИТЕЛЬНО: Обработка ошибок
// ========================================

window.addEventListener('error', function(event) {
    console.error('Ошибка JavaScript:', event.message);
});

// Экспорт функций для использования в HTML (если нужно)
window.showSectionUnavailable = showSectionUnavailable;
window.scrollToSection = scrollToSection;