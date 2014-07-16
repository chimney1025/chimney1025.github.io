'use strict';

/* App Module */

var rapidScoreApp = angular.module('rapidScoreApp', [
  'rapidScoreControllers',
  'rapidScoreServices',
  'rapidScoreAnimations',
  'ngRoute'
]);

rapidScoreApp.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
          when('/home', {
              templateUrl: 'home.html',
              controller: 'ScoreTopCtrl'
          }).
          when('/sheetmusic', {
              templateUrl: 'score-list.html',
              controller: 'ScoreListCtrl'
          }).
          when('/instruments', {
              templateUrl: 'category.html',
              controller: 'InstrumentCtrl'
          }).
          when('/composers', {
              templateUrl: 'category.html',
              controller: 'ComposerCtrl'
          }).
          when('/genres', {
              templateUrl: 'category.html',
              controller: 'GenreCtrl'
          }).
          when('/sheetmusic/:scoreId', {
              templateUrl: 'detail.html',
              controller: 'ScoreDetailCtrl'
          }).
          when('/shopping-cart', {
              templateUrl: 'shopping-cart.html',
              controller: ''
          }).
          when('/users', {
              templateUrl: 'signup.html',
              controller: ''
          })
  }
]);

rapidScoreApp.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
}]);