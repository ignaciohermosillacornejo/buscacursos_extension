url = "http://private-c9944e-buscacursos.apiary-mock.com/";
var token;
var request_timer = 0;

function call_api(ext, data, type,callback){

 	//$.getJSON(url+call, function (result) {
	 //   callback(result);
	//});
	if(token){
		request_token();
	}

	$.ajax({
	   url: url+ext,
	   type: type,
	   contentType:'application/json',
	   headers:{
	   		"Authorization": token
	   },
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


function get_token(event){	
	if(request_timer>1){
		token = event.data.text;
		remove_list();
	}
	request_timer++;
}

function request_token(){
	request_timer = 0;
	window.postMessage({ type: 'page_js_type',
                         text: ""},
                       '*' /* targetOrigin: any */);
	window.addEventListener('message',get_token);
	
}

function remove_list(){
	window.removeEventListener('message',get_token);
}


function handleSubmit(){
  var newText = document.getElementById("field_comentario").value;

  var course = $(".invisible");

  var newReview = {
    "course":  {
      "nombre": course.attr("nombre"),
      "number": course.attr("sigla")
    },
    "content": newText
  };

  call_api('reviews', newReview, 'POST', function(result){
    add_review(result.data[0].reviews[0]);
  });

  document.getElementById("field_comentario").value = "";
}

function handleEdit(review_id){
	var reviewEdit = document.getElementById("field_comentario").value;
	data = {"content" : reviewEdit};
	call_api("review/"+review_id, data, 'PUT', function(result){
		$("#comment"+review_id).remove();
		add_review(result.data[0].reviews[0]);
	});

	$("#newCommentForm").empty();
	var commentForm = add_comment_form();
	$("#newCommentForm").append(commentForm);

}

function delete_review(review_id){
	data ={};
	call_api("review/"+review_id, data, 'DELETE', function(result){
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
  	$(commentSubmit).attr('onclick', "handleEdit("+review_id+")");
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
	sigla = titulo.slice(0,titulo.indexOf(" "));
	nombre =  titulo.slice(titulo.indexOf(" "), titulo.lenght);
	seccion = content.children("td:nth-child(5)").text();
	info = {};

	var invisible = $(document.createElement('courseInfo'));
	$(invisible).attr('sigla', sigla);
	$(invisible).attr('nombre', nombre);
	$(invisible).attr('seccion', seccion);
	//$(invisible).attr('profesor', profesor);
	//$(invisible).attr('sala', sala);

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
	call_api("courses/"+sigla, info, 'GET', function(result){
 		result.data[0].reviews.forEach(function(element){
	 		add_review(element);
	 	}); 

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

function add_review(element){
	var review = $(document.createElement('div'));
	$(review).attr('id', "comment"+element.id);
	$(review).attr('url', element.url);
	review.html(element.content);

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
