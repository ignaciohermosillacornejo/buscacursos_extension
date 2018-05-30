//Agregando los links dinamicos a las imagenes de la extension inyectando css.

addStyleString('.ui-icon, .ui-widget-content .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_444444_256x240.png")+'");}');
addStyleString('.ui-icon, .ui-widget-header .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_444444_256x240.png")+'");}');
addStyleString('.ui-state-hover .ui-icon, .ui-state-focus .ui-icon, .ui-button:hover .ui-icon, .ui-button:focus .ui-icon {background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_555555_256x240.png")+'");}');
addStyleString('.ui-state-active .ui-icon, .ui-button:active .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_ffffff_256x240.png")+'");}');
addStyleString('.ui-state-highlight .ui-icon,.ui-button .ui-state-highlight.ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_777620_256x240.png")+'");}');
addStyleString('.ui-state-error .ui-icon, .ui-state-error-text .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_cc0000_256x240.png")+'");}');
addStyleString('.ui-button .ui-icon { background-image: url("'+chrome.extension.getURL("JS/jqueryui/images/ui-icons_777777_256x240.png")+'");}');
addStyleString('#button_delete { background-image: url("'+chrome.extension.getURL("images/icon_delete.png")+'")}');
addStyleString('#button_edit { background-image: url("'+chrome.extension.getURL("images/icon_edit.png")+'")}');
addStyleString('#button_like { background-image: url("'+chrome.extension.getURL("images/icon_like.png")+'")}');
addStyleString('#button_liked { background-image: url("'+chrome.extension.getURL("images/icon_liked.png")+'")}');
addStyleString('#button_flag { background-image: url("'+chrome.extension.getURL("images/icon_flag.png")+'")}');