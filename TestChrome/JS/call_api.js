url = "http://private-c9944e-buscacursos.apiary-mock.com/";

function call_api(call,callback){

 	$.getJSON(url+call, function (result) {
	    callback(result);
	});

 };

function built() {

}

function handleSubmit(){
  //var formAux = $("newCommentForm");
  //alert(formAux.children(".field_comentario").value);
  var textAux = document.getElementById("field_comentario").value;
  alert(textAux);
  console.log("you have submit a comment");
};

function open_dialog(sigla){
	var newDiv = $(document.createElement('div'));

  //element comment
    var commentForm = $(document.createElement('form'));
    $(commentForm).attr('id', "newCommentForm");
  //$(commentForm).attr('method', "POST");
  //$(commentForm).attr('onsubmit',"handleSubmit()");

  //input comment
  var textLabel = $(document.createElement('label'));
  $(textLabel).attr('for',"comentario");
  textLabel.html("Comentario");
  var commentText = $(document.createElement('input'));
  $(commentText).attr('type', "text");
  $(commentText).attr('id', "field_comentario");
  $(commentText).attr('placeholder', "Ingrese comentario");
  $(commentText).attr('class',"text ui-widget-content ui-corner-all");


  //submit button of the comment
  var commentSubmit = $(document.createElement('button'));
  $(commentSubmit).attr('onclick', "handleSubmit()");
  $(commentSubmit).attr('type', "button");
  commentSubmit.html("Comentario");


  //add elements to element comment
  commentForm.append(textLabel);
  commentForm.append($(document.createElement('br')));
  commentForm.append(commentText);
  commentForm.append($(document.createElement('br')));
  commentForm.append(commentSubmit);
  //add commentbox
  newDiv.append(commentForm);

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
