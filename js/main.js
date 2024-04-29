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

    document.querySelector('.our_friends_btn').addEventListener('click', e => {
        location.href = '../pages/pets.html';
    })

    // Функционал плавной прокрутки кнопки главной страницы
    document.querySelector('.promo_btn').addEventListener('click', (e) => {
        document.querySelector('#our_friends').scrollIntoView({
            behavior: 'smooth',
        });
    });

    // Функционал плавной прокрутки по якорю
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

    // Функционал пополнения и динамики слайдера
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
            showModal(DB[parentIndex], parentIndex);
        } 
    });

    function showModal(data, index) {
        console.log(data);
        const { name, age, breed, description, inoculations, diseases } = data;
        console.log(name)
        console.log(breed)
        console.log(description)
        console.log(age)
        console.log(inoculations)
        console.log(diseases)

        const modal = document.querySelector('.modal'),
              title = document.querySelector('.modal .modal_title'),
              subtitle = document.querySelector('.modal .modal_subtitle'),
              descr = document.querySelector('.modal .modal_descr'),
              list = document.querySelector('.modal .modal_list'),
              img = document.querySelector('.modal .modal_img'),
              close = document.querySelector('.modal .modal_close');
              
        img.src = `img/pets/pets-${+index + 1}.png`;
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
        close.addEventListener('click', e => {
            modal.style.display = 'none';
        })
              
                  


    }


    /*
        <div class="modal_content">
            <img src="img/pets/pets-1.png" alt="" class="modal_img" />
            <div class="modal_info">
                <button class="modal_close">x</button>
                <div class="modal_title">Jennifer</div>
                <div class="modal_subtitle">Dog - Labrador</div>
                <div class="modal_descr">
                    Jennifer is a sweet 2 months old Labrador that is
                    patiently waiting to find a new forever home. This girl
                    really enjoys being able to go outside to run and play,
                    but won't hesitate to play up a storm in the house if
                    she has all of her favorite toys.
                </div>
                <ul class="modal_list">
                    <li>
                        <span class="list_title">Age:</span
                        ><span class="list_info">2 months</span>
                    </li>
                    <li>
                        <span class="list_title">Inoculations:</span
                        ><span class="list_info">none</span>
                    </li>
                    <li>
                        <span class="list_title">Diseases:</span
                        ><span class="list_info">none</span>
                    </li>
                    <li>
                        <span class="list_title">Parasites:</span
                        ><span class="list_info">none</span>
                    </li>
                </ul>
            </div>
        </div>
    */
});
