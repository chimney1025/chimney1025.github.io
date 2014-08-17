'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers', ['ui.bootstrap','dialogs']);

rapidScoreControllers.controller('ScoreListCtrl', ['$scope', 'ScoreAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI',
    function($scope, Score, Instrument, Composer, Genre) {
        $scope.scores = Score.getAll();
        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();
    }]);

rapidScoreControllers.controller('ScoreCtrl', ['$scope', '$routeParams', 'ScoreAPI',
    function($scope, $routeParams, Score, Instrument, Composer, Genre) {
        $scope.score = Score.getOne({scoreId: $routeParams.scoreId});
    }]);

rapidScoreControllers.controller('ScoreAdminCtrl', ['$scope', 'ScoreAdminAPI', 'EditScoreAPI', 'RemoveScoreCategoryAPI',
    function($scope, Score, EditScore, RemoveScoreCategory) {
        $scope.scores = Score.getAll();

        //remove
        $scope.removeScore = function(sid, name){
            alert('Deleting ' + name);
            EditScore.remove({scoreId:sid}, function (res) {
                console.log(res + ' deleted : ' + sid);
                //$location.path('#/admin/sheetmusic');
                $scope.scores = Score.getAll();
            });
        };

        //edit

        //add
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
                if($scope.scoreInfo.audioUrl){
                    scoreData.audioUrl = $scope.scoreInfo.audiourl;
                } else{
                    scoreData.audioUrl = '';
                }
                if($scope.scoreInfo.videoUrl){
                    scoreData.videoUrl = $scope.scoreInfo.videourl;
                } else{
                    scoreData.videoUrl = '';
                }
                if($scope.scoreInfo.imageUrl){
                    scoreData.imageUrl = $scope.scoreInfo.imageurl;
                } else{
                    scoreData.imageUrl = '';
                }
                if($scope.scoreInfo.fileUrl){
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
                if($scope.scoreInfo.audioUrl){
                    scoreData.audioUrl = $scope.scoreInfo.audiourl;
                } else{
                    scoreData.audioUrl = '';
                }
                if($scope.scoreInfo.videoUrl){
                    scoreData.videoUrl = $scope.scoreInfo.videourl;
                } else{
                    scoreData.videoUrl = '';
                }
                if($scope.scoreInfo.imageUrl){
                    scoreData.imageUrl = $scope.scoreInfo.imageurl;
                } else{
                    scoreData.imageUrl = '';
                }
                if($scope.scoreInfo.fileUrl){
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

rapidScoreControllers.controller('UserCtrl', ['$scope', '$routeParams', 'UserAPI', 'UserCartAPI', 'UserOrderAPI',
    function($scope, $routeParams, User, Cart, Purchased) {
        $scope.user = User.getOne({username: $routeParams.username});
        $scope.cart = Cart.getAll({username: $routeParams.username});
        $scope.purchased = Purchased.getAll({username: $routeParams.username});
    }]);

rapidScoreControllers.controller('RedirectCtrl', ['$scope', '$location', '$timeout',
    function($scope, $location, $timeout) {
        $scope.timeInMs = 0;
        $scope.gif='';

        var countUp = function() {
            $scope.timeInMs+= 500;
            $scope.gif += '.';
            $timeout(countUp, 500);
            if($scope.timeInMs == 2000){
                $location.path('/sheetmusic');
            }
        };

        $timeout(countUp, 500);

        //
    }]);

rapidScoreControllers.controller('sessionService', ['$scope', '$window', '$location', 'UserCartAPI',
    function($scope, $window, $location, Cart){

        if(!$window.sessionStorage.getItem('token')){
            $scope.logged = false;
        }
        else{
            $scope.logged = true;
            $scope.usercartlink = '/users/'+$window.sessionStorage.getItem('username')+'/shopping-cart';
            $scope.userlink = '/users/'+$window.sessionStorage.getItem('username');
            $scope.username = $window.sessionStorage.getItem('username');
            $scope.cart = Cart.getAll({username: $window.sessionStorage.getItem('username')});
        }

        $scope.logout = function logout(){
            console.log('logging out');
            $scope.logged = false;
            $window.sessionStorage.removeItem('token');
            $window.sessionStorage.removeItem('username');
            $window.sessionStorage.removeItem('uid');
            $location.path("/login");
        }
}]);

rapidScoreControllers.controller('LoginCtrl', ['$scope', '$location', '$window', 'LoginAPI',
    function($scope, $location, $window, LoginService){

        //if logged in, go to user page
        if($window.sessionStorage.getItem('token')){
            $location.path("/users/"+$window.sessionStorage.getItem('username'));
        }

        //Login
        $scope.loginInfo = {};
        $scope.loginCheck = '';

        $scope.login = function login(loginInfo) {
            $scope.loginCheck = '';
            console.log(loginInfo);

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
                LoginService.login(loginInfo.email, loginInfo.pass).success(function(data){
                    console.log(data);
                    if(Object.keys(data).length){
                        $window.sessionStorage.setItem('token', data.token);
                        $window.sessionStorage.setItem('username', data.username);
                        $window.sessionStorage.setItem('uid', data.uid);

                        //refresh


                        $location.path("/users/"+data.username, function(){
                            $window.location.reload();
                        });
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
                var regData = new Object();
                regData.username = $scope.regInfo.username;
                regData.email = $scope.regInfo.email;
                regData.password = $scope.regInfo.pass1;
                console.log(regData);

                //convert to json
                User.save({}, regData, function(res){
                    if(res){
                        $location.path('/login');
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