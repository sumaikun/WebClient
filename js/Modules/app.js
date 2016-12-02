var app = angular.module("Appi",['ngRoute']);
app.config(function ($routeProvider) { 
  console.log($routeProvider);
  $routeProvider
  .when('/Achivements',{      
      templateUrl: 'js/Views/Achivements.html' 
    })    
   
    .otherwise({
      templateUrl: 'js/Views/matriz_page.html' 
    });
});