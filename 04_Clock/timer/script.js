const startStopBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const displayTimer = document.getElementById("displayTimer");
const inputTime = document.getElementById("inputTime");
const setTimerButton = document.getElementById("setTimerButton");

let running = false;
let interval;
let remainingTime = 300; // 5 minutes in seconds


function startTimer() {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = Math.floor((remainingTime % 60));

    displayTimer.textContent = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
    remainingTime--;

    if(remainingTime < 0) {
        clearInterval(interval);
        displayTimer.innerText = '00:00:00';
    }
}

startStopBtn.addEventListener("click", () => {
    running = !running;
    if(running) {
        startStopBtn.innerHTML = 'stop';
        interval = setInterval(startTimer, 1000);
    }
    else {
        startStopBtn.innerHTML = 'start';
        clearInterval(interval);
        setTimerButton.addEventListener("click", () => {
            remainingTime = inputTime.value;
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = Math.floor((remainingTime % 60));

            displayTimer.textContent = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
        })
    }
})

resetBtn.addEventListener("click", () => {
    running = false;
    clearInterval(interval);
    remainingTime = inputTime.value;
    startTimer();
    startStopBtn.innerHTML = 'start';
})

function padTime(time) {
    return time < 10 ? '0' + time : time;
}

setTimerButton.addEventListener("click", () => {
    startStopBtn.innerHTML = 'start';
    running = false;
    clearInterval(interval);
    remainingTime = inputTime.value;
    startTimer();
})