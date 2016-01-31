'use strict';

angular.module('meanFinderApp')
  .controller('FinderCtrl', function ($scope, $http, $q, $timeout, $state) {
    $scope.message = 'Hello';
    $scope.slideNumber = 0;
    $scope.load = false;
    $scope.$state = $state;
    $scope.testData = [{"__v":0,"text":"Test Slide Title Text","_id":"56ae4aab8e887ee819a1593a","options":[{"image":"http://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg","title":"Test title 1"},{"image":"http://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg","title":"Test title 2"}]},{"__v":0,"text":"Test Slide Title Text","_id":"56ae4af48e887ee819a1593b","options":[{"image":"http://i164.photobucket.com/albums/u8/hemi1hemi/COLOR/COL9-6.jpg","title":"Test title 1-1"},{"image":"http://i164.photobucket.com/albums/u8/hemi1hemi/COLOR/COL9-6.jpg","title":"Test title 1-2"},{"image":"http://i164.photobucket.com/albums/u8/hemi1hemi/COLOR/COL9-6.jpg","title":"Test title 1-3"}]}];

    //Only make user req when state is finder
    if($scope.$state.current.name === 'finder'){

    	var getUserFinder = function(){
	    	var deferred = $q.defer();

	    	deferred.resolve(
		    $http.get('/api/users/me').success(function(user){
		    		console.log('Looking for user');
		    		console.log(user.finders);
		    		$scope.slides = user.finders;
		    })
		    );

		    return deferred.promise;
		};

		var promise = getUserFinder();
		promise.then(function(){
			var finder = [];
			for(var i = 0; i < $scope.slides.length; i++){
				$http.get('/api/finders/' + $scope.slides[i]).success(function(slide){
		    		finder.push(slide);
		    		$scope.finder = finder;
		    		console.log($scope.finder);
			    });
		    }
		});

	}

/*    $http.get('/api/finders').success(function(finders){
    	console.log("Looking for finders");
    	console.log(finders);
    	$scope.finders = finders;
    });*/

	$scope.selected = function(){
	  angular.element(document).find('.option').removeClass('selected');
	  angular.element(event.target.parentNode).addClass('selected');
	};

	$scope.checkIfSelected = function() {
	 if (angular.element(document).find('.selected').length === 0) {
	   return true;
	  }
	  else {
	   return false;
	  }
	};

	$scope.increaseNumber = function(number){
		$scope.load = true;
		$timeout(function() {
			$scope.load = false;
    	}, 1000);
    	number = number +1;
    	return number;
    };
 });