'use strict';

/**
 * @ngdoc service
 * @name angularjsCourseApp.authService
 * @description
 * # authService
 * Service in the angularjsCourseApp.
 */
angular.module('angularjsCourseApp')
  .service('authService', function ($http, baseUrl) {
    var authenticated = false;
    var vm = this;
    vm.userData = {};
    vm.users=[];
    this.setAuthenticated = function (isAuth) {
      //console.log('setAuthenticated');
      authenticated = isAuth;
    }
    this.getAuthenticated = function () {
      //console.log('getAuthenticated');
      return authenticated;
    }

    this.getUserData = function () {
      return vm.userData;
    }

    this.getUsers = function () {
      if (!authenticated) {
        return;
      }
      return $http.get(baseUrl + '/api/Utente')
        .then(function (res) {
          console.log('utenti trovati ',res.data);
          return res.data;
        })
    }

    this.getUser = function (cb) {
      if (!authenticated) {
        return;
      }
      $http.get(baseUrl + '/api/Account/UtenteId')
        .then(function (res) {
          $http.get(baseUrl + '/api/Utente/' + res.data)
            .then(function (res1) {
              vm.userData = res1.data;
              cb();
            })
        })
    }
  });
