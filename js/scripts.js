// functions
function findUserLocation() {
  // grab user location coords
  var URL = "http://ip-api.com/json";
  $.get(URL, function(data) {
	// if coords, assign to variables and pass to getWeatherData();
	if (data) {
	  var lat = data.lat;
	  var lon = data.lon;
	  var state = data.region;
	  var city = data.city;
	  var units = 'imperial';
	  getWeatherData(lat, lon, state, city, units);
	  // else error
	} else {
	  var error = "There was an error reading your location, please try again later.";
	  alert(error);
	}
  });
}

function getWeatherData(lat, lon, state, city, units) {
  // use user coords to construct api call URL
  var API_KEY = "716ef9817fee12855e081e460f4fcdf0";
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + API_KEY + "&callback";
  // weather API call
  $.getJSON(apiUrl, function(data) {
	// if data, parse JSON from api
	if (data) {
	  var temp = Math.round(data.main.temp);
	  var weather = data.weather[0].description;
	  //weather = weather.toUpperCase();
	  var icon = data.weather[0].icon;
	  var iconURL = '"' + 'http://openweathermap.org/img/w/' + icon + '.png' + '"';
	  switch(weather) {
		  case "clear sky":
			$("body").css("background-image", "url('http://s33.postimg.org/oyrz7b1tr/clear_sky.jpg')");
			break;
		  case "few clouds":
			$("body").css("background-image", "url('http://s33.postimg.org/ap4x95ngf/few_clouds.jpg')");
			break;
		  case "scattered clouds":
			$("body").css("background-image", "url('http://s33.postimg.org/3l1coq1a7/scattered_clouds.jpg')");
			break;
		  case "broken clouds":
			$("body").css("background-image", "url('http://s33.postimg.org/3l1coq1a7/scattered_clouds.jpg')");
			break;
		  case "shower rain":
			$("body").css("background-image", "url('http://s33.postimg.org/nemn8wtfj/shower_rain.jpg')");
			break;
		  case "rain":
			$("body").css("background-image", "url('http://s33.postimg.org/89qjbe58f/rain.jpg')");
			break;
		  case "thunderstorm":
			$("body").css("background-image", "url('http://s33.postimg.org/4788kf8xr/thunderstorm.jpg')");
			break;
		  case "snow":
			$("body").css("background-image", "url('http://s33.postimg.org/ndcpfhrlr/snow.jpg')");
			break;
		  case "mist":
			$("body").css("background-image", "url('http://s33.postimg.org/6t5u1rnjz/mist.jpg')");
			break;
		  default:
			$("body").css("background-image", "url('http://www.pixelstalk.net/wp-content/uploads/2016/07/Weather-Photo.jpg')");
			break;
	  }
	  updatePageData(city, state, temp, iconURL);
		// else error
	} else {
	  var error = "There was an error checking your weather. Please try again later.";
	  alert(error);
	}
  });
}

function jacketWeather(temp) {
	var jacketMaybe = "Probably, yes (if you get cold easily)";
	var jacketYes = "Absolutely, yes";
	var jacketNo = "Probably not";
	if (temp <= 55 && temp >= 45) {
		$(".jacket").html(jacketMaybe);
	}
	else if (temp < 45) {
		$(".jacket").html(jacketYes);
	}
	else {
		$(".jacket").html(jacketNo);
	}
}

function updatePageData(city, state, temp, iconURL) {
  // update data on page + background with weather data
  var html = "<p>" + city + ", " + state + "</p>";
  html += "<p id='temp'><span id='degrees'>" + temp + "</span>&deg; <span id='units'>F</span></p>";
  html += '<p><img src=' + iconURL + '><p>';
  $(".weather-data").html(html);
  jacketWeather(temp);
}

function convertToF(temp) {
  return Math.round((temp * 1.8) + 32);
}

function convertToC(temp) {
  return Math.round((temp - 32) * 0.55556);
}


// runtime
$(document).ready(function() {
  // Handler for .ready() called. 
  findUserLocation();
  
  

$(document).on("click", "#convert", function() {
  var unit = $("#units").html();
  var temp = $("#degrees").html();
  if (unit === "C") {
	var newTempF = convertToF(temp);
	var htmlF = "<p id='temp'><span id='degrees'>" + newTempF + "</span>&deg; <span id='units'>F</span></p>";
	$("#temp").html(htmlF);   
  } else if (unit === "F") {
	var newTempC = convertToC(temp);
	var htmlC = "<p id='temp'><span id='degrees'>" + newTempC + "</span>&deg; <span id='units'>C</span></p>";
	$("#temp").html(htmlC);
  }
  });
  
});