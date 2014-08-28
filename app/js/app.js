'use strict';

/* App Module */

var rapidScoreApp = angular.module('rapidScoreApp', [
    'rapidScoreControllers',
    'rapidScoreServices',
    'rapidScoreAnimations',
    'rapidScoreFilters',
    'ngRoute'
]);

rapidScoreApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

rapidScoreApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'views/home.html',
                controller: 'SliderCtrl',
                access: { requiredLogin: false }
            }).
            when('/sheetmusic', {
                templateUrl: 'views/score-list.html',
                controller: 'ScoreListCtrl',
                access: { requiredLogin: false }
            }).
            when('/sheetmusic/:scoreId', {
                templateUrl: 'views/detail.html',
                controller: 'ScoreCtrl',
                access: { requiredLogin: false }
            }).
            when('/instruments', {
                templateUrl: 'views/category.html',
                controller: 'InstrumentListCtrl',
                access: { requiredLogin: false }
            }).
            when('/composers', {
                templateUrl: 'views/category.html',
                controller: 'ComposerListCtrl',
                access: { requiredLogin: false }
            }).
            when('/genres', {
                templateUrl: 'views/category.html',
                controller: 'GenreListCtrl',
                access: { requiredLogin: false }
            }).
            when('/instruments/:instrumentId', {
                templateUrl: 'views/category-detail.html',
                controller: 'InstrumentCtrl',
                access: { requiredLogin: false }
            }).
            when('/composers/:composerId', {
                templateUrl: 'views/category-detail.html',
                controller: 'ComposerCtrl',
                access: { requiredLogin: false }
            }).
            when('/genres/:genreId', {
                templateUrl: 'views/category-detail.html',
                controller: 'GenreCtrl',
                access: { requiredLogin: false }
            }).
            when('/users/:username/shopping-cart', {
                templateUrl: 'views/shopping-cart.html',
                controller: 'UserCtrl',
                access: { requiredLogin: true }
            }).
            when('/users/:username/purchased', {
                templateUrl: 'views/purchased.html',
                controller: 'UserCtrl',
                access: { requiredLogin: true }
            }).
            when('/users/:username', {
                templateUrl: 'views/user-detail.html',
                controller: 'UserCtrl',
                access: { requiredLogin: true }
            }).
            when('/register', {
                templateUrl: 'views/signup.html',
                controller: 'SignUpCtrl',
                access: { requiredLogin: false }
            }).
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                access: { requiredLogin: false }
            }).
            when('/redirecting', {
                templateUrl: 'views/redirect.html',
                controller: 'RedirectCtrl',
                access: { requiredLogin: false }
            }).
            when('/admin/users', {
                templateUrl: 'views/user-list.html',
                controller: 'UserAdminListCtrl',
                access: { requiredLogin: true }
            }).
            when('/admin/users/:username', {
                templateUrl: 'views/admin-user-detail.html',
                controller: 'UserAdminCtrl',
                access: { requiredLogin: true }
            }).
            when('/admin/sheetmusic', {
                templateUrl: 'views/admin-score-list.html',
                controller: 'ScoreAdminCtrl',
                access: { requiredLogin: true }
            }).
            when('/admin/add-sheetmusic', {
                templateUrl: 'views/add-score.html',
                controller: 'ScoreAddCtrl',
                access: { requiredLogin: true }
            }).
            when('/admin/sheetmusic/:scoreId', {
                templateUrl: 'views/edit-score.html',
                controller: 'ScoreEditCtrl',
                access: { requiredLogin: true }
            }).
            when('/admin/categories', {
                templateUrl: 'views/admin-category-list.html',
                controller: 'CategoryAdminCtrl',
                access: { requiredLogin: true }
            }).
            when('/testapi', {
                templateUrl: 'views/test.html',
                controller: 'ScoreCtrl',
                access: { requiredLogin: true }
            }).
            otherwise({
                redirectTo: '/home',
                access: { requiredLogin: false }
            })
    }
]);


rapidScoreApp.run(function($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if(nextRoute.access.requiredLogin && !$window.sessionStorage.getItem('token')){
            $location.path("/login");
        }
    });
});


rapidScoreApp.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
}]);
