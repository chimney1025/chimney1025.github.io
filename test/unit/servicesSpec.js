'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('rapidScoreServices'));

  // Test service availability
    it('check the existence of User factory', inject(function(User) {
        expect(User).toBeDefined();
    }));

    it('check the existence of Score factory', inject(function(Score) {
        expect(Score).toBeDefined();
    }));

    it('check the existence of Instrument factory', inject(function(Instrument) {
        expect(Instrument).toBeDefined();
    }));

    it('check the existence of Composer factory', inject(function(Composer) {
        expect(Composer).toBeDefined();
    }));

    it('check the existence of Genre factory', inject(function(Genre) {
        expect(Genre).toBeDefined();
    }));


});