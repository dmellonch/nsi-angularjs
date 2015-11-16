'use strict';

/**
 * @ngdoc function
 * @name angularjsCourseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularjsCourseApp
 */
angular.module('angularjsCourseApp')
  .controller('LoginCtrl', function ()
  {
    this.credentials = {
      username : "admin" ,
      password : "Password1!"}

    this.doLogin = function()
    {

    }
  });
