var search = angular.module("search_app", ['ngRoute','angularUtils.directives.dirPagination']);

search.config(['$routeProvider', function($routeProvider){
	
	$routeProvider.when("/search", {		
		templateUrl: '../assets/search.html',
		controller: "searchresultscontroller"
	}).when("/search_results/:searchtext", {		
		templateUrl: '../assets/search_results.html',
		controller: "searchresultscontroller"
	})

}])