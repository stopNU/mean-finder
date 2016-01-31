'use strict';

describe('Controller: FinderCtrl', function () {

  // load the controller's module
  beforeEach(module('meanFinderApp'));

  var FinderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinderCtrl = $controller('FinderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
