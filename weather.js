const apiKey = 'cb3f7e4144d0ce99114d5e2a986fd7b4';

document.getElementById('search-bar').addEventListener('submit', function(e) {
  e.preventDefault();
  let city = document.getElementById('search').value;
  getWeather(city);
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const weatherDiv = document.getElementById('weather');
      const temp = data.main.temp;
      updateBackground(temp);
      const sunriseTime = unixToTime(data.sys.sunrise);
      const sunsetTime = unixToTime(data.sys.sunset);
     
      weatherDiv.innerHTML = `
        <h2>${data.name}'s Weather</h2>
        <div class="weather-detail"><p>Temperature: ${temp}°C</p></div>
        <div class="weather-detail"><p>Feels like: ${data.main.feels_like}°C</p></div>
        <div class="weather-detail"><p>Clouds: ${data.weather[0].description}</p></div>
        <div class="weather-detail"><p>Humidity: ${data.main.humidity}%</p></div>
        <div class="weather-detail"><p>Sunrise: ${sunriseTime} AM</p></div>
        <div class="weather-detail"><p>Sunset: ${sunsetTime} PM</p></div>
      `;
    })
    .catch(error => {
      console.error('error ${error}'); // TODO: fix error message
    });
}

// TODO: convert to local time?z
function unixToTime(unix_timestamp) { 
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
}

function updateBackground(temp) {
  let gradient;
  if (temp < 0) {
    gradient = 'linear-gradient(135deg, #00c6ff, #0072ff)'; // cold asf
  } else if (temp < 15) {
    gradient = 'linear-gradient(135deg, #00d4ff, #009fff)'; // chilly
  } else if (temp < 25) {
    gradient = 'linear-gradient(135deg, #ffbb00, #ff9900)'; // normal
  } else {
    gradient = 'linear-gradient(135deg, #ff5f00, #ff0000)'; // hot
  }
  document.body.style.background = gradient;
}

getWeather('London');
