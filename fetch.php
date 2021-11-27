<?php 
$con = mysqli_connect("localhost","root","","weather");
$count = 0;
$curDate = date("d/M/Y");
$query = "SELECT * FROM data ORDER BY id DESC";
$fire = mysqli_query($con,$query) OR die(mysqli_error($con));
if(isset($_POST["fetch_type1"]) == "short"){
	while($row = mysqli_fetch_assoc($fire)){
	    if($count < 4){
	    	$html = '<div class="card ml-3 mb-2 text-white">
					    <p>'.$row["weather_when"].'</p>
					    <h3 class="ml-5"><b><span id="temp">'.$row["weather_temperature"].'</span> &deg;C</b></h3>
					    <h6 class="mt-2">Humidity: <span id="past_hum">'.$row["weather_humidity"].'</span> %</h6>
					    <h6>Wind Speed: <span id="past_air">'.$row["weather_wind"].'</span> mph</h6>
					    <h6>Weather Description: <span id="past_weather">'. $row["weather_description"].'</span></h6>
					    <h6>Date: <span id="past_wind">'.$row["date"].'</span></h6>
					</div>';
			echo $html;
	        $count += 1; 
	    }else{
	    	break;
	    } 
    }
}
if(isset($_POST["fetch_type2"]) == "full"){
	while($row = mysqli_fetch_assoc($fire)){
		$html = '<div class="card ml-3 mb-2 text-white">
				    <p>'.$row["weather_when"].'</p>
				    <h3 class="ml-5"><b><span id="temp">'.$row["weather_temperature"].'</span> &deg;C</b></h3>
				    <h6 class="mt-2">Humidity: <span id="past_hum">'.$row["weather_humidity"].'</span> %</h6>
				    <h6>Wind Speed: <span id="past_air">'.$row["weather_wind"].'</span> mph</h6>
				    <h6>Weather Description: <span id="past_weather">'. $row["weather_description"].'</span></h6>
				    <h6>Date: <span id="past_wind">'.$row["date"].'</span></h6>
				</div>';
		echo $html;
    }
}
?>
