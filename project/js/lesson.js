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
