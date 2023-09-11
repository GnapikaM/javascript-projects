let displayTime = document.getElementById("displayTime");
let playBtn = document.querySelector("ion-icon[name = 'play']");
let pauseBtn = document.querySelector("ion-icon[name='stop']");
let restartBtn = document.querySelector("ion-icon[name='refresh']");

let running = false;
let time = 0;
let interval;

playBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
restartBtn.addEventListener("click", restartTimer);

function startTimer() {
    running = !running;

    if(running) {
        interval = setInterval(updateDisplay, 10);
    }
}

function pauseTimer() {
    clearInterval(interval);
}

function restartTimer() {
    running = false;
    time = 0;
    clearInterval(interval);
    displayTime.innerHTML = '00:00:00:00';
}

function updateDisplay() {
    time += 10; 
    // By incrementing time by 10 milliseconds, the updateDisplay() function ensures that the stopwatch's 
    // elapsed time is represented accurately and updated regularly.
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000) ;
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000).toString().slice(0, 2);
    displayTime.innerHTML = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

function padTime(time) {
    return time < 10 ? "0" + time : time;
}