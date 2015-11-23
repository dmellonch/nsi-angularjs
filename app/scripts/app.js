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
    'ngTouch'
  ])
  .value('baseUrl', 'https://nsi-prenota-v2.azurewebsites.net')
  .run(RunModule)
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
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
      .otherwise({
        redirectTo: '/'
      });
  });


RunModule.$inject = ['authService','$location'];
function RunModule(authService, $location) {
  console.log('RunModule ->', authService.getAuthenticated());

  if(authService.getAuthenticated()){
    $location.path('/');
  }
  else
  {
    $location.path('/login');
  }
}

