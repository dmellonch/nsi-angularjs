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

    function GetStanze(id) {
      console.log("Metodo GetStanze");

      var currentUrl = '/api/Stanza'
      if(id)
        currentUrl = currentUrl + '/' + id;

      return $http.get(baseUrl + currentUrl)
        .then(function (res) {
          return res.data;
        });
    }
  });
