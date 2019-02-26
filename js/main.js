/*jslint browser:true */
console.log('JS Loaded...');

// VARIABLES
var data1 = [],
    data2 = [],
    data3 = [],
    data4 = [],
    title = []
var marker = [],
    markersArray = [],
    contents = [],
    infowindow = [];
var latList, lngList, depthList;
var mapKey, map, x, y;

// EVENT LISTENER
document.getElementById('formSub').addEventListener('click', getValues);

// LOAD MAP KEY
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
} //INIT MAP

// CLEAR MARKERS
function clearMarkers() {
    for (var n = 0; n < markersArray.length; n++) {
        markersArray[n].setMap(null);
    }
    markersArray = [];
}

// CLEAR INFO WINDOWS
// function hideAllInfoWindows(map) {
//     markersArray.forEach(function(marker) {
//       marker.infowindow.close(map, marker);
//    }); 
//  }
 
// FUNCTION
function getValues() {

    clearMarkers();

    latList = document.getElementById('formLat').value;
    lngList = document.getElementById('formLng').value;
    depthList = document.getElementById('formDepth').value;
    console.log('LAT Value:');
    console.log(latList);
    console.log('LNG Value:');
    console.log(lngList);
    console.log('Depth Value:');
    console.log(depthList);

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

                // if ((y < (-41.2840)) && (x < 174.50)) { //SOUTH ISLAND
                // if ((y > (-41.2840)) && (x > 174.50)) { //NORTH ISLAND

                title[i] = getData.features[i].properties.locality;
                data1[i] = getData.features[i].properties.time;
                data2[i] = getData.features[i].properties.depth;
                data3[i] = getData.features[i].properties.magnitude;
                data4[i] = getData.features[i].properties.mmi;

                if (data2[i] > depthList) {
                    if (y < latList) { //SOUTH ISLAND
                        if (x < lngList) { //SOUTH ISLAND
                            // if (y > latList) { //NORTH ISLAND
                            //     if (x > lngList) { //NORTH ISLAND

                            marker[i] = new google.maps.Marker({
                                position: {
                                    lat: y,
                                    lng: x
                                },
                                map: map,
                                title: title[i]
                            });

                            markersArray.push(marker[i]);
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
                                // hideAllInfoWindows(map);
                                // this.infowindow.open(map, this);
                                console.log(this.index);
                                infowindow[this.index].open(map, marker[this.index]);
                                map.panTo(marker[this.index].getPosition());
                            });
                        } //IF LNG
                    } //IF LAT
                } //IF DEPTH
                // } //IF COORDINATES
            } //FOR

        }, //SUCSESS
        error: function (error) {
            console.log(error);
            console.log('Error getting data...')
        }
    }) //AJAX
} //FUNCTION

// function setMarkers(map) {
//     for (var i = 0; i < locations.length; i++) {
  
//       var location = locations[i];
//       var locationInfowindow = new google.maps.InfoWindow({
//         content: 'Test content',
//       });
  
//       var marker = new google.maps.Marker({
//         position: {lat: location[1], lng: location[2]},
//         map: map,
//         title: location[0],
//         infowindow: locationInfowindow
//       });
  
//       markers.push(marker);
  
//       google.maps.event.addListener(marker, 'click', function() {
//         hideAllInfoWindows(map);
//         this.infowindow.open(map, this);
//       });
  
//     }
//   }
  
//   function hideAllInfoWindows(map) {
//      markers.forEach(function(marker) {
//        marker.infowindow.close(map, marker);
//     }); 
//   }