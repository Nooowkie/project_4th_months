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

const somInput = document.querySelector("#som")
const usdInput = document.querySelector("#usd")
const eurInput = document.querySelector("#eur")

const convertor = (element) => {
    element.oninput = () =>{
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/convertor.json')
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send()

        xhr.onload = () =>{
            const data = JSON.parse(xhr.response)
            if(element.id === 'som'){
                usdInput.value = (element.value / data.usd).toFixed(2)
                eurInput.value = (element.value / data.eur).toFixed(2)

            }
            if(element.id === 'usd'){
                somInput.value = (element.value * data.usd).toFixed(2)
                eurInput.value = (element.value * data.usd / data.eur).toFixed(2)
            }
            if(element.id === 'eur'){
                usdInput.value = (element.value * data.eur / data.usd).toFixed(2)
                somInput.value = (element.value * data.eur).toFixed(2)
            }
            if(element.value === ''){
                somInput = ''
                usdInput = ''
                eurInput = ''
            }

        }
    }
}

convertor(somInput)
convertor(usdInput)
convertor(eurInput)

//card switcher

const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')

let numId = 1
const maxId = 200

const fetchCard = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${numId}`)
        .then((response) => response.json())
        .then((data) => {
            const { title, id, completed } = data
            cardBlock.style.borderColor = completed ? 'green' : 'red'
            cardBlock.innerHTML = `
                <p>${title}</p>
                <span>${id}</span>
            `
        })
}

fetchCard()

const changeCard = (direction) => {
    numId = direction === 'next'
        ? (numId >= maxId ? 1 : numId + 1)
        : (numId <= 1 ? maxId : numId - 1)
    fetchCard()
}

btnNext.onclick = () => changeCard('next')
btnPrev.onclick = () => changeCard('prev')

//fetch Запрос

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log('Список постов:', data)
    })
   