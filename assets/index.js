document.addEventListener('DOMContentLoaded', function(){
    let position = 0;
    const track = document.querySelector('.slides');
    const btnLeft = document.querySelector('.left-slider-button');
    const btnRight = document.querySelector('.right-slider-button');
    const firstBar = document.querySelector('.firstBar');
    const secondBar = document.querySelector('.secondBar');
    const thirdBar = document.querySelector('.thirdBar');
    let style = window.getComputedStyle(track, null);
    const move = Number(style.width.slice(0, -2)) / 3;

    btnLeft.addEventListener('click',() => {
        position += move
        setPosition(position);
        checkButtons();
    })
    btnRight.addEventListener('click',() => {
        position -= move
        setPosition(position);
        checkButtons();
    })
    firstBar.addEventListener('click',() => {
        position = 0;
        setPosition(position);
        checkButtons();
    })
    secondBar.addEventListener('click',() => {
        position = -move;
        setPosition(position);
        checkButtons();
    })
    thirdBar.addEventListener('click',() => {
        position = -move * 2;
        setPosition(position);
        checkButtons();
    })
    const setPosition = (position) => {
        track.style.transform = `translateX(${position}px)`;
    }
    const checkButtons = () => {
        if (position === 0) {
            btnLeft.style.display = `none`;
            firstBar.style.opacity = '1';
        } else {
            btnLeft.style.display = `block`;
            firstBar.style.opacity = '0.5';
        }
        if (position === -move) {
            secondBar.style.opacity = '1';
        } else {
            secondBar.style.opacity = '0.5';
        }
        if (position === -move * 2) {
            btnRight.style.display = `none`;
            thirdBar.style.opacity = '1';
        } else {
            btnRight.style.display = `block`;
            thirdBar.style.opacity = '0.5';
        }

    }
    checkButtons();

    // обработка клика меню

    const btnStore = document.getElementById('storeBtn');
    const menuStore = document.querySelector('.openedMenu');
    const icon = document.querySelector('.icon');
    btnStore.addEventListener('click',() => {
        if (menuStore.style.display === `block`) {
            menuStore.style.display = `none`;
            icon.style.transform = `rotate(-180deg)`;
        } else {
            menuStore.style.display = `block`;
            icon.style.transform = `rotate(0deg)`;
        }
    })

    // запрос на сервер за данными

    async function getData() {
        let response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
        let data = await response.json();
        const dataRender = [];
        data.forEach(item => {
            if (Number(item.price) < 5) {
                dataRender.push({quote: item.name, author: item.price})
            }
        })
        const quotes = Array.from(document.getElementsByClassName('quoteText'));
        const authors = Array.from(document.getElementsByClassName('quoteAuthor'));
        quotes.map((item, index) => {
            item.innerText = dataRender[index].quote;
        })
        authors.map((item,index) => {
            item.innerText = dataRender[index].author;

        })
    }

    getData();

});