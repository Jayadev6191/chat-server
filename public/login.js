window.onload = function() {

var sendButton = document.getElementById("submit");
var username=document.getElementById("username");
var password=document.getElementById("password");

sendButton.onclick = function() {
        if(username.value == "") {
            alert("Please type your name!");
        } else {
            location.href="http://localhost:3700/chat";
        }
    };



}