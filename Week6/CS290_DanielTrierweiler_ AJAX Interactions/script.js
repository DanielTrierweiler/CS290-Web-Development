var apiKey = "953e8fa143c4b09c24ec63df279ec9fa";

document.addEventListener('DOMContentLoaded', runForms);

function runForms() {
  document.getElementById("Submit1").addEventListener("click", function(event){
    var req = new XMLHttpRequest();
    var keyName = "";

    if (document.getElementById("zip").value === "") {
      keyName = "q=" + document.getElementById("city").value;

    } else {
      keyName = "zip=" + document.getElementById("zip").value;
    }
    req.open("GET", "http://api.openweathermap.org/data/2.5/weather?" + keyName + "&units=imperial" + "&appid=" + apiKey, true);
    req.addEventListener("load", function(){
      if (req.status >= 200 && req.status < 400) {    
	document.getElementById("city").value = "";
	document.getElementById("zip").value = "";

        var response = JSON.parse(req.responseText);
        document.getElementById("displayCity").textContent = response.name + ", " + response.sys.country;
        document.getElementById("displayTemp").textContent = response.main.temp + " Fahrenheit";
        document.getElementById("displayDescription").textContent = response.weather[0].description;
      }
    })
    req.send();
    event.preventDefault();
  })

  document.getElementById("Submit2").addEventListener("click", function(event){
    var req = new XMLHttpRequest();
    var sendPost = {userText:null};
   
    sendPost.userText = document.getElementById("userText").value;
    req.open("POST", "http://httpbin.org/post", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener("load", function(){
      if (req.status >= 200 && req.status < 400) {    
	document.getElementById("userText").value = "";

	var response = JSON.parse(req.responseText);	
        document.getElementById("sent").textContent = sendPost.userText;
        document.getElementById("data").textContent = JSON.parse(response.data).userText;
        document.getElementById("response").textContent = JSON.stringify(response);
      }
    })
    req.send(JSON.stringify(sendPost));
    event.preventDefault();
  })
}

	