let weather = {
    apiKey: '763ee6440fc3ebae8012f486cef21891',

    fetchWeather: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch((err) => alert('Location not found :)'));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;
        console.log(name, temp, humidity, icon, description, speed);

        document.querySelector('h2').innerHTML = 'Weather in ' + name;
        document.querySelector('.temperature-degree').innerHTML = Math.floor(temp);
        document.querySelector('.icon').src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        document.querySelector('.temperature-description').innerHTML = description;
        document.querySelector('.humidity').innerHTML = 'Humidity : ' + humidity + ' %';
        document.querySelector('.wind').innerHTML = 'Wind Speed : ' + speed + ' km/hr';
    },

    search: function () {
        this.fetchWeather(document.querySelector('#city').value);
    },
};

document.querySelector('.search ').addEventListener('click', function () {
    weather.search();
    document.querySelector('#city').value = '';
})

// for enter key
document.querySelector('#city').addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        weather.search();
        document.querySelector('#city').value = '';
    }
})

//onloading displays current location weather
window.addEventListener('load', () => {
    let long;
    let lat;
    let api;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // console.log(lat, long);
            api = '763ee6440fc3ebae8012f486cef21891';
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api}`
            )
                .then((response) => response.json())
                .then((data) => weather.displayWeather(data));
        });
    }
});

Btn.addEventListener('click', buttonClick);

function buttonClick() {
    var Xhttp = new XMLHttpRequest();
    Xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("des").innerHTML = this.responseText;
            document.getElementById("des").toggle();
        }
    };
    Xhttp.open("GET", "des.txt", true);
    Xhttp.send();
}




