'use strict';

/* Filters */

angular.module('rapidScoreFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

angular.module('rapidScoreFilters', []).filter('range', function() {
    return function(val, range) {
        range = parseInt(range);
        for(var i=1; i<=range; ++i){
            val.push(i);
        }
        return val;
    }
});