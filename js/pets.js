'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Функционал лавной прокрутки по ссылкам в блоке навигации
    document.querySelectorAll('.header_menu li a').forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.getAttribute('href') === '../index.html') {
                location.href = '../index.html';
            } else if (this.getAttribute('href') === '../index.html#help') {
                location.href = '../index.html#help';
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });

    const chevron = document.querySelector('.chevron');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            chevron.style.display = 'flex';
        } else {
            chevron.style.display = 'none';
        }

        chevron.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#top').scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
});
