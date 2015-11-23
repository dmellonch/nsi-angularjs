'use strict';

describe('Controller: CtrlnavbarCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsCourseApp'));

  var CtrlnavbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CtrlnavbarCtrl = $controller('CtrlnavbarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CtrlnavbarCtrl.awesomeThings.length).toBe(3);
  });
});
