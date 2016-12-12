var app = angular.module("Appi",['ngRoute','chieffancypants.loadingBar', 'ngAnimate']);
app.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
  });
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
