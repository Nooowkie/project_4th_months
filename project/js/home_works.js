document.getElementById("gmail_button").addEventListener("click", function () {
  const gmailInput = document.getElementById("gmail_input").value.trim();
  const resultSpan = document.getElementById("gmail_result");

  // проверка gmail
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (gmailRegex.test(gmailInput)) {
    resultSpan.textContent = "Валидный Gmail!";
    resultSpan.style.color = "lime";
  } else {
    resultSpan.textContent = "Невалидный адрес. Используйте @gmail.com";
    resultSpan.style.color = "red";
  }
});

//Движение блока
const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')
let positionX = 0

const moveBlock = () => {
    if(positionX < 450){
        positionX++
    }
    childBlock.style.left = `${positionX}px`
    requestAnimationFrame(moveBlock)
}
moveBlock()