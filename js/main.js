'use strict';

// import firebase from 'firebase/app';
// import 'firebase/database';

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

    const content = document.querySelector(
            '.our_friends_slider .slider_content'
        ),
        prev = document.querySelector('.our_friends_slider .slider_left'),
        next = document.querySelector('.our_friends_slider .slider_right');

    let valueOfPets;

    fetch('../data/pets.json')
        .then((response) => response.json())
        .then((json) => renderContent(json));

    function renderContent(data) {
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
            console.log('did');
            prev.classList.remove('slider_btn_disable');
        }

        console.log(value);
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
        console.log(value);
        content.style.cssText += `transform: translateX(${value}px)`;
    });
});
