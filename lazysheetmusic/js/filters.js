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
      if (input!=null) {
        input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
      } else{
        return input;
      }
    };
});

angular.module('rapidScoreFilters', []).filter('nl2br', function() {
    return function(data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
    };
})
