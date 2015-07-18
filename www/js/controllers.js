angular.module('starter.controllers', ['openWeatherMap'])

.controller('WeatherCtrl', ['$scope', '$window', 'weather', function($scope, $window, weather) {

  $scope.cities = [];
  $scope.input = {};

  function onZipCodeData(zipCode, callBack){

    var prom = weather.getWeatherByZipCode(zipCode);

    prom.then(function(data){
      data.zipCode = zipCode;
      callBack(data);
    }).catch(function(msg){
      $window.alert(msg);
    }).finally(function(){
      $scope.input.zipCode = "";
    });

  }

  $scope.addZipCode = function(){

    var zipCode = $scope.input.zipCode;

    onZipCodeData(zipCode, function(data){
      $scope.cities.push(data);
    });

  };

  $scope.refresh = function(zipCode, index){
    onZipCodeData(zipCode, function(data){
      $scope.cities[index] = data;
    });
  }
  
}]);
