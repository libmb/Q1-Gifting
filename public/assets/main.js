$(document).ready(function () {
  $('#getValues').click(function () {
    $('.results').text('')
    $('.gotresult').text('')
    var input = $('#zip').val()
    if (input === '' || input === 'null' || input === 'undefined') {
            // check in zip was entered for weather information
      var weatherOutcome = $('#enviro').val()
      populateResults(weatherOutcome)
    } else {
      input = $('#zip').val()
      getWeatherLocation(input)
    }
  })
  $('#reset').click(function () {
    $('.results').text('')
    $('.gotresult').text('')
  })
    // call get day here
  getCurrentDay()
})

// Date Select Box
function getCurrentDay () {
  var currentDate = new Date()
  var currentDayDigit = currentDate.getDay()
  var weekday = new Array(7)
  weekday[0] = 'Sunday'
  weekday[1] = 'Monday'
  weekday[2] = 'Tuesday'
  weekday[3] = 'Wednesday'
  weekday[4] = 'Thursday'
  weekday[5] = 'Friday'
  weekday[6] = 'Saturday'
  var currentDay = weekday[currentDate.getDay()]
  for (var i = currentDayDigit, value = 0; value < 7; i++, value++) {
    $('.date').append("<option value='" + value + "'> " + weekday[i % 7] + '</option>')
  }
}

// IF date is entered
function getWeatherLocation (input) {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyDJOdYoloJlsh9s-7vJOQiuAZKhMtJlnak'
  $.get(url)
        .then(function (data) {
          var long = data.results['0'].geometry.bounds.northeast.lng
          var lat = data.results['0'].geometry.bounds.northeast.lat
          var coordinates = lat + ',' + long
            // else use value of input ----out vs in
          getWeatherForcast(coordinates)
        })
}

function getWeatherForcast (coordinates) {
    // append coordinates to end of url
  var url = 'https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/e0c86e9af4363272e80b5775d2e75dc8/' + coordinates
  $.get(url)
        .then(function (data) {
          var dateInput = $('#date').val()
          var weatherHigh = data.daily.data[dateInput].apparentTemperatureMax
          var precipPoss = data.daily.data[dateInput].precipProbability
          var weatherOutcome = ''
          if (weatherHigh > '65' && precipPoss <= '0') {
            weatherOutcome = 'out'
          } else {
            weatherOutcome = 'in'
          }
          populateResults(weatherOutcome)
        })
}

// or will this be a .then on getWeatherForcast
function populateResults (weatherOutcome) {
  var activityLevel = $('#active').val()
    // var distance = $('#distance').val()
    // console.log(distance)
  $.get('objects.json')
        .then(function (json) {
          var count = 0
          for (var i = 0; i < json.length; i++) {
            if ((activityLevel === 'both' || json[i].activeLevel === activityLevel || json[i].activeLevel === 'both') &&
                    (weatherOutcome === 'both' || json[i].environment === weatherOutcome || json[i].environment === 'both')) {
              count++
              $('.results').append("<li> <a href='results.html'>" + json[i].title + '</a></li>')
                    // "<a href='results.html'>" + json[i].title + "</a>" +
            }
          }
          if (count > 1) {
            $('.gotresult').append('Plan a gift:')
            var eventList = document.querySelectorAll('.results, li')
            for (var i = 0; i < eventList.length; i++) {
              eventList[i].addEventListener('click', function (event) {
                event.stopPropagation()
                window.localStorage.setItem('giftTitle', this.innerHTML)
              })
            }
          }
        })
}
