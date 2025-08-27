const btn = document.getElementById("btn");
const input = document.getElementById("Input");
const container = document.getElementById("container");
const API_KEY = "4fc3fd47a1353f0337cf8f849b0b6385";

async function fetchData(city) {
  try {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    let data = await res.json();
    if (data.cod === "404") {
      alert("City not found!");
      return;
    }
    displayWeather(data);
  } catch (err) {
    console.log(err);
  }
}

async function fetchDataByCoordinates(lat, lon) {
  try {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    let data = await res.json();
    displayWeather(data);
  } catch (err) {
    console.log(err);
  }
}

btn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    fetchData(input.value.trim());
  } else {
    alert("Please enter a city name!");
  }
});

document.getElementById("locationBtn").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetchDataByCoordinates(lat, lon);
  });
});

function displayWeather({ wind, main, name, weather }) {
  document.getElementById("Temp").textContent = `${main.temp.toFixed(2)} °C`;
  document.getElementById("City").textContent = name;
  document.getElementById("cldd").textContent = weather[0].description;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  document.getElementById("wind").textContent = `${wind.speed} Km/h`;
  document.getElementById("pressure").textContent = `${main.pressure} hPa`;
  document.getElementById("humidity").textContent = `${main.humidity}%`;

  document.getElementById("weatherBox").style.display = "block";

  // Change background based on weather condition
  setDynamicBackground(weather[0].main.toLowerCase());
}

function setDynamicBackground(condition) {
  let backgroundImage = "";

  if (condition.includes("clear")) {
    backgroundImage = "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')";
  } else if (condition.includes("cloud")) {
    backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')";
  } else if (condition.includes("rain")) {
    backgroundImage = "url('https://images.unsplash.com/photo-1498855926480-d98e83099315')";
  } else if (condition.includes("snow")) {
    backgroundImage = "url('https://images.unsplash.com/photo-1608889178831-0f146b2f8ff6')";
  } else if (condition.includes("thunderstorm")) {
    backgroundImage = "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')";
  } else {
    backgroundImage = "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')";
  }

  container.style.backgroundImage = backgroundImage;
}
