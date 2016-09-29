var app = angular.module("Appi",['ngRoute']);
app.config(function ($routeProvider) { 
  console.log($routeProvider);
  $routeProvider    
    .when('/Main',{ 
      controller: 'PageController', 
      templateUrl: 'js/Views/main_page.html' 
    })
    .when('/',{ 
      controller: 'UserController', 
      templateUrl: 'index.html' 
    })    
    .otherwise({
      redirectTo: '/'
    });
});