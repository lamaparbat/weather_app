// loading event until everything is load
var preloader = document.getElementById('preloader')
setTimeout(function() {
    preloader.style.display = "none"
}, 2000)

//fetch and display the data from fetch.php
var fetch_type1 = "short"
$.ajax({
    url:"fetch.php",
    type:"post",
    data:{data:true,fetch_type1},
    success:function(data){
        $("#data1").html(data)
        const anchor = '<a class="text-light ml-3 mt-2" href="full_data.html"><i class="fas fa-arrow-right"></i></a>'
        $("#data1").append(anchor)
    }
})

//display full data
var fetch_type2 = "full"
$.ajax({
    url:"fetch.php",
    type:"post",
    data:{data:true,fetch_type2},
    success:function(data){
        $("#data2").html(data)
    }
})

console.log("hacker")

var time = new Date().toLocaleTimeString().substr(0,new Date().toLocaleTimeString().length-2)
//displaying the current time on dashboard
$("#main-data #currentTime").text(time)
$("#main-data #meridian").text(new Date().toLocaleTimeString().substr(new Date().toLocaleTimeString().length-2,new Date().toLocaleTimeString().length))


//updating time by second
setInterval(function(){
    time = new Date().toLocaleTimeString().substr(0,new Date().toLocaleTimeString().length-2)
    //displaying the current time on dashboard
    $("#main-data #currentTime").text(time)
    $("#main-data #meridian").text(new Date().toLocaleTimeString().substr(new Date().toLocaleTimeString().length-2,new Date().toLocaleTimeString().length))
},100)

// ****************   OpenWeatherAPI Data fetch **************
let currentTemp,humidity,pressure,weather,wind,icon
setInterval(function() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Dunde&appid=6a4a168096ae21b3e0d949084175795b&units=metric").then(function(resolve, error) {
        return resolve.json()
    }).then(function(data) {
        currentTemp = data.main.feels_like;
        humidity = data.main.humidity;
        pressure = data.main.pressure;
        weather = data.weather[0].description;
        wind = data.wind.speed;
        icon = data.weather[0].icon

        // insert data in between gap of 1 hrs
        insertDatabase(currentTemp, wind,humidity,weather, time)
    })
}, 3600000)

function insertDatabase(currentTemp, wind,humidity,weather, time){
    //transfer the data to insert.php file
    $.ajax({
        url:"insert.php",
        type:"post",
        data:{data:true,currentTemp,wind,humidity,weather,time},
        success:function(data){
            //code
        }
    })
}


//public method to retrieve the set the local storage data on HTML component
const fillLocalStorageData = () => {
    //appending updated data on repective element
    $("#weather_icon").attr('src', `http://openweathermap.org/img/wn/${localStorage.icon}`)
    $("#current_temp").text(localStorage.currentTemp)
    $("#humidity").text(localStorage.humidity + " %")
    $("#pressure").text(localStorage.pressure + " mph")
    $("#weather").text(localStorage.description)
    $("#wind").text(localStorage.wind + " mph")

}
fillLocalStorageData()
// Check browser cache first, use if there and less than 10 seconds old
if(localStorage.when != null && parseInt(localStorage.when) + 10000 > Date.now()) {
      let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s)";
      //appending updated data on repective element
      fillLocalStorageData()
    
// No local cache, access network
} else {
    // Fetch weather data from API for given city
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Dunde&appid=6a4a168096ae21b3e0d949084175795b&units=metric')
        
      // Convert response string to json object
      .then(response => response.json())
      .then(data => {
        // Save new data to browser, with new timestamp
        localStorage.icon = data.weather[0].icon+"@2x.png"
        localStorage.currentTemp = data.main.temp
        localStorage.humidity = data.main.humidity
        localStorage.pressure = data.main.pressure
        localStorage.description = data.weather[0].description
        localStorage.wind = data.wind.speed
        localStorage.when = Date.now(); 
        // Copy one element of response to our HTML paragraph
        fillLocalStorageData()
        
      })
      .catch(err => {   
        // Display errors in console
        console.log(err);
      });
}   

// ******** Cache Storage ***********
if(navigator.serviceWorker){
    navigator.serviceWorker.register("ServiceWorker.js")
}




// thankyou poppup model 
$("#curtains").css("display", "none")
$("#thankModel").css("display", "none")
$(".data ul #love").click(function() {
    $("#curtains").css("display", "block")
    $("#thankModel").css("display", "block")
})

//cancel popup model
$("#thankModel button").click(function() {
    $("#curtains").css("display", "none")
    $("#thankModel").css("display", "none")
})

$("#map").css("display", "none")
$("#globe").click(function() {
    $("#map").css("display", "block")
    $("#curtains").css("display", "block")
})
$("#cancleMap").click(function() {
    $("#map").css("display", "none")
    $("#curtains").css("display", "none")
})
