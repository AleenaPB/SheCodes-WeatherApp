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

function showWeather(position) {
  console.log(position);
  let h1 = document.querySelector("h1");
  h1.innerHTML = position.data.name;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(position.data.main.temp)}º`;
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
}

//f(x) in charge of changing data content on the screen

function searchCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d7f1ea8072ee710d2d1c16127e8ba9f3";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function fahrenheitConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}º`;
}

function celsiusConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}º`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 card">
            <img src="images/02d.gif" class="card-img-top" alt="weather" />
            <div class="card-body weather-forecast-date">
              <p class="card-text">
                ${day} <br />
                <span class="weather-forecast-max">14º</span>
                /
                <span class="weather-forecast-min">24º</span>
              </p>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

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

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitConversion);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusConversion);

submittedCity("Gold Coast"); //default city page
