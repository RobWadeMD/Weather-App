$(document).ready(function () {

    let currentTemp = "";
    let title = "";
    let currentHumidity = "";
    let currentDescription = "";
    let currentMain = "";

    let tempState = "celsius";

    function getWeather() {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=Magdeburg&APPID=dbe3ac87708688f0b67cacf7a055b5da",
            success: function (data) {
                var post = data;
                currentTemp = (data.main.temp - 273.15).toFixed(1);
                title = data.name;
                currentHumidity = data.main.humidity;
                currentDescription = data.weather[0].description;
                currentMain = data.weather[0].main;
                console.log(data);
                console.log(currentTemp, title, currentHumidity, currentDescription, currentMain);
                weatherToHtml(currentTemp, title, currentHumidity, currentDescription, currentMain);
            },
            cache: false
        });
    }


    function weatherToHtml(currentTemp, title, currentHumidity, currentDescription, currentMain) {
        console.log(currentMain);
        if (currentMain === "Clear") {
            var video = $("#video")[0];
            $("#videoSource").attr('src', "clear.mp4");
            video.load();
            video.play();
        }
        if (currentMain === "Rain") {
            var video = $("#video")[0];
            $("#videoSource").attr('src', "rain.mp4");
            video.load();
            video.play();
        }
        if (currentMain === "Snow") {
            var video = $("#video")[0];
            $("#videoSource").attr('src', "snow.mp4");
            video.load();
            video.play();
        }
        if (currentMain === "Fog") {
            var video = $("#video")[0];
            $("#videoSource").attr('src', "fogMobile.mov");
            video.load();
            video.play();
        }
        if (currentMain === "Clouds" && currentMain !== "New York") {
            var video = $("#video")[0];
            $("#videoSource").attr('src', "cloudy.mp4");
            video.load();
            video.play();
        }



        $('#currentTemperature').html(currentTemp + " °C");
        $('#currentHumidity').html(currentHumidity + "%");
        $('#currentMain').html(currentMain);
        $('#currentDescription').html(currentDescription);
        $('#title').html(title);
    }


    getWeather();

    $('#currentTemperature').click(
        () => {
            console.log('HELLO')
            console.log(currentTemp);
            if (tempState === "celsius") {
                currentTemp = currentTemp * 9 / 5 + 32;
                tempState = "fahrenheit";
                $('#currentTemperature').html(currentTemp + "°F");
            } else {
                currentTemp = (currentTemp - 32) / 1.8;
                tempState = "celsius";
                $('#currentTemperature').html(currentTemp + "°C");
            }
        }
    )





});
