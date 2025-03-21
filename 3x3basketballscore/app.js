const p1 = {
    score: 0,
    button: document.querySelector('#p1btn'),
    display: document.querySelector('#p1Display')
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2btn'),
    display: document.querySelector('#p2Display')
}
const timeStart = document.querySelector('#startTimer');
const timeStop = document.querySelector('#stopTimer');
const timeEnd = document.querySelector('#endTimer');
const timerDisplay = document.querySelector('#timer');

const resetbtn = document.querySelector('#resetbtn');
const gameToSelect = document.querySelector('#gameto');

let gameTo = 7;
let gameOver = false;
let timer;
let duration = 600;
function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (duration > 0) {
                duration--;
                updateTimerDisplay();
            }
            else {
                stopTimer();

                timer = null;
            }
        }, 1000)
    }

}
function stopTimer() {
    clearInterval(timer);
    timer = null;


}
function updateTimerDisplay() {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


}
function updateScores(player, opponent) {
    if (!gameOver) {
        player.score += 1;
        player.display.textContent = player.score;
        if (player.score === gameTo) {
            gameOver = true;
            stopTimer();
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;

        }



    }
}
p1.button.addEventListener('click', function () {
    updateScores(p1, p2);
})
p2.button.addEventListener('click', function () {
    updateScores(p2, p1);
})



gameToSelect.addEventListener('change', function () {

    gameTo = parseInt(this.value);
    reset();
})
resetbtn.addEventListener('click', reset);
timeStart.addEventListener('click', startTimer);
timeStop.addEventListener('click', stopTimer);
    timeEnd.addEventListener('click', reset);


function reset() {
    gameOver = false;

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false

    }

    stopTimer();
    duration = 600;
    updateTimerDisplay();

}