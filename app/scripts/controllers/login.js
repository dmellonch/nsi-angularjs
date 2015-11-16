'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('LoginCtrl', function () {
    var vm = this;
    vm.doLogin = doLogin;
    vm.userName = 'admin';
    vm.password = 'Password1!';



    function doLogin(){
      alert('alert');

    }
  });
