let weather = {
    apiKey: "",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        // Getting the values and setting up on the variables
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, temp_min, temp_max, pressure } = data.main;
        const { speed } = data.wind;
        const { visibility } = data;

        // Emojis for elements
        const weatherEmoji = {
            "Clear": "☀️",
            "Clouds": "☁️",
            "Rain": "🌧️",
            "Drizzle": "🌦️",
            "Thunderstorm": "⛈️",
            "Snow": "❄️",
            "Mist": "🌫️",
            "Fog": "🌫️",
            "Overcast Clouds": "☁️", // Add this line to handle "Overcast Clouds"
            // Add more emojis as needed for other weather conditions
        };

        // Format sunrise and sunset times
        const sunriseTimestamp = data.sys.sunrise * 1000; // Convert to milliseconds
        const sunsetTimestamp = data.sys.sunset * 1000; // Convert to milliseconds
        const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString();
        const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString();

        // Displaying the data with emojis
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = (weatherEmoji[description] || "") + " " + description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "💧 Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "🌬️ Wind speed: " + speed + " km/h";
        document.querySelector("#sunrise-time").innerText =
            "🌅 Sunrise: " + sunriseTime;
        document.querySelector("#sunset-time").innerText =
            "🌇 Sunset: " + sunsetTime;
        document.querySelector("#min-temp").innerText =
            "🌡️ Min Temperature: " + temp_min + "°C";
        document.querySelector("#max-temp").innerText =
            "🔥 Max Temperature: " + temp_max + "°C";
        document.querySelector("#pressure").innerText =
            "🏠 Pressure: " + pressure + " hPa";
        document.querySelector("#visibility").innerText =
            "👁️ Visibility: " + visibility + " meters";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

// Initial weather fetch (you can change the default location)
weather.fetchWeather("Denver");
function updateClock() {
    const options = { timeZone: 'Asia/Kolkata', hour12: true, timeStyle: 'short' };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    document.getElementById('clock').textContent = currentTime;
}

setInterval(updateClock, 1000);
updateClock();
