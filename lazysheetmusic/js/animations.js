var rapidScoreAnimations = angular.module('rapidScoreAnimations', ['ngAnimate']);

rapidScoreAnimations.directive('slider',
    function($timeout, $q, $location, $anchorScroll){
        return {
            restrict: 'AE',
            replace: true,
            controller: ['$scope', 'SliderAPI', '$anchorScroll', '$location',
                function($scope, Top, $anchorScroll, $location) {
                    $scope.images = Top.getAll(function(res){
                        $scope.$broadcast("Data_Ready");
                    });
                    $scope.orderProp = 'added';
                    //setting arrow css
                    //$scope.sliderarrow={"top": "50%"};
                }],
            scope:{
                images: '='
            },
            link: function (scope, elem, attrs) {

                scope.$on("Data_Ready", function(){

                    scope.currentIndex=0;
                    scope.shorturl = scope.images[scope.currentIndex].shortname;

                    scope.setSliderActive=function(i){
                        if(scope.currentIndex == i){
                            return 'active';
                        }
                    };

                    scope.gotoAnchor = function(x){
                        var newHash = 'slide' + x;
                        if($location.hash() !== newHash){
                            $location.hash('slide'+x);
                            console.log('hash: ');
                            console.log(x);
                        } else{
                            console.log('else hash: ');
                            console.log(x);
                            $anchorScroll();
                        }
                    }

                    scope.next=function(){
                        scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
                        scope.shorturl = scope.images[scope.currentIndex].shortname;
                    };

                    scope.prev=function(){
                        scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
                        scope.shorturl = scope.images[scope.currentIndex].shortname;
                    };

                    scope.jump=function(i){
                        scope.currentIndex=i;
                        scope.shorturl = scope.images[scope.currentIndex].shortname;
                    };

                    scope.$watch('currentIndex',function(){
                        scope.images.forEach(function(image){
                            image.visible=false;
                        });

                        scope.images[scope.currentIndex].visible=true;

                        scope.shorturl = scope.images[scope.currentIndex].shortname;
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
                });

            },
            templateUrl:'views/slider.html'
        }
    })
