var rapidScoreAnimations = angular.module('rapidScoreAnimations', ['ngAnimate']);


rapidScoreAnimations.controller('SliderCtrl', ['$scope', 'SliderAPI',
    function($scope, Top) {
        $scope.images = Top.getAll();
        $scope.orderProp = 'added';
        console.log($scope.images);
        //$scope.images=[{src:'p1.jpg',title:'Pic 1'},{src:'p2.jpg',title:'Pic 2'},{src:'p3.jpg',title:'Pic 3'},{src:'s1.jpg',title:'Pic 4'},{src:'s2.jpg',title:'Pic 5'}];
    }]);

rapidScoreAnimations.directive('slider', ['$timeout', function($timeout){
    return {
        restrict: 'AE',
        replace: true,
        scope:{
            images: '='
        },
        link: function (scope, elem, attrs) {

            scope.currentIndex=0;

            scope.next=function(){
                scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
            };

            scope.prev=function(){
                scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
            };

            scope.$watch('currentIndex',function(){
                $timeout(function(){
                    scope.images.forEach(function(image){
                        image.visible=false;
                    });
                    scope.images[scope.currentIndex].visible=true;
                }, 0);
            });

            /* Start: For Automatic slideshow*/

            var timer;

            var sliderFunc=function(){
                timer=$timeout(function(){
                    scope.next();
                    timer=$timeout(sliderFunc,5000);
                },5000);
            };

            sliderFunc();

            scope.$on('$destroy',function(){
                $timeout.cancel(timer);
            });

            /* End : For Automatic slideshow*/

        },
        templateUrl:'views/slider.html'
    }
}])
