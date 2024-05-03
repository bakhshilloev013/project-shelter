'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Функционал лавной прокрутки по ссылкам в блоке навигации
    const navLinks = document.querySelectorAll('.header_menu li a');
    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const linkValue = link.getAttribute('href');
            if (linkValue === '../index.html') {
                location.href = '../index.html';
            } else if (linkValue === '../index.html#help') {
                location.href = '../index.html#help';
            }

            const scrollBlock = document.querySelector(linkValue);
            scrollBlock.scrollIntoView({
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
        sliderRight = document.querySelector('.pets_slider .slider_right'),
        sliderDoubleRight = document.querySelector(
            '.pets_slider .slider_double_right'
        );

    let DB = [];
    function sendRequest() {
        fetch('../data/pets.json')
            .then((response) => response.json())
            .then((json) => renderContent(json));
    }
    sendRequest();

    const widthOfContent = parseInt(
        window.getComputedStyle(sliderWrapper).width
    );
    
    // 7160 width
    // 6880 transform
    let transformValue = 0;
    let pageNum = 1;
    sliderLeft.addEventListener('click', (e) => {
        if (transformValue === 0) {
            console.log('достиг начала');
            sliderLeft.classList.add('slider_btn_disable')
            sliderDoubleLeft.classList.add('slider_btn_disable')
            return;
        }
        if (pageNum <= DB.length) {
            sliderRight.classList.remove('slider_btn_disable');
            sliderDoubleRight.classList.remove('slider_btn_disable');
        }
        transformValue += widthOfContent + 150;
        console.log(transformValue)
        sliderContent.style.cssText += `transform: translateX(${transformValue}px)`;
        pageNum--;
        sliderPageNum.textContent = pageNum;
    });
    sliderDoubleLeft.addEventListener('click', e => {
        if (transformValue === 0) {
            console.log('достиг начала');
            sliderLeft.classList.add('slider_btn_disable')
            sliderDoubleLeft.classList.add('slider_btn_disable')
            return;
        }

        transformValue = 0;
        sliderContent.style.cssText += `transform: translateX(${transformValue}px)`;
        pageNum = 1;
        sliderPageNum.textContent = pageNum;
        sliderLeft.classList.add('slider_btn_disable')
        sliderDoubleLeft.classList.add('slider_btn_disable')
        sliderRight.classList.remove('slider_btn_disable');
        sliderDoubleRight.classList.remove('slider_btn_disable');
    })
    sliderRight.addEventListener('click', e => {
        if (transformValue === -(parseInt(window.getComputedStyle(sliderContent).width) - widthOfContent)) {
            console.log('достиг конца');
            sliderRight.classList.add('slider_btn_disable');
            sliderDoubleRight.classList.add('slider_btn_disable');
            return;
        }
        if (pageNum > 0) {
            sliderLeft.classList.remove('slider_btn_disable')
            sliderDoubleLeft.classList.remove('slider_btn_disable')
        }
        transformValue -= widthOfContent + 150;
        console.log(transformValue)
        sliderContent.style.cssText += `transform: translateX(${transformValue}px)`;
        pageNum++;
        sliderPageNum.textContent = pageNum;
    })
    sliderDoubleRight.addEventListener('click', e => {
        if (transformValue === -(parseInt(window.getComputedStyle(sliderContent).width) - widthOfContent)) {
            sliderRight.classList.add('slider_btn_disable');
            sliderDoubleRight.classList.add('slider_btn_disable');
            sliderLeft.classList.remove('slider_btn_disable')
            sliderDoubleLeft.classList.remove('slider_btn_disable')
            console.log('достиг конца');
            return;
        }
        transformValue = -(parseInt(window.getComputedStyle(sliderContent).width) - widthOfContent);
        sliderContent.style.cssText += `transform: translateX(${transformValue}px)`;
        pageNum = DB.length;
        sliderPageNum.textContent = pageNum;
    })


    // let currentPage = 0;

    /*
    // sliderLeft.addEventListener('click', (e) => {
    //     sliderDoubleRight.classList.remove('slider_btn_disable');
    //     sliderRight.classList.remove('slider_btn_disable');
    //     if (currentPage === 0) {
    //         sliderDoubleLeft.classList.add('slider_btn_disable');
    //         sliderLeft.classList.add('slider_btn_disable');
    //         return;
    //     } else {
    //         --currentPage;
    //         sliderPageNum.textContent = currentPage + 1;
    //         createCards(DB[currentPage]);
    //     }
    // });

    // sliderRight.addEventListener('click', (e) => {
    //     sliderDoubleLeft.classList.remove('slider_btn_disable');
    //     sliderLeft.classList.remove('slider_btn_disable');
    //     if (currentPage === DB.length - 1) {
    //         sliderDoubleRight.classList.add('slider_btn_disable');
    //         sliderRight.classList.add('slider_btn_disable');
    //         return;
    //     } else {
    //         ++currentPage;
    //         sliderPageNum.textContent = currentPage + 1;
    //         createCards(DB[currentPage]);
    //     }
    // });

    // sliderDoubleLeft.addEventListener('click', (e) => {
    //     sliderDoubleLeft.classList.add('slider_btn_disable');
    //     sliderLeft.classList.add('slider_btn_disable');
    //     sliderDoubleRight.classList.remove('slider_btn_disable');
    //     sliderRight.classList.remove('slider_btn_disable');
    //     currentPage = 0;
    //     createCards(DB[0]);
    //     sliderPageNum.textContent = 1;
    // });

    // sliderDoubleRight.addEventListener('click', (e) => {
    //     currentPage = DB.length - 1
    //     sliderDoubleRight.classList.add('slider_btn_disable');
    //     sliderRight.classList.add('slider_btn_disable');
    //     sliderLeft.classList.remove('slider_btn_disable');
    //     sliderDoubleLeft.classList.remove('slider_btn_disable');
    //     createCards(DB[DB.length - 1]);
    //     sliderPageNum.textContent = DB.length;
    // });
    */

    function renderContent(data) {
        let widthOfPage =
            parseInt(window.getComputedStyle(document.body).width) + 17;
        if (widthOfPage > 992) {
            for (let i = 0; i < data.length; i += 8) {
                DB.push(data.slice(i, i + 8));
            }
        } else if (widthOfPage > 576 && widthOfPage <= 992) {
            for (let i = 0; i < data.length; i += 6) {
                DB.push(data.slice(i, i + 6));
            }
        } else if (widthOfPage >= 320 && widthOfPage <= 576) {
            for (let i = 0; i < data.length; i += 3) {
                DB.push(data.slice(i, i + 3));
            }
        }

        createCards(DB);
    }

    function createCards(arr) {
        let sliderWrapper = document.querySelector('.slider_wrapper');
        let widthOfWrapper = parseInt(
            window.getComputedStyle(sliderWrapper).width
        );
        let widthOfGap = parseInt(window.getComputedStyle(sliderContent).gap);
        sliderContent.innerHTML = '';
        sliderContent.style.width =
            widthOfWrapper * arr.length + (arr.length - 1) * widthOfGap + 'px';
        let index = 0;
        arr.forEach((ar, num) => {
            const page = document.createElement('div');
            page.classList.add('pagination_content');
            page.setAttribute('data-page', num);
            let widthOfWrapper = parseInt(
                window.getComputedStyle(sliderWrapper).width
            );
            page.style.maxWidth = widthOfWrapper + 'px';
            ar.forEach((item, i) => {
                if (index === 8) {
                    index = 0;
                }
                page.innerHTML += `
                <div data-index=${i} class="slider_card">
                    <img
                        src="../img/pets/pets-${index + 1}.png"
                        alt=""
                        class="card_img"
                    />
                    <div class="card_title">${item.name}</div>
                    <button class="card_button">
                        Learn more
                    </button>
                </div>
                `;
                index++;
            });
            sliderContent.append(page);
        });
    }

    sliderContent.addEventListener('click', (e) => {
        const parent = e.target.closest('.slider_card');
        const parentIndex = parent.getAttribute('data-index');
        const urlToImg = parent.querySelector('.card_img').getAttribute('src');
        showModal(DB[pageNum - 1][parentIndex], urlToImg);
    });

    function showModal(data, urlToImg) {
        const { name, age, breed, description, inoculations, diseases } = data;

        const modal = document.querySelector('.modal'),
            title = document.querySelector('.modal .modal_title'),
            subtitle = document.querySelector('.modal .modal_subtitle'),
            descr = document.querySelector('.modal .modal_descr'),
            list = document.querySelector('.modal .modal_list'),
            img = document.querySelector('.modal .modal_img'),
            close = document.querySelector('.modal .modal_close');

        img.src = urlToImg;
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

    document.body.addEventListener('click', (e) => {
        if (
            !e.target.closest('.header_menu') &&
            !e.target.closest('.header_burger')
        ) {
            menu.classList.remove('header_menu_active');
            btn.classList.remove('header_burger_active');
        }
    });
});
