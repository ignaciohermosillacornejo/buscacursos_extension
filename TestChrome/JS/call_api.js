url = "http://private-c9944e-buscacursos.apiary-mock.com/";

function call_api(call,callback){
 	
 	$.getJSON(url+call, function (result) {
	    callback(result);
	}); 
 	
 };

function open_dialog(sigla){
	var newDiv = $(document.createElement('div')); 
	call_api("curso/reviews", function(result){
 	result.data.review.forEach(function(element){
 		var review = $(document.createElement('h1')); 
 		review.html(element.texto);
 		newDiv.append(review);
 	}); 	
 	newDiv.dialog();
 	newDiv.dialog( "option", "title", result.data.curso.sigla+" - "+result.data.curso.nombre );
	newDiv.dialog( "option", "modal", true );	

 }); 
}
