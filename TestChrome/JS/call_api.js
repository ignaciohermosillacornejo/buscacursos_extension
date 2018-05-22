url = "http://private-c9944e-buscacursos.apiary-mock.com/";

function call_api(ext, data, type,callback){

	$.ajax({
	   url: url+ext,
	   type: type,
	   contentType:'application/json',
	   data: JSON.stringify(data),
	   dataType:'json',
	   success: function(data){
	     //On ajax success do this
	     callback(data);
	      },
	   error: function(xhr, ajaxOptions, thrownError) {
	      //On error do this
	        if (xhr.status == 200) {

	            alert(ajaxOptions);
	        }
	        else {
	            alert(xhr.status);
	            alert(thrownError);
	        }
	    }
	});

 };

function handleSubmit(){
  var newText = document.getElementById("field_comentario").value;

  var course = $(".invisible");

  var newReview = {
    "curso":  {
      "nombre": course.attr("nombre"),
      "sigla": course.attr("sigla"),
      "seccion": course.attr("seccion"),
      "profesor": course.attr("profesor"),
      "sala": course.attr("sala")
    },
    "texto": newText,
    "auth_token": "hd2s09fR32FdS"
  };

  call_api('curso/reviews', newReview, 'POST', function(result){
    add_review(result.data.review);
  });

  document.getElementById("field_comentario").value = "";
}


function handleEdit(){
	var textAux = document.getElementById("field_comentario").value;
 	alert(textAux);
}

function delete_review(review_id){
	data ={"review_id":review_id, "auth_token": "hd2s09fR32FdS"};
	call_api("curso/reviews", data, 'DELETE', function(result){
		$("#comment"+review_id).remove();
	});
}

function edit_review(review_id){
	//Elemento FORM
    $("#newCommentForm").empty();
    text = $("#comment"+review_id).text();

  //Label de comentario
  	var commentLabel = $(document.createElement('label'));
  	commentLabel.html("Editar Review:");

  //input comentario
  	var commentText = $(document.createElement('input'));
  	$(commentText).attr('type', "text");
  	$(commentText).attr('id', "field_comentario");
  	$(commentText).attr('class',"text ui-widget-content ui-corner-all");


  //submit button of the comment
  	var commentSubmit = $(document.createElement('button'));
  	$(commentSubmit).attr('onclick', "handleEdit()");
  	$(commentSubmit).attr('id', "button_comentario")
  	$(commentSubmit).attr('type', "button");
  	commentSubmit.html("Editar");

  //add elements to element comment
  	$("#newCommentForm").append(commentLabel);
  	$("#newCommentForm").append(commentText);
  	$("#newCommentForm").append($(document.createElement('br')));
  	$("#newCommentForm").append(commentSubmit);
  	$("#field_comentario").val(text);

}

function open_dialog(id){
	var content = $("#BC"+id).parent();
	titulo = content.children("td:nth-child(2)").attr("title");
	sigla = titulo.slice(1,titulo.indexOf(" "));
	nombre =  titulo.slice(titulo.indexOf(" "), titulo.lenght);
	seccion = content.children("td:nth-child(5)").text();
  profesor = content.children("td:nth-child(9)").children("a").first().text();
  sala = "A7";

  info = {"sigla":sigla};

  var invisible = $(document.createElement('courseInfo'));
  $(invisible).attr('sigla', sigla);
  $(invisible).attr('nombre', nombre);
  $(invisible).attr('seccion', seccion);
  $(invisible).attr('profesor', profesor);
  $(invisible).attr('sala', sala);


	//Creamos la ventada de dialogo
	var BC_dialog = $(document.createElement('div'));
	BC_dialog.dialog({
		width: "50%",
		modal: true,
		height: "200",
		title: titulo
	});

  BC_dialog.append(invisible);

  var comments_seccion = $(document.createElement('div'));
  $(comments_seccion).attr('class',"comment-seccion");
  BC_dialog.append(comments_seccion);

  //Agregar todos los reviews
  call_api("curso/reviews", info, 'GET', function(result){
   		result.data.review.forEach(function(element){
        add_review(element);
      });


 	//add comment form
  var commentForm = add_comment_form(info);

  //add commentbox
  BC_dialog.append(commentForm);
});
}



function add_review(element){
  var review = $(document.createElement('div'));
  $(review).attr('id', "comment"+element.id);
  review.html(element.texto);

	  //Agregar boton para editar
	  var editReview = $(document.createElement('button'));
	    $(editReview).attr('onclick', "edit_review("+element.id+")");
	    $(editReview).attr('id', "button_edit")
	    $(editReview).attr('type', "button");

  //Agregar boton para eliminar
  var deleteReview = $(document.createElement('button'));
    $(deleteReview).attr('onclick', "delete_review("+element.id+")");
    $(deleteReview).attr('id', "button_delete");
    $(deleteReview).attr('type', "button");

		review.append(editReview);
    review.append(deleteReview);
    $(".comment-seccion").append(review);
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
    commentForm.append($(document.createElement('br')));
  	commentForm.append(commentText);
  	commentForm.append($(document.createElement('br')));
  	commentForm.append(commentSubmit);

  	return commentForm;
}
