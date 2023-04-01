// SELECTORS

const $gameTime = document.querySelector('#gameTime');
const $gameResult = document.querySelector('#gameResult');
const $gameStart = document.querySelector('#gameStart');
const $game = document.querySelector('#game');
const $gameTimeChanger = document.querySelector('#gameTimeChanger');

const colors = ['green', 'red', 'blue', 'orange', 'yellow', 'purple', 'lime'];
let score = 0;

// EVENT LISTENER

$gameStart.addEventListener('click', startGameFunc);
$gameTimeChanger.addEventListener('change', changeGameTimeFunc)
$game.addEventListener('click', clickHandlerFunc)

// FUNCTION

function startGameFunc(){
    hide($gameStart);
    bgColor($game, 'white');
    $gameTimeChanger.setAttribute('disabled', 'true');

    score = 0;
    $gameResult.textContent = score;

    let interval = setInterval(function(){
        let time = +$gameTime.textContent;
        if(time == 0){
            clearInterval(interval);
            endGameFunc();
        }
        else{
            $gameTime.textContent = (time-0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function endGameFunc() {
    Show($gameStart);
    bgColor($game, 'grey');
    $gameTime.textContent = (+$gameTimeChanger.value).toFixed(1);
    $gameTimeChanger.removeAttribute('disabled');
    $game.textContent = '';

}

function renderBox(){
    const boxSize = random(30, 100);
    const colorIndex = random(0, colors.length - 1)
    const gameSize = $game.getBoundingClientRect().width;
    const top = random(0, gameSize - boxSize);
    const left = random(0, gameSize - boxSize);

    const $box = document.createElement('div');
    $box.style.width = $box.style.height = boxSize + 'px';
    $box.style.backgroundColor = colors[colorIndex];
    $box.style.position = 'absolute';
    $box.style.top = top + 'px';
    $box.style.left = left + 'px';
    $box.style.cursor = 'pointer';
    $box.setAttribute('data-box', 'true')

    $game.append($box)
}

function clickHandlerFunc(e){
    if(e.target.dataset.box){
        score++;
        $gameResult.textContent = score;
        $game.textContent = '';
        renderBox();
    }
}

function changeGameTimeFunc(){
    $gameTime.textContent = (+$gameTimeChanger.value).toFixed(1);
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function bgColor($el, color){
    $el.style.background = color;
}

function hide($el){
    $el.classList.add('hide');
}

function Show($el){
    $el.classList.remove('hide');
}
