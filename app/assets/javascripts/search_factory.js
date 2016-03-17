search.factory('searchFactory',function(){

var factory={}
	var div = document.getElementById('div-search-data');
var search_results=$.parseJSON(div.getAttribute("data-item"));
var response={}
 var search_results= [];
	/*factory.getresults=function(searchtext){
	alert(searchtext)
	var data=({'qterm':searchtext})
response=$.ajax({
    	url: "/search/get_search_results",
    	type: "get",
    	data: data,
	 	success: function(res) { 
		alert(res)
		return res                
            },
             error: function() {		 	
               alert("error")
            }    
  });
  return response
}*/


function sleep(milliseconds) {
	
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


	factory.getsearchresults=function(searchtext){		
		
		var data = {
		'qterm': searchtext
	}	
		 $.ajax({
			url: "/search/get_search_results",
			type: "get",
			data: data,
			async:false,
			success: function(res){	
					
				search_results = res	
							
			},
			error: function(){
				alert("error")
			}
		}).done(function() {

		 
});		


	
 return search_results	
}
	
	 	
	
return factory;
})

