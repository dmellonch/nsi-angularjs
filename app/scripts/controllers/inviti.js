'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:InvitiCtrl
 * @description
 * # InvitiCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('InvitiCtrl', function ($http, $rootScope, $location, baseUrl, authService, roomsService) {

    var vm = this;
    vm.invitati = [];
    vm.accetta = accetta;
    vm.rifiuta = rifiuta;

    function LoadInviti() {
      if (!authService.getAuthenticated())
        return [];

      return roomsService.GetInviti()
        .then(function (res) {
          vm.invitati = res;
          console.log(vm.invitati);
        });


    }

    function accetta(id) {
      console.log('click invito');
      return roomsService.Accetta(id).then(
        function (res) {
          LoadInviti();
        }
      );
    }

    function rifiuta(id) {
      return roomsService.Rifiuta(id).then(
        function (res) {
          LoadInviti();
        }
      );
    }


    LoadInviti();


  });
