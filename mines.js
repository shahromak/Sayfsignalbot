const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

let buttonGetSignal = document.getElementById("get-signal");

// Перевод
const minesCountTitle = document.getElementById("minesCountTitle");

if (language === "ru") {
    minesCountTitle.innerText = "количество ловушек";
    buttonGetSignal.innerText = "получить сигнал";
}
else {
    minesCountTitle.innerText = "traps count";
    buttonGetSignal.innerText = "get signal";
}


// Источники звука
function playStarSound() {
  var audio = new Audio('assets/audio/star_sound.mp3');
  audio.volume = 0.5;
  audio.play();
}

const clickSoundEffect = document.getElementById('clickSoundEffect');
clickSoundEffect.volume = 0.2;

// Количество ловушек
let starsCount;
let minesCount = 5;
const minMinesCount = 1;
const maxMinesCount = 7;

plusButton = document.getElementById("plusTrapButton");
minusButton = document.getElementById("minusTrapButton");
minesCountDisplay = document.getElementById("minesCountDisplay");

minesCountDisplay.innerText = minesCount;

function changeMinesCount(count) {
  clickSoundEffect.play();
  minesCount = clamp(minesCount+count, minMinesCount, maxMinesCount);
  minesCountDisplay.innerText = minesCount;
}

minusButton.onclick = function() { changeMinesCount(-2); }
plusButton.onclick = function() { changeMinesCount(+2); }


function clearField() {
  // Заменяем звёзды на клетки
  const stars = document.querySelectorAll('.star');
  stars.forEach((star) => {
    star.classList.remove('star', 'visible', 'hidden');
    star.classList.add('cell');
  })
}

buttonGetSignal.onclick = function() {
  buttonGetSignal.disabled = true;

  clearField();

  // Считаем, сколько должно быть звёзд в зависимости от ловушек
  if (minesCount === 7) { starsCount = 3; }
  else if (minesCount === 5) { starsCount = 4; }
  else if (minesCount === 3) { starsCount = 5; }
  else { starsCount = 6; }
  
  const cells = document.querySelectorAll('.cell');
  const duration = 800; // Время между заменой клетки на звёздочку

  let selectedCells = Array.from(cells);
  for (let i = selectedCells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedCells[i], selectedCells[j]] = [selectedCells[j], selectedCells[i]];
  }
  selectedCells = selectedCells.slice(0, starsCount);

  function transformNextCell(index) {
    if (index < selectedCells.length) { 
      playStarSound();
      
      const cell = selectedCells[index];
      cell.classList.add('hidden');

      cell.addEventListener('transitionend', function onTransitionEnd() {
        cell.classList.remove('cell', 'hidden');
        cell.classList.add('star');

        void cell.offsetWidth;

        cell.classList.add('visible');
        cell.removeEventListener('transitionend', onTransitionEnd);
      }, { once: true });

      setTimeout(() => transformNextCell(index + 1), duration);
    }
  }
  
  transformNextCell(0);

  setTimeout(() => {
    buttonGetSignal.disabled = false;
  }, duration * starsCount + 800); // Ожидание полного завершения всех анимаций
}
