/*
  GEOCODER - simple module to geocode addresses with Google API and Yandex API.
*/
'use strict';

function Geocoder(){
  this.geocoding = function(arr, parameters, callBack){
    if (!arr) throw new Error('Array of Objects was not set.');
    if (!parameters.service) throw new Error("Service was not set. Use 1 for Google, and 2 for Yandex.");
    if (!parameters.key&&(parameters.service==1)) throw new Error("ApiKey for Google was not set.");
    switch (parameters.service) {
      case 1:
        GoogleCoding(arr, parameters.key, callBack);
        break;
      case 2:
        YandexCoding(arr, callBack);
        break;
      default:
        return null;
    };
  };

  function GoogleCoding(names, key, callBack){
    var responce = [], i=0, one_json, myRequest,
        url = 'https://maps.googleapis.com/maps/api/geocode/json?key='+key+'&address=';
    for (var i=0; i<names.length; i++){
      myRequest = new XMLHttpRequest();
      myRequest.open('GET',url+names[i].replace(new RegExp(" ",'g'),"+"), false);
      myRequest.send();
      if (myRequest.status != 200) {
        console.log('Error with '+names[i]);
      } else {
        one_json = JSON.parse(myRequest.responseText);
        responce.push({name: names[i], lat: one_json.results[0].geometry.location.lat, lng: one_json.results[0].geometry.location.lng});
      };
    }; // end for loop
    callBack(null, responce);
  };

  function YandexCoding(names, callBack){
    var responce = [], one_json, myRequest,
        url = 'https://geocode-maps.yandex.ru/1.x/?format=json&geocode=';
    for (var i=0; i<names.length; i++){
      myRequest = new XMLHttpRequest();
      myRequest.open('GET',url+names[i].replace(new RegExp(" ",'g'),"+"), false);
      myRequest.send();
      if (myRequest.status != 200) {
        console.log('Error with '+names[i]);
      } else {
        one_json = JSON.parse(myRequest.responseText);
        var coord = one_json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
        responce.push({name: names[i], lat: coord[1], lng: coord[0]});
      };
    }; // end for loop
    callBack(null, responce);
  };
};

module.exports = new Geocoder;
