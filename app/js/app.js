'use strict';

/* App Module */

var budgetApp = angular.module('budgetApp', [
  'ngRoute',
  'budgetControllers'
]);

budgetApp.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.
      when('/accounts', {
        templateUrl: 'partials/account-list.html',
        controller: 'AccountListCtrl'
      }).
      when('/accounts/:accountId', {
        templateUrl: 'partials/account-detail.html',
        controller: 'AccountDetailCtrl'
      }).
      otherwise({
        redirectTo: '/accounts'
      });
  }]);