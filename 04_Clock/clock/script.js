let hrs = document.getElementById("hrs");
let mins = document.getElementById("mins");
let secs = document.getElementById("secs");

let day = document.getElementById("day");
let month = document.getElementById("month");
let date = document.getElementById("date");
let year = document.getElementById("year");

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

setInterval(() =>{
    let currentTime = new Date();
    hrs.innerHTML = (currentTime.getHours() < 10 ? '0' : '') + currentTime.getHours(); 
    mins.innerHTML = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();
    secs.innerHTML = (currentTime.getSeconds() < 10 ? '0' : '') + currentTime.getSeconds();
    day.innerHTML = daysOfWeek[currentTime.getDay()];
    month.innerHTML = months[currentTime.getMonth()];
    date.innerHTML = currentTime.getDate();
    year.innerHTML = currentTime.getFullYear();
}, 1000);
