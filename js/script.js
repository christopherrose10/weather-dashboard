var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        findCity(username);
        repoContainerEl.textContent = "";
        nameInputEl.value = "";
    } else {
        alert("Please enter a city.");
    }
};

var findCity = function () {
    fetch(
        // Fetch for city 
        `https://api.openweathermap.org/data/2.5/onecall?`
        //
    )
        .then(function (citySearched) {
            return citySearched.json();
        })
        .then(function (citySearched) {
            // Variable to hold the title of city
            // YOUR CODE HERE
            var currentCity = citySearched.query.random[0].title;
            // Display the City as a <h2> heading
            // YOUR CODE HERE
            var responseHeaderEl = document.querySelector("#repo-search-term");
            responseHeaderEl.innerHTML = "<h2>" + currentCity + "</h2>";

        })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if (response.data.length === 0) {
                console.log('City not found.');
            } else {
                console.log(response.data[0]);
                var responseContainerEl = document.querySelector('#repos-container');
                responseContainerEl.innerHTML = '';
            }
        });
}

userFormEl.addEventListener("submit", formSubmitHandler);