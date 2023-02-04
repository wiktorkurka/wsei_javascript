const weatherContainer = document.querySelector("#weather-container");
const cityInput = document.querySelector("#city-input");
const clearButton = document.querySelector("#clear-button");

const API_KEY = ""

let cities = {}; // { cityName: {lat: double, lon: double, ?prognosis: {}} }

// Load saved cities from local storage
const loadCities = () => {
  if (localStorage.getItem("cities")) {
    cities = JSON.parse(localStorage.getItem("cities"));
  }
};

// Save cities to local storage
const saveCities = () => {
  localStorage.setItem("cities", JSON.stringify(cities));
};

// Get city location
const getGeolocation = async (city) => {
  const apiResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );

  return await apiResponse.json();
}

// Get weather for a city
const getWeather = async (lat, lon) => {
  const apiResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return await apiResponse.json();
};

// Render the weather for all cities
const renderWeather = async () => {
  weatherContainer.innerHTML = "";
  await Promise.all(
    Object.values(cities).map(async city => {

      if (!city)
        return;

      const weather = await getWeather(city.lat, city.lon);
      if (!weather)
        return;
      
      const weatherCard = document.createElement("div");
      weatherCard.classList.add("weather-card");
      weatherCard.innerHTML = `
        <h2>${city.name}</h2>
        <p>Temperature: ${(weather.main.temp - 273.15).toFixed(2)}°C</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="Weather icon">
      `;
      weatherContainer.appendChild(weatherCard);
    })
  );
};

// Add a city to the list of cities
const addCity = async city => {
  let savedCities = Object.keys(cities);
  if (savedCities.length >= 10 || savedCities.includes(city))
    return;

  await new Promise( async () => {
    const geolocation = await getGeolocation(encodeURIComponent(city));
    if (!geolocation) {
      return;
    }
    cities[city] = geolocation[0];
    saveCities();
    renderWeather();
  })
};

// Clear all cities from the list
const clearCities = () => {
  cities = {};
  saveCities();
  renderWeather();
};

// Event listeners
document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  addCity(cityInput.value);
  cityInput.value = "";
});

clearButton.addEventListener("click", clearCities);

// Initial load and render
loadCities();
renderWeather();
