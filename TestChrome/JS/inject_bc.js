 iconURL = chrome.extension.getURL("images/favicon32.png");

//Inyección de los archivos javascript necesarios para los funcionaminetos dentro de la pagina. 
function inyect_scripts(name){
	var s = document.createElement('script');
	s.src = chrome.extension.getURL(name);
	s.onload = function() {
	    this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function inyect() {
  inyect_scripts("JS/jquery.js");
  await sleep(1000); //TODO-- CAMBIAR POR UN CALLBACK
  inyect_scripts("JS/jqueryui/jquery-ui.min.js");
}

inyect();

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

//Inyecta las funcionalidades de BuscaCursos++ a la pagina
inyect_scripts('JS/modal_functions.js');


//Agregar los botones de BuscaCursos++ a la tabla de resultados
function add_button(content,id){
    $(content).append('<td class="iconBC" id="BC'+id+'"><input title="Ver Reviews" type="image" src="'+iconURL+'" onclick="open_dialog('+id+');"/></td>');
 };

var i = 0;
$(document).find('.resultadosRowPar').each(function(){
	add_button(this,i);
	i++;
});
$(document).find('.resultadosRowImpar').each(function(){
	add_button(this,i);
	i++;
});

//Agregar boton para mostras salas en el horairo
$("#divMiHorario").children("div:nth-child(1)").append('<button class="boton_salas botonChico" onclick="mostrar_salas()">Mostrar Salas</button>');


//Busca token del usuario cuando es requerido
window.addEventListener('message', function(event) {
   chrome.storage.sync.get(['oauth_token'], function (result) {
        window.postMessage({ type: 'got_token',
                         text: result.oauth_token},
                       '*' /* targetOrigin: any */);
    });
});


