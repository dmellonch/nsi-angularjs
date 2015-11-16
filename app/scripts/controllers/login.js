'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('LoginCtrl', function ($http, $location, baseUrl, $rootScope) {
    var vm = this;
    vm.credentials = {
      username: "admin",
      password: "Password1!"
    }

    $rootScope.doLogout = function doLogout() {
      $http.post(baseUrl + '/api/Account/Logout', {}).then(function () {
        $rootScope.Logged = false;
      })
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
            $rootScope.Logged = true;
          },
          function (err) {
          });

      }, function (err) {
        alert('errore autenticazione');
      })


    }
  });
