'use strict';

/* Services */

var rapidScoreServices = angular.module('rapidScoreServices', [ 'ngResource' ]);
//var hostname = 'http://localhost:5000/api';
var hostname = 'https://lazyscore.herokuapp.com/api';

// Protected URL
// user account get, edit
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
								+ $window.localStorage.getItem('token')
					}
				},
                save : {
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer '
                            + $window.localStorage.getItem('token')
                    }
                }

			});
		} ]);

rapidScoreServices.factory('UserPassAPI', [
    '$resource',
    '$window',
    function($resource, $window) {
        return $resource(hostname + '/account-password', {}, {
            save : {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer '
                        + $window.localStorage.getItem('token')
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
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// user purchased add, getall
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
								+ $window.localStorage.getItem('token')
					}
				},
				order : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// user purchased add, getall
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
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// user cart get, add, remove
rapidScoreServices.factory('UserCartAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/account/shopping-cart/:scoreid',
			// sid
			{}, {
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				add : {
					method : 'POST',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				clear : {
					method : 'DELETE',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				remove : {
					method : 'DELETE',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// admin slider add
rapidScoreServices.factory('SliderAdminAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/slider/:scoreid',
			// scoreData
			{}, {
				save : {
					method : 'PUT',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// admin score get, get all, add, edit, remove
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
								+ $window.localStorage.getItem('token')
					}
				},
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				add : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				save : {
					method : 'PUT',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				remove : {
					method : 'DELETE',
					isArray: true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// admin category type get, get all, add
rapidScoreServices.factory('TypeAdminAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/types', {}, {
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				add : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// get sub type list of given type; add sub type; edit type(p/s) name, remove
// type
rapidScoreServices.factory('SubTypeAdminAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/types/:typeid', {}, {
				getSub : {
					method : 'GET',
					isArray: true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				add : {
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				save : {
					method : 'PUT',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				remove : {
					method : 'DELETE',
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				}
			})
		} ]);

// admin add score type
rapidScoreServices.factory('ScoreLinkAPI', [
    '$resource',
    '$window',
    function($resource, $window) {
        return $resource(hostname + '/admin/score-link/:scoreid/:linkid',
            //
            {}, {
                add : {
                    method : 'POST',
                    isArray: false,
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer '
                            + $window.localStorage.getItem('token')
                    }
                },
                remove : {
                    method : 'DELETE',
                    isArray: false,
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer '
                            + $window.localStorage.getItem('token')
                    }
                }
            });
    } ]);

// admin add score type
rapidScoreServices.factory('ScoreTypeAPI', [
		'$resource',
		'$window',
		function($resource, $window) {
			return $resource(hostname + '/admin/score-type/:scoreid/:typeid',
			//
			{}, {
				add : {
					method : 'POST',
					isArray: true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				},
				remove : {
					method : 'DELETE',
					isArray: true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// users admin get all, get one
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
								+ $window.localStorage.getItem('token')
					}
				},
				getAll : {
					method : 'GET',
					isArray : true,
					headers : {
						'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '
								+ $window.localStorage.getItem('token')
					}
				}
			});
		} ]);

// Unprotected URI

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

rapidScoreServices.factory('TypeAPI', [ '$resource', function($resource) {
	return $resource(hostname + '/types/:typename', {}, {
		getAll : {
			method : 'GET',
			isArray: true
		},
		getOne : {
			method : 'GET'
		}
	});
} ]);

rapidScoreServices.factory('SubTypeAPI', [ '$resource', function($resource) {
	return $resource(hostname + '/sheetmusic-types/:pname/:subname', {}, {
		getAll : {
			method : 'GET'
		}
	});
} ]);

rapidScoreServices.factory('SubTypeIdAPI', [ '$resource', function($resource) {
    return $resource(hostname + '/subtypes/:subtype_id', {}, {
        getAll : {
            method : 'GET'
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

// options.api.base_url
rapidScoreServices.factory('ContactAPI', [ '$resource', function($resource) {
    return $resource(hostname + '/contact', {}, {
        add : {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            }
        }
    });
} ]);

// options.api.base_url
rapidScoreServices.factory('ActivateAPI', [ '$resource', function($resource) {
    return $resource(hostname + '/activate/:link', {}, {
        get : {
            method : 'GET'
        }
    });
} ]);

// options.api.base_url
rapidScoreServices.factory('DownloadAPI', [ '$resource', function($resource) {
    return $resource(hostname + '/account/download/:link', {}, {
        get : {
            method : 'GET'
        }
    });
} ]);

// user login
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

// user register
rapidScoreServices.factory('RegisterAPI', function($http) {
	return {
		save : function(username, password, firstname, surname) {
			return $http({
				method : 'POST',
				url : hostname + '/users',
				data : {
					username : username,
					password : password,
                    firstname : firstname,
                    surname : surname
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

			if ($window.localStorage.getItem('token')) {
				config.headers.Authorization = 'Bearer '
						+ $window.localStorage.getItem('token');
			}
			return config || $q.when(config);
		},

		response : function(response) {
			if (response.status === 401) {
			}
			return response || $q.when(response);
		}
	};
});
