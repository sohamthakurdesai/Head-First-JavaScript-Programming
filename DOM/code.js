var access = document.getElementById("code9");
var code = access.innerHTML;
code = code + " midnight";
access.innerHTML = "I sleep at";
alert(code);
code = access.innerHTML + " midnight";
alert("Thus " + code);