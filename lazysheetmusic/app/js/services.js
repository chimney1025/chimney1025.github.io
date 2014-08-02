'use strict';

/* Services */

var rapidScoreServices = angular.module('rapidScoreServices', ['ngResource']);

rapidScoreServices.factory('InstrumentAPI', ['$resource',
    function($resource){
        return $resource(
            'http://rapidscore.apiary-mock.com/instruments/:instrumentId', 
            {}, 
            {
                getOne: {method: 'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('ComposerAPI', ['$resource',
    function($resource){
        return $resource(
            'http://rapidscore.apiary-mock.com/composers/:composerId', 
            {}, 
            {
                getOne: {method: 'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('GenreAPI', ['$resource',
    function($resource){
        return $resource(
            'http://rapidscore.apiary-mock.com/genres/:genreId', 
            {}, 
            {
                getOne: {method: 'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('UserAPI', ['$resource',
    function($resource){
        return $resource(
            'http://rapidscore.apiary-mock.com/users/:userId',
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
            'http://rapidscore.apiary-mock.com/sheetmusic/:scoreId',
            {},
            {
                getOne: {method:'GET'},
                getAll: {method:'GET', isArray:true}
            }
        );
    }]);
