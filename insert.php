<?php
$con = mysqli_connect("localhost","root","","weather");
//recieving the posted data and store it into database
if(isset($_POST['currentTemp'])){
    $temp = $_POST["currentTemp"];
    $wind = $_POST["wind"];
    $humidity = $_POST["humidity"];
    $description = $_POST["description"];
    $time =  $_POST["time"];
    $date = Date("d/M/Y");
    //insert into database
    $query = "INSERT INTO data(weather_temperature,weather_wind,weather_humidity,weather_description,   weather_when,date) VALUES('$temp','$wind','$humidity','$weather','$time','$date')";
    $result = mysqli_query($con,$query) or die(mysqli_error($con));
}

?>