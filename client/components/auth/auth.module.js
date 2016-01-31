'use strict';

angular.module('meanFinderApp.auth', [
  'meanFinderApp.constants',
  'meanFinderApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
