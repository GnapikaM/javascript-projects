const apiKey = "bc2eebc9e16be23a11f5f7926fa0c390";
const cityName = document.querySelector(".search input");
const searchBtn = document.querySelector(".search ion-icon");
const weatherIcon = document.querySelector(".weather-icon");

const day = document.querySelector(".day");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

let currentTime = new Date();
day.innerHTML = daysOfWeek[currentTime.getDay()];
date.innerHTML = `${months[currentTime.getMonth()]} ${currentTime.getDate()} ${currentTime.getFullYear()}`;

searchBtn.addEventListener("click", fetchWeather);

function fetchWeather() {
    const city = cityName.value;
    if(city === '') {
        alert("Enter City Name");
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl) 
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            document.querySelector(".temp").innerHTML = data.main.temp + '°C';
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
            document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';
            const desc = data.weather[0].description;
            document.querySelector(".name").innerHTML = desc;

            if(desc === 'clear sky') {
                weatherIcon.src = 'images/clear.png';
            }
            else if(desc === 'few clouds') {
                weatherIcon.src = 'images/few_clouds.png';
            }
            else if(desc === 'scattered clouds' || desc === 'overcast clouds') {
                weatherIcon.src = 'images/scattered_clouds.png';
            }
            else if(desc === 'broken clouds') {
                weatherIcon.src = 'images/broken_cloud.png';
            }
            else if(desc === 'shower rain' || desc === 'drizzle') {
                weatherIcon.src = 'images/shower_rain.png';
            }
            else if(desc === 'rain') {
                weatherIcon.src = 'images/rain.png';
            }
            else if(desc === 'thunderstorm') {
                weatherIcon.src = 'images/storm.png';
            }
            else if(desc === 'snow') {
                weatherIcon.src = 'images/snow.png';
            }
            else if(desc === 'mist') {
                weatherIcon.src = 'images/mist.png';
            }

            document.querySelector(".weather").style.display = 'block';

            // Reset display for images and paragraphs
            document.querySelectorAll("img").forEach(img => {
                img.style.display = 'inline'; 
            });
            document.querySelectorAll("p").forEach(p => {
                p.style.display = 'block'; 
            });
            cityName.value = '';
        })
        .catch(error => {
            if(city !== '') {
                document.querySelector(".temp").innerHTML = '-';
                document.querySelector(".city").innerHTML = 'No City Found';
                document.querySelector(".name").innerHTML = ''
                document.querySelectorAll("img").forEach((img) => {
                    img.style.display = 'none';
                });
                document.querySelectorAll("p").forEach((p) => {
                    p.style.display = 'none';
                })
            }
        })
}
