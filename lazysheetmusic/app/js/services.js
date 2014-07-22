'use strict';

/* Services */

var rapidScoreServices = angular.module('rapidScoreServices', ['ngResource']);

rapidScoreServices.factory('User', ['$resource',
    function($resource){
        return $resource('sources/:userId.json', {}, {
            query: {method:'GET', params:{userId:'users'}, isArray:true}
        });
    }]);

rapidScoreServices.factory('Score', ['$resource',
    function($resource){
        return $resource('sources/:scoreId.json', {}, {
            query: {method:'GET', params:{scoreId:'all'}, isArray:true}
        });
    }]);


rapidScoreServices.factory('ScoreAPIService', ['$http',
    function($http){
        var scoreAPI = {};
        scoreAPI.getScores = function(){
            return $http({
                method: 'JSONP',
                url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
                //url: 'http://rapidscore.apiary-mock.com/sheetmusic?callback=JSON_CALLBACK'
            })
        };

        return scoreAPI;
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