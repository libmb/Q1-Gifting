$(document).ready(function() {
  var currentGift = localStorage.getItem('giftTitle');
  populatePage(currentGift)
}

function populatePage(currentGift) {
  $.get("objects.json")
  .then(function(json){
    for (var i = 0; i < json.length; i++) {
      if (json[i].title === currentGift) {
        $('.mainTitle').append(json[i].title)
        // add the other info after this works
    }
  }
})
