'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('LoginCtrl', function ($http, $location) {
    var vm = this;
    vm.credentials = {
      username: "admin",
      password: "Password1!"
    }

    this.doLogin = function () {
      var url = 'https://nsi-prenota-v2.azurewebsites.net';
      $http.post(url + '/api/Account/Login', {
        UserName: vm.credentials.username,
        Password: vm.credentials.password,
        IsPersistent: true
      }).then(function () {
        $http.get(url + '/api/Stanza', {withCredentials: true})
          .then(function (res) {
            console.log(res);
            $location.url('/');
          },
          function (err) {
          });

      }, function (err) {
        alert('errore autenticazione');
      })


    }
  });
