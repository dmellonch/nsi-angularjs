'use strict';

describe('Service: roomsService', function () {

  // load the service's module
  beforeEach(module('angularjsCourseApp'));

  // instantiate service
  var roomsService;
  beforeEach(inject(function (_roomsService_) {
    roomsService = _roomsService_;
  }));

  it('should do something', function () {
    expect(!!roomsService).toBe(true);
  });

});
