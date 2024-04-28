'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Функционал лавной прокрутки по ссылкам в блоке навигации
    document.querySelectorAll('.header_menu li a').forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.getAttribute('href') === './pages/pets.html') {
                location.href = './pages/pets.html';
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });

    // Функционал плавной прокрутки кнопки главной страницы
    document.querySelector('.promo_btn').addEventListener('click', (e) => {
        document.querySelector('#our_friends').scrollIntoView({
            behavior: 'smooth',
        });
    });
});
