'use strict';

/* Filters */

angular.module('rapidScoreFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
