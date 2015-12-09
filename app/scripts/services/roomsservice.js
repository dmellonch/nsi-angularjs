'use strict';

/**
 * @ngdoc service
 * @name angularjsCourseApp.roomsService
 * @description
 * # roomsService
 * Service in the angularjsCourseApp.
 */
angular.module('angularjsCourseApp')
  .service('roomsService', function ($http, baseUrl) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var vm = this;
    vm.GetStanze = GetStanze;
    vm.GetDisponibilita = GetDisponibilita;
    vm.Prenota = Prenota;
    vm.GetInviti = GetInviti;
    vm.Accetta = Accetta;
    vm.Rifiuta = Rifiuta;

    function GetStanze(id) {
      var currentUrl = '/api/Stanza'
      if (id)
        currentUrl = currentUrl + '/' + id;

      return $http.get(baseUrl + currentUrl)
        .then(function (res) {
          return res.data;
        });
    };

    function GetDisponibilita(id, params) {
      console.log("GetDisponibilita");
      return $http.get(baseUrl + '/api/Stanza/' + id + '/PeriodiStato', {
        params: params
      })
        .then(function (res) {
          console.log("elenco impegni:" + res);
          var result = [];

          res.data.forEach(function (item, index) {

            console.log("ciclo su impegno:" + item);
            if (item.Stato != "2")
              result.push({
                title: item.Stato == "0"
                  ? "Non Prenotabile"
                  : "Prenotato",
                start: item.Inizio,
                end: (res.data.length - 1 == index
                  ? params.fine
                  : res.data[index + 1].Inizio)
              })
          })

          return result;
        });
    };

    function Prenota(params, users) {
      return $http.post(baseUrl + '/api/Prenotazione/', params)
        .then(
        function (res) {
          users.forEach(function (item) {
            console.log('prenotazione ', res);
            console.log('item ', item);
            var invito = {
              PrenotazioneId: res.data,
              InvitatoId: item.Id,
              Stato: 0
            }

            $http.post(baseUrl + '/api/Invito/', invito)
              .then(
              console.log('utente invitato ', invito)
            )
          })
        }
      ).
        catch(
        console.log('fallita'))

    }

    function GetInviti() {
      return $http.get(baseUrl + '/api/Invito/Ricevuti/')
        .then(function (res) {
          console.log("elenco inviti ricevuti:" + res);
          return res.data;
        });
    };


    function Accetta(id) {
      return $http.post(baseUrl + '/api/Invito/'+id+'/Accetta')
        .then(
        function (res) {
          console.log('invito accettato');
        }
      ).
        catch(
        console.log('errore accettazione invito'))

    }
    function Rifiuta(id) {
      return $http.post(baseUrl + '/api/Invito/'+id+'/Rifiuta')
        .then(
        function (res) {
          console.log('invito rifiutato');
        }
      ).
        catch(
        console.log('errore rifiuto invito'))

    }

  });
