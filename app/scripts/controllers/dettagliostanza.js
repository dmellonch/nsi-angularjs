'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:DettagliostanzaCtrl
 * @description
 * # DettagliostanzaCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('DettaglioStanzaCtrl', function (roomsService, $routeParams, $scope) {

    var vm = this;

    vm.eventSources = [];
    vm.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        header: {
          right: 'today prev,next'
        }
        //dayClick: $scope.alertEventOnClick,
        //eventDrop: $scope.alertOnDrop,
        //eventResize: $scope.alertOnResize
      }
    };

    var vm = this;

    var id = $routeParams.Id;

    function LoadStanza() {
      //console.log("id=" + $state.params.Id);
      return roomsService.GetStanze(id)
        .then(function (res) {
          vm.Nome = res.Nome;
          vm.Capienza = res.Capienza;
        });
    }

    function LoadDisponibilita() {
      var date = new Date();
      var m = date.getMonth();
      var y = date.getFullYear();

      var params = { inizio: new Date(y, m, 1), fine: new Date(new Date(y, m + 1, 1) - 1) };
      console.log(params);
      return roomsService.GetDisponibilita(id, params)
        .then(function (res) {
          console.log("elenco impegni:" + res);

        vm.eventSources.push(res);
        });
    }

    LoadStanza();
    LoadDisponibilita();

  })
;
