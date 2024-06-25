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
    .setHTML('Información del lugar xd')
    .addTo(map);
});

new mapboxgl.Marker()
  .setLngLat([-33.047228, -71.610849])
  .addTo(map);

// Definición de funciones para interactuar con el mapa y generar rutas aleatorias

var regionCoords = {
    'Arica': [-70.312599, -18.478253],
    'Tarapaca': [-69.347392, -20.251284],
    'Antofagasta': [-69.814222, -23.652361],
    'Atacama': [-70.133300, -27.366790],
    'Coquimbo': [-71.252013, -29.953302],
    'Valparaiso': [-71.627251, -33.045846],
    'Metropolitana': [-70.648270, -33.456940],
    'OHiggins': [-71.363962, -34.575490],
    'Maule': [-71.657266, -35.426400],
    'Nuble': [-72.104003, -36.617676],
    'Biobio': [-72.106203, -37.471183],
    'Araucania': [-72.590374, -38.948921],
    'LosRios': [-72.633333, -39.800000],
    'LosLagos': [-72.828472, -41.471700],
    'Aysen': [-72.666500, -45.400000],
    'Magallanes': [-70.917068, -53.163833]
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
