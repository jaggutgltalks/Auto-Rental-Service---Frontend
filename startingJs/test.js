
let autocomplete1;
let autocomplete2;

function initAutocomplete(){
    autocomplete1 = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete1'),
        {
            types : ['establishment'],
            // componentRestrictions : {'state' : ['Uttar Pradesh']},
            fields : ['geometry']
        });
    autocomplete2 = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete2'),
        {
            types : ['establishment'],
            // componentRestrictions : {'state' : ['Uttar Pradesh']},
            fields : ['geometry']
        });
        // definition of addListener to be checked
        autocomplete1.addListener('place_changed',onPlaceChanged1);
        autocomplete2.addListener('place_changed',onPlaceChanged2);
        // code();
}

var latitude1;
var longitude1;

function onPlaceChanged1(){
    var place1 = autocomplete1.getPlace();
    if(!place1.geometry){
        document.getElementById('autocomplete1').placeholder = 'Enter a valid place';
    }
    else{
        latitude1 = place1.geometry.location.lat();
        longitude1= place1.geometry.location.lng();
        // initialize(); //map popup
    }
}
// check this window.init
window.initMap = onPlaceChanged1;

var latitude2;
var longitude2;

 function onPlaceChanged2(){
    var place2 = autocomplete2.getPlace();
    if(!place2.geometry){
        document.getElementById('autocomplete2').placeholder = 'Enter a valid place';
    }
    else{
        // document.getElementById('details').innerHTML = place2.name;
        // await to be tested
        latitude2 =  place2.geometry.location.lat();
        longitude2=  place2.geometry.location.lng();
        // code();
    }
}

// New Code from here

var geocoder;
var map;
var marker1;
var marker2;
var infowindow;

function initialize() {
    infowindow = new google.maps.InfoWindow({
        size: new google.maps.Size(50, 50)
      });
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(latitude1,  longitude1);
  var mapOptions = {
    zoom: 12,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  // Create Map
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  document.getElementById('mapClass').style.display = 'flex'
  document.getElementById('map').style.display = 'flex'
 
 // can be removed
  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });
}



var pos1;
var pos2;


// create a directionService object to display route

// var directionService = new google.maps.DirectionsService();
var directionService;

// create a directionRenderer object which will display route

// var directionDisplay = new google.maps.DirectionsRenderer();
var directionDisplay;

// binding the directionRenderer to the map

// directionDisplay.setMap(map);
function code(){

  

     initialize(); //map popup

    pos1 = new google.maps.LatLng(latitude1,longitude1);
    pos2 = new google.maps.LatLng(latitude2,longitude2);
    // if (marker1) marker1.setMap(null);
    // if (marker2) marker2.setMap(null);
    //  marker1 = new google.maps.Marker({
    //     map: map,
    //     draggable: true,
    //     // position: new google.maps.LatLng(latitude1,longitude1)
    //     position: pos1
    //   });
    //  marker2 = new google.maps.Marker({
    //     map: map,
    //     draggable: true,
    //     // position: new google.maps.LatLng(latitude2,longitude2)
    //     position: pos2
    //   });
    //   google.maps.event.addListener(marker1, 'dragend', function() {
    //     latitude1 = marker1.getPosition().lat();
    //     longitude1 = marker1.getPosition().lng();
    //   });
    //   google.maps.event.addListener(marker2, 'dragend', function() {
    //     latitude2 = marker2.getPosition().lat();
    //     longitude2 = marker2.getPosition().lng();
    //   });
   

      directionsService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map 
      });

      directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();
        if (directions) {
          computeTotalDistance(directions);
        }
      });
      displayRoute(
        pos1,
        pos2,
        directionsService,
        directionsRenderer
      );
      // calcRoute();

      window.scrollTo(0,0);
       window.addEventListener("scroll",code);
      
    
}

function displayRoute(origin, destination, service, display) {
  service
    .route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true,
    })
    .then((result) => {
      display.setDirections(result);
    })
    .catch((e) => {
      alert("Could not display directions due to: " + e);
    });
}
var distance;
var duration;

function computeTotalDistance(result) {
  let totalDistance = 0;
  let totalDuration = 0;

  const myroute = result.routes[0];

  if (!myroute) {
    return;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    totalDistance += myroute.legs[i].distance.value;
    totalDuration += myroute.legs[i].duration.value;
  }

  totalDistance = totalDistance / 1000;
  distance = totalDistance;
  duration = totalDuration;
  console.log(totalDistance+" kmss");
  console.log(totalDuration+" seconds");
}
var cost;

// functionality
 async function calcRoute() {
        // create Request
        var myDate = new Date("2023-12-30T11:00:00+0000");
        var fiDate = Date.parse(myDate);
        console.log(fiDate);
        // var request = {
        //     origin: pos1,
        //     destination: pos2,
        //     travelMode: google.maps.TravelMode.DRIVING,
        //     drivingOptions: {
        //         departureTime: new Date(fiDate),
        //         trafficModel: 'optimistic'
        //       },
        //     unitSystem: google.maps.UnitSystem.METRIC
        //   }
        //   console.log(request);
          // Nandanagar
          // Mohaddipur

          // Passing request to the route method
          // var distance;
          // var time;
          // await directionService.route(request, (result) => {
          //   if(result != null){
                
          //       // getting distance & time

          //       distance = result.routes[0].legs[0].distance.value;
          //       console.log(distance/1000 +" km");
          //       time = result.routes[0].legs[0].duration.value;
          //       console.log(time);
          //   }
          // })
          await fetch(`http://localhost:8080/customer/cost?distance=${distance}&duration=${duration}`,{
          method : 'GET'
          })
          .then(res => res.json() )
          .then(data => {console.log(data);})
    }


    // jaggu
    let p = fetch('http://localhost:8080/client/calculate-cost?distance=5&duration=10')
    p.then((response) => {
      console.log(response.status)
      console.log(response.ok)
      return response.json();
    }).then((value2) => {
      console.log(value2)
    })

