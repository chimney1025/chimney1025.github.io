var rapidScoreAnimations = angular.module('rapidScoreAnimations', ['ngAnimate']);


rapidScoreAnimations.controller('ScoreTopCtrl', ['$scope', 'Score',
  function($scope, Top) {
    $scope.scores = Top.query({scoreId:'top'});
    $scope.orderProp = 'age';
	
	$scope.currentIndex = 0;
	
	$scope.setCurrentSlideIndex = function (index) {
		$scope.currentIndex = index;
	};

	$scope.isCurrentSlideIndex = function (index) {
		return $scope.currentIndex === index;
	};

    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.scores.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.scores.length - 1;
	};
	
  }]);
