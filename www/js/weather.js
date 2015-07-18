angular.module('openWeatherMap',[])
.factory('weather', ['$http', '$q', function($http, $q){

  var weather = {};

  weather.getWeatherByZipCode = function(zipCode){
    var defered = $q.defer();
    $http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=imperial')
    .success(function(data, status, headers, config){
      if(data.cod !=  200){
        defered.reject(data.message);
      } else {
        defered.resolve(data);
      }
    })
    .error(function(data, status, headers, config){
      defered.reject('Error in API');
    });
    return defered.promise;
  };

  return weather;
}]);
