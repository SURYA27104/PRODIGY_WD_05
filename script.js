const apiKey = 'c6ada1d10965e3a29df860892048b368';

function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            changeBackground(data.weather[0].main);
            playWeatherSound(data.weather[0].main);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherByUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                    changeBackground(data.weather[0].main);
                    playWeatherSound(data.weather[0].main);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
        <p>Weather: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function changeBackground(weatherCondition) {
    const videoSource = document.getElementById('video-source');
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            videoSource.src = 'Blue Sky.mp4';
            break;
        case 'clouds':
            videoSource.src = 'clouds.mp4';
            break;
        case 'rain':
        case 'drizzle':
            videoSource.src = 'rain.mp4';
            break;
        case 'thunderstorm':
            videoSource.src = 'Thunderstorms bg.mp4';
            break;
        case 'snow':
            videoSource.src = 'Snow.mp4';
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            videoSource.src = 'tor.mp4';
            break;
        default:
            videoSource.src = 'Weather.mp4';
            break;
    }
    const video = document.getElementById('background-video');
    video.load();
}

function playWeatherSound(weatherCondition) {
    const weatherSound = document.getElementById('weather-sound');
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            weatherSound.src = 'b.mp3';
            break;
        case 'clouds':
            weatherSound.src = 'cloud.mp3';
            break;
        case 'rain':
        case 'drizzle':
            weatherSound.src = 'rain.mp3';
            break;
        case 'thunderstorm':
            weatherSound.src = 'thunder.mp3';
            break;
        case 'snow':
            weatherSound.src = 'a.mp3';
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            weatherSound.src = 'tor.mp3';
            break;
        default:
            weatherSound.src = '';
            break;
    }
    weatherSound.play();
}
