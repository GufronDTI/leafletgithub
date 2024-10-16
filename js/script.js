// Initializing map push this
var map = L.map('map').setView([51.505, -0.09], 5); // Default location (London)

// Load the base map layer using OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

// Create layers for cities and rivers
var citiesLayer = L.layerGroup();
var riversLayer = L.layerGroup();

// Adding a few sample cities
var cityMarkers = [
  L.marker([51.5, -0.09]).bindPopup('London'),
  L.marker([48.8566, 2.3522]).bindPopup('Paris'),
  L.marker([52.52, 13.4050]).bindPopup('Berlin')
];
cityMarkers.forEach(marker => citiesLayer.addLayer(marker));

// Adding some rivers
var riverPolyline = L.polyline([
  [51.5, -0.09], [52.5, 0.09], [53.5, 1.09]
], {color: 'blue'}).bindPopup('River Example');
riversLayer.addLayer(riverPolyline);

// Function to filter map data based on dropdown and checkbox selections
function filterMapData() {
  const selectedAnalysis = document.getElementById('mapSelect').value;
  const showCities = document.getElementById('filter1').checked;
  const showRivers = document.getElementById('filter2').checked;

  // Clear the current layers
  map.eachLayer((layer) => {
    if (layer !== map._layers[Object.keys(map._layers)[0]]) { // Keep the base tile layer
      map.removeLayer(layer);
    }
  });

  // Re-add the base tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Display selected analysis type
  if (selectedAnalysis === 'population') {
    alert('Displaying Population Density analysis'); 
  } else if (selectedAnalysis === 'temperature') {
    alert('Displaying Temperature analysis'); 
  } else if (selectedAnalysis === 'elevation') {
    alert('Displaying Elevation analysis');
  }

  // Add layers for cities and rivers if filters selected
  if (showCities) {
    citiesLayer.addTo(map);
  }
  if (showRivers) {
    riversLayer.addTo(map);
  }

  // Update analysis data
  updateAnalysisData(selectedAnalysis, showCities, showRivers);
}

// analysis data function
function updateAnalysisData(analysisType, showCities, showRivers) {
  let analysisText = "";

  if (analysisType === "population") {
    analysisText += "Analyzing population density...";
  } else if (analysisType === "temperature") {
    analysisText += "Analyzing temperature patterns...";
  } else if (analysisType === "elevation") {
    analysisText += "Analyzing elevation data...";
  }

  if (showCities) {
    analysisText += " Including major cities.";
  }

  if (showRivers) {
    analysisText += " Including river data.";
  }

  document.getElementById('analysisData').innerText = analysisText;
}


filterMapData();
