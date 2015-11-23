'use strict';

angular.module('angularjsCourseApp')
  .controller('CtrlnavbarCtrl', function (authService, $location, baseUrl) {
    var vm = this;

    vm.user = function () {
      return authService.getUserData();
    }

    vm.logged = function () {
      return authService.getAuthenticated();
    }

    vm.currentPath = function () {
      return $location.path();
    }

  });
