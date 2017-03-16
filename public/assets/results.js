$(document).ready(function() {
    var aTagGift = localStorage.getItem('giftTitle');
    console.log(aTagGift)
    var currentGift = aTagGift.substring(24, aTagGift.length - 4)
    console.log(currentGift)
    populatePage(currentGift)
})

function populatePage(currentGift) {
    $.get("objects.json")
        .then(function(json) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].title === currentGift) {
                    $('.mainTitle').append(json[i].title)
                    $('.mainCost').append(json[i].cost)
                    $('.mainSummary').append(json[i].summary)
                    $('.mainTools').append(json[i].tools)
                    $('.mainTogether').append(json[i].giftTogether)
                    $('.mainSend').append(json[i].giftSend)
                    $('.mainBonus').append(json[i].bonus)
                    // add the other info after this works
                }
            }
        })
}
