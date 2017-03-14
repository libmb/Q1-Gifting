$(document).ready(function() {
  $('#getValues').click(function(){
    // Make on submit
    var input = $('#zip').val()
    console.log(input)
    if (input === "" || input === "null" || input === "undefined") {
        // check in zip was entered for weather information
        var weatherOutcome = $('#enviro').val()
        populateResults(weatherOutcome)
    } else {
      input = $('#zip').val()
      getWeatherLocation(input)
    }
  })
})

// IF date is entered
function getWeatherLocation(input) {
  var url= "https://maps.googleapis.com/maps/api/geocode/json?address=" + input +"&key=AIzaSyDJOdYoloJlsh9s-7vJOQiuAZKhMtJlnak"
  $.get(url)
  .then(function(data){
    var long = data.results["0"].geometry.bounds.northeast.lng
    var lat = data.results["0"].geometry.bounds.northeast.lat
    var coordinates = lat+','+long
    // else use value of input ----out vs in
    getWeatherForcast(coordinates)
    console.log("coordinates " + coordinates)
  })
  }


function getWeatherForcast(coordinates) {
  // append coordinates to end of url
  var url= "https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/e0c86e9af4363272e80b5775d2e75dc8/" + coordinates
  $.get(url)
  .then(function(data){
    var dateInput = $('#date').val()
    console.log("day of the week: " + dateInput)
    var iconImg = data.daily.data[dateInput].icon
    var weatherHigh = data.daily.data[dateInput].apparentTemperatureMax
    console.log("high temp: " + weatherHigh)
    var precipPoss = data.daily.data[dateInput].precipProbability
    console.log("chance of precip:" + precipPoss)
    var weatherOutcome = ""
    if (weatherHigh > "65" && precipPoss <= "0") {
      weatherOutcome = "out"
    } else {
      weatherOutcome = "in"
    }
    console.log(weatherOutcome, iconImg)
    populateResults(weatherOutcome)
  })
}

// or will this be a .then on getWeatherForcast
function populateResults(weatherOutcome) {
    var activityLevel = $('#active').val()
    var distance = $('#distance').val()
    console.log(weatherOutcome)
    console.log(activityLevel)
    console.log(distance)
    $.get("objects.json")
    .then(function(json){
     console.log("got objects.json")
     console.log(json)
     console.log(json["0"].activeLevel)
     for (var i = 0; i < json.length; i++){
       if ((json[i].activeLevel === activityLevel ||  json[i].activeLevel === "both" )
        && ( json[i].environment === weatherOutcome ||  json[i].environment === "both" ))
        console.log(json[i].title)
        $('.results').append(json[i].title)
     }
   })
}
