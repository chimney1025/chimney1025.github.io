'use strict';

/* Services */

var rapidScoreServices = angular.module('rapidScoreServices', ['ngResource']);

/*
rapidScoreServices.factory('Score', ['$resource',
    function($resource){
        return $resource('sources/:scoreId.json', {}, {
            query: {method:'GET', params:{scoreId:'all'}, isArray:true}
        });
    }]);
*/

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

rapidScoreServices.factory('UserListAPIService', ['$resource',
    function($resource){
        return $resource(
            'http://rapidscore.apiary-mock.com/users',
            {},
            {
                getUsers: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('UserDetailAPIService', ['$resource',
    function($resource){
        return $resource(
            'http://rapidscore.apiary-mock.com/user/:userId',
            {},
            {
                getUser: {method:'GET'}
            }
        );
    }]);

rapidScoreServices.factory('ScoreListAPIService', ['$resource',
    function($resource){
        return $resource(
            'http://rapidscore.apiary-mock.com/sheetmusic',
            {},
            {
                getScores: {method:'GET', isArray:true}
            }
        );
    }]);

rapidScoreServices.factory('ScoreDetailAPIService', ['$resource',
    function($resource){
        return $resource(
            'http://rapidscore.apiary-mock.com/sheetmusic/:scoreId',
            {},
            {
                getScore: {method:'GET'}
            }
        );
    }]);