//url = "http://private-c9944e-buscacursos.apiary-mock.com/";
url = "http://localhost:3000/"
var token;
var request_timer = 0;

function call_api(ext, data, type,callback){

 	//$.getJSON(url+call, function (result) {
	 //   callback(result);
	//});

	request_token();


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
	        if (xhr.status == 401) {

	            alert("Acceso No Autorizado, iniciar sesion con una cuenta @uc.cl");
	        }
	        if (xhr.status == 400) {

	            alert("Error: Header Invalido");
	        }
	        if (xhr.status == 501) {

	            alert("Funcionalidad aún no implementada");
	        }
	        if (xhr.status == 422) {

	            alert("Error: Review Invalido");
	        }
	        if (xhr.status == 404){
	        	throw "no reviews found";
	        }
	        else {
	            //alert(xhr.status);
	            //alert(thrownError);
	        }
	    }
	});

 };


function get_token(event){
	if(request_timer>15){
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
    add_review(result.data.reviews[0]);
  });

  document.getElementById("field_comentario").value = "";
}

function handleEdit(review_id){
	var reviewEdit = document.getElementById("field_comentario").value;
	data = {"content" : reviewEdit};
	call_api("reviews/"+review_id, data, 'PUT', function(result){
		$("#comment"+review_id).remove();
		add_review(result.data.reviews[0]);
	});

	$("#newCommentForm").empty();
	var commentForm = add_comment_form();
	$("#newCommentForm").append(commentForm);

}

function handleReport(review_id){
	var reviewReport = document.getElementById("field_report").value;
	data = {"content" : reviewReport};

	call_api("reviews/"+review_id+"/report", data, 'POST', function(result){
		//change icon
		$(".flag"+review_id).attr('id', "button_flaged");
	});

	// placeholder for apiary
	// call_api("review/"+"1"+"/report", data, 'PUT', function(result){
	// 	//change icon
	// 	$(".flag"+review_id).attr('id', "button_flaged");
	// });

	$("#newCommentForm").empty();
	var commentForm = add_comment_form();
	$("#newCommentForm").append(commentForm);
}

function delete_review(review_id){
	data ={};
	call_api("reviews/"+review_id, data, 'DELETE', function(result){
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

function flag_report(review_id){
	//get flag of review with class of the flag
	element = $(".flag"+review_id);

	//check if flag active or not (only continue if "button_flag")
	if(element.attr('id') == "button_flag"){

		//empty comment of form
		$("#newCommentForm").empty();

		//Label report
		var reportLabel = $(document.createElement('label'));
		reportLabel.html("Motivo reporte:");

		//input report
		var reportText = $(document.createElement('input'));
		$(reportText).attr('type', "text");
		$(reportText).attr('id', "field_report");
		$(reportText).attr('class',"text ui-widget-content ui-corner-all");

		//submit button of the report
		var reportSubmit = $(document.createElement('button'));
		$(reportSubmit).attr('onclick', "handleReport("+review_id+")");
		$(reportSubmit).attr('id', "button_report")
		$(reportSubmit).attr('type', "button");
		reportSubmit.html("Reportar");

		//add elements to element report
		$("#newCommentForm").append(reportLabel);
		$("#newCommentForm").append(reportText);
		$("#newCommentForm").append($(document.createElement('br')));
		$("#newCommentForm").append(reportSubmit);
	}
}

function like_review(review_id){
	//total = $("#like"+review_id).
	element = $("#like"+review_id);
	if(element.children("button").attr('id') == "button_like"){
		call_api("review/"+review_id+"/like", "{}" ,'POST', function(result){
			total = parseInt(element.children().first().html());
			total++;
			element.children("button").attr('id', "button_liked");
			element.children().first().html(total);
		});
	} else{
		call_api("review/"+review_id+"/like", "{}" ,'DELETE', function(result){
			total = parseInt(element.children().first().html());
			total--;
			element.children("button").attr('id', "button_like");
			element.children().first().html(total);
		});
	}
}


function open_dialog(id){
	if(document.getElementById('dialog_buscacursos')){
		$('#dialog_buscacursos').remove();
	}

	var content = $("#BC"+id).parent();
	titulo = content.children("td:nth-child(2)").attr("title");
	sigla = titulo.slice(0,titulo.indexOf(" "));
	nombre =  titulo.slice(titulo.indexOf(" ")+1, titulo.lenght);
	seccion = content.children("td:nth-child(5)").text();
	info = {};

	var invisible = $(document.createElement('courseInfo'));
	//Ejemplo: $(objeto).attr('nombre_attr', valor)
	$(invisible).attr('class', "invisible")
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
		height: "400",
		title: titulo
	});
	BC_dialog.dialog('widget').attr('id', 'dialog_buscacursos');

	BC_dialog.append(invisible);

	var comments_seccion = $(document.createElement('div'));
	$(comments_seccion).attr('class',"comment-seccion");
	BC_dialog.append(comments_seccion);

  //Agregar todos los reviews
  try{
  	call_api("courses/"+sigla, info, 'GET', function(result){
 		result.data.reviews.forEach(function(element){
	 		add_review(element);
	 	});
	 	if(BC_dialog.children("#newCommentForm").length == 0){
	 		//add comment form
		  	var commentForm = add_comment_form();
		  	//add commentbox
		  	BC_dialog.append(commentForm);
		 	}
	});
  }
  finally{
  		if(comments_seccion.children().length == 0){
  			var BC_error = $(document.createElement('div'));
	  		$(BC_error).attr('class',"no_reviews_error");
	  		$(BC_error).text("No hay reviews para este curso");
	  		comments_seccion.append(BC_error);
	  		//add comment form
		  	var commentForm = add_comment_form();
		  	//add commentbox
		  	BC_dialog.append(commentForm);
  		}
  }

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

	//Agregar boton like
	var likeArea = $(document.createElement('label'));
	$(likeArea).attr('id', "like"+element.id);
	$(likeArea).attr('class', "like_area");
	likeArea.html("<label>"+element.like_total+"</label>");
	var likeReview = $(document.createElement('button'));
	$(likeReview).attr('onclick', "like_review("+element.id+")");
	if(element.liked){
		$(likeReview).attr('id', "button_liked")
	}
	else{
		$(likeReview).attr('id', "button_like")
	}

	$(likeReview).attr('type', "button");
	likeArea.append(likeReview);

	//Agregar boton para reportar
	var flagReview = $(document.createElement('button'));
	$(flagReview).attr('class',"flag"+element.id);
	//$(flagReview).attr('flag_id',"flag"+element.id);
	$(flagReview).attr('onclick', "flag_report("+element.id+")");
	$(flagReview).attr('type', "button");
	if(element.reported){
		$(flagReview).attr('id', "button_flaged");
	}
	else{
		$(flagReview).attr('id', "button_flag");
	}

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


	review.append(deleteReview);
	review.append(flagReview);
	review.append(editReview);
	review.append(likeArea);

	$(".no_reviews_error").remove();
	$(".comment-seccion").append(review);
}
