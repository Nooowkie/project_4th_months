const modal = document.querySelector('.modal')
const modalOpenBtn  = document.querySelector('#btn-get')
const modalCloseBtn = document.querySelector('.modal_close')

const open = () => {
    modal.style.display = 'block'
    document.body.style.overflow= 'hidden'
}
const close = () => {
    modal.style.display = 'none'
    document.body.style.overflow= ''
}
modalOpenBtn.onclick = open
modalCloseBtn.onclick = close
modal.onclick = (event) => {
    if (event.target === modal){
        close()
    }
}
const scroll = () =>{
    if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) {
        open()
        window.removeEventListener('scroll', scroll)
    }
}

window.addEventListener('scroll', scroll)

setTimeout(() => {
    open()
}, 10000)