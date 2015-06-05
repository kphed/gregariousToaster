'use strict';

angular.module('snippit.profile', ['snippit'])
  .controller('ProfileController', ['$scope', 'Facebook', '$window', 'Snips', '$http', function($scope, Facebook, $window, Snips, $http) {

    // Facebook user data (as of right now, name and id)
    $scope.facebookUser = {};

    $scope.snipTab = false;

    // Album names
    $scope.albumNames = [];

    // Album photos
    $scope.albumPhotos = {};

    $scope.snipName = '';

    $scope.snipId = null;

    $scope.newSnip = true;

    // Snip photos
    $scope.snipPhotos = {};

    // Snips
    $scope.snips = {};

    $scope.loading = false;

    // Invoke Facebook getFacebook user method, on success, assign
    // $scope.facebookUser to that response (Facebook name and id).
    $scope.fetchUser = function() {
      Facebook.getFacebookUser().success(function(resp) {
        $scope.facebookUser = resp;
        Snips.getSnips(resp.snips).success(function(resp) {
          for (var i = 0; i < resp.length; i++) {
            $scope.snips[resp[i]._id] = resp[i];
          };
        });
      });
    };

    $scope.snipCheck = function(){
      return !!Object.keys($scope.snipPhotos).length;
    };

    $scope.fetchSnips = function(){
<<<<<<< HEAD
    };
=======
      Snips.getSnips().success(function(resp) {
        console.log('RESP', resp);
        for (var i = 0; i < resp.length; i++) {
          console.log('RESP' + i, resp[i]);
          $scope.snips[resp[i]._id] = {
            name: resp[i].name,
            img: resp[i].img
          }
        }
        console.log('SCOPE SNIPS', $scope.snips);
      })
    }

>>>>>>> Delete snip by name on database if user saves snip with no photos on it

    $scope.snipAdd = function() {
      console.log($scope.facebookUser);
      Snips.addSnip({img: $scope.snipPhotos, name: $scope.snipName, userId: $scope.facebookUser.id})
        .success(function(resp){
          $scope.snips[resp] = {
            name: $scope.snipName,
            img: $scope.snipPhotos
          };
          $scope.snipName = '';
          $scope.snipPhotos = {};
        });
    };

    $scope.snipClose = function() {
      console.log('SNIP NAME', $scope.snipName);
      if (Object.keys($scope.snipPhotos).length === 0) {
        console.log('NO PHOTOS, DELETING SNIP FROM DATABASE');
        Snips.deleteSnip($scope.snipName)
        delete $scope.snips[$scope.snipId];
        $scope.snipPhotos = {};
        $scope.snipName = '';
      } else {
        $scope.snips[$scope.snipId].img = $scope.snipPhotos;
        Snips.saveSnip({img: $scope.snipPhotos, name: $scope.snipName, _id: $scope.snipId})
          .success(function(resp){
            console.log(resp);
            $scope.snipName = '';
            $scope.snipPhotos = {};
          });
      }
      $scope.newSnip = true;
    };

    $scope.showAlbums = function() {
      $scope.snipTab = false;
    };

    $scope.showSnips = function() {
      $scope.snipTab = true;
    };

    // This function is invoked every time an album name is clicked on the
    // profile page. It passes the Facebook service's getAlbumPhotos method
    // the name and ID of the clicked album, which returns a promise. Upon
    // success, we are given a response, which are the photos for that specific
    // Facebook album. We then parse the data and push it to $scope.albumPhotos.
    $scope.albumClick = function(name, id) {
      $scope.loading = true;
      $scope.albumPhotos = {};
      if(!id){
        Facebook.getWallData().success(function(resp){
        //WE'LL COME BACK TO THIS
          var pics = JSON.parse(resp).wallPhotos;
          for (var i = 0; i < parse.picture.length;i++){
            $scope.loading = false;
            $scope.albumPhotos.push({
              src: pics.picture[i],
            });
          }
        });
      } else {
        Facebook.getAlbumPhotos(name, id).success(function(resp) {
          var parse = JSON.parse(resp);
            for(var key in parse) {
              $scope.loading = false;
              $scope.albumPhotos = parse[key];
            }
        });
      }
    };

    $scope.snipClick = function(key, value) {
      $scope.snipId = key;
      $scope.snipPhotos = value.img;
      $scope.newSnip = false;
      $scope.snipName = value.name;
    };

    $scope.checkOn = function(id, pic) {
      var pos = Object.keys($scope.snipPhotos).length;
      $scope.snipPhotos[id] = {
        src: pic.src,
        thumb: pic.thumb,
        position: pos
      };
    };

    $scope.checkOff = function(pic) {
      delete $scope.snipPhotos[pic];
    };

    // This function is invoked on initialization of this controller. It fetches
    // the album names for the logged in Facebook user, which allows them to
    // select an album to fetch photos from.
    $scope.init = function() {

      Facebook.getAlbumData().success(function(resp) {
        var parse = JSON.parse(resp);
        for (var key in parse) {
          $scope.albumNames.push(parse[key]);
        }
        $scope.albumNames.push({name:'Facebook Wall Photos'});
      });
      $scope.fetchUser();
      $scope.fetchSnips();
    }();
  }]);
