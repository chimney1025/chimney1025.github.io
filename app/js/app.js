'use strict';

/* App Module */

var rapidScoreApp = angular.module('rapidScoreApp', [ 'rapidScoreControllers',
		'rapidScoreServices', 'rapidScoreAnimations', 'rapidScoreFilters',
		'ngRoute', 'ng-breadcrumbs' ]);

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
					console.log('401 returned');
					console.log($window.localStorage.getItem('username'));
					$rootScope.logged = false;
					$window.localStorage.removeItem('token');
					$window.localStorage.removeItem('username');
					$window.localStorage.removeItem('uid');
					$window.localStorage.removeItem('admin');
					$rootScope.loginCheck = "Invalid User Credentials";
					//$location.url('/login');
				}
				//
				return $q.reject(response);
			});
		}
	});
});

rapidScoreApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
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
	}).when('/instruments', {
		templateUrl : 'views/category-list.html',
		label : 'Instruments',
		controller : 'InstrumentListCtrl',
		access : {
			requiredLogin : false
		}
	}).when('/composers', {
		templateUrl : 'views/category-list.html',
		label : 'Composers',
		controller : 'ComposerListCtrl',
		access : {
			requiredLogin : false
		}
	}).when('/genres', {
		templateUrl : 'views/category-list.html',
		label : 'Genres',
		controller : 'GenreListCtrl',
		access : {
			requiredLogin : false
		}
	}).when('/instruments/:instrumentId', {
		templateUrl : 'views/category-detail.html',
		controller : 'InstrumentCtrl',
		access : {
			requiredLogin : false
		}
	}).when('/composers/:composerId', {
		templateUrl : 'views/category-detail.html',
		controller : 'ComposerCtrl',
		access : {
			requiredLogin : false
		}
	}).when('/genres/:genreId', {
		templateUrl : 'views/category-detail.html',
		controller : 'GenreCtrl',
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
	}).when('/account', {
		templateUrl : 'views/account-detail.html',
		label : 'Account Settings',
		controller : 'UserCtrl',
		access : {
			requiredLogin : true
		}
	}).when('/register', {
		templateUrl : 'views/signup.html',
		label : 'Register',
		controller : 'SignUpCtrl',
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
	}).when('/admin/sheetmusic', {
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
	}).when('/admin/categories', {
		templateUrl : 'views/admin-category-list.html',
		label : 'Categories',
		controller : 'CategoryAdminCtrl',
		access : {
			requiredLogin : true
		}
	}).when('/testapi', {
		templateUrl : 'views/test.html',
		controller : 'ScoreCtrl',
		access : {
			requiredLogin : true
		}
	}).otherwise({
		redirectTo : '/home',
		access : {
			requiredLogin : false
		}
	})
} ]);

rapidScoreApp.run(function($rootScope, $location, $window, $http) {
	$rootScope.$on("$routeChangeStart",
			function(event, nextRoute, currentRoute) {

				if (nextRoute.access.requiredLogin
						&& !$window.localStorage.getItem('token')) {
					$location.path("/login");
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
