document.getElementById('activation').addEventListener('click', function(e){
  // Yandex API is used for this Example
  geocoder(document.getElementById('inputvalue').value.split(','), { service: 2 }, function(err, d){
    document.getElementById('returnvalue').innerHTML = JSON.stringify(d);
  });
});
