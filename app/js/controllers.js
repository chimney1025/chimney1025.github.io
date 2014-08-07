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

rapidScoreControllers.controller('UserCtrl', ['$scope', '$routeParams', 'UserAPI',
    function($scope, $routeParams, User) {
        $scope.user = User.getOne({username: $routeParams.username});
    }]);

rapidScoreControllers.controller('SignUpCtrl', ['$scope', 'UserAPI', '$location',
    function($scope, User, $location) {
        //Sign Up
        $scope.regInfo = {};
        $scope.regCheck = '';
        var regData = {
            "username":"",
            "email":"",
            "pass":""
        };

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
            //submit data
            else{
                console.log('posting data...');
                regData.username = $scope.regInfo.username;
                regData.email = $scope.regInfo.email;
                regData.pass = $scope.regInfo.pass1;
                var res = User.register({}, regData);

                $location.path('/users/'+regData.username);
                console.log(res);
                console.log(regData);
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
