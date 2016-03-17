
search.controller("searchresultscontroller", function($scope,searchFactory,$http,$routeParams) {

	$scope.update = function(searchtext){
		$scope.search_results = searchFactory.getsearchresults(searchtext)		
		$scope.templateURL = '../assets/search_results.html';
	}

});
