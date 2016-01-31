'use strict';

class NavbarController {
  //start-non-standard
  menu = [
  {
    'title': 'Your Finder',
    'state': 'finder'
  },
  {
    'title': 'Default Finder',
    'state': 'defaultFinder'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('meanFinderApp')
  .controller('NavbarController', NavbarController);
