# geocoderjs
simple js module to geocode cities using Google API or Yandex API
## Usage
Call function `geocoder.geocoding(array_of_names, parameters, callBack)`  
`array_of_names` - array with names of cities or places which coordinates you want to find.  
`parameters` - object consists of two parameters: 'service' (1 - for Google, 2 - for Yandex) and 'key' (optional for Yandex).  
`callBack` - function(error, data); data - array of objects with formating { name, lat, lng }, where 'name' is get from array_of_names.  
## Example
`var geocoder = require('geocoderjs');`  
`geocoder.geocoding(['Kiev'], { service: 2 }, function(err, d){ alert(d); });`  
`// [{name: 'Kiev', lat: 50.450418 , lng: 30.523541}] - by Yandex API`  
`geocoder.geocoding(['Kiev'], { service: 1, key: <YOUR_GOOGLE_API_KEY> }, function(err, d){ alert(d); });`  
`// [{name: 'Kiev', lat: 50.4501, lng: 30.5234}] - by Google API`  
## Warnings
By Google you have only 2500 requests per day.  
By Yandex you have 25000 requests per day.  
If 'key' is not set for Yandex API, you can only search through Russia, Ukraine, Belarus, Kazakhstan, Georgia, Armenia, Azerbaijan, Moldova, Turkmenistan, Tajikistan, Turkey, Uzbekistan, Kyrgyzstan.
## License
MIT
