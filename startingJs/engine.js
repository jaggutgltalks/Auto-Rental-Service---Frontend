let autocomplete;
function runThis(){
    console.log("Jai hO");
}
function initAutocomplete(){
    autocomplete1 = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete1'),
        {
            types : ['establishment'],
            componentRestrictions : {'state' : ['Uttar Pradesh']},
            fields : ['geometry']
        });
    autocomplete2 = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete2'),
        {
            types : ['establishment'],
            componentRestrictions : {'state' : ['Uttar Pradesh']},
            fields : ['geometry']
        });
        autocomplete1.addListener('place_changed',onPlaceChanged1);
        autocomplete2.addListener('place_changed',onPlaceChanged2);
}

var latitude1;
var longitude1;

function onPlaceChanged1(){
    var place1 = autocomplete1.getPlace();
    if(!place1.geometry){
        document.getElementById('autocomplete1').placeholder = 'Enter a valid place';
    }
    else{
        // document.getElementById('details').innerHTML = place1.name;
        latitude1 = place1.geometry.location.lat();
        longitude1= place1.geometry.location.lng(); 
        // console.log(latitude1);
        // console.log(longitude1);
    }
}

var latitude2;
var longitude2;

function onPlaceChanged2(){
    var place2 = autocomplete2.getPlace();
    if(!place2.geometry){
        document.getElementById('autocomplete2').placeholder = 'Enter a valid place';
    }
    else{
        // document.getElementById('details').innerHTML = place2.name;
        latitude2 = place1.geometry.location.lat();
        longitude2= place1.geometry.location.lng(); 
    }
}

