'use strict';

/**
 * @ngdoc service
 * @name angularjsCourseApp.notification
 * @description
 * # notification
 * Service in the angularjsCourseApp.
 */
angular.module('angularjsCourseApp')
  .factory('notification', function (Hub, baseUrl, toastr, $http, roomsService) {

    return new Hub('mainHub', {
      rootPath: baseUrl + '/signalr',
      logging: true,
      listeners: {
        notificaPrenotazione: notificaPrenotazione,
        notificaInvitoAccettato: notificaInvitoAccettato,
        notificaInvitoRifiutato: notificaInvitoRifiutato
      }
    });

    function notificaPrenotazione(prenotazione) {
      console.log('prenotazione ', prenotazione);
      var stanza;
      roomsService.GetStanze(prenotazione.StanzaId).then(function (res) {
        stanza = res;
        toastr.info('Prenotazione per '+ stanza.Nome+ ' il '+prenotazione.Inizio);

      })

    }

    function notificaInvitoAccettato(invito) {
    }

    function notificaInvitoRifiutato(invito) {
    }


  });
