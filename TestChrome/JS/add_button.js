 iconURL = chrome.extension.getURL("images/favicon32.png");

url = "http://private-c9944e-buscacursos.apiary-mock.com/";



var newDiv = $(document.createElement('div')); 

 function call_api(call,callback){
 	
 	$.getJSON(url+call, function (result) {
	    callback(result);
	}); 
 	
 };


 call_api("curso/reviews", function(result){
 	result.data.review.forEach(function(element){
 		var review = $(document.createElement('h1')); 
 		review.html(element.texto);
 		newDiv.append(review);
 	}); 	
 	newDiv.dialog();
 	newDiv.dialog( "option", "title", result.data.curso.sigla+" - "+result.data.curso.nombre );
 });







 function add_button(content, info){
 	titulo = $(content).children("td:nth-child(2)").attr("title");
	sigla = titulo.slice(0,titulo.indexOf(" "));
	nombre =  titulo.slice(titulo.indexOf(" "), titulo.lenght);
	seccion = $(content).children("td:nth-child(5)").text();
	info = {titulo, sigla,nombre,seccion}
    $(content).append('<td class="iconBC"><input title="Ver Reviews" type="image" src="'+iconURL+'" /></td>');

 }

 $(document).find('.resultadosRowPar').each(function(){
 		add_button(this);
   });
  $(document).find('.resultadosRowImpar').each(function(){
  		add_button(this);
   });