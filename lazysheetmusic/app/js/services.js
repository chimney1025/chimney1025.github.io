'use strict';

/* Services */

var rapidScoreServices = angular.module('rapidScoreServices', ['ngResource']);

rapidScoreServices.factory('Score', ['$resource',
    function($resource){
        return $resource('sources/:scoreId.json', {}, {
            query: {method:'GET', params:{scoreId:'all'}, isArray:true}
        });
    }]);

rapidScoreServices.factory('Instrument', ['$resource',
    function($resource){
        return $resource('sources/:itemId.json', {}, {
            query: {method:'GET', params:{itemId:'instruments'}, isArray:true}
        });
    }]);

rapidScoreServices.factory('Composer', ['$resource',
    function($resource){
        return $resource('sources/:itemId.json', {}, {
            query: {method:'GET', params:{itemId:'composers'}, isArray:true}
        });
    }]);

rapidScoreServices.factory('Genre', ['$resource',
    function($resource){
        return $resource('sources/:itemId.json', {}, {
            query: {method:'GET', params:{itemId:'genres'}, isArray:true}
        });
    }]);