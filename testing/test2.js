

//-------------------[put empty map on page upon load]-------------------//
var testLatLong = {lat: 30.2471972222, lng: -97.750725}; //Austin, TX

function callMe(){
  initMap();
  initMap2();
  initMap3();
  initMap4();
}


//creates blank map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: testLatLong
  });
} //-end of initMap-



//-------------------[test: pull lat & long from zomato]-------------------//
//var for zomato API
var zoAPI = "394d1e7d79d05683913b696732d33f83";

//cuisine search for locations
var searchFood = "tacos";
var searchLocation = "Austin";


//getting the response for zomato locations API
var foodURL ="https://developers.zomato.com/api/v2.1/search?q=" + searchLocation + "&count=15&radius=25%20mi";
var locationURL="https://developers.zomato.com/api/v2.1/locations?query=" + searchLocation + "&count=15&radius=25%20mi";
var testURL = "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&radius=20000&cuisines=55&count=15&radius=25%20mi" //grabed from /search @ zomato
//NOTE: functions for getting the following information everytime user searches still needed; each would be its own ajax call:
//1. location ID [entity_id] (diffent depend on zip or city; making user only use zip would simplify this)
//2. location type [entity_type] (see #1)
//3. cuisines
//NOTE: I feel that due to the limiations of zomato, it might be easier if the user can only put in a zip code and select a cuisine from a dropdown menue.  Then the only ajax call (other then the one like the example below) would have to be the one that returns a location ID based on the zip code searched for.



//lat & long variables
var latitude;
var longitude;

//listens for markers to be clicked
function markerClick(marker) {
  marker.addListener("click", function() {
    alert("marker!");
  });
}

//test button starts test
$("#testBtn").on("click", function () {
  console.log("click!");

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

    var map2 = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,//zoom set to 12 so all markers are seen at once
      center: testLatLong
    });

    //for each of the objects returned

    for (var m =0; m < response.restaurants.length; m ++){

      latitude = response.restaurants[m].restaurant.location.latitude;
      latitude = parseFloat(latitude);
      longitude = response.restaurants[m].restaurant.location.longitude;
      longitude = parseFloat(longitude);
      console.log(latitude);
      console.log(longitude);
      console.log("SEPERATOR");


      //create a marker for each object returned
      var phiLambda = {lat: latitude, lng: longitude};

      var marker = new google.maps.Marker({
        position: phiLambda,
        map: map2
      });
      markerClick(marker);
      console.log(marker);
      console.log("MARKER SEPERATOR");
    }
  });


});




//-------------------[test: get directions]-------------------//





function initMap2 () {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map2 = new google.maps.Map(document.getElementById('map2'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map2);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }






//-------------------[test: bring it all together]-------------------//

var markerLatLong
var startAddress
var testStartAdd = "Austin, TX";
$(".directionSearch").hide();

//initiate map3
function initMap3() {
  var map3 = new google.maps.Map(document.getElementById('map3'), {
    zoom: 14,
    center: testLatLong
  });
} //-end of initMap3-


//listen for marker to be clicked
function markerClick2(marker) {
  marker.addListener("click", function(event) {
    markerLatLong = this.position;
    showSearch();
    console.log("marker clicked.  markerLatLong: " + markerLatLong);
  });
}

function showSearch() {
  $(".directionSearch").show();
}


//listen for go button to be clicked
$("#goBtn").on("click", function() {
  if ($("#startingPoint").attr("value") != "undefined") {
    startAddress = $("#startingPoint").val();
    console.log("staring address is: " + startAddress);
    showDirections();
  }
});


function showDirections () {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map3 = new google.maps.Map(document.getElementById('map3'), {
    zoom: 11,
    center: markerLatLong
  });
  directionsDisplay.setMap(map3);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  onChangeHandler();
  // document.getElementById('start').addEventListener('change', onChangeHandler);
  // document.getElementById('end').addEventListener('change', onChangeHandler);
}


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


//test button starts test
$("#testBtn3").on("click", function () {
  console.log("click3!");

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

    var map3 = new google.maps.Map(document.getElementById('map3'), {
      zoom: 12,//zoom set to 12 so all markers are seen at once
      center: testLatLong
    });

    //for each of the objects returned

    for (var m =0; m < response.restaurants.length; m ++){

      latitude = response.restaurants[m].restaurant.location.latitude;
      latitude = parseFloat(latitude);
      longitude = response.restaurants[m].restaurant.location.longitude;
      longitude = parseFloat(longitude);
      console.log(latitude);
      console.log(longitude);
      console.log("SEPERATOR");


      //create a marker for each object returned
      var phiLambda = {lat: latitude, lng: longitude};

      var marker = new google.maps.Marker({
        position: phiLambda,
        map: map3
      });
      markerClick2(marker);
      console.log(marker);
      console.log("MARKER SEPERATOR");
    }
  });

}); // -end of testBtn3 click




//-------------------[test: written directions]-------------------//


var markerLatLong4
var startAddress4
var testStartAdd4 = "Austin, TX";
$(".directionSearch").hide();

//initiate map3
function initMap4() {
  var map4 = new google.maps.Map(document.getElementById('map4'), {
    zoom: 14,
    center: testLatLong
  });
} //-end of initMap4-


//listen for marker to be clicked
function markerClick4(marker) {
  marker.addListener("click", function(event) {
    markerLatLong4 = this.position;
    showSearch4();
    console.log("marker clicked.  markerLatLong: " + markerLatLong4);
  });
}

function showSearch4() {
  $(".directionSearch").show();
}


//listen for go button to be clicked
$("#goBtn4").on("click", function() {
  if ($("#startingPoint4").attr("value") != "undefined") {
    startAddress4 = $("#startingPoint4").val();
    console.log("staring address is: " + startAddress4);
    showDirections();
  }
});


function showDirections () {
  var directionsService4 = new google.maps.DirectionsService;
  var directionsDisplay4 = new google.maps.DirectionsRenderer;
  var map4 = new google.maps.Map(document.getElementById('map4'), {
    zoom: 11,
    center: markerLatLong4
  });
  directionsDisplay4.setMap(map4);
  directionsDisplay4.setPanel(document.getElementById('right-panel'));

  var onChangeHandler = function() {
    calculateAndDisplayRoute4(directionsService4, directionsDisplay4);
  };

  onChangeHandler();
}


function calculateAndDisplayRoute4(directionsService4, directionsDisplay4) {
  directionsService4.route({
    origin: startAddress4,
    destination: markerLatLong4,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay4.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


//test button starts test
$("#testBtn4").on("click", function () {
  console.log("click4!");

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

    var map4 = new google.maps.Map(document.getElementById('map4'), {
      zoom: 12,//zoom set to 12 so all markers are seen at once
      center: testLatLong
    });

    //for each of the objects returned

    for (var m =0; m < response.restaurants.length; m ++){

      latitude = response.restaurants[m].restaurant.location.latitude;
      latitude = parseFloat(latitude);
      longitude = response.restaurants[m].restaurant.location.longitude;
      longitude = parseFloat(longitude);
      console.log(latitude);
      console.log(longitude);
      console.log("SEPERATOR");


      //create a marker for each object returned
      var phiLambda = {lat: latitude, lng: longitude};

      var marker = new google.maps.Marker({
        position: phiLambda,
        map: map4
      });
      markerClick4(marker);
      console.log(marker);
      console.log("MARKER SEPERATOR");
    }
  });

}); // -end of testBtn4 click
