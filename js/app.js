
angular.module('waitstaffMod', ['ngMessages', 'ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
      templateUrl : 'home.html'
    }).when('/new-meal', {
      templateUrl : 'new-meal.html'
    }).when('/my-earnings', {
      templateUrl : 'my-earnings.html'
    });
  }])
  .controller('newMealCtrl', ['$scope', function($scope) {
    $scope.cust = {};
    $scope.staff = {
      meals : 0,
      tips : 0,
      avgTips : 0 
    };

  $scope.compute = function() {
    $scope.cust.subtotal = $scope.bill.base_price * (($scope.bill.tax_rate/100)+1);
    $scope.cust.tip = $scope.cust.subtotal * (($scope.bill.tip_percentage/100));
    $scope.cust.total = $scope.cust.tip + $scope.cust.subtotal;
    $scope.staff.tips += $scope.cust.tip;
    $scope.staff.meals++;

    if ( $scope.staff.meals > 0 ) {
      $scope.staff.avgTips = $scope.staff.tips/$scope.staff.meals;
    }   
  };

  $scope.submit = function() { 
    console.log(mealDetails);
    if($scope.mealDetails.$submitted && $scope.mealDetails.$valid && !($scope.mealDetails.$pristine)) {
        $scope.compute();
    }
  };

  $scope.cancel = function() {  
    $scope.mealDetails.$setPristine();
    $scope.bill = {};
  };

  $scope.reset = function() {
    $scope.mealDetails.$setPristine();
    $scope.bill = {};
    $scope.cust = {};
    $scope.staff.meals = 0;
    $scope.staff.tips = 0;
    $scope.staff.avgTips = 0;
  };

  }]);

//angular.module('waitstaffMod').controller('mealEntry', ['$scope', function($scope) { 
//
//
//}]);
//
//angular.module('waitstaffMod').controller('earningsCalc', ['$scope', function($scope) { 
//
//
//}]);






