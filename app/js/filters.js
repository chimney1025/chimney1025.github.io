'use strict';

/* Filters */

angular.module('rapidScoreFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});


angular.module('rapidScoreFilters', []).filter('range', function() {
    //convert select value to number, return an array with length equals to this number
    return function(val, range) {
        range = parseInt(range);
        for(var i=1; i<=range; ++i){
            val.push(i);
        }
        return val;
    }
});


angular.module('rapidScoreFilters', []).filter('titlelize', function() {
    //convert select value first letter capital
    return function(input) {
      return _.titleize(input);
    };
});
