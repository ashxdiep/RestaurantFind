//-------------------[Zomato API section]-------------------//

var zoAPI = "394d1e7d79d05683913b696732d33f83";

var testURL = "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&radius=20000&cuisines=55&count=15&radius=25%20mi"; //grabed from /search @ zomato



//-------------------[Google Maps section]-------------------//

var testLatLong = {lat: 30.2471972222, lng: -97.750725}; //Austin, TX
var markerLatLong;
var startAddress;
var latitude;
var longitude;


//creates blank map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: testLatLong
  });
} //-end of initMap-


//hide the search bar and button
$(".directionSearch").hide();


//test button starts test
$("#testBtn").on("click", function () {

  $.ajax({
    url: testURL,
    method: "GET",
    headers:{
      "user-key":zoAPI
    }
  })
  //after getting the response
  .done(function(response) {
    console.log(response);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: testLatLong
    });

    //for each of the objects returned
    for (var m =0; m < response.restaurants.length; m ++){

      latitude = response.restaurants[m].restaurant.location.latitude;
      latitude = parseFloat(latitude);
      longitude = response.restaurants[m].restaurant.location.longitude;
      longitude = parseFloat(longitude);

      //create a marker for each object returned
      var phiLambda = {lat: latitude, lng: longitude};

      var marker = new google.maps.Marker({
        position: phiLambda,
        map: map
      });
      markerClick(marker);
    }
  });

}); // -end of testBtn click


//listen for marker to be clicked
function markerClick(marker) {
  marker.addListener("click", function(event) {
    markerLatLong = this.position;
    showSearch(); //show the search bar and button
  });
}


//show the search bar and button
function showSearch() {
  $(".directionSearch").show();
}

//listen for go button to be clicked
$("#goBtn").on("click", function() {
  if ($("#startingPoint").attr("value") != "undefined") {
    startAddress = $("#startingPoint").val();
    showDirections();
  }
});


//creates map and side panel
function showDirections () {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: markerLatLong
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  onChangeHandler();
}


//shows visual directions on map
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: startAddress,
    destination: markerLatLong,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
