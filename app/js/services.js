'use strict';

/* Services */

var rapidScoreServices = angular.module('rapidScoreServices', [ 'ngResource' ]);
//var hostname = 'http://localhost:5000/api';
var hostname = 'http://lazyscore.herokuapp.com/api';

//Protected URL
//user account get, edit
rapidScoreServices.factory('UserAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/account', {}, {
				getOne : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}

			});
		} ]);

rapidScoreServices.factory('CheckOrderAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/account/check-order/:scoreid', {}, {
				get : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//user purchased add, getall
rapidScoreServices.factory('UserOrderAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/account/orders', {}, {
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				order : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//user purchased add, getall
rapidScoreServices.factory('UserOrderDetailAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/account/order-detail/:orderid', {}, {
				getScores : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//user cart get, add, remove
rapidScoreServices.factory('UserCartAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/account/shopping-cart/:scoreid',
			//sid
			{}, {
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				add : {
					method : 'POST',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				clear : {
					method : 'DELETE',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				remove : {
					method : 'DELETE',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//admin slider add
rapidScoreServices.factory('SliderAdminAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/slider/:scoreid',
			//scoreData
			{}, {
				save : {
					method : 'PUT',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//admin score get, get all, add, edit, remove
rapidScoreServices.factory('ScoreAdminAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/sheetmusic/:scoreid', {}, {
				getOne : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				add : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				save : {
					method : 'PUT',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				remove : {
					method : 'DELETE',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//admin category type get, get all, add
rapidScoreServices.factory('TypeAdminAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/types/:typeid', {}, {
				getOne : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				add : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				save : {
					method : 'PUT',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				remove : {
					method : 'DELETE',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//score type admin api

//users admin get all, get one
rapidScoreServices.factory('UserAdminAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/users/:username', {}, {
				getOne : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//admin add score category
rapidScoreServices.factory('ScoreTypeAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/score-type/',
			//
			{}, {
				add : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				},
				remove : {
					method : 'DELETE',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.sessionStorage.getItem('token')
					}
				}
			});
		} ]);

//Unprotected URI

rapidScoreServices.factory('ScoreAPI', [ '$resource', function($resource) {
	return $resource(hostname + '/sheetmusic/:scoreid', {}, {
		getOne : {
			method : 'GET'
		},
		getAll : {
			method : 'GET',
			isArray : true
		}
	});
} ]);

rapidScoreServices.factory('SliderAPI', [ '$resource', function($resource) {
	return $resource(hostname + '/slider', {}, {
		getAll : {
			method : 'GET',
			isArray : true
		}
	});
} ]);

rapidScoreServices.factory('InstrumentAPI', [ '$resource', function($resource) {
	return $resource(hostname + '/instruments/:cname', {}, {
		getOne : {
			method : 'GET'
		},
		getAll : {
			method : 'GET',
			isArray : true
		}
	});
} ]);

rapidScoreServices.factory('ComposerAPI', [ '$resource', function($resource) {
	return $resource(hostname + '/composers/:cname', {}, {
		getOne : {
			method : 'GET'
		},
		getAll : {
			method : 'GET',
			isArray : true
		}
	});
} ]);

rapidScoreServices.factory('GenreAPI', [ '$resource', function($resource) {
	return $resource(hostname + '/genres/:cname', {}, {
		getOne : {
			method : 'GET'
		},
		getAll : {
			method : 'GET',
			isArray : true
		}
	});
} ]);

rapidScoreServices.factory('CheckUsernameAPI', [ '$resource',
		function($resource) {
			return $resource(hostname + '/check-username/:username', {}, {
				getOne : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			});
		} ]);

/* post, put, delete by id */

//options.api.base_url
//user login
rapidScoreServices.factory('LoginAPI', function($http) {
	return {
		login : function(username, password) {
			return $http({
				method : 'POST',
				url : hostname + '/login',
				data : {
					username : username,
					password : password
				},
				headers : {
					'Content-Type' : 'application/json'
				}
			});
		},

		logout : function() {

		}
	}
});

//user register
rapidScoreServices.factory('RegisterAPI', function($http) {
	return {
		save : function(username, password) {
			return $http({
				method : 'POST',
				url : hostname + '/users',
				data : {
					username : username,
					password : password
				},
				headers : {
					'Content-Type' : 'application/json'
				}
			});
		}
	}
});

rapidScoreServices.factory('TokenInterceptor', function($q, $window) {
	return {
		request : function(config) {
			config.headers = config.headers || {};
			console.log('token interceptor');

			if ($window.sessionStorage.getItem('token')) {
				config.headers.Authorization = 'Bearer '
						+ $window.sessionStorage.getItem('token');
				console.log(config.headers);
			}
			return config || $q.when(config);
		},

		response : function(response) {
			if (response.status === 401) {
				console.log(response.status);
			}
			return response || $q.when(response);
		}
	};
});