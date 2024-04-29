'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Функционал плавной прокрутки по ссылкам в блоке навигации
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

    const chevron = document.querySelector('.chevron');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
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

    const content = document.querySelector(
            '.our_friends_slider .slider_content'
        ),
        prev = document.querySelector('.our_friends_slider .slider_left'),
        next = document.querySelector('.our_friends_slider .slider_right');

    let valueOfPets;
    let DB;

    fetch('../data/pets.json')
        .then((response) => response.json())
        .then((json) => renderContent(json));

    function renderContent(data) {
        DB = data;
        valueOfPets = data.length;
        content.style.cssText = `width: ${
            valueOfPets * 270 + (valueOfPets - 1) * 90
        }px`;
        content.innerHTML = '';
        data.forEach((item, i) => {
            content.innerHTML += `
            <div data-index=${i} class="slider_card">
                <img
                    src="img/pets/pets-${i + 1}.png"
                    alt=""
                    class="card_img"
                />
                <div class="card_title">${item.name}</div>
                <button class="card_button">
                    Learn more
                </button>
            </div>
            `;
        });
    }

    let value = 0;
    next.addEventListener('click', (e) => {
        if (value === -1800) {
            next.classList.add('slider_btn_disable');
            return;
        }
        value = value - 270 - 90;
        if (value < 0) {
            prev.classList.remove('slider_btn_disable');
        }

        content.style.cssText += `transform: translateX(${value}px)`;
    });

    prev.addEventListener('click', (e) => {
        if (value === 0) {
            prev.classList.add('slider_btn_disable');
            return;
        }
        value = value + 270 + 90;
        if (value > -1800) {
            next.classList.remove('slider_btn_disable');
        }
        content.style.cssText += `transform: translateX(${value}px)`;
    });

    content.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const parentIndex = e.target
                .closest('.slider_card')
                .getAttribute('data-index');
            console.log(DB[parentIndex]);
        }
    });
});
