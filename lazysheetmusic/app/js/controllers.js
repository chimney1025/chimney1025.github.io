'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers', []);

/*
angular.module('rapidScoreControllers', []).
    controller('ScoreListCtrl', function($scope, ScoreAPIService){
        console.log('in controller');
        $scope.scores = [];
        console.log(ScoreAPIService.getScores());

        ScoreAPIService.getScores().
            success(function(response) {
                console.log('getSCores success');
                console.log(response.status);
                //$scope.scores = response;
            }).
            error(function (response) {
                $scope.error = true;
                console.log($scope.error);
            });

});

rapidScoreControllers.controller('ScoreListCtrl', ['$scope', 'ScoreAPIService',
    function($scope, List) {
        $scope.scores = [];
        List.query().success(function (response) {
            alert(response);
            $scope.scores = response;
        });
    }]);
*/

rapidScoreControllers.controller('ScoreListCtrl', ['$scope', 'Score',
  function($scope, List) {
      $scope.scores = List.query();
  }]);


rapidScoreControllers.controller('ScoreDetailCtrl', ['$scope', '$routeParams', 'Score',
    function($scope, $routeParams, Score) {
        $scope.score = Score.get({scoreId: $routeParams.scoreId});
    }]);

rapidScoreControllers.controller('InstrumentCtrl', ['$scope', 'Instrument',
    function($scope, List) {
        $scope.itemname = "Instruments";
        $scope.uri = "instruments";
        $scope.categories = List.query();
    }]);

rapidScoreControllers.controller('ComposerCtrl', ['$scope', 'Composer',
    function($scope, List) {
        $scope.itemname = "Composers";
        $scope.uri = "composers";
        $scope.categories = List.query();
    }]);

rapidScoreControllers.controller('GenreCtrl', ['$scope', 'Genre',
    function($scope, List) {
        $scope.itemname = "Genres";
        $scope.uri = "genres";
        $scope.categories = List.query();
    }]);