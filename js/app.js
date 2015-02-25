angular.module('waitstaffMod', ['ngMessages', 'ngRoute'])
  .factory('Data', function () {
    return { 
      cust : {},
      staff : {
        meals : 0,
        tips : 0,
        avgTips : 0 
      },
      compute : function() {
        cust.subtotal = bill.base_price * ((bill.tax_rate/100)+1);
        cust.tip = cust.subtotal * ((bill.tip_percentage/100));
        cust.total = cust.tip + cust.subtotal;
        staff.tips += cust.tip;
        staff.meals++;
        if ( staff.meals > 0 ) {
          staff.avgTips = staff.tips/staff.meals;
        }   
      },
      submit : function() { 
        if(mealDetails.$submitted && mealDetails.$valid && !(mealDetails.$pristine)) {
            compute();
        }
      },
      cancel : function() {  
        mealDetails.$setPristine();
        bill = {};
      },
      reset : function() {
        mealDetails.$setPristine();
        bill = {};
        cust = {};
        staff.meals = 0;
        staff.tips = 0;
        staff.avgTips = 0;
      }
    };
  })
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
      templateUrl : 'home.html'
    }).when('/new-meal', {
      templateUrl : 'new-meal.html',
      controller: 'newMealCtrl'
    }).when('/my-earnings', {
      templateUrl : 'my-earnings.html',
      controller: 'earningsCalc'
    });
  }])
  .controller('newMealCtrl', ['$scope', 'Data', function($scope, Data) {
    $scope.Data = Data;
  }])
  .controller('earningsCalc', ['$scope', 'Data', function($scope, Data) {
    $scope.Data = Data;
  }]);







