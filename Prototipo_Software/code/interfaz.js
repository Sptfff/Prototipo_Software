document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('showTrendingButton').addEventListener('click', function() {
      var aside = document.getElementById('trendingPlacesAside');
      aside.classList.toggle('visible');
      aside.classList.toggle('hidden');
      console.log('si')
    });
  });
  