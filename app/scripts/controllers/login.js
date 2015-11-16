'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('LoginCtrl', function ($http)
  {
    var vm = this;
    vm.credentials = {
      username : "admin " ,
      password : "Password1!"}

    vm.doLogin = function()
    {
      alert('la tua psw   è  '+ vm.credentials.password)
      $http
    }
  });
