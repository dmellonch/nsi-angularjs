'use strict';

/**
 * @ngdoc overview
 * @name angularjsCourseApp
 * @description
 * # angularjsCourseApp
 *
 * Main module of the application.
 */
angular
  .module('angularjsCourseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.calendar',
    'ui.bootstrap'
  ])
  .value('baseUrl', 'https://nsi-prenota-v2.azurewebsites.net')
  .run(RunModule)
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('httpLoggingInterceptor');
  })
  .service('httpLoggingInterceptor', function () {

    return {
      request: function (config) {
        console.log(config);
        return config;
      }
    }
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/dettaglioStanza/:Id', {
        templateUrl: 'views/dettagliostanza.html',
        controller: 'DettaglioStanzaCtrl',
        controllerAs: 'stanza'
      })
      .when('/modale/', {
        templateUrl: 'views/modale.html',
        controller: 'ModaleCtrl',
        controllerAs: 'modale'
      })
      .when('/inviti/', {
        templateUrl: 'views/inviti.html',
        controller: 'InvitiCtrl',
        controllerAs: 'inviti'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


RunModule.$inject = ['authService', '$location'];
function RunModule(authService, $location) {
  console.log('RunModule ->', authService.getAuthenticated());

  if (authService.getAuthenticated()) {
    $location.path('/');
  }
  else {
    $location.path('/login');
  }
}

