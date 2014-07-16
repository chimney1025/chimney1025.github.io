'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers', []);

/*
sheetmusicControllers.controller('SheetTopCtrl', ['$scope', 'Top',
  function($scope, Top) {
	$scope.myInterval = 5000;
  	var slides = $scope.slides = [];

    $scope.addSlide = function(imageUrl, name, text) {
      slides.push({
		title: name,
        image: imageUrl,
        text: text
      });
    };
	
	  Top.query(function(sheets){
		for(var i=0; i<sheets.length; i++){
	  		$scope.addSlide(sheets[i].imageUrl, sheets[i].name, sheets[i].snippet);
	  	}
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