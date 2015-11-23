'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('LoginCtrl', function ($http, $location, baseUrl, $rootScope, authService) {
    var vm = this;
    vm.credentials = {
      username: "admin",
      password: "Password1!"
    }

    $rootScope.doLogout = function doLogout() {
      $http.post(baseUrl + '/api/Account/Logout', {}).then(function () {
        //$rootScope.Logged = false;
        authService.setAuthenticated(false);
        $location.path('/login');
      })
    }


    $rootScope.doLogin = function () {
      $http.post(baseUrl + '/api/Account/Login', {
        UserName: vm.credentials.username,
        Password: vm.credentials.password,
        IsPersistent: true
      }).then(function () {
        $http.get(baseUrl + '/api/Stanza')
          .then(function (res) {
            //console.log(res);
            authService.setAuthenticated(true);
            authService.getUser(function(){
              $location.path('/');
            });
          },
          function (err) {
            authService.setAuthenticated(false);
            alert('errore autenticazione');
          });
      }, function (err) {
        authService.setAuthenticated(false);
        alert('errore autenticazione');
      })
    }
  });
