'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers', []);

rapidScoreControllers.controller('ScoreListCtrl', ['$scope', 'ScoreAPI', 'InstrumentAPI', 'Composer', 'GenreAPI',
    function($scope, Score, Instrument, Composer, Genre) {
        $scope.scores = Score.getAll();
        
        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();
    }]);

rapidScoreControllers.controller('ScoreDetailCtrl', ['$scope', '$routeParams', 'ScoreAPI',
    function($scope, $routeParams, Score) {
        $scope.score = Score.getOne({scoreId: $routeParams.scoreId});
    }]);

/*
rapidScoreControllers.controller('ScoreListCtrl', ['$scope', 'Score', 'Instrument', 'Composer', 'Genre',
    function($scope, List, Instrument, Composer, Genre) {
        $scope.scores = List.query();
        $scope.getInstruments = Instrument.query();
        $scope.getComposers = Composer.query();
        $scope.getGenres = Genre.query();
    }]);
    */

rapidScoreControllers.controller('InstrumentCtrl', ['$scope', 'InstrumentAPI',
    function($scope, List) {
        $scope.itemname = "Instruments";
        $scope.uri = "instruments";
        $scope.categories = List.getAll();
    }]);

rapidScoreControllers.controller('ComposerCtrl', ['$scope', 'Composer',
    function($scope, List) {
        $scope.itemname = "Composers";
        $scope.uri = "composers";
        $scope.categories = List.getAll();
    }]);

rapidScoreControllers.controller('GenreCtrl', ['$scope', 'GenreAPI',
    function($scope, List) {
        $scope.itemname = "Genres";
        $scope.uri = "genres";
        $scope.categories = List.getAll();
    }]);

rapidScoreControllers.controller('UserCtrl', ['$scope', 'UserAPI',
    function($scope, List) {
        $scope.users = List.getAll();
    }]);


rapidScoreControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserAPI',
    function($scope, $routeParams, User) {
        $scope.user = User.getOne({userId: $routeParams.userId});

    }]);
