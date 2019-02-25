/*jslint browser:true */
console.log('JS Loaded...');
var mapKey;
var map;
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
                var y = getData.features[i].geometry.coordinates[1];
                var x = getData.features[i].geometry.coordinates[0];

                var title = getData.features[i].properties.locality;
                var data1 = getData.features[i].properties.time;
                var data2 = getData.features[i].properties.depth;
                var data3 = getData.features[i].properties.magnitude;
                var data4 = getData.features[i].properties.mmi;

                marker[i] = new google.maps.Marker({
                    position: {
                        lat: y,
                        lng: x
                    },
                    map: map,
                    title: title
                });

                marker[i].index = i; 

                contents[i] =
                    '<div>' +
                    '<h3 class="margin">' + title + '</h3>' +
                    '<p>Time: ' + data1 + '</p>' +
                    '<p>Depth: ' + data2 + '</p>' +
                    '<p>Magnitude: ' + data3 + '</p>' +
                    '<p>MMI: ' + data4 + '</p>' +
                    '</div>';

                infowindow[i] = new google.maps.InfoWindow({
                    content: contents[i]
                });

                google.maps.event.addListener(marker[i], 'click', function() {
                    console.log(this.index);
                    infowindow[this.index].open(map,marker[this.index]);
                    map.panTo(marker[this.index].getPosition());
                });  
            }
        },
        error: function (error) {
            console.log(error);
            console.log('Error getting data...')
        }
    })
}
