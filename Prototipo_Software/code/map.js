// Código JavaScript relacionado con el mapa y la interacción

var regionActual = 'Valparaiso'; // Variable global para mantener la región actual

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aWFzLXIiLCJhIjoiY2x4ZTI0bzFpMGNsbDJscHMzZHNscDhjNiJ9.JmfsFnp7FTSG6YzQvc-zWg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.627251, -33.045846], // Coordenadas de Valparaíso
  zoom: 13
});

new mapboxgl.Marker()
  .setLngLat([-71.6197, -33.0458])
  .addTo(map);

fetch('json/info.json')
.then(response => response.json())
.then(data => {
  console.log(data);
  data.forEach(function(place) {
    var marker = new mapboxgl.Marker()
      .setLngLat(place.coordinates)
      .addTo(map);
  
    setTimeout(function(){
      marker.getElement().addEventListener('click', function(e) {
        console.log('Marcador presionado:', place.title); // Esto debería aparecer en la consola al hacer clic en el marcador
        console.log(e)
        new mapboxgl.Popup()
          .setLngLat(place.coordinates)
          .setHTML('<div class="popup-content"><h1>' + place.title + '</h1><p>' + place.description + '</p></div>')
          console.log('se leen')
          .addTo(map);
          
      });
    },0);
  });
  
});
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
  console.log(coords)
}
function flyToCord(place, zum) {
  console.log(place);
  map.flyTo({
    center: place,
    essential: true,
    zoom: 12
  });
  
}

function generarRutaAleatoria() {
  if (!regionActual) {
    alert('Por favor, selecciona una región primero.');
    return;
}

// Obtén dos puntos aleatorios para el inicio y el fin de la ruta
var inicio = crearCoordenadaAleatoria(regionCoords[regionActual]);
var fin = crearCoordenadaAleatoria(regionCoords[regionActual]);

// Construye la URL para la solicitud a la API de Mapbox Directions
var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' +
    inicio.join(',') + ';' + fin.join(',') +
    '?geometries=geojson&access_token=' + mapboxgl.accessToken;

// Realiza la solicitud a la API de Mapbox Directions
fetch(directionsRequest)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        // Asegúrate de que la respuesta tiene rutas
        if (json.routes && json.routes.length) {
            var ruta = json.routes[0].geometry;

            // Limpia rutas anteriores
            if (map.getSource('ruta')) {
                map.removeLayer('ruta');
                map.removeSource('ruta');
            }

            // Agrega la ruta al mapa
            map.addSource('ruta', {
                'type': 'geojson',
                'data': ruta
            });

            map.addLayer({
                'id': 'ruta',
                'type': 'line',
                'source': 'ruta',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'rgb(255, 0, 0)',
                    'line-width': 6
                }
            });

            // Centra el mapa en la ruta
            var bounds = new mapboxgl.LngLatBounds();
            ruta.coordinates.forEach(function(coord) {
                bounds.extend(coord);
            });
            map.fitBounds(bounds, {
                padding: 20
            });
        } else {
            alert('No se pudo obtener una ruta.');
        }
    })
    .catch(function(error) {
        alert('Error al obtener la ruta: ' + error.message);
    });
}

function crearCoordenadaAleatoria(regionCoords) {
  return [
    regionCoords[0] + (Math.random() - 0.5) * 0.1, // Longitud
    regionCoords[1] + (Math.random() - 0.5) * 0.1  // Latitud
];
}

function cargarLugares() {
  fetch('tendencia.json')
      .then(response => response.json())
      .then(data => {
          // Obtener el div donde se mostrarán los lugares
          const listaLugares = document.getElementById('lugares-tendencia');
          
          // Ordenar los lugares por valoración de mayor a menor
          data.lugares.sort((a, b) => b.valoracion - a.valoracion);
          
          // Tomar los 5 primeros lugares con mejor valoración
          const topLugares = data.lugares.slice(0, 5);
          
          // Recorrer los 5 mejores lugares y crear el botón
          topLugares.forEach(lugar => {
              const button = document.createElement('button');
              button.className = 'buttonTend';
              button.innerHTML = `${lugar.title} </br> 
                                  ${lugar.valoracion} completos </br> 
                                  ${lugar.numValoraciones} valoraciones`;
              button.setAttribute('onclick', `flyToCord([${lugar.cords}], ${lugar.zoom})`);
              listaLugares.appendChild(button);
              listaLugares.appendChild(document.createElement('br'));
          });
      })
      .catch(error => console.error('Error al leer el archivo JSON:', error));
}

document.addEventListener('DOMContentLoaded', function() {
  cargarLugares();
});


  