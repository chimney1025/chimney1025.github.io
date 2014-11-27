'use strict';

/* App Module */

var rapidScoreApp = angular.module('rapidScoreApp', [ 'rapidScoreControllers',
    'rapidScoreServices', 'rapidScoreAnimations', 'rapidScoreFilters', 'rapidScoreDirectives',
    'ngRoute', 'ng-breadcrumbs', 'perfect_scrollbar', 'vcRecaptcha' ]);

rapidScoreApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');

    $httpProvider.responseInterceptors.push(function($q, $location, $window,
                                                     $rootScope) {
        return function(promise) {
            return promise.then(
                // Success: just return the response
                function(response) {
                    return response;
                },
                // Error: check the error status to get only the 401
                function(response) {
                    if (response.status === 401) {
                        $rootScope.logged = false;
                        $window.localStorage.removeItem('token');
                        $window.localStorage.removeItem('username');
                        $window.localStorage.removeItem('uid');
                        $window.localStorage.removeItem('admin');
                        //$rootScope.loginCheck = "Invalid User Credentials";
                        $location.url('/login');
                    }
                    if (response.status === 404) {

                        //$location.url('/404');
                    }
                    //
                    return $q.reject(response);
                });
        }
    });
});

rapidScoreApp.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl : 'views/home.html',
        label : 'Home',
        access : {
            requiredLogin : false
        }
    }).when('/home', {
        templateUrl : 'views/home.html',
        label : 'Home',
        access : {
            requiredLogin : false
        }
    }).when('/sheetmusic', {
        templateUrl : 'views/score-list.html',
        label : 'Sheet Music',
        controller : 'ScoreListCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/sheetmusic/:scoreId', {
        templateUrl : 'views/score-detail.html',
        controller : 'ScoreCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/types/:typename', {
        templateUrl : 'views/category-list.html',
        controller : 'TypeCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/types/:pname/:subname', {
        templateUrl : 'views/category-detail.html',
        controller : 'SubTypeCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/subtypes/:id', {
        templateUrl : 'views/category-detail.html',
        controller : 'SubTypeIdCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/account/shopping-cart', {
        templateUrl : 'views/account-cart.html',
        label : 'Shopping Cart',
        controller : 'UserCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/account/purchased', {
        templateUrl : 'views/account-order.html',
        label : 'Orders',
        controller : 'UserCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/account/view-order/:scoreid/:linkid', {
        templateUrl : 'views/download.html',
        label : 'Download',
        controller : 'ViewOrderCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/account/download/:link', {
        templateUrl : 'views/download.html',
        label : 'Download',
        controller : 'DownloadCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/account', {
        templateUrl : 'views/account-detail.html',
        label : 'Account Settings',
        controller : 'UserCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/register', {
        templateUrl : 'views/signup.html',
        label : 'Registration',
        controller : 'SignUpCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/activate/:link', {
        templateUrl : 'views/activate.html',
        label : 'Registration',
        controller : 'ActivateCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/login', {
        templateUrl : 'views/login.html',
        label : 'Login',
        controller : 'LoginCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/contact', {
        templateUrl : 'views/contact.html',
        label : 'Contact',
        controller : 'ContactCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/about', {
        templateUrl : 'views/about.html',
        label : 'About',
        access : {
            requiredLogin : false
        }
    }).when('/terms-and-policies', {
        templateUrl : 'views/terms.html',
        label : 'Terms & Conditions',
        access : {
            requiredLogin : false
        }
    }).when('/redirecting', {
        templateUrl : 'views/redirect.html',
        controller : 'RedirectCtrl',
        access : {
            requiredLogin : false
        }
    }).when('/admin', {
        templateUrl : 'views/admin-settings.html',
        label : 'Admin',
        controller : 'AdminCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/admin/users', {
        templateUrl : 'views/admin-user-list.html',
        label : 'Users',
        controller : 'UserAdminListCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/admin/users/:username', {
        templateUrl : 'views/admin-user-detail.html',
        controller : 'UserAdminCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/admin/scores', {
        templateUrl : 'views/admin-score-list.html',
        label : 'Sheet Music',
        controller : 'ScoreAdminCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/admin/add-sheetmusic', {
        templateUrl : 'views/admin-add-score.html',
        label : 'Add Sheet Music',
        controller : 'ScoreAddCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/admin/sheetmusic/:scoreId', {
        templateUrl : 'views/admin-edit-score.html',
        label : 'Edit Sheet Music',
        controller : 'ScoreEditCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/admin/sheetmusic-link/:scoreId', {
        templateUrl : 'views/admin-score-link.html',
        label : 'Edit Links',
        controller : 'ScoreLinkCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/admin/sheetmusic-type/:scoreId', {
        templateUrl : 'views/admin-score-type.html',
        label : 'Edit Tags',
        controller : 'ScoreTypeCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/admin/categories', {
        templateUrl : 'views/admin-category-list.html',
        label : 'Types',
        controller : 'TypeAdminCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/testapi', {
        templateUrl : 'views/test.html',
        controller : 'ScoreCtrl',
        access : {
            requiredLogin : true
        }
    }).when('/404', {
        templateUrl : 'views/404.html',
        label : '404',
        access : {
            requiredLogin : false
        }
    }).otherwise({
        redirectTo : '/404',
        access : {
            requiredLogin : false
        }
    })
} ]);

rapidScoreApp.run(function($rootScope, $location, $window, $http, AUTH_EVENTS, AuthService) {
    $rootScope.$on("$routeChangeStart",
        function(event, nextRoute) {

            if (nextRoute.access && nextRoute.access.requiredLogin && !$window.localStorage.getItem('token')) {
                // remember current url
                console.log('not logged in');
                $location.path("/login");
            }

            var n = $location.path().split('/').length;

            $rootScope.setActive = function(name){
                if(name == $location.path().split('/')[n-1]){
                    return 'active';
                }
            }
        });
    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
        if ($location.path() == "/home" || $location.path() == "/login"
            || $location.path() == "/register") {
            $rootScope.noBreadcrumb = true;
        } else {
            $rootScope.noBreadcrumb = false;
        }
    });
});

rapidScoreApp.config([ '$httpProvider', function($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
} ]);
