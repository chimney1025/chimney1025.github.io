'use strict';

/* App Module */

var rapidScoreApp = angular.module('rapidScoreApp', [
    'rapidScoreControllers',
    'rapidScoreServices',
    'rapidScoreAnimations',
    'rapidScoreFilters',
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
            when('/user/:userId/shopping-cart', {
                templateUrl: 'shopping-cart.html',
                controller: 'UserDetailCtrl'
            }).
            when('/user/:userId/purchased', {
                templateUrl: 'purchased.html',
                controller: 'UserDetailCtrl'
            }).
            when('/user/:userId', {
                templateUrl: 'user-detail.html',
                controller: 'UserDetailCtrl'
            }).
            when('/signup', {
                templateUrl: 'signup.html',
                controller: ''
            }).
            when('/admin', {
                templateUrl: 'user-list.html',
                controller: 'UserCtrl'
            }).
            when('/admin/users', {
                templateUrl: 'user-list.html',
                controller: 'UserCtrl'
            }).
            when('/admin/sheetmusic', {
                templateUrl: 'admin-score-list.html',
                controller: 'ScoreListCtrl'
            }).
            when('/admin/categories', {
                templateUrl: 'admin-category-list.html',
                controller: 'AdminCategoryCtrl'
            }).
            when('/testapi', {
                templateUrl: 'test.html',
                controller: 'ScoreAPICtrl'
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
