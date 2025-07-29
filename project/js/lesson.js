const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')

let index = 0

const hideSlide = () => {
    tabContentBlocks.forEach(item => item.style.display = 'none')
    tabs.forEach(item => item.classList.remove('tab_content_item_active'))
}

const showSlide = (i = 0) => {
    tabContentBlocks[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
}

const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabContentBlocks.length - 1) {
            i = 0
        }
        index = i
        hideSlide()
        showSlide(i)
    }, 3000) 
}

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, idx) => {
            if (event.target === tab) {
                index = idx
                hideSlide()
                showSlide(index)
            }
        })
    }
}

hideSlide()
showSlide(index)
autoSlider(index)

//convertor
const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const convertor = (element) => {
    element.addEventListener("input", async () => {
        try {
            const response = await fetch('../data/convertor.json');
            
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const data = await response.json();

            const som = parseFloat(somInput.value);
            const usd = parseFloat(usdInput.value);
            const eur = parseFloat(eurInput.value);

            if (element.id === 'som') {
                usdInput.value = (element.value / data.usd).toFixed(2);
                eurInput.value = (element.value / data.eur).toFixed(2);
            } else if (element.id === 'usd') {
                somInput.value = (element.value * data.usd).toFixed(2);
                eurInput.value = ((element.value * data.usd) / data.eur).toFixed(2);
            } else if (element.id === 'eur') {
                usdInput.value = ((element.value * data.eur) / data.usd).toFixed(2);
                somInput.value = (element.value * data.eur).toFixed(2);
            }

            if (element.value === '') {
                somInput.value = '';
                usdInput.value = '';
                eurInput.value = '';
            }

        } catch (error) {
            console.error('Ошибка при конвертации валют:', error);
        }
    });
};

convertor(somInput);
convertor(usdInput);
convertor(eurInput);

//card-switcher
const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

let numId = 1;
const maxId = 200;

const fetchCard = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${numId}`);
    
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    const { title, id, completed } = data;

    cardBlock.style.borderColor = completed ? 'green' : 'red';
    cardBlock.innerHTML = `
      <p>${title}</p>
      <span>${id}</span>
    `;
  } catch (error) {
    console.error('Не удалось получить карточку:', error);
    cardBlock.innerHTML = `<p style="color:red;">Ошибка загрузки данных</p>`;
    cardBlock.style.borderColor = 'gray';
  }
};

const changeCard = (direction) => {
  numId = direction === 'next'
    ? (numId >= maxId ? 1 : numId + 1)
    : (numId <= 1 ? maxId : numId - 1);
  fetchCard();
};


fetchCard();

btnNext.addEventListener('click', () => changeCard('next'));
btnPrev.addEventListener('click', () => changeCard('prev'));


//fetch Запрос

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(data => {
//         console.log('Список постов:', data)
//     })


//WEATHER

const searchInput = document.querySelector('.cityName');
const searchButton = document.querySelector('#search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const API = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

const searchWeather = async () => {
  const cityName = searchInput.value.trim();

  if (cityName === '') {
    city.innerHTML = 'Введите название города';
    temp.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`${API}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`);

    if (!response.ok) {
      throw new Error('Ошибка при получении погоды');
    }

    const data = await response.json();

    city.innerHTML = data.name || 'Город не найден';
    temp.innerHTML = data.main?.temp !== undefined
      ? Math.round(data.main.temp) + '&deg;C'
      : '';
  } catch (error) {
    console.error('Ошибка:', error);
    city.innerHTML = 'Ошибка получения данных';
    temp.innerHTML = '';
  }

  searchInput.value = '';
};

searchButton.onclick = () => searchWeather();

window.onkeydown = (event) => {
  if (event.code === 'Enter') {
    searchWeather();
  }
};

