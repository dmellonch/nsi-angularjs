'use strict';

describe('Controller: DettagliostanzaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsCourseApp'));

  var DettagliostanzaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DettagliostanzaCtrl = $controller('DettagliostanzaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DettagliostanzaCtrl.awesomeThings.length).toBe(3);
  });
});
