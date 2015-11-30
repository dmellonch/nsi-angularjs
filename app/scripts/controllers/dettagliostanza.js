'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:DettagliostanzaCtrl
 * @description
 * # DettagliostanzaCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('DettaglioStanzaCtrl', function (roomsService, $routeParams, $scope, $location) {

    var vm = this;

    vm.eventSources = [];
    vm.uiConfig = {
      calendar: {
        height: 450,
        editable: true,
        header: {
          left: 'agendaDay,agendaWeek,month',
          center: 'title',
          right: 'today prev,next'
        },
        viewRender: function (view) {
          LoadDisponibilita(view.start.toDate().toISOString(), view.end.toDate().toISOString());

        }, views: {
          agendaDay: {},
          agendaWeek: {},
          month: {}
        },
        lang: 'it',
        dayClick: function (date, jsEvent, view) {
          vm.titolo=date.format();
          $('#modalBody').html(date.description);
          //$('#eventUrl').attr('href', date.url);
          $('#fullCalModal').modal();
        }
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

    function LoadDisponibilita(start, end) {
      //var date = new Date();
      //var d = date.getDate();
      //var m = date.getMonth();
      //var y = date.getFullYear();
      console.log('loadDisp ', start, end);

      var params = {inizio: start, fine: end};
      console.log(params);
      return roomsService.GetDisponibilita(id, params)
        .then(function (res) {
          console.log("elenco impegni:" + res);
          vm.eventSources[0] = res;
        });
    }

    LoadStanza();
    //LoadDisponibilita();

  })
;
