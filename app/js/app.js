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
            when('/sheetmusic/:scoreId', {
                templateUrl: 'views/detail.html',
                controller: 'ScoreCtrl'
            }).
            when('/instruments', {
                templateUrl: 'views/category.html',
                controller: 'InstrumentListCtrl'
            }).
            when('/composers', {
                templateUrl: 'views/category.html',
                controller: 'ComposerListCtrl'
            }).
            when('/genres', {
                templateUrl: 'views/category.html',
                controller: 'GenreListCtrl'
            }).
            when('/instruments/:instrumentId', {
                templateUrl: 'views/category-detail.html',
                controller: 'InstrumentCtrl'
            }).
            when('/composers/:composerId', {
                templateUrl: 'views/category-detail.html',
                controller: 'ComposerCtrl'
            }).
            when('/genres/:genreId', {
                templateUrl: 'views/category-detail.html',
                controller: 'GenreCtrl'
            }).
            when('/users/:username/shopping-cart', {
                templateUrl: 'views/shopping-cart.html',
                controller: 'UserCtrl'
            }).
            when('/users/:username/purchased', {
                templateUrl: 'views/purchased.html',
                controller: 'UserCtrl'
            }).
            when('/users/:username', {
                templateUrl: 'views/user-detail.html',
                controller: 'UserCtrl'
            }).
            when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignUpCtrl'
            }).
            when('/redirecting', {
                templateUrl: 'views/redirect.html',
                controller: 'RedirectCtrl'
            }).
            when('/admin/users', {
                templateUrl: 'views/user-list.html',
                controller: 'UserAdminListCtrl'
            }).
            when('/admin/users/:username', {
                templateUrl: 'views/admin-user-detail.html',
                controller: 'UserAdminCtrl'
            }).
            when('/admin/sheetmusic', {
                templateUrl: 'views/admin-score-list.html',
                controller: 'ScoreAdminCtrl'
            }).
            when('/admin/categories', {
                templateUrl: 'views/admin-category-list.html',
                controller: 'CategoryAdminCtrl'
            }).
            when('/testapi', {
                templateUrl: 'views/test.html',
                controller: 'ScoreCtrl'
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
