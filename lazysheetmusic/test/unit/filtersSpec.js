'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
    beforeEach(module('rapidScoreFilters'));

    describe('checkmark', function() {
        it('should convert boolean values to unicode checkmark or cross',
            inject(function(checkmarkFilter) {
                expect(checkmarkFilter(true)).toBe('\u2713');
                expect(checkmarkFilter(false)).toBe('\u2718');
            }));
    });


    describe('range', function() {
        it('should convert the value selected from numberInstrument model to an array',
            inject(function(rangeFilter) {
                expect(rangeFilter([], 5)).toBe([1,2,3,4,5]);
                expect(rangeFilter([], 0)).toBe([]);
                expect(rangeFilter([], 1)).toBe([1]);
                expect(rangeFilter([], -1)).toBe([]);
            }));
    });


});
