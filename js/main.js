/*jslint browser:true */
console.log('JS Loaded...');
var mapKey;
var marker;
var map;

// MAP KEY
$.ajax({
    url: 'js/config.json',
    dataType: 'json',
    type: 'get',
    success: function (keys) {
        console.log('Key loaded...')
        mapKey = keys[0].GEO_KEY;
    },
    error: function (error) {
        console.log(error);
        console.log('Error getting key...')
    }
})

// INIT MAP
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -40.9006,
            lng: 174.8860
        },
        zoom: 8,
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

    $.ajax({
        url: 'https://api.geonet.org.nz/quake?MMI=3',
        dataType: 'json',
        type: 'get',
        success: function (getData) {
            console.log("JSON data loaded...");
            console.log(getData.features);
            for (var i = 0; i < getData.features.length; i++) {
                // console.log(getData.features[i].geometry.coordinates[1], getData.features[i].geometry.coordinates[0]);
                // console.log(getData.features[i].properties.locality)
                var y = getData.features[i].geometry.coordinates[1];
                var x = getData.features[i].geometry.coordinates[0];

                var title = getData.features[i].properties.locality;
                var data1 = getData.features[i].properties.time;
                var data2 = getData.features[i].properties.depth;
                var data3 = getData.features[i].properties.magnitude;
                var data4 = getData.features[i].properties.mmi;

                var marker = new google.maps.Marker({
                    position: {
                        lat: y,
                        lng: x
                    },
                    map: map,
                    title: title
                });
                
                var contentString =
                    '<div>' +
                    '<h3 class="margin">' + title + '</h3>' +
                    '<p>Time: ' + data1 + '</p>' +
                    '<p>Depth: ' + data2 + '</p>' +
                    '<p>Magnitude: ' + data3 + '</p>' +
                    '<p>MMI: ' + data4 + '</p>' +
                    '</div>';

                    console.log(title, data1, data2, data3, data4);
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });
            }
        },
        error: function (error) {
            console.log(error);
            console.log('Error getting data...')
        }
    })
}