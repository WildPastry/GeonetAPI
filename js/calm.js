var map;
function initMap() {
	//map
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -40.9006,
                lng: 174.8860
            },
            zoom: 8,
            disableDefaultUI: true,
            styles: [{
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#212121"
                    }]
                },
                {
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#212121"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#757575"
                    }]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#bdbdbd"
                    }]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#181818"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#1b1b1b"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#2c2c2c"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#8a8a8a"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#373737"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#3c3c3c"
                    }]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#4e4e4e"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#3d3d3d"
                    }]
                }
            ]
        }); // map
}//initMap

var mylatitude, mylongitude, mydepth;

function getValues() {

mylatitude = document.getElementById('latitude').value;
mylongitude = document.getElementById('longitude').value;
mydepth= document.getElementById('depth').value;

console.log(mylatitude,mylongitude,mydepth);

var x,y;// stores latitude and longitude
var marker = []; //markers
var winCont = []; // content of infowindows
var infowindow = []; //infowindows
var depth;

	$.ajax({
		url:'https://api.geonet.org.nz/quake?MMI=3',
		type:'GET',
		dataType:'json',
		success:function(dataFromJSON){
			console.log(dataFromJSON);
			//loop through all data obects from API
			for(var i=0; i<dataFromJSON.features.length; i++) {
			//longitude
			console.log(dataFromJSON.features[i].geometry.coordinates[0]); //longitude
			y = dataFromJSON.features[i].geometry.coordinates[0]; //longitude

			//latitude
			console.log(dataFromJSON.features[i].geometry.coordinates[1]); //latitude
			x = dataFromJSON.features[i].geometry.coordinates[1]; //latitude

			if ((x< (-41.2840)) && (y <174.50)){

                    console.log(dataFromJSON.features[i].properties.depth)

                     depth= dataFromJSON.features[i].properties.depth;

                    if (depth > mydepth) {
                        console.log(depth);

			//markers 
			 marker[i] = new google.maps.Marker({
				position: { lat: x, lng: y },
				map: map,
				title: dataFromJSON.features[i].properties.locality
			});

			 //content of infowindows
			 winCont[i] = "time: " + dataFromJSON.features[i].properties.time + "<br>" + "depth: " + dataFromJSON.features[i].properties.depth + "<br>" + "magnitude: " + dataFromJSON.features[i].properties.magnitude;

			 // infowindows
			 infowindow[i] = new google.maps.InfoWindow({
                    content: winCont[i]
                });

			 //marker click eventlistener
			 google.maps.event.addListener(marker[i],'click', (function(marker,content,infowindow){ 
                    return function() {
                    infowindow.setContent(content);
                    infowindow.open(map,marker);
                   
                    }; //return
                })(marker[i],winCont[i],infowindow[i])); //even.addListener

			  } //depth criteria
			} //coordinates criteria

		  } //for
		},//success

		error:function(error){
			console.log('Error');
			alert("Something wrong");
		} //error

	})//ajax

} //getValues