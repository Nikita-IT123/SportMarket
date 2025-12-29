// script.js
$(function() {
    // Генерация основного меню: Главная, Каталог, Сервисы
    const menuData = [
        { title: 'Главная', articleId: 'article-main' },
        { title: 'Каталог', articleId: 'article-catalog' },
        { title: 'Сервисы', articleId: 'article-services' }
    ];

    const $menu = $('#main-menu ul');
    $menu.empty();

    menuData.forEach(item => {
        const $li = $('<li></li>').addClass('menu-item-level-1');
        const $a = $('<a></a>').attr('href', '#').text(item.title);

        const $submenu = $('<ul></ul>').addClass('submenu');

        // Находим все section внутри соответствующего article
        $(`#${item.articleId} section`).each(function() {
            const sectionId = $(this).attr('id');
            const sectionTitle = $(this).find('h2, h3').first().text() || 'Раздел';
            $submenu.append(
                $('<li></li>').addClass('menu-item-level-2').append(
                    $('<a></a>').attr('href', '#' + sectionId).text(sectionTitle).data('section-id', sectionId)
                )
            );
        });

        $li.append($a).append($submenu);
        $menu.append($li);
    });

    // Раскрытие подменю по наведению или клику
    $('.menu-item-level-1').hover(
        function() { $(this).addClass('menu-open'); },
        function() { $(this).removeClass('menu-open'); }
    );

    // Клик по пункту подменю — скролл и подсветка
    $(document).on('click', '.menu-item-level-2 a', function(e) {
        e.preventDefault();
        const sectionId = $(this).data('section-id');
        if (sectionId) {
            highlightSection(sectionId);
            $('html, body').animate({ scrollTop: $('#' + sectionId).offset().top - 100 }, 800);
        }
    });

    // Подсветка секции
    let currentHighlightedSection = null;
    function highlightSection(sectionId) {
        const $section = $('#' + sectionId);
        if (currentHighlightedSection) {
            $(currentHighlightedSection).removeClass('highlight');
        }
        $section.addClass('highlight');
        currentHighlightedSection = $section[0];
    }

    // Подсветка столбцов таблицы
    let currentHighlightedColumn = null;
    $('#comparison-table thead th').on('click', function() {
        const index = $(this).index();
        if (currentHighlightedColumn === index) {
            $('.column-highlight, .header-highlight').removeClass('column-highlight header-highlight');
            currentHighlightedColumn = null;
        } else {
            $('.column-highlight, .header-highlight').removeClass('column-highlight header-highlight');
            $(this).addClass('header-highlight');
            $('#comparison-table tbody tr').each(function() {
                $(this).children().eq(index).addClass('column-highlight');
            });
            currentHighlightedColumn = index;
        }
    });

    // Плагин для aside
    $('.aside-element').asideZoom({
        duration: 600,
        fontSize: '1.8em',
        position: 'center',
        overlayOpacity: 0.7
    });

    // Мигание логотипа
    $('#animated-logo').hover(
        function() { $(this).addClass('blink-logo'); },
        function() { $(this).removeClass('blink-logo'); }
    );

    // Остальные обработчики
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        alert('✓ Сообщение отправлено! Мы свяжемся с вами скоро.');
    });

    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        const query = $('#search-input').val().trim();
        if (query) alert(`Поиск: "${query}"\n(Функция в разработке)`);
        else $('#search-input').effect('shake');
        $('#search-input').val('');
    });

    $('.unavailable-link').on('click', function(e) {
        e.preventDefault();
        $(this).effect('bounce', { times: 3 }, 300);
        setTimeout(() => alert(`Раздел "${$(this).data('section')}" временно недоступен`), 300);
    });

    $('.scroll-to-catalog').on('click', function() {
        $('html, body').animate({ scrollTop: $('#section-products').offset().top - 100 }, 1000);
    });
});