// Código JavaScript relacionado con el mapa y la interacción

var regionActual = ''; // Variable global para mantener la región actual

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aWFzLXIiLCJhIjoiY2x4ZTI0bzFpMGNsbDJscHMzZHNscDhjNiJ9.JmfsFnp7FTSG6YzQvc-zWg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.627251, -33.045846], // Coordenadas de Valparaíso
  zoom: 13
});

map.on('click', function(e) {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('Mati ql')
    .addTo(map);
});

new mapboxgl.Marker()
  .setLngLat([-71.6197, -33.0458])
  .addTo(map);

// Definición de funciones para interactuar con el mapa y generar rutas aleatorias

var regionCoords = {
    'Arica': [-70.312599, -18.478253],
    'Tarapaca': [-70.1524, -20.2141],
    'Antofagasta': [-70.4000, -23.6500],
    'Atacama': [-70.3333, -27.3667],
    'Coquimbo': [-71.2540, -29.9078],
    'Valparaiso': [-71.6197, -33.0458],
    'Metropolitana': [-70.6483, -33.4569],
    'OHiggins': [-70.7444, -34.1708],
    'Maule': [-71.6554, -35.4264],
    'Nuble': [-72.1034, -36.6066],
    'Biobio': [-73.0498, -36.8269],
    'Araucania': [-72.5904, -38.7359],
    'LosRios': [-73.2459, -39.8196],
    'LosLagos': [-72.9424, -41.4693],
    'Aysen': [-72.0683, -45.5712],
    'Magallanes': [-70.9171, -53.1638]
};

function flyToRegion(regionName) {
  regionActual = regionName; // Actualiza la región actual
  var coords = regionCoords[regionName];
  map.flyTo({
    center: coords,
    essential: true
  });
}

function generarRutaAleatoria() {
  // Función para generar rutas aleatorias
}

function crearCoordenadaAleatoria(regionCoords) {
  // Función para crear coordenadas aleatorias
}
