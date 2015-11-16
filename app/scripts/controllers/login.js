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

    this.doLogin = function () {
      var url = 'https://nsi-prenota.azurewebsites.net';
      $http.post(url + '/api/Account/Login', {
        username: vm.credentials.username,
        password: vm.credentials.password,
        IsPersistent: true
      })
    }
  });
