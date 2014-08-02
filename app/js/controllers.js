'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers', []);

rapidScoreControllers.controller('ScoreCtrl', ['$scope', '$routeParams', 'ScoreAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI',
    function($scope, $routeParams, Score, Instrument, Composer, Genre) {
        $scope.scores = Score.getAll();
        $scope.score = Score.getOne({scoreId: $routeParams.scoreId});
        
        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();
    }]);

rapidScoreControllers.controller('UserCtrl', ['$scope', '$routeParams', 'UserAPI',
    function($scope, $routeParams, User) {
        $scope.users = User.getAll();
        $scope.user = User.getOne({userId: $routeParams.userId});
    }]);

rapidScoreControllers.controller('InstrumentCtrl', ['$scope', '$routeParams', 'InstrumentAPI',
    function($scope, $routeParams, Instrument) {
        $scope.itemname = "Instruments";
        $scope.uri = "instruments";
        $scope.categories = Instrument.getAll();
        $scope.category = Instrument.getOne({instrumentId: $routeParams.instrumentId});
        console.log($scope.category);
    }]);

rapidScoreControllers.controller('ComposerCtrl', ['$scope', '$routeParams', 'ComposerAPI',
    function($scope, $routeParams, Composer) {
        $scope.itemname = "Composers";
        $scope.uri = "composers";
        $scope.categories = Composer.getAll();
        $scope.category = Composer.getOne({composerId: $routeParams.composerId});
    }]);

rapidScoreControllers.controller('GenreCtrl', ['$scope', '$routeParams', 'GenreAPI',
    function($scope, $routeParams, Genre) {
        $scope.itemname = "Genres";
        $scope.uri = "genres";
        $scope.categories = Genre.getAll();
        $scope.category = Genre.getOne({genreId: $routeParams.genreId});
    }]);
