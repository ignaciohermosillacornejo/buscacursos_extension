url = "http://private-c9944e-buscacursos.apiary-mock.com/";

function call_api(call,callback){

 	$.getJSON(url+call, function (result) {
	    callback(result);
	});

 };

function handleSubmit(){
  //var formAux = $("newCommentForm");
  //alert(formAux.children(".field_comentario").value);
  var textAux = document.getElementById("field_comentario").value;
  alert(textAux);
  console.log("you have submit a comment");
};

function open_dialog(id){
	var content = $("#BC"+id).parent();
	titulo = content.children("td:nth-child(2)").attr("title");
	// sigla = titulo.slice(1,titulo.indexOf(" "));
	// nombre =  titulo.slice(titulo.indexOf(" "), titulo.lenght);
	// seccion = content.children("td:nth-child(5)").text();
	// info = {"titulo":titulo, "sigla":sigla,"nombre":nombre,"seccion":seccion};

	//Creamos la ventada de dialogo
	var BC_dialog = $(document.createElement('div'));
	BC_dialog.dialog({
		width: "50%",
		modal: true,
		height: "200",
		title: titulo
	});

  

  
  	var comments_seccion = $(document.createElement('div'));
  	$(comments_seccion).attr('class',"comment-seccion");
  //Agregar todos los reviews
	call_api("curso/reviews", function(result){
 	result.data.review.forEach(function(element){
 		var review = $(document.createElement('div'));
 		review.html(element.texto);
 		comments_seccion.append(review);
 		//TODO ---- Agregar el boton de eliminar con la ID de la review
 	}); 

 	BC_dialog.append(comments_seccion);

 	//add comment form
  	var commentForm = add_comment_form();

  //add commentbox
  	BC_dialog.append(commentForm);	

 });
}

function add_comment_form(){

  //Elemento FORM
    var commentForm = $(document.createElement('form'));
    $(commentForm).attr('id', "newCommentForm");
  

  //Label de comentario
  	var commentLabel = $(document.createElement('label'));
  	commentLabel.html("Nueva Review:");

  //input comentario
  	var commentText = $(document.createElement('input'));
  	$(commentText).attr('type', "text");
  	$(commentText).attr('id', "field_comentario");
  	$(commentText).attr('placeholder', "Ingrese comentario");
  	$(commentText).attr('class',"text ui-widget-content ui-corner-all");


  //submit button of the comment
  	var commentSubmit = $(document.createElement('button'));
  	$(commentSubmit).attr('onclick', "handleSubmit()");
  	$(commentSubmit).attr('id', "button_comentario")
  	$(commentSubmit).attr('type', "button");
  	commentSubmit.html("Enviar");

  //add elements to element comment
  	commentForm.append(commentLabel);
  	commentForm.append(commentText);
  	commentForm.append($(document.createElement('br')));
  	commentForm.append(commentSubmit);

  	return commentForm;
}
