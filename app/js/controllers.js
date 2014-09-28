'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers', ['ui.bootstrap']);

rapidScoreControllers.controller('ScoreListCtrl', ['$scope', 'ScoreAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI',
    function($scope, Score, Instrument, Composer, Genre) {
        $scope.scores = Score.getAll();
        console.log($scope.scores);
        /*
        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();
        */
    }]);

rapidScoreControllers.controller('ScoreCtrl', ['$scope', '$rootScope', '$routeParams', 'ScoreAPI', 'UserCartAPI', 'CheckOrderAPI', '$location', '$window',
    function($scope, $rootScope, $routeParams, Score, Cart, CheckOrder, $location, $window, Instrument, Composer, Genre) {
        $scope.score = Score.getOne({scoreid: $routeParams.scoreId});
        console.log($scope.score);
        console.log($window.sessionStorage.getItem('uid'));

        $rootScope.action = 'Add to Cart';
        $rootScope.action_class = 'btn-warning';


        $scope.link = function(){
            console.log('score id:');
            console.log($scope.score.id);

            if(!$window.sessionStorage.getItem('uid')){
                $location.path('/login');
            }

            else{
                var flag = 0;
                for(var i=0; i<$scope.logged_cart.length; i++){
                    if($scope.logged_cart[i].id == $scope.score.id){
                        flag = 1;
                        alert('Already in Cart');
                        //redirect to cart
                        $location.path('/account/shopping-cart');
                        break;
                    }
                }

                if(flag==0){
                    CheckOrder.get({scoreid:$scope.score.id}, function(res){
                        console.log('checking order');
                        console.log(res);
                        //alert(res.hasOrdered);
                        if(res && res.hasOrdered){
                            alert('Already in Purchased');
                            $location.path('/account/purchased');
                        } else{
                            Cart.add({}, {score_id:$scope.score.id}, function(res){
                                console.log('res:');
                                console.log(res);
                                if(res){
                                    alert('added');
                                    $rootScope.added_score_name = $scope.score.name;
                                    $rootScope.added_score_shortname = $scope.score.shortname;
                                    $rootScope.logged_cart = Cart.getAll();
                                    //$rootScope.action = "Already In Cart";
                                    //$rootScope.action_class = 'btn-danger';
                                    //$window.location.reload();
                                    $location.path('/account/shopping-cart');

                                }
                            });
                        }
                    });
                }
            }
        };
    }]);

rapidScoreControllers.controller('ScoreAdminCtrl', ['$scope', 'ScoreAdminAPI', 'SliderAdminAPI',
    function($scope, Score, Slider) {
        $scope.scores = Score.getAll();
        $scope.orderProp = 'title';

        //remove
        $scope.removeScore = function(sid, name){
            var r = confirm('Deleting ' + name);
            if(r==true){
                Score.remove({scoreid:sid}, function (res) {
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

            Slider.save({scoreid:sid}, scoreData, function(res){
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
    
rapidScoreControllers.controller('ScoreAddCtrl', ['$scope', 'ScoreAdminAPI', 'ScoreTypeAPI', 'TypeAdminAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI', '$location',
    function($scope, Score, ScoreType, Type, Instrument, Composer, Genre, $location){

        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();

        //Add Score
        $scope.scoreInfo = {};
        $scope.scoreCheck = '';
        $scope.scoreInfo.instruments = [];
        $scope.scoreInfo.composers = [];
        $scope.scoreInfo.genres = [];
        
        $scope.orderProp = 'c_name';
        
        $scope.info = function(){
            alert('To add same instrument multiple times, choose -- back then choose the same instrument again');
        }

        $scope.addinstrument = function(value){
            if(value){
                $scope.scoreInfo.instruments.push(value);
            }
        };
        
        $scope.removeinstrument = function(i){
            console.log(i);
            $scope.scoreInfo.instruments.splice(i,1);
        };
        
        $scope.addcomposer = function(value){
            if(value){
                $scope.scoreInfo.composers.push(value);
                var i = $scope.getComposers.indexOf(value);
                console.log(i);
                $scope.getComposers.splice(i, 1);
            }
        };
        $scope.removecomposer = function(value, i){
            console.log(i);
            $scope.scoreInfo.composers.splice(i,1);
            $scope.getComposers.push(value);
        };
        
        $scope.addgenre = function(value){
            if(value){
                $scope.scoreInfo.genres.push(value);
                var i = $scope.getGenres.indexOf(value);
                console.log(i);
                $scope.getGenres.splice(i, 1);
            }
        };
        $scope.removegenre = function(value, i){
            console.log(i);
            $scope.scoreInfo.genres.splice(i,1);
            $scope.getGenres.push(value);
        };

        $scope.scoreAdd = function() {

            $scope.scoreCheck = '';
            //console.log($scope.scoreInfo);

            if(!$scope.scoreInfo.title) {
                $scope.scoreCheck = 'Invalid title';
                console.log($scope.scoreCheck);
                return;
            }
            //submit data
            else{
                console.log('posting data...');
                //create json to be posted
                var scoreData = new Object();
                scoreData.category = [];
                
                scoreData.title = $scope.scoreInfo.title;
                scoreData.shortname = $scope.scoreInfo.title.split(' ').join('-').toLowerCase();

                if($scope.scoreInfo.instruments.length){
                    for(var i=0; i<$scope.scoreInfo.instruments.length; i++){
                        scoreData.category.push($scope.scoreInfo.instruments[i].c_number);
                    }
                }
                if($scope.scoreInfo.composers.length){
                    for(var i=0; i<$scope.scoreInfo.composers.length; i++){
                        scoreData.category.push($scope.scoreInfo.composers[i].c_number);
                    }
                }
                if($scope.scoreInfo.genres.length){
                    for(var i=0; i<$scope.scoreInfo.genres.length; i++){
                        scoreData.category.push($scope.scoreInfo.genres[i].c_number);
                    }
                }

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

                if($scope.scoreInfo.desc){
                    scoreData.desc = $scope.scoreInfo.desc;
                } 
                else{
                    scoreData.desc = '';
                }
                if($scope.scoreInfo.audiourl){
                    scoreData.audiourl = $scope.scoreInfo.audiourl;
                } 
                else{
                    scoreData.audiourl = '';
                }
                if($scope.scoreInfo.videourl){
                    scoreData.videourl = $scope.scoreInfo.videourl;
                }
                else{
                    scoreData.videourl = '';
                }
                if($scope.scoreInfo.imageurl){
                    scoreData.imageurl = $scope.scoreInfo.imageurl;
                } 
                else{
                    scoreData.imageurl = '';
                }
                if($scope.scoreInfo.fileurl){
                    scoreData.fileurl = $scope.scoreInfo.fileurl;
                } 
                else{
                    scoreData.fileurl = '';
                }
                
                console.log(scoreData);

                
                Score.add({}, scoreData, function(res){
                    console.log('res:' + res);
                    if(res){
                        alert('added ' + scoreData.shortname);
                        $location.path('/admin/sheetmusic');
                    }
                });
                
            }
        };
    }]);

rapidScoreControllers.controller('ScoreEditCtrl', ['$scope', '$routeParams', 'ScoreAdminAPI', 'ScoreTypeAPI', 'TypeAdminAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI', '$location',
    function($scope, $routeParams, Score, ScoreType, Type, Instrument, Composer, Genre, $location){

        /*
        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();
        */

        $scope.scoreInfo = Score.getOne({scoreid: $routeParams.scoreId});
        $scope.scoreCheck = '';

        $scope.scoreInfo.instruments = [];
        $scope.scoreInfo.composers = [];
        $scope.scoreInfo.genres = [];

        /*
        $scope.addinstrument = function(value){
            $scope.scoreInfo.instruments.push(value);
        };
        $scope.addcomposer = function(value){
            $scope.scoreInfo.composers.push(value);
        };
        $scope.addgenre = function(value){
            $scope.scoreInfo.genres.push(value);
        };
        */

        $scope.scoreSave = function() {
            $scope.scoreCheck = '';
            console.log($scope.scoreInfo);

            if(!$scope.scoreInfo.title) {
                $scope.scoreCheck = 'Invalid title';
                return;
            }
            //submit data
            else{
                console.log('posting data...');
                //create json to be posted
                var scoreData = new Object();
                scoreData.category = [];

                scoreData.title = $scope.scoreInfo.title;
                scoreData.shortname = $scope.scoreInfo.title.split(' ').join('-').toLowerCase();

                /*
                if($scope.scoreInfo.instruments.length){
                    for(var i=0; i<$scope.scoreInfo.instruments.length; i++){
                        scoreData.category.push($scope.scoreInfo.instruments[i].c_number);
                    }
                }
                if($scope.scoreInfo.composers.length){
                    for(var i=0; i<$scope.scoreInfo.composers.length; i++){
                        scoreData.category.push($scope.scoreInfo.composers[i].c_number);
                    }
                }
                if($scope.scoreInfo.genres.length){
                    for(var i=0; i<$scope.scoreInfo.genres.length; i++){
                        scoreData.category.push($scope.scoreInfo.genres[i].c_number);
                    }
                }
                */

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
                if($scope.scoreInfo.desc){
                    scoreData.desc = $scope.scoreInfo.desc;
                } else{
                    scoreData.desc = '';
                }
                if($scope.scoreInfo.audiourl){
                    scoreData.audiourl = $scope.scoreInfo.audiourl;
                } else{
                    scoreData.audiourl = '';
                }
                if($scope.scoreInfo.videourl){
                    scoreData.videourl = $scope.scoreInfo.videourl;
                } else{
                    scoreData.videourl = '';
                }
                if($scope.scoreInfo.imageurl){
                    scoreData.imageurl = $scope.scoreInfo.imageurl;
                } else{
                    scoreData.imageurl = '';
                }
                if($scope.scoreInfo.fileurl){
                    scoreData.fileurl = $scope.scoreInfo.fileurl;
                } else{
                    scoreData.fileurl = '';
                }
                //category
                /*
                 for(var i=0; i<$scope.scoreInfo.category.length; i++){
                 scoreData.category.push($scope.scoreInfo.category[i]);
                 }
                 */
                console.log(scoreData);

                //convert to json
                Score.save({scoreid:$routeParams.scoreId}, scoreData, function(res){
                    if(res){
                        alert('edited ' + scoreData.shortname);
                        //$scope.scoreInfo = Score.getOne({scoreid: $routeParams.scoreId});
                        $location.path('/admin/sheetmusic');
                    }
                });
            }
        };
    }]);

rapidScoreControllers.controller('TypeAdminCtrl', ['$scope', 'TypeAdminAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI',
    function($scope, Type, Instrument, Composer, Genre) {
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
                Type.save({}, cData, function(res){
                    console.log(res + ' added : ' + cname);

                });
            }
        };
        $scope.removeCategory = function(cnumber, cname){
            var r = confirm('Deleting ' + cname);
            //deleting score category records before deleting this category
            if(r==true){
                Type.remove({cnumber:cnumber}, function (res) {
                    console.log(res + ' deleted : ' + cnumber);
                    //$location.path('/admin/sheetmusic');
                    $scope.getInstruments = Instrument.getAll();
                    $scope.getComposers = Composer.getAll();
                    $scope.getGenres = Genre.getAll();
                });
            } else{

            }

        };
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

rapidScoreControllers.controller('UserCtrl', ['$window', '$location', '$scope', '$rootScope', '$routeParams', 'UserAPI', 'UserCartAPI', 'UserOrderAPI', 'UserOrderDetailAPI',
    function($window, $location, $scope, $rootScope, $routeParams, User, Cart, Order, OrderDetail) {

        $rootScope.user = User.getOne();
        console.log($rootScope.user);

        $rootScope.logged_cart = Cart.getAll();
        console.log('cart:');
        console.log($rootScope.logged_cart);
        $rootScope.logged_purchased = Order.getAll();
        console.log('order:');
        console.log($rootScope.logged_purchased);
        for(var i=0; i<$rootScope.logged_purchased.length; i++){
            $rootScope.logged_purchased[i].showdetail = false;
        }
        //get scores of each order

        $scope.showorder = function(orderid){
            for(var i=0; i<$rootScope.logged_purchased.length; i++){
                if($rootScope.logged_purchased[i].id == orderid){
                    var index = i;
                    console.log($rootScope.logged_purchased[i].id);
                    if($rootScope.logged_purchased[i].showdetail){
                        $rootScope.logged_purchased[i].showdetail = false;
                        break;
                    }
                    OrderDetail.getScores({orderid:orderid}, function(scores){
                        if(scores.length > 0){
                            console.log(scores);
                            console.log(index);
                            $rootScope.logged_purchased[index].showdetail = true;
                            $scope.orderdetails = scores;
                        } else{

                        }
                    })
                } else{
                    $rootScope.logged_purchased[i].showdetail = false;
                }
            }
        }

        $scope.removecart = function(name, sid){
            Cart.remove({scoreid:sid}, function(res){
                if(res){
                    //alert('Removed ' + name);
                    $rootScope.added_score_name = "";
                    $rootScope.added_score_shortname = "";
                    //$rootScope.logged_cart = res;
                    $rootScope.logged_cart = Cart.getAll();

                    //$window.location.reload();
                }
                else{
                    console.log(res);
                }
            });
        }

        $scope.order = function(){
            Order.order({}, function(res){
                if(res){
                    console.log(res);
                    alert('Placing Order - ' + $scope.logged_cart.length + ' items');
                    $rootScope.logged_cart = Cart.getAll();
                    $rootScope.logged_purchased = Order.getAll();

                    //$window.location.reload();
                    $location.path('/account/purchased');
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
            $window.sessionStorage.removeItem('admin');
        }
        else{
            $rootScope.logged = true;
            $rootScope.logged_username = $window.sessionStorage.getItem('username');
            $rootScope.logged_admin = $window.sessionStorage.getItem('admin');
            $rootScope.logged_cart = Cart.getAll();
            console.log($rootScope.logged_cart);
            $rootScope.logged_purchased = Order.getAll();
            console.log($rootScope.logged_purchased);
        }

        $scope.logout = function logout(){
            console.log('logging out');
            $rootScope.logged = false;
            $window.sessionStorage.removeItem('token');
            $window.sessionStorage.removeItem('username');
            $window.sessionStorage.removeItem('uid');
            $window.sessionStorage.removeItem('admin');
            $location.path("/login");
        }
}]);

rapidScoreControllers.controller('LoginCtrl', ['$scope', '$rootScope', '$location', '$window', 'LoginAPI', 'UserAPI',
    function($scope, $rootScope, $location, $window, LoginService, User){

        //if logged in, go to user page
        if($window.sessionStorage.getItem('token')){
            console.log('token ');
            console.log($window.sessionStorage.getItem('token'));
            $location.path("/account");
        }

        //Login
        $scope.loginInfo = {};
        $scope.loginCheck = '';

        $scope.login = function() {
            $scope.loginCheck = '';
            console.log($scope.loginInfo);

            if(!$scope.loginInfo.username) {
                $scope.loginCheck = 'Invalid Username';
                return;
            }

            else if(!$scope.loginInfo.password) {
                $scope.loginCheck = 'Please enter your Password';
                return;
            }
            /*
            else if($scope.loginInfo.password.length < 6 || $scope.loginInfo.password.length > 20){
                $scope.loginCheck = 'Password length should be 6 to 20 characters long';
                return;
            }
            */

            else {
                LoginService.login($scope.loginInfo.username, $scope.loginInfo.password).success(function(data){
                    console.log(data);
                    if(data && data.token){
                        $window.sessionStorage.setItem('token', data.token);
                        $window.sessionStorage.setItem('username', data.username);
                        $window.sessionStorage.setItem('uid', data.id);
                        $window.sessionStorage.setItem('admin', data.admin);
                        console.log($window.sessionStorage);
                        
                        //set global variables
                        //too quick, a refresh of the page gives better user experience
                        //$rootScope.user = User.getOne({username: data.username});
                        
                        //refresh
                        $location.path("/account");
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

rapidScoreControllers.controller('SignUpCtrl', ['$scope', 'RegisterAPI', 'CheckUsernameAPI', '$location',
    function($scope, User, CheckUsername, $location) {
        //Sign Up
        $scope.regInfo = {};
        $scope.regCheck = '';

        $scope.regSave = function() {
            $scope.regCheck = '';
            console.log($scope.regInfo);

            if(!$scope.regInfo.username) {
                $scope.regCheck = 'Invalid Email';
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

                //check username before submit
                CheckUsername.getOne({username:$scope.regInfo.username} , function(res2){
                    console.log("check username ");
                    console.log(res2.result);

                    if(res2.result){
                        $scope.regCheck = 'Username exists. Try another one.';
                    } else{

                        console.log($scope.regInfo);
                        //create json to be posted

                        var regData = new Object();
                        regData.username = $scope.regInfo.username;
                        regData.password = $scope.regInfo.pass1;
                        console.log(regData);
                        User.save(regData.username, regData.password).success(function(res){
                            console.log("validation success");
                            console.log(regData);
                            if(res){
                                $scope.regCheck = 'Registration Successful';
                                alert('Registration Successful!');
                                $location.path('/login');
                            }
                            else{
                                console.log('registration failed: ');
                            }
                        });
                    }

                })
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
