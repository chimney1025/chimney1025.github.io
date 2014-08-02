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
                templateUrl: 'views/home.html',
                controller: ''
            }).
            when('/sheetmusic', {
                templateUrl: 'views/score-list.html',
                controller: 'ScoreListCtrl'
            }).
            when('/instruments', {
                templateUrl: 'views/category.html',
                controller: 'InstrumentCtrl'
            }).
            when('/composers', {
                templateUrl: 'views/category.html',
                controller: 'ComposerCtrl'
            }).
            when('/genres', {
                templateUrl: 'views/category.html',
                controller: 'GenreCtrl'
            }).
            when('/sheetmusic/:scoreId', {
                templateUrl: 'views/detail.html',
                controller: 'ScoreDetailCtrl'
            }).
            when('/users/:userId/shopping-cart', {
                templateUrl: 'views/shopping-cart.html',
                controller: 'UserDetailCtrl'
            }).
            when('/users/:userId/purchased', {
                templateUrl: 'views/purchased.html',
                controller: 'UserDetailCtrl'
            }).
            when('/users/:userId', {
                templateUrl: 'views/user-detail.html',
                controller: 'UserDetailCtrl'
            }).
            when('/signup', {
                templateUrl: 'views/signup.html',
                controller: ''
            }).
            when('/admin', {
                templateUrl: 'views/user-list.html',
                controller: 'UserCtrl'
            }).
            when('/admin/users', {
                templateUrl: 'views/user-list.html',
                controller: 'UserCtrl'
            }).
            when('/admin/sheetmusic', {
                templateUrl: 'views/admin-score-list.html',
                controller: 'ScoreListCtrl'
            }).
            when('/admin/categories', {
                templateUrl: 'views/admin-category-list.html',
                controller: 'AdminCategoryCtrl'
            }).
            when('/testapi', {
                templateUrl: 'views/test.html',
                controller: 'ScoreListCtrl'
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
