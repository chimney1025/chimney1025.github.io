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
        $scope.removeScore = function(sid){
            alert(sid);
            EditScore.remove({}, {'scoreid':sid}, function(res){
                console.log(res + ' deleted : ' + sid);
                $scope.scores = Score.getAll();
            });
        };

        //edit

        //add
    }]);
    
rapidScoreControllers.controller('ScoreAddCtrl', ['$scope', 'CheckScoreAPI', 'AddScoreAPI', 'AddScoreCategoryAPI', 'AddCategoryAPI', '$location',
    function($scope, CheckScore, AddScore, AddScoreCategory, AddCategory, $location){
        
        //Sign Up
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
                scoreData.shortname = $scope.scoreInfo.shortname;
                scoreData.price = $scope.scoreInfo.price;
                scoreData.page = $scope.scoreInfo.page;
                scoreData.snippet = $scope.scoreInfo.snippet;
                scoreData.audioUrl = $scope.scoreInfo.audioUrl;
                scoreData.videoUrl = $scope.scoreInfo.videoUrl;
                scoreData.imageUrl = $scope.scoreInfo.imageUrl;
                scoreData.fileUrl = $scope.scoreInfo.fileUrl;
                //category
                /*
                for(var i=0; i<$scope.scoreInfo.category.length; i++){
                    scoreData.category.push($scope.scoreInfo.category[i]);
                }
                */
                console.log(scoreData);

                //convert to json
                AddScore.save({}, scoreData, function(res){
                    if(res){
                        alert('added');
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


rapidScoreControllers.controller('dialogService',function($scope,$rootScope,$timeout,$dialogs){
        $scope.confirmed = 'You have yet to be confirmed!';
        $scope.name = '"Your name here."';

    $scope.addcategory = function(ctnumber, ctname){
        var dlg = null;

        dlg = $dialogs.create('/dialogs/add-'+ctnumber+'.html','addDialogCtrl',{},{key: false,back: 'static'});


        dlg.result.then(function(name){
            $scope.name = name;
        },function(){
            $scope.name = 'You decided not to enter in your name, that makes me sad.';
        });
    }; // end addcategory

    $scope.editcategory = function(which, cnumber, cname, ctnumber, ctname){
        var dlg = null;
        switch(which){
            // Confirm Dialog
            case 'remove':
                dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
                dlg.result.then(function(btn){
                    $scope.confirmed = 'You thought this quite awesome!';
                },function(btn){
                    $scope.confirmed = 'Shame on you for not thinking this is awesome!';
                });
                break;

            // custom add score dialog
            case 'rename':
                dlg = $dialogs.create('/dialogs/rename-'+  ctnumber +'.html','editDialogCtrl',{},{key: false,back: 'static'});
                dlg.result.then(function(name){
                    $scope.name = name;
                },function(){
                    $scope.name = 'You decided not to enter in your name, that makes me sad.';
                });

                break;
        }; // end switch
    }; // end editcategory

        $scope.launch = function(which, sid, name){
            var dlg = null;
            switch(which){
                // Notify Dialog
                case 'userremovecart':
                    dlg = $dialogs.notify('Shopping Cart','Removed '+name+ ' from your Shopping Cart!');
                    break;

                // Confirm Dialog
                case 'confirm':
                    dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
                    dlg.result.then(function(btn){
                        $scope.confirmed = 'You thought this quite awesome!';
                    },function(btn){
                        $scope.confirmed = 'Shame on you for not thinking this is awesome!';
                    });
                    break;

                //remove button, request button
                case 'removescore':
                    dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
                    dlg.result.then(function(btn){
                        $scope.confirmed = 'You thought this quite awesome!';
                    },function(btn){
                        $scope.confirmed = 'Shame on you for not thinking this is awesome!';
                    });
                    break;

                // custom add score dialog
                case 'addscore':
                    dlg = $dialogs.create('/dialogs/addscore.html','addDialogCtrl',{},{key: false,back: 'static'});
                    dlg.result.then(function(name){
                        $scope.name = name;
                    },function(){
                        $scope.name = 'You decided not to enter in your name, that makes me sad.';
                    });

                    break;

                // custom add score dialog
                case 'editscore':
                    dlg = $dialogs.create('/dialogs/editscore.html','editDialogCtrl',{},{key: false,back: 'static'});
                    dlg.result.then(function(name){
                        $scope.name = name;
                    },function(){
                        $scope.name = 'You decided not to enter in your name, that makes me sad.';
                    });

                    break;

                // Create Your Own Dialog
                case 'create':
                    dlg = $dialogs.create('/dialogs/create.html','whatsYourNameCtrl',{},{key: false,back: 'static'});
                    dlg.result.then(function(name){
                        $scope.name = name;
                    },function(){
                        $scope.name = 'You decided not to enter in your name, that makes me sad.';
                    });

                    break;
            }; // end switch
        }; // end launch

        // for faking the progress bar in the wait dialog
        var progress = 25;
        var msgs = [
            'Hey! I\'m waiting here...',
            'About half way done...',
            'Almost there?',
            'Woo Hoo! I made it!'
        ];
        var i = 0;

        var fakeProgress = function(){
            $timeout(function(){
                if(progress < 100){
                    progress += 25;
                    $rootScope.$broadcast('dialogs.wait.progress',{msg: msgs[i++],'progress': progress});
                    fakeProgress();
                }else{
                    $rootScope.$broadcast('dialogs.wait.complete');
                }
            },1000);
        }; // end fakeProgress

    }) // end dialogsServiceTest
    .controller('addDialogCtrl',function($scope,$modalInstance,data){
        $scope.user = {name : ''};

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        }; // end cancel

        $scope.save = function(){
            $modalInstance.close($scope.user.name);
        }; // end save

        $scope.hitEnter = function(evt){
            if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
                $scope.save();
        }; // end hitEnter
    }) // end addScoreDialogCtrl
    .controller('editDialogCtrl',function($scope,$modalInstance,data){
        $scope.user = {name : ''};

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        }; // end cancel

        $scope.save = function(){
            $modalInstance.close($scope.user.name);
        }; // end save

        $scope.hitEnter = function(evt){
            if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
                $scope.save();
        }; // end hitEnter
    }) // end editScoreDialogCtrl
    .controller('whatsYourNameCtrl',function($scope,$modalInstance,data){
        $scope.user = {name : ''};

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        }; // end cancel

        $scope.save = function(){
            $modalInstance.close($scope.user.name);
        }; // end save

        $scope.hitEnter = function(evt){
            if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
                $scope.save();
        }; // end hitEnter
    }) // end whatsYourNameCtrl
    .run(['$templateCache',function($templateCache){
        $templateCache.put('/dialogs/addscore.html',
            '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' +
                'Adding New Sheet Music</h4></div>' +
                '<div class="modal-body"><ng-form name="nameDialog" novalidate role="form">' +
                '<div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]">' +
                '<label class="control-label" for="username">Title:</label>' +
                '<input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required>' +
                '<span class="help-block">Enter Score Title.</span>' +
                '</div></ng-form></div><div class="modal-footer">' +
                '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
                '</div></div></div></div>');

        $templateCache.put('/dialogs/editscore.html',
                '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' +
                'Editing Sheet Music</h4></div>' +
                '<div class="modal-body"><ng-form name="nameDialog" novalidate role="form">' +
                '<div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]">' +
                '<label class="control-label" for="username">Title:</label>' +
                '<input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required>' +
                '<span class="help-block">Enter Score Title.</span>' +
                '</div></ng-form></div><div class="modal-footer">' +
                '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
                '</div></div></div></div>');

        $templateCache.put('/dialogs/add-1.html',
                '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' +
                'Adding Instrument</h4></div>' +
                '<div class="modal-body"><ng-form name="nameDialog" novalidate role="form">' +
                '<div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]">' +
                '<label class="control-label" for="username">Instrument Name:</label>' +
                '<input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required>' +
                '<span class="help-block">Enter Instrument Name</span>' +
                '</div></ng-form></div><div class="modal-footer">' +
                '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
                '</div></div></div></div>');

        $templateCache.put('/dialogs/add-2.html',
                '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' +
                'Adding Composer</h4></div>' +
                '<div class="modal-body"><ng-form name="nameDialog" novalidate role="form">' +
                '<div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]">' +
                '<label class="control-label" for="username">Composer Name:</label>' +
                '<input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required>' +
                '<span class="help-block">Enter Composer Name</span>' +
                '</div></ng-form></div><div class="modal-footer">' +
                '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
                '</div></div></div></div>');

        $templateCache.put('/dialogs/add-3.html',
                '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' +
                'Adding Genre</h4></div>' +
                '<div class="modal-body"><ng-form name="nameDialog" novalidate role="form">' +
                '<div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]">' +
                '<label class="control-label" for="username">Genre Name:</label>' +
                '<input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required>' +
                '<span class="help-block">Enter Genre Name</span>' +
                '</div></ng-form></div><div class="modal-footer">' +
                '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
                '</div></div></div></div>');

        $templateCache.put('/dialogs/rename-1.html',
                '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' +
                'Renaming Instrument</h4></div>' +
                '<div class="modal-body"><ng-form name="nameDialog" novalidate role="form">' +
                '<div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]">' +
                '<label class="control-label" for="username">Instrument Name:</label>' +
                '<input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required>' +
                '<span class="help-block">Enter new instrument name</span>' +
                '</div></ng-form></div><div class="modal-footer">' +
                '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
                '</div></div></div></div>');

        $templateCache.put('/dialogs/rename-2.html',
                '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' +
                'Renaming Composer</h4></div>' +
                '<div class="modal-body"><ng-form name="nameDialog" novalidate role="form">' +
                '<div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]">' +
                '<label class="control-label" for="username">Composer Name:</label>' +
                '<input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required>' +
                '<span class="help-block">Enter new composer name</span>' +
                '</div></ng-form></div><div class="modal-footer">' +
                '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
                '</div></div></div></div>');

        $templateCache.put('/dialogs/rename-3.html',
                '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
                '<h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> ' +
                'Renaming Genre</h4></div>' +
                '<div class="modal-body"><ng-form name="nameDialog" novalidate role="form">' +
                '<div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]">' +
                '<label class="control-label" for="username">Genre Name:</label>' +
                '<input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required>' +
                '<span class="help-block">Enter new genre name</span>' +
                '</div></ng-form></div><div class="modal-footer">' +
                '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
                '</div></div></div></div>');

        $templateCache.put('/dialogs/create.html','<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="username">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div></div></div></div>');

    }]); // end run / module
