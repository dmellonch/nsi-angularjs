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

    function prenota(params) {
      return $http.post(baseUrl + '/api/Prenotazione/', {params: params})
        .then(
        console.log('fatta')
      )

    }

  });
