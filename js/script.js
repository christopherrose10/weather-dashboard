var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var responseHeaderEl = document.querySelector("#repo-search-term");


var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input element
    var username = nameInputEl.value.trim();
    console.log(username);

    if (username) {
        findCity(username);
        repoContainerEl.textContent = "";
        nameInputEl.value = "";

    } else {
        alert("Please enter a city.");
    }
};

var findCity = function (username) {
    console.log(username);
    fetch(
        // Fetch for city 
        `https://api.openweathermap.org/data/2.5/weather?q=${username}&appid=${apiKey}&units=imperial`
        //
    )
        .then(function (citySearched) {
            return citySearched.json();
        })
        .then(function (citySearched) {
            console.log(citySearched);
            // Variable to hold the title of city
            // YOUR CODE HERE
            var currentCity = citySearched.name;
            var currentTemp = document.createElement("p");
            currentTemp.textContent = "Temperature: " + citySearched.main.temp;
            var currentHum = document.createElement("p");
            currentHum.textContent = "Humidity: " + citySearched.main.humidity;
            var windSpeed = document.createElement("p");
            windSpeed.textContent = "Wind Speed: " + citySearched.wind.speed;
            // Display the City as a <h2> heading
            // YOUR CODE HERE
            responseHeaderEl.innerHTML = "<h2>" + currentCity + "</h2>";
            responseHeaderEl.append(currentTemp, currentHum, windSpeed);

            var lat = citySearched.coord.lat;
            var lon = citySearched.coord.lon;
            getUVIndex(lat, lon);
            fiveDay(username);

        })
        // .then(function (response) {
        //     return response.json();
        // })
        // .then(function (response) {
        //     if (response.data.length === 0) {
        //         console.log('City not found.');
        //     } else {
        //         console.log(response.data[0]);
        //         var responseContainerEl = document.querySelector('#repos-container');
        //         responseContainerEl.innerHTML = '';
        //     }
        // });
}

function getUVIndex (lat,lon) {
    console.log(username);
    fetch(
        // Fetch for city 
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        //
    )
        .then(function (citySearched) {
            return citySearched.json();
        })
        .then(function (citySearched) {
            console.log(citySearched);
            var currentUVI = document.createElement("p");
            currentUVI.textContent = "UV Index: " + citySearched.current.uvi;
            responseHeaderEl.append(currentUVI);

        })

}

function fiveDay (username) {
    fetch(
        // Fetch for city 
        `https://api.openweathermap.org/data/2.5/forecast?q=${username}&appid=${apiKey}&units=imperial`
        //
    )
        .then(function (citySearched) {
            return citySearched.json();
        })
        .then(function (citySearched) {
            console.log(citySearched);
            // var currentUVI = document.createElement("p");
            // currentUVI.textContent = "UV Index: " + citySearched.current.uvi;
            // responseHeaderEl.append(currentUVI);
            for (i = 0; i < citySearched.list.length; i++) {

                if(citySearched.list[i].dt_txt.indexOf("18:00:00") !== -1) {
                    console.log(citySearched.list[i]);
                    var card = document.createElement("div");
                    card.setAttribute("class", "card");
                    var cardBody = document.createElement("div");
                    cardBody.setAttribute("class", "card-body");
                    var cityNameDate = document.createElement("h3");
                    cityNameDate.textContent = new Date(citySearched.list[i].dt_txt).toLocaleDateString();
                    var cityTemps = document.createElement("p");
                    cityTemps.textContent = citySearched.list[i].main.temp;
                    var cityHum = document.createElement("p");
                    cityHum.textContent = "Humidity: " + citySearched.list[i].main.humidity;
                    var cityWindSpeed = document.createElement("p");
                    cityWindSpeed.textContent = "Wind Speed: " + citySearched.list[i].wind.speed;        
                    cardBody.append(cityNameDate, cityTemps, cityHum, cityWindSpeed);
                    card.append(cardBody);
                    repoContainerEl.append(card);
                }
            };

        })

}

userFormEl.addEventListener("submit", formSubmitHandler);