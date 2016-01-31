'use strict';

angular.module('meanFinderApp')
  .controller('CreatefinderCtrl', function ($scope, $http, $q, $location) {
    $scope.slide = {
      'text': '',
      'options': [
      ]
    };
    var finderSlides = [];
    $scope.previewArray = [];
    var original = angular.copy($scope.slide);

    $scope.addSlide = function(slide){
      console.log('Add Slide');
      var deferred = $q.defer();

      
      deferred.resolve( 
        $http.post('/api/createfinders', slide)
        .then(
         function(response){
            //Push slide ID to Array
            console.log(response);
            finderSlides.push(response.data._id);
            $scope.previewArray.push(response.data);
            //reset the form
            $scope.slide = angular.copy(original);
            $scope.createSlidesForm.$setPristine();
         }, 
         function(response){
            console.log(response);
         }
        )
      );
      return deferred.promise;
    };

    $scope.updateSlide = function(){
      console.log('Update Slide');
      $http.put('api/finders/' + $scope.slide._id, $scope.slide)
      .then(
        function(response){
          console.log('success', response);

          for(var i = 0; i < finderSlides.length; i++){
            console.log(finderSlides[i]);
            if(finderSlides[i] === $scope.slide._id && i < (finderSlides.length - 1)){
              $http.get('/api/finders/' + finderSlides[i]).success(function(slide){
                console.log('Looking for next slide');
                console.log(slide);
                $scope.slide = slide;
              });
              break;
            }
            else{
              console.log('No next slide created');
              $scope.slide = angular.copy(original);
              $scope.createSlidesForm.$setPristine();
              break;  
            }
          }
        },
        function(response){
          console.log('error', response);
        }
      );
    };

    $scope.previous = function(){
      if($scope.slide._id){
        console.log('Slide does have ID');
        for(var i = 0; i < finderSlides.length; i++){
          if(finderSlides[i] === $scope.slide._id){
            $http.get('/api/finders/' + finderSlides[i - 1]).success(function(slide){
              console.log('Looking for previous slide');
              console.log(slide);
              $scope.slide = slide;
            });
            break;
          }
        }
      }
      else{
        var previousSlide = finderSlides[finderSlides.length - 1];
        console.log('Slide doesnt have ID');
        $http.get('/api/finders/' + previousSlide).success(function(slide){
            console.log('Looking for previous slide');
            console.log(slide);
            $scope.slide = slide;
        });
      }
    };

    $scope.sendIds = function(){
      var promise = $scope.addSlide($scope.slide);
      promise.then(function(){
        $http.put('api/users/me', finderSlides)
        .then(
          function(response){
            console.log('success', response);
            $location.path('/finder');
            return response;
          },
          function(response){
            console.log('fail', response);
          }
        );
      });
    };

    $scope.addOption = function(){
      console.log('Add Option');
      $scope.slide.options.push({'image': '', 'title': ''});
    };

 });