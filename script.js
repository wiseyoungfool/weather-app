// Search Form
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search");
const searchButton = document.getElementById("get-weather");

// Weather
const weather = document.getElementById("weather");
const loc = document.getElementById("location");
const temp = document.getElementById("temp");
const icon = document.getElementById("main-weather-icon");

// Details
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const precipitationProbability = document.getElementById("prec-prob");

searchForm.addEventListener("submit", searchWeather);
getWeather("Philadelphia");

async function getWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=4EJ7R4VXQT4N3V8P4Y2D2D5QA`, {mode: 'cors'});

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    else {
        response.json().then(function(response) {
            console.log(response);
            loc.textContent = response.resolvedAddress;
            weather.textContent = response.currentConditions.conditions;
            temp.textContent = response.currentConditions.temp + "°F";
            description.textContent = response.description;
            feelsLike.textContent = "Feels Like: " + response.currentConditions.feelslike + "°F";
            humidity.textContent = "Humidity: " + response.currentConditions.humidity + "%";
            wind.textContent = "Wind: " + response.currentConditions.windspeed + "mph";

            setWeatherIcon(response.currentConditions.icon);
        });
    }

}

function setWeatherIcon(iconName) {
    const iconPath = `icons/${iconName}.svg`;
    const weatherIconDiv = document.getElementById('main-weather-icon');
    weatherIconDiv.innerHTML = '';

    const imgElement = document.createElement('img');
    imgElement.src = iconPath;
    imgElement.alt = iconName;

    weatherIconDiv.appendChild(imgElement);
    console.log(`Weather Icon Set: ${iconName}`);
}

function searchWeather() {
    event.preventDefault();

    const location = searchBox.value;
    searchBox.value = "";
    getWeather(location);
}