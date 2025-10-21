// Функция для показа сообщения о недоступности раздела
function showSectionUnavailable(sectionName) {
    alert(`Раздел "${sectionName}" недоступен!`);
}

// Обработчик события отправки формы поиска
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('form');

    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            // Отменяем отправку формы
            event.preventDefault();

            // Выводим предупреждение
            alert('Функция поиска на данный момент недоступна!');

            // Дополнительно можно очистить поле поиска
            const searchInput = this.querySelector('input[type="text"]');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    }
});