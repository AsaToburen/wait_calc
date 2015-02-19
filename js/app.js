
angular.module('firstModule', [
  'ngMessages'
  ])

  .controller('ctrlOne', ['$scope', function($scope) {
       $scope.cust = {};

    $scope.compute = function() {
      if($scope.mealDetails.$submitted && $scope.mealDetails.$valid && !($scope.mealDetails.$pristine)) {
        $scope.cust.subtotal = $scope.bill.base_price * (($scope.bill.tax_rate/100)+1);
        $scope.cust.tip = $scope.cust.subtotal * (($scope.bill.tip_percentage/100));
        $scope.cust.total = $scope.cust.tip + $scope.cust.subtotal;
      }
    };


    $scope.submit = function() { 
      if($scope.mealDetails.$submitted && $scope.mealDetails.$valid && !($scope.mealDetails.$pristine)) {
        $scope.compute();
      }
    };

    $scope.cancel = function() {
      console.log('cancel works');
      $scope.bill = {};
      $scope.mealDetails.$setPristine();
    };




  }]);



