'use strict';

/* Services */

var rapidScoreServices = angular.module('rapidScoreServices', ['ngResource']);
var hostname = 'http://localhost:5000';
//var hostname = 'http://lazyscore.herokuapp.com';

rapidScoreServices.factory('InstrumentAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/instruments/:cname',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('ComposerAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/composers/:cname',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('GenreAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/genres/:cname',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('UserCartAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/users/:username/shopping-cart',
            {},
            {
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('UserOrderAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/users/:username/purchased',
            {},
            {
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('UserAdminAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/users/:username',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('ScoreAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/sheetmusic/:scoreId',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('ScoreAdminAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/sheetmusic/:scoreId',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('CategoryAdminAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/categorytypes',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('UserAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/users/:username',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('CheckUsernameAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/check-username/:username',
            {},
            {
                getOne: {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }}
            }
        );
    }]);

rapidScoreServices.factory('CheckEmailAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/check-email/:email',
            {},
            {
                getOne: {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }}
            }
        );
    }]);

/* post, put, delete by id */

//user register
rapidScoreServices.factory('RegisterAPI', ['$resource',
    function($resource){

        return $resource(
                hostname + '/users',
            {},
            {
                save: {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        );
    }]);

//add, remove, clear cart
rapidScoreServices.factory('AddOrClearCartAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/users/:userid/shopping-cart',
            //sid
            {},
            {
                add: {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }},
                clear: {method: 'DELETE'}
            }
        );
    }]);

rapidScoreServices.factory('RemoveCartAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/users/:userid/shopping-cart/:scoreid',
            {},
            {
                remove: {method: 'DELETE'}
            }
        );
    }]);

//place order
rapidScoreServices.factory('PlaceOrderAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/users/:username/purchased',
            //info
            {},
            {
                order: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        );
    }]);

//admin insert category type
rapidScoreServices.factory('AddCategoryTypeAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/categorytypes',
            //ctname
            {},
            {
                save: {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        );
    }]);

//admin remove or edit category type
rapidScoreServices.factory('EditCategoryTypeAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/categorytypes/ctnumber',
            //ctname
            {},
            {
                save: {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                remove: {method:'DELETE'}
            }
        );
    }]);

//admin insert category
rapidScoreServices.factory('AddCategoryAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/categorytypes/:ctname',
            //cname
            {},
            {
                save: {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        );
    }]);

//admin remove category
rapidScoreServices.factory('EditCategoryAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/category/cnumber',
            //cname
            {},
            {
                save: {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                remove: {method:'DELETE'}
            }
        );
    }]);

//admin insert score
rapidScoreServices.factory('AddScoreAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/sheetmusic',
            //scoreData
            {},
            {
                save: {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        );
    }]);

//admin remove, edit score
rapidScoreServices.factory('EditScoreAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/sheetmusic/:scoreid',
            //scoreData
            {},
            {
                save: {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
                remove: {method:'DELETE'}
            }
        );
    }]);

//admin add score category
rapidScoreServices.factory('AddScoreCategoryAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/sheetmusic/:scoreid',
            //cnumber
            {},
            {
                save: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        );
    }]);

//admin remove score category
rapidScoreServices.factory('RemoveScoreCategoryAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/admin/score-category/:scnumber',
            {},
            {
                remove: {method:'DELETE'}
            }
        );
    }]);