let weather = {
    apiKey: "240d4193038f427d8e54291c188bfe7c",
    fetchWeather: function (city) {
    fetch(
        "https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&city="
        + city
        + "&key="
        + this.apiKey
    ).then((res) => {
        if (!res.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return res.json();
      })
      .then(data => obj = data)
        .then(() => this.displayWeather(obj))
    },    
  displayWeather: function (data) {
    console.log(data)
    const name =data.data[0].city_name
    const icon= data.data[0].weather.icon
    const description=  data.data[0].weather.description
    const temp=data.data[0].temp
    const humidity=data.data[0].rh
    const speed=data.data[0].wind_spd
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://www.weatherbit.io/static/img/icons/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = speed + "km/h wind speed";
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector("#contentVisi").style.backgroundImage =
      " url('https://source.unsplash.com/1600x900/?" + name + "')";
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

    weather.fetchWeather("Jeddah");