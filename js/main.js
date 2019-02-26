/*jslint browser:true */
console.log('JS Loaded...');
var mapKey;
var map;
var x, y;
var data1 = [],
    data2 = [],
    data3 = [],
    data4 = [],
    title = []
var marker = [];
var contents = [];
var infowindow = [];

// MAP KEY
// $.ajax({
//     url: 'js/config.json',
//     dataType: 'json',
//     type: 'get',
//     success: function (keys) {
//         console.log('Key loaded...')
//         mapKey = keys[0].GEO_MAP;
//         loadScript();
//     },
//     error: function (error) {
//         console.log(error);
//         console.log('Error getting key...')
//     }
// })

// function loadScript() {
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://maps.googleapis.com/maps/api/js?key=' + mapKey + '&callback=initMap';
//     document.body.appendChild(script);
// }

// INIT MAP
function initMap() {

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
    });

    // INFO WINDOWS
    $.ajax({
        url: 'https://api.geonet.org.nz/quake?MMI=3',
        dataType: 'json',
        type: 'get',
        success: function (getData) {
            console.log("JSON data loaded...");
            console.log(getData.features);

            for (var i = 0; i < getData.features.length; i++) {
                var y = getData.features[i].geometry.coordinates[1];
                var x = getData.features[i].geometry.coordinates[0];

                if ((y < (-41.2840)) && (x < 174.50)) {

                    title[i] = getData.features[i].properties.locality;
                    data1[i] = getData.features[i].properties.time;
                    data2[i] = getData.features[i].properties.depth;
                    data3[i] = getData.features[i].properties.magnitude;
                    data4[i] = getData.features[i].properties.mmi;

                    if (data2[i] > depthList[]) {

                        marker[i] = new google.maps.Marker({
                            position: {
                                lat: y,
                                lng: x
                            },
                            map: map,
                            title: title[i]
                        });

                        marker[i].index = i;

                        contents[i] =
                            '<div>' +
                            '<h5 class="margin">' + title[i] + '</h5>' +
                            '<p>Time: ' + data1[i] + '</p>' +
                            '<p>Depth: ' + data2[i] + '</p>' +
                            '<p>Magnitude: ' + data3[i] + '</p>' +
                            '<p>MMI: ' + data4[i] + '</p>' +
                            '</div>';

                        infowindow[i] = new google.maps.InfoWindow({
                            content: contents[i]
                        });

                        google.maps.event.addListener(marker[i], 'click', function () {
                            console.log(this.index);
                            infowindow[this.index].open(map, marker[this.index]);
                            map.panTo(marker[this.index].getPosition());
                        });
                    } //IF DEPTH
                } //IF COORDINATES
            } //FOR

        }, //SUCSESS
        error: function (error) {
            console.log(error);
            console.log('Error getting data...')
        }
    }) //AJAX
} //INIT MAP

// FORM
document.getElementById('formSub').addEventListener('click', getLAT);

var latList
var lngList
var depthList

// FUNCTIONS
function getLAT(e) {
    e.preventDefault();
    latValue = document.getElementById("formLat").value;
    // latList.splice(0, 1);
    // latList.push(latValue);
    getLNG();
    console.log('LAT Value');
    console.log(latList);
}

function getLNG() {
    lngValue = document.getElementById("formLng").value;
    // lngList.splice(0, 1);
    // lngList.push(lngValue);
    getDEPTH();
    console.log('LNG Value');
    console.log(lngList);
}

function getDEPTH() {
    depthValue = document.getElementById("formDepth").value;
    // depthList.splice(0, 1);
    // depthList.push(depthValue);
    console.log('DEPTH');
    console.log(depthList);
}

// WORKING
// $.ajax({
//     url: 'https://api.geonet.org.nz/quake?MMI=3',
//     dataType: 'json',
//     type: 'get',
//     success: function (getData) {
//         console.log("JSON data loaded...");
//         console.log(getData.features);
//         for (var i = 0; i < getData.features.length; i++) {
//             var y = getData.features[i].geometry.coordinates[1];
//             var x = getData.features[i].geometry.coordinates[0];

//             var title = getData.features[i].properties.locality;
//             var data1 = getData.features[i].properties.time;
//             var data2 = getData.features[i].properties.depth;
//             var data3 = getData.features[i].properties.magnitude;
//             var data4 = getData.features[i].properties.mmi;

//             marker[i] = new google.maps.Marker({
//                 position: {
//                     lat: y,
//                     lng: x
//                 },
//                 map: map,
//                 title: title
//             });

//             marker[i].index = i;

//             contents[i] =
//                 '<div>' +
//                 '<h3 class="margin">' + title + '</h3>' +
//                 '<p>Time: ' + data1 + '</p>' +
//                 '<p>Depth: ' + data2 + '</p>' +
//                 '<p>Magnitude: ' + data3 + '</p>' +
//                 '<p>MMI: ' + data4 + '</p>' +
//                 '</div>';

//             infowindow[i] = new google.maps.InfoWindow({
//                 content: contents[i]
//             });

//             google.maps.event.addListener(marker[i], 'click', function () {
//                 console.log(this.index);
//                 infowindow[this.index].open(map, marker[this.index]);
//                 map.panTo(marker[this.index].getPosition());
//             });
//         }
//     },
//     error: function (error) {
//         console.log(error);
//         console.log('Error getting data...')
//     }
// })
// }

// var map;
// function initMap() {
// 	//map
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -41.2865, lng: 174.7762},
//           zoom: 6
//         }); // map
// }//initMap

// var mylatitude, mylongitude, mydepth;

// function getValues() {

// mylatitude = document.getElementById('latitude').value;
// mylongitude = document.getElementById('longitude').value;
// mydepth= document.getElementById('depth').value;

// console.log(mylatitude,mylongitude,mydepth);

// var x,y;// stores latitude and longitude
// var marker = []; //markers
// var winCont = []; // content of infowindows
// var infowindow = []; //infowindows
// var depth;

// 	$.ajax({
// 		url:'https://api.geonet.org.nz/quake?MMI=3',
// 		type:'GET',
// 		dataType:'json',
// 		success:function(dataFromJSON){
// 			console.log(dataFromJSON);
// 			//loop through all data obects from API
// 			for(var i=0; i<dataFromJSON.features.length; i++) {
// 			//longitude
// 			console.log(dataFromJSON.features[i].geometry.coordinates[0]); //longitude
// 			y = dataFromJSON.features[i].geometry.coordinates[0]; //longitude

// 			//latitude
// 			console.log(dataFromJSON.features[i].geometry.coordinates[1]); //latitude
// 			x = dataFromJSON.features[i].geometry.coordinates[1]; //latitude

// 			if ((x< (-41.2840)) && (y <174.50)){

//                     console.log(dataFromJSON.features[i].properties.depth)

//                      depth= dataFromJSON.features[i].properties.depth;

//                     if (depth > mydepth) {
//                         console.log(depth);

// 			//markers 
// 			 marker[i] = new google.maps.Marker({
// 				position: { lat: x, lng: y },
// 				map: map,
// 				title: dataFromJSON.features[i].properties.locality
// 			});

// 			 //content of infowindows
// 			 winCont[i] = "time: " + dataFromJSON.features[i].properties.time + "<br>" + "depth: " + dataFromJSON.features[i].properties.depth + "<br>" + "magnitude: " + dataFromJSON.features[i].properties.magnitude;

// 			 // infowindows
// 			 infowindow[i] = new google.maps.InfoWindow({
//                     content: winCont[i]
//                 });

// 			 //marker click eventlistener
// 			 google.maps.event.addListener(marker[i],'click', (function(marker,content,infowindow){ 
//                     return function() {
//                     infowindow.setContent(content);
//                     infowindow.open(map,marker);

//                     }; //return
//                 })(marker[i],winCont[i],infowindow[i])); //even.addListener

// 			  } //depth criteria
// 			} //coordinates criteria

// 		  } //for
// 		},//success

// 		error:function(error){
// 			console.log('Error');
// 			alert("Something wrong");
// 		} //error

// 	})//ajax

//  } //getValues