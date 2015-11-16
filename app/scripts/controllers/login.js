'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('LoginCtrl', function ($http, $location, baseUrl) {
    var vm = this;
    vm.credentials = {
      username: "admin",
      password: "Password1!"
    }

    this.doLogin = function () {
      $http.post(baseUrl + '/api/Account/Login', {
        UserName: vm.credentials.username,
        Password: vm.credentials.password,
        IsPersistent: true
      }).then(function () {
        $http.get(baseUrl + '/api/Stanza')
          .then(function (res) {
            console.log(res);
            $location.path('/');
          },
          function (err) {
          });

      }, function (err) {
        alert('errore autenticazione');
      })


    }
  });
