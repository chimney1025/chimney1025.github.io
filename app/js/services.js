'use strict';

/* Services */

var rapidScoreServices = angular.module('rapidScoreServices', ['ngResource']);
//var hostname = 'http://localhost:5000';
var hostname = 'http://lazyscore.herokuapp.com';

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

rapidScoreServices.factory('UserAPI', ['$resource',
    function($resource){
        return $resource(
                hostname + '/users/:username',
            {},
            {
                login: {method:'GET'},
                register: {method:'POST'},
                getOne: {method:'GET'}
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
                hostname + '/admin/categories',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);
