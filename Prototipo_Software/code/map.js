mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aWFzLXIiLCJhIjoiY2x4ZTI0bzFpMGNsbDJscHMzZHNscDhjNiJ9.JmfsFnp7FTSG6YzQvc-zWg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.627251, -33.045846], // Coordenadas de Valparaíso
  zoom: 13,
  maxBounds: [[-71.7, -33.1],[-71.5, -33.0] ]
});

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
          .addTo(map);
      });
    },0);
  });
});
