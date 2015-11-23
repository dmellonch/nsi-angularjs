'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:DettagliostanzaCtrl
 * @description
 * # DettagliostanzaCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('DettaglioStanzaCtrl', function (roomsService, $routeParams) {

    var vm = this;

    vm.Disponibile = 'Si';

    var id = $routeParams.Id;
    console.log("id=" + id);

    function LoadStanza() {
      //console.log("id=" + $state.params.Id);
      return roomsService.GetStanze(id)
        .then(function (res) {
          vm.Nome = res.Nome;
          vm.Capienza = res.Capienza;
        });
    }

    LoadStanza();

  });
