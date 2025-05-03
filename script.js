// Функция для получения языка из URL хеша
function getLanguageFromUrl() {
    if (window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }
    return "ru";
}

// Получаем язык из URL
const language = getLanguageFromUrl();

// Функция для обновления всех ссылок на странице текущим языком
function updateLinksLanguage() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.href = `${link.href}?lang=${language}`;
    });
}

// Обновляем ссылки при загрузке страницы
updateLinksLanguage();


// Полное открытие окна WebApp
let tg = window.Telegram.WebApp;
tg.expand();