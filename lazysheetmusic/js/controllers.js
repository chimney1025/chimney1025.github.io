'use strict';

/* Controllers */

var rapidScoreControllers = angular.module('rapidScoreControllers',
    [ 'ui.bootstrap' ]);

rapidScoreControllers.controller('ScoreListCtrl', [ '$scope', '$rootScope',
    'ScoreAPI', function($scope, $rootScope, Score) {
        $scope.pageSize = 15;
        $scope.currentPage = 0;
        $scope.loading = true;
        $scope.scores = Score.getAll(function(res){
            $scope.loading = false;
            $scope.numberOfPages = function(){
                return Math.ceil(res.length/$scope.pageSize);
            }
        });
    } ]);

rapidScoreControllers.controller('TypeCtrl', [ '$scope', '$rootScope',
    '$routeParams', 'TypeAPI',
    function($scope, $rootScope, $routeParams, Type) {
        $scope.loading = true;
        $scope.result = Type.getOne({
            typename : $routeParams.typename
        }, function(res){
            $scope.loading = false;
        });
    } ]);

rapidScoreControllers.controller('SubTypeCtrl', [ '$scope', '$rootScope',
    '$routeParams', 'SubTypeAPI',
    function($scope, $rootScope, $routeParams, SubType) {

        $scope.loading = true;

        $scope.result = SubType.getAll({
            pname : $routeParams.pname,
            subname : $routeParams.subname
        }, function(res){

            $scope.loading = false;
        });
    } ]);

rapidScoreControllers.controller('SubTypeIdCtrl', [ '$scope', '$rootScope',
    '$routeParams', 'SubTypeIdAPI',
    function($scope, $rootScope, $routeParams, SubTypeId) {
        $scope.loading = true;
        $scope.result = SubTypeId.getAll({
            subtype_id : $routeParams.id
        }, function(res){

            $scope.loading = false;
        });
    } ]);

rapidScoreControllers
    .controller(
    'ScoreCtrl',
    [
        '$scope',
        '$rootScope',
        '$routeParams',
        'ScoreAPI',
        'UserCartAPI',
        'CheckOrderAPI',
        '$location',
        '$window',
        '$sce',
        function($scope, $rootScope, $routeParams, Score, Cart,
                 CheckOrder, $location, $window, $sce) {
            $scope.loading = true;
            $scope.score = Score.getOne({scoreid : $routeParams.scoreId}, function(res){
                $scope.loading = false;
                if(!res){
                    $location.path('/404');
                }
            });

            $rootScope.action = 'Add to Cart';
            $rootScope.action_class = 'btn-warning';

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.addcart = function() {
                if (!$window.localStorage.getItem('uid')) {
                    $location.path('/login');
                }

                else if(!$scope.score.fileurl && $scope.score.links.length == 0){
                    $rootScope.modalcheck="This sheet music does not have a pdf file to download at the moment.";
                    $rootScope.modaloption = true;
                    $rootScope.setModal = "modal";
                }

                else {
                    var flag = 0;
                    for (var i = 0; i < $scope.logged_cart.length; i++) {
                        if ($scope.logged_cart[i].id == $scope.score.id) {
                            flag = 1;
                            $rootScope.modalcheck="Already in Cart";
                            $rootScope.modaloption = true;
                            $rootScope.setModal = "modal";
                            //alert('Already in Cart');
                            // redirect to cart
                            // $location.path('/account/shopping-cart');
                            break;
                        }
                    }

                    if (flag == 0) {
                        $rootScope.modalcheck="Adding to Cart ...";
                        $rootScope.modaloption = false;
                        $rootScope.setModal = "modal";
                        CheckOrder.get({scoreid : $scope.score.id},function(res) {
                            // alert(res.hasOrdered);
                            if (res && res.hasOrdered) {
                                $rootScope.modalcheck="Already purchased";
                                $rootScope.modaloption = true;
                                $rootScope.setModal = "modal";
                                // $location.path('/account/purchased');
                            } else {
                                //$rootScope.modalcheck="Adding to Cart ...";
                                Cart.add({},{score_id : $scope.score.id},function(res) {
                                    if (res) {
                                        $rootScope.modalcheck="Added to Cart !\n";
                                         if($scope.score.links.length){

                                             $rootScope.modalcheck+="\nYou will receive the following files: \n ";

                                             for(var i=0; i<$scope.score.links.length; i++){
                                                 $rootScope.modalcheck += "\n" + $scope.score.links[i].desc + "\n";
                                             }
                                         }


                                        $rootScope.modaloption = true;
                                        $rootScope.setModal = "modal";
                                        //alert('added');

                                        $rootScope.added_score_name = $scope.score.name;
                                        $rootScope.added_score_shortname = $scope.score.shortname;
                                        $rootScope.logged_cart = Cart.getAll(
                                            function(res){$rootScope.cartcount = res.length;}
                                        );
                                        // $rootScope.action
                                        // =
                                        // "Already
                                        // In
                                        // Cart";
                                        // $rootScope.action_class
                                        // =
                                        // 'btn-danger';
                                        // $window.location.reload();
                                        // $location.path('/account/shopping-cart');

                                    }
                                });
                            }
                        });
                    }
                }
            };
        } ]);

rapidScoreControllers.controller('ScoreAdminCtrl', [ '$scope', 'ScoreAdminAPI',
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
    } ]);

rapidScoreControllers
    .controller(
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
        } ]);

rapidScoreControllers.controller('ScoreEditCtrl', [
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
    } ]);

rapidScoreControllers.controller('ScoreLinkCtrl', ['$scope', '$routeParams', 'ScoreAdminAPI', 'ScoreLinkAPI',
    function($scope, $routeParams, Score, ScoreLink){


        $scope.loading = true;
        $scope.score = Score.getOne({scoreid: $routeParams.scoreId}, function(res){

            $scope.loading = false;
        });

        $scope.addlink = function(){
            var desc = prompt("Enter Name for this link").trim();
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
                    //alert("no url");
                }
            } else{
                //alert("no data");
            }
        }

        $scope.removelink = function(id){
            var r = confirm("Delete this link? ");
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
    }
])

rapidScoreControllers.controller('ScoreTypeCtrl', ['$scope', '$routeParams', 'ScoreAdminAPI', 'ScoreTypeAPI', 'TypeAdminAPI',
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
    }]);

rapidScoreControllers.controller('TypeAdminCtrl', [ '$scope', '$rootScope', 'TypeAdminAPI',
    'SubTypeAdminAPI', 'TypeAPI',
    function($scope, $rootScope, Type, SubType, MenuType) {
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
                    $rootScope.parent_types = MenuType.getAll();
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
                    $rootScope.parent_types = MenuType.getAll();
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
                        $rootScope.parent_types = MenuType.getAll();
                    });
                } else {

                }
            }


        };
    } ]);

rapidScoreControllers.controller('UserAdminListCtrl', [ '$scope',
    'UserAdminAPI', function($scope, User) {
        $scope.loading = true;
        $scope.users = User.getAll(function(res){
            $scope.loading = false;
        });
    } ]);

rapidScoreControllers.controller('AdminCtrl', [ '$rootScope', '$scope',
    '$routeParams', 'UserAPI',
    function($rootScope, $scope, $routeParams, User) {
        $scope.user = User.getOne();
        if ($rootScope.logged_admin) {
            // correct
        } else {
            $location.path("/account");
        }
    } ]);

rapidScoreControllers.controller('UserAdminCtrl', [ '$scope', '$routeParams',
    'UserAdminAPI', function($scope, $routeParams, User) {
        $scope.user = User.getOne({
            username : $routeParams.username
        });
        $scope.total = 0;
    } ]);

rapidScoreControllers.controller('UserCtrl', [
    '$window',
    '$location',
    '$scope',
    '$rootScope',
    '$routeParams',
    'UserAPI',
    'UserPassAPI',
    'UserCartAPI',
    'UserOrderAPI',
    'UserOrderDetailAPI',
    'LinkAPI',
    function($window, $location, $scope, $rootScope, $routeParams,
             User, UserPass, Cart, Order, OrderDetail, Link) {

        $scope.loading = true;
        $rootScope.user = User.getOne(function(res){
            $scope.loading = false;
        });

        if ($rootScope.logged_admin) {
            // $location.path("/admin");
        }

        $scope.total = 0;

        $scope.loading = true;
        $scope.cart = Cart.getAll(function(res){
            $scope.loading = false;
            for(var i=0; i<res.length; i++){
                $scope.total += res[i].price;
            }
        });

        $scope.purchased = Order.getAll(function(res){
            $scope.loading = false;
            for(var i=0; i<$scope.purchased.length; i++){
                $scope.purchased[i].showdetail = false;
            }
        });
        // get scores of each order

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
        
        $scope.showlinks = function(scoreid) {
        	Link.getAll({
        		scoreid: scoreid
        	}, function(links){
        		$scope.orderlinks = links;
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
                            
                            for(var j=0; j<scores.length; j++){
                            	Link.getAll({
                            		scoreid: scores[j].id
                            	}, function(links){
                            		scores[j].orderlinks = links;
                            		console.log(links);
                            	})
                            	
                            }
                            
                        } else {

                        }
                    })
                } else {
                    $scope.purchased[i].showdetail = false;
                }
            }
        }

        $scope.removecart = function(name, sid) {
            Cart.remove({
                scoreid : sid
            }, function(res) {
                if (res) {
                    //alert('Removed ' + name);
                    $rootScope.added_score_name = "";
                    $rootScope.added_score_shortname = "";
                    // $rootScope.logged_cart = res;
                    $rootScope.logged_cart = Cart.getAll(function(res) {
                        $rootScope.cartcount = res.length;
                    });
                    $scope.cart = Cart.getAll(function(res){

                        $scope.total = 0;
                        
                        for(var i=0; i<res.length; i++){
                            $scope.total += res[i].price;
                        }
                    });

                    // $window.location.reload();
                } else {
                }
            });
        }

        $scope.order = function() {

            $rootScope.modalcheck="Placing Order ... (" + $scope.logged_cart.length + " items)";
            $rootScope.modaloption= false;
            $rootScope.setModal = "modal";

            Order.order({}, function(res) {
                if (res) {

                    //$rootScope.modalcheck="";

                    $rootScope.modalcheck="Order placed! Please check your Email Inbox to download the sheet music.";
                    $rootScope.modaloption= true;
                    $rootScope.setModal = "modal";

                    //alert('Placing Order - ' + $scope.logged_cart.length  + ' items');
                    $rootScope.logged_cart = Cart.getAll(function(res) {
                        $rootScope.cartcount = res.length;
                    });
                    $scope.cart = Cart.getAll();
                    $scope.purchased = Order.getAll();

                    // $window.location.reload();
                    if($rootScope.modalcheck == ""){
                        $location.path('/account/purchased');
                    }

                } else {
                }
            });
        }

        $scope.showscore = function(file) {
            if(!file){
                alert('File url not available');
            } else{
                //open pdf file in a new page/or send email to user
                var win = window.open(file, '_blank');
                win.focus();
            }
        }
    } ]);

rapidScoreControllers.controller('sessionService',
    [
        '$scope',
        '$rootScope',
        '$window',
        '$location',
        'UserCartAPI',
        'breadcrumbs',
        'TypeAPI',
        function($scope, $rootScope, $window, $location, Cart,
                 breadcrumbs, Type) {

            $scope.breadcrumbs = breadcrumbs;

            $rootScope.parent_types = Type.getAll(function(res){
            });

            $rootScope.table = 1;

            $rootScope.setTable = function(p){
                if(p == 1){
                    $rootScope.table = 0;
                    //$window.location.reload();
                } else{
                    $rootScope.table = 1;
                    //$window.location.reload();
                }
            }

            $rootScope.modalcheck = "";

            $rootScope.closemodal = function(){
                $rootScope.modalcheck = "";
                $rootScope.setModal = "";
            }

            if (!$window.localStorage.getItem('token')) {
                $rootScope.logged = false;
                $window.localStorage.removeItem('token');
                $window.localStorage.removeItem('username');
                $window.localStorage.removeItem('uid');
                $window.localStorage.removeItem('admin');
            } else {
                $rootScope.logged = true;
                $rootScope.logged_username = $window.localStorage
                    .getItem('username');
                $rootScope.logged_admin = $window.localStorage
                    .getItem('admin');
                $rootScope.logged_cart = Cart.getAll(function(res) {
                    $rootScope.cartcount = res.length;
                });
            }

            $scope.logout = function logout() {
                $rootScope.logged = false;
                $window.localStorage.removeItem('token');
                $window.localStorage.removeItem('username');
                $window.localStorage.removeItem('uid');
                $window.localStorage.removeItem('admin');
                
                //
                $location.path("/login");
            }
        } ]);

rapidScoreControllers
	.controller(
			'ContactCtrl',['$scope', '$rootScope', '$window', 'ContactAPI', 
			               function($scope, $rootScope, $window, Contact){

        // Contact
        $rootScope.contactInfo = {};
        $rootScope.contactCheck = '';
        
        if($rootScope.user){
        	$rootScope.contactInfo.name = $rootScope.user.firstname + ' ' + $rootScope.user.surname; 
        	$rootScope.contactInfo.email = $rootScope.user.username; 
        }

        $scope.sendMsg = function() {

            $scope.contactCheck = '';

            if (!$rootScope.contactInfo.name) {
                $scope.contactCheck = 'Invalid Name';
                return;
            }

            if (!$rootScope.contactInfo.email) {
                $scope.contactCheck = 'Invalid Email';
                return;
            }
            // submit data
            else {
                $rootScope.modalcheck="Sending message ...";
                $rootScope.modaloption = false;
                $rootScope.setModal = "modal";
                // create json to be posted
                var contactData = new Object();

                contactData.name = $rootScope.contactInfo.name.trim();
                contactData.email = $rootScope.contactInfo.email.trim();
                contactData.message = $rootScope.contactInfo.message.trim();

                Contact.add(
                    {},
                    contactData,
                    function(res) {
                        if (res) {
                            $rootScope.modalcheck="Message sent!";
                            $rootScope.modaloption = true;
                            $rootScope.setModal = "modal";

                            $rootScope.closemodal=function(){
                                $rootScope.modalcheck = "";
                                $rootScope.setModal = "";
                                $window.location.reload();
                            }
                        }
                    });

            }
        };
	}]);

rapidScoreControllers
    .controller(
    'LoginCtrl',
    [
        '$scope',
        '$rootScope',
        '$location',
        '$window',
        'LoginAPI',
        'UserAPI',
        function($scope, $rootScope, $location, $window,
                 LoginService, User) {

            // if logged in, go to user page

            $rootScope.modalcheck="";
            $rootScope.setModal = "";
            if ($rootScope.logged) {

                if ($rootScope.logged_admin) {
                    // $location.path("/admin");
                    $location.path("/account");
                } else {
                    $location.path("/account");
                }
            }

            $rootScope.closemodal = function(){
                $rootScope.modalcheck = "";
                $rootScope.setModal = "";
                $window.location.reload();
            }

            // Login
            $scope.loginInfo = {};
            $rootScope.loginCheck = '';

            $scope.login = function() {
                $rootScope.loginCheck = '';

                if (!$scope.loginInfo.username) {
                    $rootScope.loginCheck = 'Invalid Username';
                    return;
                }

                else if (!$scope.loginInfo.password) {
                    $rootScope.loginCheck = 'Please enter your Password';
                    return;
                }
                /*
                 * else if($scope.loginInfo.password.length < 6 ||
                 * $scope.loginInfo.password.length > 20){
                 * $scope.loginCheck = 'Password length should
                 * be 6 to 20 characters long'; return; }
                 */

                else {
                    //$rootScope.modalcheck="Signing in ...";
                    $rootScope.loginCheck = 'Signing in ...';
                    $rootScope.setCheck = "form-success";
                    LoginService.login($scope.loginInfo.username,$scope.loginInfo.password).success(
                        function(data) {
                            console.log(data.header);
                            if (data && data.token) {
                                $window.localStorage.setItem('token',data.token);
                                $window.localStorage.setItem('username',data.username);
                                $window.localStorage.setItem('uid',data.id);
                                $window.localStorage.setItem('admin',data.admin);
                                console.log($window.localStorage);

                                // set global
                                // variables
                                // too quick, a
                                // refresh of the
                                // page gives better
                                // user experience
                                // $rootScope.user =
                                // User.getOne({username:
                                // data.username});

                                // refresh
                                //$rootScope.modalcheck="Login Successful.";
                                $rootScope.loginCheck = "Login Successful. Redirecting...";
                                $rootScope.setCheck = "form-success";
                                // $location.path("/account");
                                if($rootScope.beforelogin){
                                    $location.path($rootScope.beforelogin.redirectTo);
                                }
                                $window.location.reload();


                            } else {
                                $window.localStorage
                                    .removeItem('token');
                                console
                                    .log(data.status);
                                $rootScope.loginCheck = "Invalid Login";
                                //$rootScope.modalcheck="Login failed. Please try again.";
                                //$rootScope.modaloption = true;
                            }
                        })
                        .error(
                        function(err) {
                            $rootScope.modalcheck="Login failed. Please try again.";
                            $rootScope.modaloption = true;
                            $rootScope.setModal = "modal";
                            //$rootScope.loginCheck = "Login Failed";
                        });
                }
            };
        } ]);

rapidScoreControllers
    .controller(
    'ActivateCtrl',
    [
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
        }
    ]
)

rapidScoreControllers
    .controller(
    'DownloadCtrl',
    [
        '$scope',
        '$rootScope',
        'DownloadAPI',
        '$routeParams',
        '$window',
        '$location',
        function($scope, $rootScope, Download, $routeParams, $window, $location){

            $scope.loading = true;
            $scope.res = Download.get({link:$routeParams.link}, function(r){
                //window.open(r.url, 'download');
                //alert(r.url);
            	//open download page
            	if(r.url){
                    window.location.assign(r.url);
            	} else if(r.message){
            		$scope.loading = false;
            	}
            })
        }
    ]
)

rapidScoreControllers
    .controller(
    'ViewOrderCtrl',
    [
        '$scope',
        '$rootScope',
        'ViewAPI',
        '$routeParams',
        '$window',
        '$location',
        '$timeout',
        function($scope, $rootScope, ViewOrder, $routeParams, $window, $location, $timeout) {
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
                    //set timeout

                    $scope.timeInMs = 5000;

                    /*
                    var countDown = function(){
                        $scope.timeInMs -= 1000;

                        if($scope.timeInMs == 0){

                            $scope.downloadtext = "Click to Download File";
                            $scope.downloadclass = "btn-warning";
                            window.open(r.url, '_blank');

                        } else{
                            $timeout(countDown, 1000);
                            $scope.downloadtext = "Download will start in " + $scope.timeInMs/1000 + " seconds.";

                        }
                    }

                    $timeout(countDown, 1000);
                    */

                }
            })
        }
    ]
)

rapidScoreControllers
    .controller(
    'SignUpCtrl',
    [
        '$scope',
        '$rootScope',
        'RegisterAPI',
        'CheckUsernameAPI',
        '$location',
        function($scope, $rootScope, User, CheckUsername, $location) {

            // Sign Up
            $scope.regInfo = {};
            $scope.regCheck = '';

            $scope.regSave = function() {
                $scope.regCheck = '';

                if (!$scope.regInfo.username) {
                    $scope.regCheck = 'Invalid Email';
                    return;
                } else if (!$scope.regInfo.firstname) {
                    $scope.regCheck = 'Please enter your Firstname';
                    return;
                } else if (!$scope.regInfo.surname) {
                    $scope.regCheck = 'Please enter your Surname';
                    return;
                } else if (!$scope.regInfo.pass1) {
                    $scope.regCheck = 'Please enter your Password';
                    return;
                } else if ($scope.regInfo.pass1.length < 6
                    || $scope.regInfo.pass1.length > 20) {
                    $scope.regCheck = 'Password length should be 6 to 20 characters long';
                    return;
                } else if (!$scope.regInfo.pass2) {
                    $scope.regCheck = 'Please enter your Password';
                    return;
                } else if ($scope.regInfo.pass1 != $scope.regInfo.pass2) {
                    $scope.regCheck = 'Two Passwords do not match';
                    return;
                }
                /*
                 * still need to check username and email
                 * existence
                 */
                // submit data
                else {
                    $rootScope.modalcheck="Signing up ...";
                    $rootScope.modaloption = false;
                    $rootScope.setModal = "modal";
                    
                    //$scope.regCheck = 'We are signing you up...';
                    //$scope.setCheck = "form-success";
                    // check username before submit
                    CheckUsername
                        .getOne(
                        {
                            username : $scope.regInfo.username.trim()
                        },
                        function(res2) {
                            console
                                .log("check username ");
                            console
                                .log(res2.result);

                            if (res2.result) {
                                $rootScope.modalcheck="Username exists. Try another one.";
                                $rootScope.modaloption = true;
                                $rootScope.setModal = "modal";
                                //$scope.regCheck = 'Username exists. Try another one.';
                            } else {
                                // create json to be
                                // posted

                                var regData = new Object();
                                regData.username = $scope.regInfo.username.trim();
                                regData.firstname = $scope.regInfo.firstname.trim();
                                regData.surname = $scope.regInfo.surname.trim();
                                regData.password = $scope.regInfo.pass1.trim();
                                console
                                    .log(regData);
                                User
                                    .save(
                                    regData.username,
                                    regData.password,
                                    regData.firstname,
                                    regData.surname)
                                    .success(function(res) {
                                        if (res) {
                                            $rootScope.closemodal=function(){
                                                $rootScope.modalcheck = "";
                                                $rootScope.setModal = "";
                                                $window.location.reload();
                                            }

                                            $rootScope.modalcheck="Your registration is successful. Please check your Inbox to verify your email address.";
                                            $rootScope.modaloption = true;
                                            $rootScope.setModal = "modal";
                                            //$scope.regCheck = 'Registration Successful';
                                            //$scope.setCheck = "form-success";
                                            //alert('Registration successful. Please check your email inbox to activate your account.');
                                            if($rootScope.modalcheck == ""){
                                                $location.path('/login');
                                            }
                                        } else {
                                            $rootScope.modalcheck="Somthing wrong happened. Please try again";
                                            $rootScope.modaloption = true;
                                            $rootScope.setModal = "modal";
                                        }
                                    });
                            }

                        })
                }
            };
        } ]);
