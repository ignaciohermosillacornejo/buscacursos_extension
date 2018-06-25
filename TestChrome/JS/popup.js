'use strict';
var redirectUri = chrome.identity.getRedirectURL('callback');
var redirectRe = new RegExp(redirectUri + '[#\?](.*)');
var oauth_token = null;
//var serverURL = 'http://localhost:3000/';
var serverURL = 'http://buscacursos.herokuapp.com/';
var apiURL = serverURL + 'login/authorize?redirect_uri=' + encodeURIComponent(redirectUri);
let login = document.getElementById('LoginGoogle');
let logout = document.getElementById('LogOut');


login.onclick = function (element) {
    chrome.identity.launchWebAuthFlow({
        url: apiURL,
        interactive: true
    },
        function (redirectUri) {
            if (redirectUri) {
                var url = new URL(redirectUri);
                var token = url.searchParams.get("access_token");
                //oauth_token = token;
                var matches = redirectUri.match(redirectRe);
                chrome.storage.sync.set({ 'oauth_token': token }, function (data) {
                    console.log("oauth_token stored on local database");
                });
            }
        }
    );
};

logout.onclick = function (element){
    chrome.storage.sync.set({ 'oauth_token': "" }, function (data) {
        console.log("oauth_token deleted");
    });
}

function retrieveToken() {
    chrome.storage.sync.get(['oauth_token'], function (result) {
        console.log(result.oauth_token);
    });
};