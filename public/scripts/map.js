var position = navigator.geolocation.getCurrentPosition(renderMap);
var map;
var routingControl = null;

function renderMap(position) {
    map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
    marker.bindPopup('<p>Current Location</p>').openPopup();
}

function route(lat, long, img, name) {
    var divelement = document.getElementById("route");
    if (divelement.hasChildNodes()) {
        while (divelement.firstChild) {
            divelement.removeChild(divelement.lastChild);
        }
        if (routingControl != null) {
            map.removeControl(routingControl);
            routingControl = null;
        }
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(position.coords.latitude, position.coords.longitude),
                L.latLng(lat, long)
            ]
        }).addTo(map);
    });

    var imagetag = document.createElement("img");
    var imageurl = "/../images/buildingpics/" + img;
    imagetag.setAttribute("src", imageurl);
    imagetag.setAttribute("class", "img-fluid");

    var titletag = document.createElement("h3");
    titletag.appendChild(document.createTextNode("Destination:"));

    var nametag = document.createElement("h4");
    nametag.appendChild(document.createTextNode(name));

    divelement.appendChild(titletag);
    divelement.appendChild(nametag);
    divelement.appendChild(imagetag);
}