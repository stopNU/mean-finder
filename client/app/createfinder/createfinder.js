'use strict';

angular.module('meanFinderApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createfinder', {
        url: '/createfinder',
        templateUrl: 'app/createfinder/createfinder.html',
        controller: 'CreatefinderCtrl'
      });
  });
