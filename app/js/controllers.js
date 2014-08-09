'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers', []);

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

rapidScoreControllers.controller('ScoreAdminCtrl', ['$scope', 'ScoreAdminAPI',
    function($scope, Score) {
        $scope.scores = Score.getAll();
    }]);

rapidScoreControllers.controller('CategoryAdminCtrl', ['$scope', 'CategoryAdminAPI', 'InstrumentAPI', 'ComposerAPI', 'GenreAPI',
    function($scope, Category, Instrument, Composer, Genre) {
        $scope.categories = Category.getAll();
        $scope.getInstruments = Instrument.getAll();
        $scope.getComposers = Composer.getAll();
        $scope.getGenres = Genre.getAll();
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
            need to check username and email existence
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
                        $location.path('/redirecting');
                    }
                });
            }
        };

        //Login
        $scope.loginInfo = {};
        $scope.loginCheck = '';
        var loginData = {
            "email":"",
            "pass":""
        };
        $scope.loginSave = function() {
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
                console.log('posting login data...');
                regData.email = $scope.regInfo.email;
                regData.pass = $scope.regInfo.pass;
                var res = User.login({userId: regData.email});

                $location.path('/users/'+res.id);
                console.log(res);
                console.log(loginData);
            }
            console.log($scope.loginInfo);
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
