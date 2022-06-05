function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayNumber = date.getDate();
  let year = date.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let timeSentence = `${day} - ${month} ${dayNumber}, ${year} - (${hours}:${minutes})`;
  return timeSentence;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  submittedCity(city);
}

function submittedCity(city) {
  let apiKey = "d7f1ea8072ee710d2d1c16127e8ba9f3";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "d7f1ea8072ee710d2d1c16127e8ba9f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//f(x) in charge of changing data content on the screen
function showWeather(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = position.data.name;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(position.data.main.temp)}ºC`;
  document.querySelector("#weather-descriptor").innerHTML =
    position.data.weather[0].description;
  document.querySelector("#high").innerHTML = Math.round(
    position.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    position.data.main.temp_min
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    position.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = position.data.main.humidity;
  let iconElement = document.querySelector("#search-city-image");
  iconElement.setAttribute(
    "src",
    `images/${position.data.weather[0].icon}.gif`
  );
  celsiusTemperature = position.data.main.temp;

  getForecast(position.data.coord);
}

function searchCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d7f1ea8072ee710d2d1c16127e8ba9f3";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 card">
            <img src="images/${
              forecastDay.weather[0].icon
            }.gif" class="card-img-top" alt="weather" />
            <div class="card-body weather-forecast-date">
              <p class="card-text">
                ${formatDay(forecastDay.dt)} <br />
                <span class="weather-forecast-max">${Math.round(
                  forecastDay.temp.max
                )}º</span>
                /
                <span class="weather-forecast-min">${Math.round(
                  forecastDay.temp.min
                )}º</span>
              </p>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", searchCurrentCity);

let current = document.querySelector("#date");
let now = new Date();
current.innerHTML = formatDate(now);

let description = document.querySelector("#weather-descriptor");
let high = document.querySelector("#high");
let low = document.querySelector("#low");
let wind = document.querySelector("#wind-speed");
let humidity = document.querySelector("#humidity");

submittedCity("Gold Coast"); //default city page
