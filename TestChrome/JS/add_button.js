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

$(document).ready(function() {
var path = chrome.extension.getURL("JS/jqueryui/jquery-ui.min.css");
$('head').append($('<link>')
    .attr("rel","stylesheet")
    .attr("type","text/css")
    .attr("href", path));
});


inyect_scripts("JS/jquery.js");
inyect_scripts("JS/jqueryui/jquery-ui.min.js");


function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

//Agregando los links dinamicos a las imagenes de la extension inyectando css.
addStyleString('.ui-icon, .ui-widget-content .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_444444_256x240.png")+'");}');
addStyleString('.ui-icon, .ui-widget-header .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_444444_256x240.png")+'");}');
addStyleString('.ui-state-hover .ui-icon, .ui-state-focus .ui-icon, .ui-button:hover .ui-icon, .ui-button:focus .ui-icon {background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_555555_256x240.png")+'");}');
addStyleString('.ui-state-active .ui-icon, .ui-button:active .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_ffffff_256x240.png")+'");}');
addStyleString('.ui-state-highlight .ui-icon,.ui-button .ui-state-highlight.ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_777620_256x240.png")+'");}');
addStyleString('.ui-state-error .ui-icon, .ui-state-error-text .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_cc0000_256x240.png")+'");}');
addStyleString('.ui-button .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_777777_256x240.png")+'");}');

inyect_scripts('JS/call_api.js');


//Agregar los botones de BuscaCursos++ a la tabla de resultados
function add_button(content,id){
 	// titulo = $(content).children("td:nth-child(2)").attr("title");
	// sigla = '\''+titulo.slice(1,titulo.indexOf(" "))+'\'';
	// nombre =  titulo.slice(titulo.indexOf(" "), titulo.lenght);
	// seccion = $(content).children("td:nth-child(5)").text();
	// info = {"titulo":titulo, "sigla":sigla,"nombre":nombre,"seccion":seccion};
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