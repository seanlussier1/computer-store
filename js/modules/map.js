import { fetchData } from "./fetchWrapper.js";
export async function initLeafletMap() {
    console.log("initializing the map");
// 1) Init
    const map = L.map('leafletMap').setView([45.5019, -73.5674], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

//  2) Fetch the content of the places.json using the fetch API
    const placesUri = "data/places.json";
    const locations = await fetchData(placesUri);
    console.log(locations.categories)
    console.log(locations.places)
    // 3) Loop over the locations.places array, and for each place, create a marker object
    //  and add it to the map.
    // The marker need to be populated with corresponding place info: the address, coordinates
    renderLocations(map,locations)
}
// This method goes through every place in places.json, then it adds them to a list when an element is clicked
// the map centers around the area of location that was clicked. It also loads all loads every place in to the map.
function renderLocations(map, locations){
    let locationNames = document.getElementById("locationNames");
    locationNames.innerHTML = `
    <div class="btn-group-vertical" role="group" aria-label="Button group" id="locationButtons"> 
    <ul id=locationList> </ul>
    </div>
    `;
    let locationName = document.getElementById("locationList");
    locations.places.forEach(place => {
        const location = document.createElement("li");
        location.innerHTML = `
            <input type="button" class="btn-check" name="vbtn-radio" id="btn${place.name}" autocomplete="off" checked>
            <label class="btn btn-outline-danger" for="vbtn-radio1">${place.name}</label>
        `;
        locationName.appendChild(location);   
        location.addEventListener('click', () => {
            console.log(place.name);
            map.setView([place.point.lat, place.point.long], 18);
        })  
        const category = locations.categories.find(category => category.id === place.categoryId)
        var myIcon = L.icon({
            iconUrl: category.markerIcon 
        });
        var marker = L.marker([place.point.lat, place.point.long], {icon: myIcon}).addTo(map);
        marker.bindPopup(`<b>${place.name}</b><br>${place.address}<br>`).openPopup();        
});
}
