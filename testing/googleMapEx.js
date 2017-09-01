
//initMap function initiates when the Google Map API loads via the "callback" parameter (see googleMapEX.html)
//
function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var uluruuu = {lat: -24.363, lng: 130.044};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: uluru
  });

  var marker1 = new google.maps.Marker({
    position: uluru,
    map: map
  });

  var marker2 = new google.maps.Marker({
    position: uluruuu,
    map: map
  });

  marker1.addListener('click', function() {
    console.log("clicky click click");
  });

  ///////////////////////////////////////////////

  var myLatLng = {lat: -26.363, lng: 133.044};

  var map2 = new google.maps.Map(document.getElementById('map2'), {
    zoom: 4,
    center: myLatLng
  });

  var marker0 = new google.maps.Marker({
    position: myLatLng,
    map: map2,
    title: 'Hello World!'
  });

  mapNo3();
}



function mapNo3() {
  var theLatlng = new google.maps.LatLng(-24.363882,130.044922);
  var mapOptions = {
    zoom: 4,
    center: theLatlng
  }
  var map3 = new google.maps.Map(document.getElementById("map3"), mapOptions);


  var marker3 = new google.maps.Marker({
      position: theLatlng,
      label:"Hello World!",
      clickable:true
  });

  marker3.setMap(map3);

  $(marker3).on("click", function() {
    console.log("marker was cliked!!!");
  });

}
