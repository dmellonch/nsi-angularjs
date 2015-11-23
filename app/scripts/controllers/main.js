'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('MainCtrl', function ($http, $rootScope, $location, baseUrl, authService, roomsService) {
    console.log("Dentro a MainCtrl");

    //cons
    var vm = this;

    function LoadStanze() {
      console.log("stanze - authenticated:" + authService.getAuthenticated());
      if(!authService.getAuthenticated())
        return [];

      return roomsService.GetStanze()
        .then(function (res) {
              console.log("Chiedo stanze al servizio");
              vm.elencoStanze = res;
              console.log(vm.elencoStanze);
            });


    }

    //function LoadStanze() {
      //  console.log("stanze - authenticated:" + authService.getAuthenticated());
      //  if(!authService.getAuthenticated())
      //    return [];
      //
      //  return $http.get(baseUrl + '/api/Stanza')
      //    .then(function (res) {
      //      vm.elencoStanze = res.data;
      //      console.log(vm.elencoStanze);
      //    });
      //}
    LoadStanze();
    });
