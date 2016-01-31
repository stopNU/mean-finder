'use strict';

describe('Controller: CreatefinderCtrl', function () {

  // load the controller's module
  beforeEach(module('meanFinderApp'));

  var CreatefinderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatefinderCtrl = $controller('CreatefinderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
