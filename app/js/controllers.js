'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers', ['ui.bootstrap']);

rapidScoreControllers.controller('ScoreListCtrl', ['$scope', 'ScoreAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI',
    function($scope, Score, Instrument, Composer, Genre) {
        $scope.scores = Score.getAll();
        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();
    }]);

rapidScoreControllers.controller('ScoreCtrl', ['$scope', '$rootScope', '$routeParams', 'ScoreAPI', 'CartAPI', '$location', '$window', 'UserCartAPI',
    function($scope, $rootScope, $routeParams, Score, AddCart, $location, $window, Cart, Instrument, Composer, Genre) {
        $scope.score = Score.getOne({scoreId: $routeParams.scoreId});
        console.log($scope.score);
        console.log($window.sessionStorage.getItem('uid'));

        $rootScope.action = 'Add to Cart';
        $rootScope.action_class = 'btn-warning';


        $scope.link = function(){
            console.log('sid:');
            console.log($scope.score.sid);

            if(!$window.sessionStorage.getItem('uid')){
                $location.path('/login');
            }

            else{
                var flag = 0;
                for(var i=0; i<$scope.logged_cart.length; i++){
                    if($scope.logged_cart[i].sid == $scope.score.sid){
                        flag = 1;
                        alert('Already in Cart');
                        //redirect to cart
                        $location.path('/users/'+$window.sessionStorage.getItem('username')+'/shopping-cart');
                        break;
                    }
                }

                if(flag==0){

                    for(var i=0; i<$scope.logged_purchased.length; i++){
                        if($scope.logged_purchased[i].sid == $scope.score.sid){
                            flag = 1;
                            alert('Already in Purchased');
                            //redirect to purchased
                            $location.path('/users/'+$window.sessionStorage.getItem('username')+'/purchased');
                            break;
                        }
                    }
                }

                if(flag == 0){
                    AddCart.add({'uid':$window.sessionStorage.getItem('uid')}, {'sid':$scope.score.sid}, function(res){
                        console.log('res:');
                        console.log(res);
                        if(res){
                            alert('added');
                            $rootScope.added_score_name = $scope.score.name;
                            $rootScope.added_score_shortname = $scope.score.shortname;
                            $rootScope.logged_cart = Cart.getAll({username: $window.sessionStorage.getItem('username')});
                            //$rootScope.action = "Already In Cart";
                            //$rootScope.action_class = 'btn-danger';
                            //$window.location.reload();
                            $location.path('/users/'+$window.sessionStorage.getItem('username')+'/shopping-cart');

                        }
                    });
                }
            }
        };
    }]);

rapidScoreControllers.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

rapidScoreControllers.controller('ScoreAdminCtrl', ['$scope', 'ScoreAdminAPI', 'EditScoreAPI', 'SliderAdminAPI',
    function($scope, Score, EditScore, Slider) {
        $scope.scores = Score.getAll();
        $scope.orderProp = 'name';

        //remove
        $scope.removeScore = function(sid, name){
            var r = confirm('Deleting ' + name);
            if(r==true){
                EditScore.remove({scoreId:sid}, function (res) {
                    console.log(res + ' deleted : ' + sid);
                    //$location.path('/admin/sheetmusic');
                    $scope.scores = Score.getAll();
                });
            } else{

            }

        };

        $scope.addSlider = function(value, sid){
            //convert to json
            var scoreData = new Object();
            scoreData.slider = value;
            console.log(scoreData);

            Slider.save({scoreId:sid}, scoreData, function(res){
                if(res){
                    if(value == true){
                        alert('Added to slider');
                        $scope.scores = Score.getAll();
                    } else{
                        alert('Removed from slider');
                        $scope.scores = Score.getAll();
                    }

                    //$location.path('/admin/sheetmusic');
                }
            });

        };
    }]);
    
rapidScoreControllers.controller('ScoreAddCtrl', ['$scope', 'AddScoreAPI', 'AddScoreCategoryAPI', 'AddCategoryAPI', '$location',
    function($scope, AddScore, AddScoreCategory, AddCategory, $location){
        
        //Add Score
        $scope.scoreInfo = {};
        $scope.scoreCheck = '';

        $scope.scoreSave = function() {
            $scope.scoreCheck = '';
            console.log($scope.scoreInfo);

            if(!$scope.scoreInfo.name) {
                $scope.scoreCheck = 'Invalid title';
                return;
            }
            //submit data
            else{
                console.log('posting data...');
                //create json to be posted
                var scoreData = new Object();
                scoreData.category = [];
                
                scoreData.name = $scope.scoreInfo.name;
                scoreData.shortname = $scope.scoreInfo.name.split(' ').join('-').toLowerCase();

                if($scope.scoreInfo.price){
                    scoreData.price = $scope.scoreInfo.price;
                }
                else {
                    scoreData.price = 0;
                }
                if($scope.scoreInfo.page){
                    scoreData.page = $scope.scoreInfo.page;
                }
                else {
                    scoreData.page = 0;
                }

                if($scope.scoreInfo.snippet){
                    scoreData.snippet = $scope.scoreInfo.snippet;
                } else{
                    scoreData.snippet = '';
                }
                if($scope.scoreInfo.audiourl){
                    scoreData.audioUrl = $scope.scoreInfo.audiourl;
                } else{
                    scoreData.audioUrl = '';
                }
                if($scope.scoreInfo.videourl){
                    scoreData.videoUrl = $scope.scoreInfo.videourl;
                } else{
                    scoreData.videoUrl = '';
                }
                if($scope.scoreInfo.imageurl){
                    scoreData.imageUrl = $scope.scoreInfo.imageurl;
                } else{
                    scoreData.imageUrl = '';
                }
                if($scope.scoreInfo.fileurl){
                    //var uploadUrl = 'http://www.example.com/images';
                    //fileUpload.uploadFileToUrl(file, uploadUrl);
                    scoreData.fileUrl = $scope.scoreInfo.fileurl;
                } else{
                    scoreData.fileUrl = '';
                }
                //category
                /*
                for(var i=0; i<$scope.scoreInfo.category.length; i++){
                    scoreData.category.push($scope.scoreInfo.category[i]);
                }
                */
                console.log(scoreData);

                //convert to json
                AddScore.save({}, scoreData, function(res){
                    console.log('res:' + res);
                    if(res){
                        alert('added ' + scoreData.shortname);
                        $location.path('/admin/sheetmusic');
                    }
                });
            }
        };
    }]);

rapidScoreControllers.controller('ScoreEditCtrl', ['$scope', '$routeParams', 'ScoreAPI', 'EditScoreAPI', 'AddScoreCategoryAPI', 'AddCategoryAPI', 'RemoveScoreCategoryAPI', '$location',
    function($scope, $routeParams, Score, EditScore, AddScoreCategory, AddCategory, RemoveScoreCategory, $location){

        $scope.scoreInfo = Score.getOne({scoreId: $routeParams.scoreId});
        console.log($scope.scoreInfo);
        $scope.scoreCheck = '';

        $scope.scoreSave = function() {
            $scope.scoreCheck = '';
            console.log($scope.scoreInfo);

            if(!$scope.scoreInfo.name) {
                $scope.scoreCheck = 'Invalid title';
                return;
            }
            //submit data
            else{
                console.log('posting data...');
                //create json to be posted
                var scoreData = new Object();
                scoreData.category = [];

                scoreData.name = $scope.scoreInfo.name;
                scoreData.shortname = $scope.scoreInfo.name.split(' ').join('-').toLowerCase();

                console.log($scope.scoreInfo);

                if($scope.scoreInfo.slider){
                    scoreData.slider = $scope.scoreInfo.slider;
                }
                else {
                    scoreData.slider = false;
                }

                if($scope.scoreInfo.price){
                    scoreData.price = $scope.scoreInfo.price;
                }
                else {
                    scoreData.price = 0;
                }
                if($scope.scoreInfo.page){
                    scoreData.page = $scope.scoreInfo.page;
                }
                else {
                    scoreData.page = 0;
                }
                if($scope.scoreInfo.snippet){
                    scoreData.snippet = $scope.scoreInfo.snippet;
                } else{
                    scoreData.snippet = '';
                }
                if($scope.scoreInfo.audiourl){
                    scoreData.audioUrl = $scope.scoreInfo.audiourl;
                } else{
                    scoreData.audioUrl = '';
                }
                if($scope.scoreInfo.videourl){
                    scoreData.videoUrl = $scope.scoreInfo.videourl;
                } else{
                    scoreData.videoUrl = '';
                }
                if($scope.scoreInfo.imageurl){
                    scoreData.imageUrl = $scope.scoreInfo.imageurl;
                } else{
                    scoreData.imageUrl = '';
                }
                if($scope.scoreInfo.fileurl){
                    scoreData.fileUrl = $scope.scoreInfo.fileurl;
                } else{
                    scoreData.fileUrl = '';
                }
                //category
                /*
                 for(var i=0; i<$scope.scoreInfo.category.length; i++){
                 scoreData.category.push($scope.scoreInfo.category[i]);
                 }
                 */
                console.log(scoreData);

                //convert to json
                EditScore.save({scoreId:$scope.scoreInfo.sid}, scoreData, function(res){
                    if(res){
                        alert('edited ' + scoreData.shortname);
                        //$scope.scoreInfo = Score.getOne({scoreId: $routeParams.scoreId});
                        $location.path('/admin/sheetmusic');
                    }
                });
            }
        };
    }]);

rapidScoreControllers.controller('CategoryAdminCtrl', ['$scope', 'CategoryAdminAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI', 'AddCategoryAPI', 'EditCategoryAPI',
    function($scope, Category, Instrument, Composer, Genre, AddCategory, EditCategory) {
        $scope.categories = Category.getAll();
        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();

        //remove
        //edit
        //add
        $scope.cInfo = {};
        $scope.cCheck = '';
        $scope.addCategory = function(){
            if(!$scope.cInfo.cname){
                $scope.cCheck = 'Invalid category name';
                return;
            }
            else if(!$scope.cInfo.cshortname){
                $scope.cCheck = 'Invalid category short name';
                return;
            }
            else{
                var cData = new Object();
                cData.cname = $scope.cInfo.cname;
                cData.cshortname = $scope.cInfo.cshortname;
                cData.ctnumber = $scope.cInfo.ctnumber;
                AddCategory.save({}, cData, function(res){
                    console.log(res + ' added : ' + cname);

                });
            }
        }
    }]);

rapidScoreControllers.controller('UserAdminListCtrl', ['$scope', 'UserAdminAPI',
    function($scope, User) {
        $scope.users = User.getAll();
    }]);

rapidScoreControllers.controller('UserAdminCtrl', ['$scope', '$routeParams', 'UserAdminAPI',
    function($scope, $routeParams, User) {
        $scope.user = User.getOne({username: $routeParams.username});
        $scope.total = 0;
    }]);

rapidScoreControllers.controller('UserCtrl', ['$window', '$location', '$scope', '$rootScope', '$routeParams', 'UserAPI', 'UserCartAPI', 'UserOrderAPI', 'RemoveCartAPI', 'PlaceOrderAPI',
    function($window, $location, $scope, $rootScope, $routeParams, User, Cart, Order, RemoveCart, PlaceOrder) {

        if($routeParams.username != $window.sessionStorage.getItem('username')){
            $location.path($scope.logged_userlink);
        }
        
        $rootScope.user = User.getOne({username: $window.sessionStorage.getItem('username')});
        
        //$rootScope.user = User.getOne({username: $routeParams.username});
        //$scope.cart = Cart.getAll({username: $routeParams.username});
        //$scope.purchased = Purchased.getAll({username: $routeParams.username});

        $scope.removecart = function(name, sid){
            RemoveCart.remove({'uid': $window.sessionStorage.getItem('uid'), 'sid':sid}, function(res){
                if(res){
                    alert('Removed ' + name);
                    $rootScope.added_score_name = "";
                    $rootScope.added_score_shortname = "";
                    $rootScope.logged_cart = Cart.getAll({username: $window.sessionStorage.getItem('username')});

                    //$window.location.reload();
                }
                else{
                    console.log(res);
                }
            });
        }

        $scope.order = function(){
            PlaceOrder.order({'uid': $window.sessionStorage.getItem('uid')}, function(res){
                if(res){
                    alert('Placing Order - ' + $scope.logged_cart.length + ' items');
                    $rootScope.logged_cart = Cart.getAll({username: $window.sessionStorage.getItem('username')});
                    $rootScope.logged_purchased = Order.getAll({username: $window.sessionStorage.getItem('username')});

                    //$window.location.reload();
                }
                else{
                    console.log(res);
                }
            });
        }
    }]);

rapidScoreControllers.controller('sessionService', ['$scope','$rootScope', '$window', '$location', 'UserCartAPI', 'UserOrderAPI', 'breadcrumbs',
    function($scope, $rootScope, $window, $location, Cart, Order, breadcrumbs){
        console.log($location.path());
        $scope.breadcrumbs = breadcrumbs;

        if(!$window.sessionStorage.getItem('token')){
            $rootScope.logged = false;
            $window.sessionStorage.removeItem('token');
            $window.sessionStorage.removeItem('username');
            $window.sessionStorage.removeItem('uid');
            $window.sessionStorage.removeItem('info');
        }
        else{
            $rootScope.logged = true;
            $rootScope.logged_usercartlink = '/users/'+$window.sessionStorage.getItem('username')+'/shopping-cart';
            $rootScope.logged_userlink = '/users/'+$window.sessionStorage.getItem('username');
            $rootScope.logged_username = $window.sessionStorage.getItem('username');
            $rootScope.logged_user = $window.sessionStorage.getItem('info');
            $rootScope.logged_cart = Cart.getAll({username: $window.sessionStorage.getItem('username')});
            $rootScope.logged_purchased = Order.getAll({username: $window.sessionStorage.getItem('username')});
        }

        $scope.logout = function logout(){
            console.log('logging out');
            $rootScope.logged = false;
            $window.sessionStorage.removeItem('token');
            $window.sessionStorage.removeItem('username');
            $window.sessionStorage.removeItem('uid');
            $window.sessionStorage.removeItem('info');
            $location.path("/login");
        }
}]);

rapidScoreControllers.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$window', 'LoginAPI', 'UserAPI',
    function($scope, $rootScope, $location, $window, LoginService, User){

        //if logged in, go to user page
        if($window.sessionStorage.getItem('token')){
            $location.path("/users/"+$window.sessionStorage.getItem('username'));
        }

        //Login
        $scope.loginInfo = {};
        $scope.loginCheck = '';

        $scope.login = function() {
            $scope.loginCheck = '';
            console.log($scope.loginInfo);

            if(!$scope.loginInfo.email) {
                $scope.loginCheck = 'Invalid Email';
                return;
            }

            else if(!$scope.loginInfo.pass) {
                $scope.loginCheck = 'Please enter your Password';
                return;
            }
            else if($scope.loginInfo.pass.length < 6 || $scope.loginInfo.pass.length > 20){
                $scope.loginCheck = 'Password length should be 6 to 20 characters long';
                return;
            }

            else {
                LoginService.login($scope.loginInfo.email, $scope.loginInfo.pass).success(function(data){
                    console.log(data);
                    if(Object.keys(data).length){
                        $window.sessionStorage.setItem('token', data.token);
                        $window.sessionStorage.setItem('username', data.username);
                        $window.sessionStorage.setItem('uid', data.uid);
                        $window.sessionStorage.setItem('info', data.info);
                        
                        //set global variables
                        //too quick, a refresh of the page gives better user experience
                        //$rootScope.user = User.getOne({username: data.username});
                        
                        //refresh
                        //$location.path("/users/"+data.username);
                        $window.location.reload();
                        
                    }
                    else{
                        $window.sessionStorage.removeItem('token');
                        console.log(status);
                        $scope.loginCheck = "Login Failed";
                    }
                });
            }
        };
    }]);

rapidScoreControllers.controller('SignUpCtrl', ['$scope', 'RegisterAPI', 'CheckUsernameAPI', 'CheckEmailAPI', '$location',
    function($scope, User, CheckUsername, CheckEmail, $location) {
        //Sign Up
        $scope.regInfo = {};
        $scope.regCheck = '';

        $scope.regSave = function() {
            $scope.regCheck = '';
            console.log($scope.regInfo);

            if(!$scope.regInfo.email) {
                $scope.regCheck = 'Invalid Email';
                return;
            }
            else if(!$scope.regInfo.username) {
                $scope.regCheck = 'Please enter your Username';
                return;
            }
            else if($scope.regInfo.username.length < 4 || $scope.regInfo.username.length > 20){
                $scope.regCheck = 'Username length should be 4 to 20 characters long';
                return;
            }
            else if(!$scope.regInfo.pass1) {
                $scope.regCheck = 'Please enter your Password';
                return;
            }
            else if($scope.regInfo.pass1.length < 6 || $scope.regInfo.pass1.length > 20){
                $scope.regCheck = 'Password length should be 6 to 20 characters long';
                return;
            }
            else if(!$scope.regInfo.pass2) {
                $scope.regCheck = 'Please enter your Password';
                return;
            }
            else if($scope.regInfo.pass1 != $scope.regInfo.pass2) {
                $scope.regCheck = 'Two Passwords do not match';
                return;
            }
            /*
            still need to check username and email existence
            */
            //submit data
            else{
                console.log('posting data...');
                //create json to be posted
                /*
                var regData = new Object();
                regData.username = $scope.regInfo.username;
                regData.email = $scope.regInfo.email;
                regData.password = $scope.regInfo.pass1;
                console.log(regData);
                */

                //check username and email before submit
                var check1 = CheckEmail.getOne({email:$scope.regInfo.email});
                console.log(check1);
                if(check1 == 1){
                    $scope.regCheck = 'Email exists. Try another one';
                    return;
                }
                var check2 = CheckUsername.getOne({username:$scope.regInfo.username});
                console.log(check2);
                if(check2 == 1){
                    console.log($scope.regInfo);
                    $scope.regCheck = 'Username exists. Try another one.';
                    return;
                }
                
                //convert to json
                User.save({}, $scope.regInfo, function(res){
                    console.log("validation success");
                    console.log($scope.regInfo);
                    if(res){
                        alert('Registration Successful!');
                        $location.path('/login');
                    }
                    else{
                        $scope.regCheck = 'Registration failed';
                    }
                });
            }
        };
    }]);

rapidScoreControllers.controller('InstrumentListCtrl', ['$scope', 'InstrumentAPI',
    function($scope, Instrument) {
        $scope.typename = "Instruments";
        $scope.shortname = "instruments";
        $scope.categories = Instrument.getAll();
    }]);

rapidScoreControllers.controller('InstrumentCtrl', ['$scope', '$routeParams', 'InstrumentAPI',
    function($scope, $routeParams, Instrument) {
        $scope.typename = "Instruments";
        $scope.shortname = "instruments";
        $scope.category = Instrument.getOne({cname: $routeParams.instrumentId});
    }]);

rapidScoreControllers.controller('ComposerListCtrl', ['$scope', 'ComposerAPI',
    function($scope, Composer) {
        $scope.typename = "Composers";
        $scope.shortname = "composers";
        $scope.categories = Composer.getAll();
    }]);

rapidScoreControllers.controller('ComposerCtrl', ['$scope', '$routeParams', 'ComposerAPI',
    function($scope, $routeParams, Composer) {
        $scope.typename = "Composers";
        $scope.shortname = "composers";
        $scope.category = Composer.getOne({cname: $routeParams.composerId});
    }]);

rapidScoreControllers.controller('GenreListCtrl', ['$scope', 'GenreAPI',
    function($scope, Genre) {
        $scope.typename = "Genres";
        $scope.shortname = "genres";
        $scope.categories = Genre.getAll();
    }]);

rapidScoreControllers.controller('GenreCtrl', ['$scope', '$routeParams', 'GenreAPI',
    function($scope, $routeParams, Genre) {
        $scope.typename = "Genres";
        $scope.shortname = "genres";
        $scope.category = Genre.getOne({cname: $routeParams.genreId});
    }]);
