var rapidScoreAnimations = angular.module('rapidScoreAnimations', ['ngAnimate']);


rapidScoreAnimations.directive('slider', function($timeout, $q){
    return {
        restrict: 'AE',
        replace: true,
        controller: ['$scope', 'SliderAPI', function($scope, Top) {
            $scope.images = Top.getAll(function(res){
                console.log('scope result: ');
                console.log(res);
            });
            $scope.orderProp = 'added';
            console.log($scope.images);
        }],
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

            scope.$watch('currentIndex',function(newValue, oldValue){
                console.log('new: '); console.log(newValue);
                console.log('old: '); console.log(oldValue);
                console.log(scope.images);
                console.log('length: '); console.log(scope.images.length);
                
                scope.images.forEach(function(image){
                    image.visible=false;
                });
                scope.images[scope.currentIndex].visible=true;
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
})
