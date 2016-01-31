'use strict';

angular.module('meanFinderApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('finder', {
        url: '/',
        templateUrl: 'app/finder/finder.html',
        controller: 'FinderCtrl'
      })
      .state('defaultFinder', {
        url: '/defaultFinder',
        templateUrl: 'app/finder/defaultFinder.html',
        controller: 'FinderCtrl'
      });
  });
