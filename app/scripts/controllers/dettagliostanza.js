'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:DettagliostanzaCtrl
 * @description
 * # DettagliostanzaCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('DettaglioStanzaCtrl', function (roomsService, authService, $routeParams) {

    var vm = this;
    vm.prenotazione = {oraInizio: '',
      oraFine: '',
      dataInizio: '',
      dataFine: ''
    };
    //var myAppModule = angular.module('MyApp', ['ui.bootstrap.datetimepicker'])

    vm.stanzaId = $routeParams.Id;

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

        //dayClick: function (date, jsEvent, view) {
        //  $uibModal.open({
        //    templateUrl: 'fullCalModal',
        //    controller: function() {
        //      vm.titolo = date.format();
        //      $('#modalBody').html(date.description);
        //    },
        //    controllerAs: 'modal',
        //})}

        dayClick: function (date, jsEvent, view) {
          vm.titolo = date.format();
          $('#modalBody').html(date.description);
          console.log(date);
          vm.prenotazione = {oraInizio: new Date().getTime(),
            oraFine: new Date().getTime() + (60*60*1000),
            dataInizio: date.toDate(),
            dataFine: date.toDate()
          };

          $('#fullCalModal').modal();
        }
      }
    };

    vm.conferma = conferma;

    function LoadStanza() {
      //console.log("id=" + $state.params.Id);
      return roomsService.GetStanze(vm.stanzaId)
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
      return roomsService.GetDisponibilita(vm.stanzaId, params)
        .then(function (res) {
          console.log("elenco impegni:" + res);
          vm.eventSources[0] = res;
        });
    }

    function conferma() {
      console.log(vm.prenotazione);
      var dI=vm.prenotazione.dataInizio;
      var dF=vm.prenotazione.dataFine;
      var oI=new Date(vm.prenotazione.oraInizio);
      var oF=new Date(vm.prenotazione.oraFine);

      var paramInizio = new Date(dI.getFullYear(), dI.getMonth(), dI.getDate(),
        oI.getHours(), oI.getMinutes(), 0, 0);
      var paramFine = new Date(dF.getFullYear(), dF.getMonth(), dF.getDate(),
        oF.getHours(), oF.getMinutes(), 0, 0);

      console.log(paramInizio);
      console.log(paramFine);


      return roomsService.Prenota({
          CreatoreId: authService.getUserData().Id,
          StanzaId: vm.stanzaId,
          Inizio: paramInizio,
          Fine: paramFine
        });
    }

    LoadStanza();
//LoadDisponibilita();

  })
;
