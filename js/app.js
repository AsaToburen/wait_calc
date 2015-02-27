angular.module('waitstaffMod', ['ngMessages', 'ngRoute', 'ngAnimate'])
  .factory('Data', function () {
    return { 
      cust : {},
      staff : {
        meals : 0,
        tips : 0,
        avgTips : 0 
      },
      compute : function() {
        this.cust.subtotal = this.bill.base_price * ((this.bill.tax_rate/100)+1);
        this.cust.tip = this.cust.subtotal * ((this.bill.tip_percentage/100));
        this.cust.total = this.cust.tip + this.cust.subtotal;
        this.staff.tips += this.cust.tip;
        this.staff.meals++;
        if ( this.staff.meals > 0 ) {
          this.staff.avgTips = this.staff.tips/this.staff.meals;
        }
      },
      submit : function() { 
        if(this.mealDetails.$submitted && this.mealDetails.$valid && !(this.mealDetails.$pristine)) {
            this.compute();
        }   
      },
      cancel : function() {  
        this.mealDetails.$setPristine();
        this.bill = {};
      },

      reset : function() {
        this.bill = {};
        this.cust = {};
        this.staff.meals = 0;
        this.staff.tips = 0;
        this.staff.avgTips = 0;
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
    }).when('/error', {
        template : '<p>Error Page Not Found</p>'
    })
        .otherwise({
            redirectTo : '/error'
        });
  }])
  .run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
      $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 500);
    });
  })
  .controller('newMealCtrl', ['$scope', 'Data', function($scope, Data) {
    $scope.Data = Data;
    
  }])
  .controller('earningsCalc', ['$scope', 'Data', function($scope, Data) {
    $scope.Data = Data;
  }]);







