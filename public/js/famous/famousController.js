'use strict';

angular.module('snippit.famous', ['snippit'])
  .controller('FamousController', ['$scope', '$famous', function($scope, $famous) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Timer = $famous['famous/utilities/Timer'];

    $scope.log = function(arg) {
      console.log(arg);
    };

    $scope.spinner = {
      speed: 500,
    };
    $scope.rotateY = new Transitionable(0);

    // Run function on every tick of the Famo.us engine
    Timer.every(function() {
      var adjustedSpeed = parseFloat($scope.spinner.speed) / 1200;
      $scope.rotateY.set($scope.rotateY.get() + adjustedSpeed);
    }, 1);

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
    ];
  }]);
