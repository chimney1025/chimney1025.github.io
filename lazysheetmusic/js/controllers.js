'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers',
    [ 'ui.bootstrap' ]);

rapidScoreControllers.controller('ScoreListCtrl', [ '$scope', 'ScoreAPI', function($scope, Score) {
        $scope.pageSize = 15;
        $scope.currentPage = 0;
        $scope.loading = true;
        $scope.scores = Score.getAll(function(res){
            $scope.loading = false;
            $scope.numberOfPages = function(){
                return Math.ceil(res.length/$scope.pageSize);
            }
        });
    } ]).controller('TypeCtrl', [ '$scope', '$routeParams', 'TypeAPI', function($scope, $routeParams, Type) {
        $scope.loading = true;
        $scope.result = Type.getOne({
            typename : $routeParams.typename
        }, function(res){
            $scope.loading = false;
        });
    } ]).controller('SubTypeCtrl', [ '$scope', '$routeParams', 'SubTypeAPI', function($scope, $routeParams, SubType) {

        $scope.loading = true;

        $scope.result = SubType.getAll({
            pname : $routeParams.pname,
            subname : $routeParams.subname
        }, function(res){

            $scope.loading = false;
        });
    } ]).controller('SubTypeIdCtrl', [ '$scope', '$routeParams', 'SubTypeIdAPI',
    function($scope, $routeParams, SubTypeId) {
        $scope.loading = true;
        $scope.result = SubTypeId.getAll({
            subtype_id : $routeParams.id
        }, function(res){
            $scope.loading = false;
        });
    } ]).controller(
    'ScoreCtrl',
    [
        '$scope',
        '$routeParams',
        'ScoreAPI',
        'UserCartAPI',
        'CheckOrderAPI',
        '$location',
        'AuthService',
        '$sce',
        function($scope, $routeParams, Score, Cart, CheckOrder, $location, AuthService, $sce) {
            $scope.loading = true;
            $scope.score = Score.getOne({scoreid : $routeParams.scoreId}, function(res){
                $scope.loading = false;
                if(!res){
                    $location.path('/404');
                }
            });

            $scope.action = 'Add to Cart';
            $scope.action_class = 'btn-warning';

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.addcart = function() {
                if (!AuthService.isAuthenticated()) {
                    //$location.path('/login');
                    $scope.showlogin();
                }

                else if(!$scope.score.fileurl && $scope.score.links.length == 0){
                    $scope.openModal("This sheet music does not have a pdf file to download. Please contact us.", true);
                }

                else {
                    var flag = 0;
                    for (var i = 0; i < $scope.logged_cart.length; i++) {
                        if ($scope.logged_cart[i].id == $scope.score.id) {
                            flag = 1;

                            $scope.openModal("Already in Cart.", true);
                            //alert('Already in Cart');
                            // redirect to cart
                            // $location.path('/account/shopping-cart');
                            break;
                        }
                    }

                    if (flag == 0) {
                        $scope.openModal("Adding to Cart...", false);
                        CheckOrder.get({scoreid : $scope.score.id},function(res) {
                            // alert(res.hasOrdered);
                            if (res && res.hasOrdered) {
                                $scope.openModal("Already purchased..", true);
                                // $location.path('/account/purchased');
                            } else {
                                Cart.add({},{score_id : $scope.score.id},function(res) {
                                    if (res) {
                                        var content = "Added to Cart!\n";
                                        if($scope.score.links.length){

                                            content += "\nYou will receive the following files: \n ";

                                            for(var i=0; i<$scope.score.links.length; i++){
                                                content += "\n" + $scope.score.links[i].desc + "\n";
                                            }
                                        }
                                        $scope.openModal(content, true);
                                        $scope.updatecart();
                                    }
                                });
                            }
                        });
                    }
                }
            };
        } ]).controller('ScoreAdminCtrl', [ '$scope', 'ScoreAdminAPI',
        'SliderAdminAPI', function($scope, Score, Slider) {
            $scope.loading = true;
            $scope.orderProp = 'title';
            $scope.scores = Score.getAll(function(res){
                $scope.loading = false;
            });

            // remove
            $scope.removeScore = function(value, sid, name) {
                if (value == true) {
                    var r = confirm('Deleting ' + name);
                } else {
                    var r = confirm('Re adding ' + name);
                }
                if (r == true) {
                    Score.remove({
                        scoreid : sid
                    }, function(res) {
                        if (value == true) {}
                        else {}
                        // $location.path('/admin/scores');
                        $scope.scores = Score.getAll();
                    });
                } else {

                }
            };

            $scope.addSlider = function(value, sid) {
                // convert to json
                var scoreData = new Object();
                scoreData.slider = value;

                Slider.save({
                    scoreid : sid
                }, scoreData, function(res) {
                    if (res) {
                        if (value == true) {
                            //alert('Added to slider');
                            $scope.scores = Score.getAll();
                        } else {
                            //alert('Removed from slider');
                            $scope.scores = Score.getAll();
                        }

                        // $location.path('/admin/scores');
                    }
                });

            };
        } ]).controller(
    'ScoreAddCtrl',
    [
        '$scope',
        'ScoreAdminAPI',
        '$location',
        function($scope, Score, $location) {

            // Add Score
            $scope.scoreInfo = {};
            $scope.scoreCheck = '';

            $scope.info = function() {
                alert('To add same instrument multiple times, choose -- back then choose the same instrument again');
            };

            $scope.scoreAdd = function() {

                $scope.scoreCheck = '';

                if (!$scope.scoreInfo.title) {
                    $scope.scoreCheck = 'Invalid title';
                    return;
                }
                // submit data
                else {
                    // create json to be posted
                    var scoreData = new Object();

                    scoreData.title = $scope.scoreInfo.title.trim();
                    scoreData.shortname = $scope.scoreInfo.title.trim()
                        .replace('-', ' ').replace('\'', '').replace(/ +/g, ' ').split(' ')
                        .join('-').toLowerCase();

                    if ($scope.scoreInfo.slider) {
                        scoreData.slider = $scope.scoreInfo.slider;
                    } else {
                        scoreData.slider = false;
                    }

                    if ($scope.scoreInfo.price) {
                        scoreData.price = $scope.scoreInfo.price;
                    } else {
                        scoreData.price = 0;
                    }
                    if ($scope.scoreInfo.page) {
                        scoreData.page = $scope.scoreInfo.page;
                    } else {
                        scoreData.page = 0;
                    }

                    if ($scope.scoreInfo.desc) {
                        scoreData.desc = $scope.scoreInfo.desc.trim();
                    } else {
                        scoreData.desc = '';
                    }
                    if ($scope.scoreInfo.audiourl) {
                        scoreData.audiourl = $scope.scoreInfo.audiourl.trim();
                    } else {
                        scoreData.audiourl = '';
                    }
                    if ($scope.scoreInfo.videourl) {
                        scoreData.videourl = $scope.scoreInfo.videourl.trim();
                    } else {
                        scoreData.videourl = '';
                    }
                    if ($scope.scoreInfo.imageurl) {
                        scoreData.imageurl = $scope.scoreInfo.imageurl.trim();
                    } else {
                        scoreData.imageurl = '';
                    }
                    if ($scope.scoreInfo.thumburl) {
                        scoreData.thumburl = $scope.scoreInfo.thumburl.trim();
                    } else {
                        scoreData.thumburl = '';
                    }
                    if ($scope.scoreInfo.fileurl) {
                        scoreData.fileurl = $scope.scoreInfo.fileurl.trim();
                    } else {
                        scoreData.fileurl = '';
                    }

                    Score.add(
                        {},
                        scoreData,
                        function(res) {
                            if (res) {
                                alert('added '
                                    + scoreData.shortname);
                                $location
                                    .path('/admin/scores');
                            }
                        });

                }
            };
        } ]).controller('ScoreEditCtrl', [
        '$scope',
        '$routeParams',
        'ScoreAdminAPI',
        '$location',
        function($scope, $routeParams, Score, $location) {

            $scope.loading = true;
            $scope.scoreInfo = Score.getOne({
                scoreid : $routeParams.scoreId
            }, function(res){
                $scope.loading = false;
            });
            $scope.scoreCheck = '';

            $scope.scoreSave = function() {
                $scope.scoreCheck = '';

                if (!$scope.scoreInfo.title) {
                    $scope.scoreCheck = 'Invalid title';
                    return;
                }
                // submit data
                else {
                    // create json to be posted
                    var scoreData = new Object();

                    scoreData.title = $scope.scoreInfo.title.trim();
                    scoreData.shortname = $scope.scoreInfo.title.trim()
                        .replace('-', ' ').replace('\'', '').replace(/ +/g, ' ').split(' ')
                        .join('-').toLowerCase();

                    if ($scope.scoreInfo.slider) {
                        scoreData.slider = $scope.scoreInfo.slider;
                    } else {
                        scoreData.slider = false;
                    }

                    if ($scope.scoreInfo.price) {
                        scoreData.price = $scope.scoreInfo.price;
                    } else {
                        scoreData.price = 0;
                    }
                    if ($scope.scoreInfo.page) {
                        scoreData.page = $scope.scoreInfo.page;
                    } else {
                        scoreData.page = 0;
                    }
                    if ($scope.scoreInfo.desc) {
                        scoreData.desc = $scope.scoreInfo.desc.trim();
                    } else {
                        scoreData.desc = '';
                    }
                    if ($scope.scoreInfo.audiourl) {
                        scoreData.audiourl = $scope.scoreInfo.audiourl.trim();
                    } else {
                        scoreData.audiourl = '';
                    }
                    if ($scope.scoreInfo.videourl) {
                        scoreData.videourl = $scope.scoreInfo.videourl.trim();
                    } else {
                        scoreData.videourl = '';
                    }
                    if ($scope.scoreInfo.imageurl) {
                        scoreData.imageurl = $scope.scoreInfo.imageurl.trim();
                    } else {
                        scoreData.imageurl = '';
                    }
                    if ($scope.scoreInfo.thumburl) {
                        scoreData.thumburl = $scope.scoreInfo.thumburl.trim();
                    } else {
                        scoreData.thumburl = '';
                        scoreData.slider = false;
                    }
                    if ($scope.scoreInfo.fileurl) {
                        scoreData.fileurl = $scope.scoreInfo.fileurl.trim();
                    } else {
                        scoreData.fileurl = '';
                    }
                    // category
                    /*
                     * for(var i=0; i<$scope.scoreInfo.category.length; i++){
                     * scoreData.category.push($scope.scoreInfo.category[i]); }
                     */

                    // convert to json
                    Score.save({
                        scoreid : $routeParams.scoreId
                    }, scoreData, function(res) {
                        if (res) {
                            alert('edited ' + scoreData.shortname);
                            // $scope.scoreInfo = Score.getOne({scoreid:
                            // $routeParams.scoreId});
                            $location.path('/admin/scores');
                        }
                    });
                }
            };
        } ]).controller('ScoreLinkCtrl', ['$scope', '$routeParams', 'ScoreAdminAPI', 'ScoreLinkAPI',
        function($scope, $routeParams, Score, ScoreLink){


            $scope.loading = true;
            $scope.score = Score.getOne({scoreid: $routeParams.scoreId}, function(res){

                $scope.loading = false;
            });

            $scope.addlink = function(){
                var desc = prompt("Enter NAME for this link").trim();
                if(desc != ""){
                    var url = prompt("Enter URL for " + desc).trim();
                    if(url != ""){
                        ScoreLink.add({scoreid: $routeParams.scoreId}, {
                            desc: desc,
                            url: url,
                            type: 1
                        }, function(res){
                            if(res){
                                //alert("Added");
                                $scope.score = Score.getOne({scoreid: $routeParams.scoreId});
                            }

                        });
                    } else{
                        console.log('no url, not updated');
                    }
                } else{
                    console.log('no desc, not updated');
                }
            }

            $scope.removelink = function(id){
                var r = confirm("If you delete this link, users who already bought this sheet music will not be able to access the file. " +
                    "\n If possible please update the link." +
                    "\n\n Do you still want to delete this link? " +
                    "\n\n Choose YES to DELETE, CANCEL to not delete.");
                if(r){
                    ScoreLink.remove({
                        scoreid: $routeParams.scoreId,
                        linkid: id
                    }, function(res){
                        if(res){
                            //alert("Deleted");
                            $scope.score = Score.getOne({scoreid: $routeParams.scoreId});
                        }
                    });
                }

            }

            //either parent or sub
            $scope.updatelink = function(id) {
                var desc = prompt("Updating NAME for this link").trim();
                if(desc != ""){
                    var url = prompt("Updating URL for " + desc).trim();
                    if(url != ""){
                        ScoreLink.update({
                            scoreid: $routeParams.scoreId,
                            linkid: id
                        }, {
                            desc: desc,
                            url: url,
                            type: 1
                        }, function(res){
                            if(res){
                                //alert("Added");
                                $scope.score = Score.getOne({scoreid: $routeParams.scoreId});
                            }

                        });
                    } else{
                        console.log('no url, not updated');
                    }
                } else{
                    console.log('no desc, not updated');
                }
            };
        }
    ]).controller('ScoreTypeCtrl', ['$scope', '$routeParams', 'ScoreAdminAPI', 'ScoreTypeAPI', 'TypeAdminAPI',
        function($scope, $routeParams, Score, ScoreType, Type){

            $scope.loading = true;
            $scope.types = Type.getAll();
            $scope.score = Score.getOne({
                scoreid : $routeParams.scoreId
            }, function(res){
                $scope.loading = false;

                $scope.selected = res.types;

            });

            $scope.addscoretype = function(typeid, typename){
                //check if already added
                var flag = 0;
                for(var i=0; i<$scope.selected.length; i++){
                    if($scope.selected[i].id == typeid){
                        alert(typename + ' already added');
                        flag = 1;
                        break;
                    }
                }

                if(flag == 0){
                    var r = confirm('Adding ' + typename);
                    if(r == true){
                        ScoreType.add({}, {
                            scoreid: $routeParams.scoreId,
                            typeid: typeid
                        }, function(res){
                            $scope.selected = res;
                        });
                    }
                }
            }

            $scope.removescoretype = function(typeid, typename){
                var r = confirm('Deleting ' + typename);
                if(r == true){
                    ScoreType.remove({
                        scoreid: $routeParams.scoreId,
                        typeid: typeid
                    }, function(res){
                        $scope.selected = res;
                    });
                }
            }
        }]).controller('TypeAdminCtrl', [ '$scope', 'TypeAdminAPI', 'SubTypeAdminAPI', 'TypeAPI',
        function($scope, Type, SubType, MenuType) {
            $scope.loading = true;
            $scope.types = Type.getAll(function(res){
                $scope.loading = false;
            });

            // remove
            // edit
            // add
            $scope.addptype = function(){
                var result = prompt("Adding Category").trim();
                if(result){
                    var shortname = result.replace('-', ' ').replace('\'', '').replace(/ +/g, ' ').split(' ').join('-').toLowerCase();
                    Type.add({},{
                        name: result,
                        shortname: shortname
                    },function(res){
                        $scope.types = Type.getAll();
                        //$scope.parent_types = MenuType.getAll();
                    })
                }
            }
            $scope.addsubtype = function(pid, pname) {
                var result = prompt("Adding type to : " + pname).trim();
                if(result){
                    var shortname = result.replace('-', ' ').replace('\'', '').replace(/ +/g, ' ').split(' ').join('-').toLowerCase();
                    SubType.add({typeid:pid},{
                        name: result,
                        shortname: shortname
                    },function(res){
                        $scope.types = Type.getAll();
                    })
                }
            };
            //either parent or sub
            $scope.updatetype = function(pid, pname) {
                var result = prompt("Renaming type : " + pname).trim();
                if(result){
                    var shortname = result.replace('-', ' ').replace('\'', '').replace(/ +/g, ' ').split(' ').join('-').toLowerCase();
                    SubType.save({typeid:pid},{
                        name: result,
                        shortname: shortname
                    },function(res){
                        $scope.types = Type.getAll();
                        //$scope.parent_types = MenuType.getAll();
                    })
                }
            };
            //either parent or sub
            $scope.removetype = function(subid, pname, subname, subcount) {
                if(subcount > 0){
                    alert('Type ' + subname + ' has more than 1 sub types. Delete sub types first');
                } else{
                    var r = confirm('Deleting ' + pname + ' - ' + subname);
                    // deleting score category records before deleting this category
                    if (r == true) {
                        SubType.remove({
                            typeid : subid
                        }, function(res) {
                            $scope.types = Type.getAll();
                            //$scope.parent_types = MenuType.getAll();
                        });
                    } else {

                    }
                }


            };
        } ]).controller('UserAdminListCtrl', [ '$scope',
        'UserAdminAPI', function($scope, User) {
            $scope.loading = true;
            $scope.users = User.getAll(function(res){
                $scope.loading = false;
            });
        } ]).controller('AdminCtrl', [ '$scope', '$routeParams', 'UserAPI',
        function($scope, $routeParams, User) {
            $scope.user = User.getOne();
            if ($scope.logged_admin) {
                // correct
            } else {
                $location.path("/account");
            }
        } ]).controller('UserAdminCtrl', [ '$scope', '$routeParams',
        'UserAdminAPI', 'UserAdminOrderAPI', 'UserAdminOrderDetailAPI',
        function($scope, $routeParams, User, Order, OrderDetail) {
            $scope.user = User.getOne({
                userid : $routeParams.userid
            });
            $scope.purchased = Order.getAll({
                userid : $routeParams.userid
            }, function(res){
                $scope.loading = false;
                for(var i=0; i<$scope.purchased.length; i++){
                    $scope.purchased[i].showdetail = false;
                }
            });
            $scope.showorder = function(userid, orderid) {
                for (var i = 0; i < $scope.purchased.length; i++) {
                    if ($scope.purchased[i].id == orderid) {
                        var index = i;
                        if ($scope.purchased[i].showdetail) {
                            $scope.purchased[i].showdetail = false;
                            break;
                        }
                        OrderDetail.getScores({
                            userid : userid,
                            orderid : orderid
                        }, function(scores) {
                            if (scores.length > 0) {
                                $scope.purchased[index].showdetail = true;
                                $scope.orderdetails = scores;
                                //$scope.showlinks = false;

                            } else {

                            }
                        })
                    } else {
                        $scope.purchased[i].showdetail = false;
                    }
                }
            }

        } ]).controller('UserCtrl', [
        '$location',
        '$scope',
        '$rootScope',
        '$routeParams',
        'UserAPI',
        'UserPassAPI',
        function($location, $scope, $rootScope, $routeParams,
                 User, UserPass) {

            $scope.loading = true;
            $rootScope.user = User.getOne(function(res){
                $scope.loading = false;
            });

            if ($scope.logged_admin) {
                // $location.path("/admin");
            }

            $scope.updateuser = function(firstname, surname){
                var result = prompt("Updating Account Detail").trim();
                if(result){
                    if(firstname == 1){
                        User.save({},{
                            firstname:result
                        },function(res){
                            $rootScope.user = User.getOne();
                        });
                    } else if (surname == 1){
                        User.save({},{
                            surname:result
                        },function(res){
                            $rootScope.user = User.getOne();
                        });
                    }
                }
            }

            $scope.updatepassword = function(oldpass, newpass){
            }
        } ]).controller('UserCartCtrl', [
        '$location',
        '$scope',
        '$rootScope',
        '$routeParams',
        'UserAPI',
        'UserCartAPI',
        'UserOrderAPI',
        function($location, $scope, $rootScope, $routeParams,
                 User, Cart, Order) {

            $scope.total = 0;

            $scope.loading = true;
            $scope.cart = Cart.getAll(function(res){
                $scope.loading = false;
                for(var i=0; i<res.length; i++){
                    $scope.total += res[i].price;
                }
            });

            $scope.removecart = function(name, sid) {
                Cart.remove({
                    scoreid : sid
                }, function(res) {
                    if (res) {
                        $scope.cart = res;
                        $scope.total = 0;
                        for(var i=0; i<res.length; i++){
                            $scope.total += res[i].price;
                        }
                        $scope.updatecart();
                    } else {
                    }
                });
            }

            $scope.order = function() {

                $scope.openModal("Placing Order ... (" + $scope.logged_cart.length + " items)", false);

                Order.order({}, function(res) {
                    if (res) {

                        $scope.openModal("Order placed! Please check your Email Inbox to download the sheet music.", true);
                        $scope.total = 0;

                        $scope.updatecart();
                        $scope.cart = Cart.getAll();
                        //$scope.purchased = Order.getAll();

                    } else {
                    }
                });
            }
        } ]).controller('UserOrderCtrl', [
        '$location',
        '$scope',
        '$rootScope',
        '$routeParams',
        'UserAPI',
        'UserOrderAPI',
        'UserOrderDetailAPI',
        'LinkAPI',
        function($location, $scope, $rootScope, $routeParams,
                 User, Order, OrderDetail, Link) {

            $scope.loading = true;

            $scope.purchased = Order.getAll(function(res){
                $scope.loading = false;
                for(var i=0; i<$scope.purchased.length; i++){
                    $scope.purchased[i].showdetail = false;
                }
            });

            $scope.showlinks = function(scoreid) {
                Link.getAll({
                    scoreid: scoreid
                }, function(links){
                    $scope.orderlinks = links;
                    //$scope.showlinks = true;
                    console.log(links);
                })
            }

            $scope.showorder = function(orderid) {
                for (var i = 0; i < $scope.purchased.length; i++) {
                    if ($scope.purchased[i].id == orderid) {
                        var index = i;
                        if ($scope.purchased[i].showdetail) {
                            $scope.purchased[i].showdetail = false;
                            break;
                        }
                        OrderDetail.getScores({
                            orderid : orderid
                        }, function(scores) {
                            if (scores.length > 0) {
                                $scope.purchased[index].showdetail = true;
                                $scope.orderdetails = scores;
                                //$scope.showlinks = false;

                            } else {

                            }
                        })
                    } else {
                        $scope.purchased[i].showdetail = false;
                    }
                }
            }
        } ]).controller('ContactCtrl',['$scope', 'ContactAPI', function($scope, Contact){

            // Contact
            $scope.contactInfo = {};
            $scope.contactCheck = '';

            $scope.sendMsg = function(contactInfo) {

                $scope.contactCheck = '';

                if (!contactInfo.name) {
                    $scope.contactCheck = 'Invalid Name';
                    return;
                }

                if (!contactInfo.email) {
                    $scope.contactCheck = 'Invalid Email';
                    return;
                }
                // submit data
                else {
                    $scope.openModal("Sending message...", false);
                    // create json to be posted
                    var contactData = new Object();

                    contactData.name = contactInfo.name.trim();
                    contactData.email = contactInfo.email.trim();
                    contactData.message = contactInfo.message.trim();

                    Contact.add({},contactData,function(res) {
                        if (res) {
                            $scope.openModal("Message sent!", true);
                        }
                    });

                }
            };
        }]).controller('ActivateCtrl',[
        '$scope',
        'ActivateAPI',
        '$routeParams',
        function($scope, Activate, $routeParams) {
            $scope.loading = true;
            $scope.res = Activate.get({link: $routeParams.link}, function(r){
                $scope.loading = false;
                if(r.css == 0){
                    $scope.setCheck = "form-success";
                }
            })
        }]).controller('DownloadCtrl',[
        '$scope',
        'DownloadAPI',
        '$routeParams',
        function($scope, Download, $routeParams){

            $scope.loading = true;
            $scope.res = Download.get({link:$routeParams.link}, function(r){
                //open download page
                if(r.url){
                    window.location.assign(r.url);
                } else if(r.message){
                    $scope.loading = false;
                }
            })
        }]).controller('ViewOrderCtrl',[
        '$scope',
        'ViewAPI',
        '$routeParams',
        '$window',
        function($scope, ViewOrder, $routeParams, $window) {
            $scope.loading = true;
            $scope.downloadtext = "Preparing...";
            $scope.times = " ";
            $scope.downloadurl = "#";

            $scope.res = ViewOrder.get({linkid: $routeParams.linkid, scoreid: $routeParams.scoreid}, function(r){
                $scope.loading = false;
                console.log(r);
                $scope.downloaded = 0;

                if(r.token){
                    $scope.downloadfile = function(){
                        if($scope.downloaded == 0){
                            console.log(r.token);
                            //$location.path('/account/download/' + r.token);
                            var baseurl = 'http://localhost:63342/heroku/lazyscorefs/lazysheetmusic/#';
                            $window.open('/#/account/download/'+ r.token, '_blank');
                            if(r.time <3){
                                r.time ++;
                            }

                            $scope.downloadtext = "File Opened in New Window";
                            $scope.downloadclass = "btn-default btn-nolink";
                            $scope.downloaded = 1;
                        }
                    }
                    //$scope.downloadurl = "/account/download/" + r.token;

                    $scope.downloadtext = "Click to Download File";
                    $scope.downloadclass = "btn-warning";

                }
            })
        }
    ]
).constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    }).constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    }).controller('LoginCtrl',[
        '$scope',
        '$location',
        'AuthService',
        function($scope, $location, AuthService) {

            // if logged in, go to user page
            if (AuthService.isAuthenticated()) {

                if (AuthService.isAdmin()) {
                    // $location.path("/admin");
                    $location.path("/admin");
                } else {
                    $location.path("/account");
                }
            }

            // Login
            $scope.loginInfo = {};
            $scope.loginCheck = '';

            $scope.login = function(loginInfo) {
                $scope.loginCheck = '';

                if (!loginInfo.username) {
                    $scope.loginCheck = 'Invalid Username';
                    return;
                }

                else if (!loginInfo.password) {
                    $scope.loginCheck = 'Please enter your Password';
                    return;
                }

                else {
                    $scope.loginCheck = 'Signing in ...';
                    $scope.setCheck = "form-success";

                    AuthService.login(loginInfo.username.trim(),loginInfo.password.trim()).success(
                        function(data) {

                            if (data && data.token) {
                                $scope.setCurrentUser(data);
                                // refresh
                                $scope.loginCheck = "Login Successful. Redirecting...";
                                $scope.setCheck = "form-success";

                                $scope.closelogin();
                                if($location.path() == "/login"){
                                    $location.path("/account");
                                }
                            } else {
                                //$scope.$emit(AUTH_EVENTS.loginFailed);
                                $scope.closelogin();
                                $scope.logout();
                                $scope.loginCheck = "Invalid Login";
                            }
                        }).error(function(err) {
                            $scope.closelogin();
                            $scope.logout();
                            $scope.loginCheck = "";
                            $scope.openModal("Login failed. Please try again.", true);
                        });
                }
            };
        } ]).controller('SignUpCtrl',[
        '$scope',
        'RegisterAPI',
        'CheckUsernameAPI',
        function($scope, User, CheckUsername) {

            // Sign Up
            $scope.load_script = function() {
                var s = document.createElement('script'); // use global document since Angular's $document is weak
                s.src = 'js/recaptcha_ajax.js';
                document.body.appendChild(s);


                var s2 = document.createElement('script'); // use global document since Angular's $document is weak
                s2.src = 'js/angular-recaptcha.min.js';
                document.body.appendChild(s2);

                console.log('recaptcha loaded');
            }

            $scope.regInfo = {};
            $scope.regCheck = '';

            $scope.regSave = function(regInfo) {
                $scope.regCheck = '';

                if (!regInfo.username) {
                    $scope.regCheck = 'Invalid Email';
                    return;
                } else if (!regInfo.firstname) {
                    $scope.regCheck = 'Please enter your Firstname';
                    return;
                } else if (!regInfo.surname) {
                    $scope.regCheck = 'Please enter your Surname';
                    return;
                } else if (!regInfo.pass1) {
                    $scope.regCheck = 'Please enter your Password';
                    return;
                } else if (regInfo.pass1.length < 6
                    || regInfo.pass1.length > 20) {
                    $scope.regCheck = 'Password length should be 6 to 20 characters long';
                    return;
                } else if (!regInfo.pass2) {
                    $scope.regCheck = 'Please enter your Password';
                    return;
                } else if (regInfo.pass1 != regInfo.pass2) {
                    $scope.regCheck = 'Two Passwords do not match';
                    return;
                }
                /*
                 * still need to check username and email
                 * existence
                 */
                // submit data
                else {
                    $scope.openModal("Signing up ...", false);

                    //$scope.regCheck = 'We are signing you up...';
                    //$scope.setCheck = "form-success";
                    // check username before submit
                    CheckUsername.getOne(
                        {
                            username : regInfo.username.trim()
                        },
                        function(res2) {
                            console.log("check username ");
                            console.log(res2.result);

                            if (res2.result) {
                                $scope.openModal("Email exists. Please try another one.", true);
                                //$scope.regCheck = 'Username exists. Try another one.';
                            } else {
                                // create json to be
                                // posted

                                var regData = new Object();
                                regData.username = regInfo.username.trim();
                                regData.firstname = regInfo.firstname.trim();
                                regData.surname = regInfo.surname.trim();
                                regData.password = regInfo.pass1.trim();
                                console.log(regData);

                                User.save(
                                    regData.username,
                                    regData.password,
                                    regData.firstname,
                                    regData.surname).success(function(res) {
                                        if (res) {
                                            $scope.openModal("Your registration is successful. Please check your Inbox to verify your email address.", true);

                                        } else {
                                            $scope.openModal("Something wrong happened. Please try again", true);
                                        }
                                    });
                            }

                        })
                }
            };
        } ]).controller('sessionService',
    [
        '$scope',
        '$rootScope',
        '$location',
        'UserCartAPI',
        'breadcrumbs',
        'TypeAPI',
        'USER_ROLES',
        'AuthService',
        'AUTH_EVENTS',
        function($scope, $rootScope, $location, Cart,
                 breadcrumbs, Type, USER_ROLES, AuthService, AUTH_EVENTS) {

            $scope.needlogin = false;
            $scope.logged = false;
            $scope.currentUser = null;
            $scope.userRoles = USER_ROLES;
            $scope.isAuthorized = AuthService.isAuthorized;

            $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(){
                console.log('receiving not logged or expired');
                AuthService.logout();
                $scope.setCurrentUser(null);
            });

            $scope.setCurrentUser = function (user) {
                $scope.currentUser = user;
                if(user){
                    $scope.logged = true;
                    $scope.logged_admin = AuthService.isAdmin();

                    $scope.updatecart();
                } else{
                    $scope.logged = false;
                }
            }

            //$scope.$on(AUTH_EVENTS.loginSuccess, function(){});

            $scope.logout = function logout() {
                console.log('logging out');
                AuthService.logout();
                $scope.setCurrentUser(null);

                if($location.path() == "/account"
                    || $location.path() == "/account/shopping-cart"
                    || $location.path() == "/account/purchased"){
                    $location.path('/');
                }
            }

            $scope.breadcrumbs = breadcrumbs;

            //$scope.parent_types = Type.getAll();

            $scope.modalcheck = "";

            $scope.showlogin = function(){
                if($location.path() != "/login"){
                    $scope.needlogin = true;
                    $scope.setlogin = "modal";
                }
            }

            $scope.closelogin = function(){
                $scope.needlogin = false;
            }

            $scope.openModal = function(content, option){
                $scope.modalcheck = content;
                $scope.modaloption = option;
                $scope.setmodal = "modal";
            }

            $scope.closemodal = function(){
                $scope.modalcheck = "";
                $scope.setModal = "";
            }

            $scope.updatecart = function() {
                console.log('updating cart');
                $scope.logged_cart = Cart.getAll(function (res) {
                    $scope.cartcount = res.length;
                })
            }

            if (!AuthService.isAuthenticated()) {
                $scope.logged = false;
                AuthService.logout();
            } else {
                $scope.logged = true;

                $scope.logged_admin = AuthService.isAdmin();

                $scope.updatecart();
            }
        } ]);