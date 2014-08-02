'use strict';

/* jasmine specs for controllers go here */
describe('rapidScore controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('rapidScoreControllers'));
  beforeEach(module('rapidScoreServices'));

  describe('ScoreListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('sources/all.json').
          respond([{name: 'Let It Go'}, {name: 'One Summer\'s Day'}]);

      scope = $rootScope.$new();
      ctrl = $controller('ScoreListCtrl', {$scope: scope});
    }));

    it('should create "scores" model with 2 scores fetched from xhr', function() {
      expect(scope.scores).toEqualData([]);
      $httpBackend.flush();

      expect(scope.scores).toEqualData(
          [{name: 'Let It Go'}, {name: 'One Summer\'s Day'}]);
    });

    /*
    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
    */
  });


  describe('ScoreDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        testScoreData = function() {
          return {
              id: "let-it-go",
              name: 'Let It Go',
              imageUrl: "sources/images/1.jpg",
              audioUrl: "sources/let-it-go.mp3"
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('sources/let-it-go.json').respond(testScoreData());

      $routeParams.scoreId = 'let-it-go';
      scope = $rootScope.$new();
      ctrl = $controller('ScoreDetailCtrl', {$scope: scope});
    }));

    it('should fetch score detail', function() {
      expect(scope.score).toEqualData({});
      $httpBackend.flush();

      expect(scope.score).toEqualData(testScoreData());
    });
  });
});
