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
            document
                .querySelector('.header_menu')
                .classList.remove('header_menu_active');
            document
                .querySelector('.header_burger')
                .classList.remove('header_burger_active');
        });
    });

    // Функционал плавной прокрутки по якорю
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

    // Функционал пололнения и динамики слайдера
    const sliderWrapper = document.querySelector(
            '.pets_slider .slider_wrapper'
        ),
        sliderContent = document.querySelector('.pets_slider .slider_content'),
        sliderDoubleLeft = document.querySelector(
            '.pets_slider .slider_double_left'
        ),
        sliderLeft = document.querySelector('.pets_slider .slider_left'),
        sliderPageNum = document.querySelector('.pets_slider .slider_num'),
        sliderRight = document.querySelector(
            '.pets_slider .slider_double_right'
        ),
        sliderDoubleRight = document.querySelector(
            '.pets_slider .slider_double_right'
        );

    let valueOfPets;
    let DB;
    fetch('../data/pets.json')
        .then((response) => response.json())
        .then((json) => renderContent(json));

    function renderContent(data) {
        valueOfPets = data.length;
        DB = data;
        sliderContent.innerHTML = '';
        sliderContent.style.cssText = `
            width: ${valueOfPets * 270 + (valueOfPets - 1) * 90}px
        `;
        DB.forEach((item, i) => {
            sliderContent.innerHTML += `
                <div data-index=${i} class="slider_card">
                    <img
                        src="../img/pets/pets-${i + 1}.png"
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

    sliderContent.addEventListener('click', (e) => {
        const card = e.target.closest('.slider_card');
        const parentIndex = card.getAttribute('data-index');
        showModal(DB[parentIndex], parentIndex);
    });

    function showModal(data, index) {
        const { name, age, breed, description, inoculations, diseases } = data;

        const modal = document.querySelector('.modal'),
            title = document.querySelector('.modal .modal_title'),
            subtitle = document.querySelector('.modal .modal_subtitle'),
            descr = document.querySelector('.modal .modal_descr'),
            list = document.querySelector('.modal .modal_list'),
            img = document.querySelector('.modal .modal_img'),
            close = document.querySelector('.modal .modal_close');

        img.src = `../img/pets/pets-${+index + 1}.png`;
        title.textContent = name;
        subtitle.textContent = breed;
        descr.textContent = description;
        list.innerHTML = `
            <li>
                <span class="list_title">Age:</span
                ><span class="list_info">${age}</span>
            </li>
            <li>
                <span class="list_title">Inoculations:</span
                ><span class="list_info">${inoculations}</span>
            </li>
            <li>
                <span class="list_title">Diseases:</span
                ><span class="list_info">${diseases}</span>
            </li>
            <li>
                <span class="list_title">Parasites:</span
                ><span class="list_info">none</span>
            </li>
        `;

        modal.style.display = 'flex';
        close.addEventListener('click', (e) => {
            modal.style.display = 'none';
        });
    }

    const menu = document.querySelector('.header_menu'),
        btn = document.querySelector('.header_burger');

    btn.addEventListener('click', (e) => {
        btn.classList.toggle('header_burger_active');
        menu.classList.toggle('header_menu_active');
    });
});
