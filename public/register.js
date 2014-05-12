window.onload = function() {

var sendButton = document.getElementById("submit");
var username=document.getElementById("username");
var password=document.getElementById("password");
var repassword=document.getElementById("re-password");

sendButton.onclick = function() {
        if((username.value == "" || password.value=="" || repassword.value=="") || (password.value!==repassword.value)) {
            alert("Please enter all fields correctly");
			return false;
        } 
		else {
				location.href="http://localhost:3700/users";
        }
    };



}