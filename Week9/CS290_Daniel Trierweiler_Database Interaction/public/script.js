function getTable() {

  var req = new XMLHttpRequest();
  req.open("GET","/get-table ", true);
  req.addEventListener("load", function() {
    if (req.status >= 200 && req.status < 400) {
      console.log("table recieved");
      var response = JSON.parse(req.responseText);
      for (i = 0; i < response.length; i++) {
        addRowToTable(response[i]);
      }     
    } else {
      console.log(req.status);
    }
  });
  req.send();
}

getTable();

document.addEventListener('DOMContentLoaded', runButtons);

function runButtons() {
  document.getElementById("add").addEventListener("click", function(event){
    if (document.getElementById("name").value) {
      var query = "name=" + document.getElementById("name").value;  
      query += "&reps=" + document.getElementById("reps").value;
      query += "&weight=" + document.getElementById("weight").value;
      query += "&lbs=" + document.getElementById("lbs").value;
      query += "&date=" + document.getElementById("date").value;

      var req = new XMLHttpRequest();
      req.open("GET", "/insert?" + query, true);
      req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
          console.log("row recieved");
          addRowToTable(JSON.parse(req.responseText)[0]);
        } else {
          console.log(req.status);
        }
      });
      req.send();
      event.preventDefault();
    }
  });

  document.getElementById("reset").addEventListener("click", function(event) {
    var req = new XMLHttpRequest();
    req.open("GET", "/reset-table", true);
    req.addEventListener("load", function() {
      if (req.status >= 200 && req.status < 400) {
        console.log("table reseted");
        window.location.reload();
      }
      else {
        console.log(req.status);
      }
    });
    req.send();
    event.preventDefault();
  });
} 


function runEditButton(currentRow, event) {
  var rowId = currentRow.lastChild.lastChild.lastChild.value;
  
  var sendPost = {name:null, reps:null, weight:null, lbs:null, date:null};
  var rowChildren = currentRow.children;
  var i = 0;
  for (key in sendPost) {
    sendPost[key] = rowChildren[i].children[0].value;
    i++;
  }
  sendPost.id = rowId;
  
  var req = new XMLHttpRequest();
  req.open("POST", "/update", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function() {
    if (req.status >= 200 && req.status < 400) {
      console.log("row updated");
      var response = JSON.parse(req.responseText)[0];
      i = 0;
      for (key in response) {
        rowChildren[i].children[0].value = response[key];
        i++;
      }
    }
    else {
      console.log(req.status);
    }
  });
  req.send(JSON.stringify(sendPost));
  event.preventDefault();
}

function runDeleteButton(currentRow, event) {
  var rowId = currentRow.lastChild.lastChild.lastChild.value;

  var req = new XMLHttpRequest();
  var sendPost = {id : rowId};
  req.open("POST", "/delete", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function() {
    if (req.status >= 200 && req.status < 400) {
        console.log("row deleted");
        var parentNode = currentRow.parentNode;
        parentNode.removeChild(currentRow);
    }
    else {
      console.log(req.status);
    }
  });
  req.send(JSON.stringify(sendPost));

  event.preventDefault();
}
    
function addRowToTable(rowData) {
  var tableBody = document.getElementById("tableBody");
  var newRow = document.createElement("tr");

  for (var key in rowData) { 
    if (key != "id") {
      var newData = document.createElement("td");    
      var newInput = document.createElement("input");
      newInput.setAttribute("type", "text");
      newInput.setAttribute("name", key);
      newInput.setAttribute("value", rowData[key]);
      newData.appendChild(newInput);
      newRow.appendChild(newData); 
    }
  }

  var newData = document.createElement("td");
  var newForm = document.createElement("form"); 

  var editButton = document.createElement("input");
  editButton.setAttribute("type", "submit");
  editButton.setAttribute("name", "edit");
  editButton.setAttribute("value", "Edit");
  editButton.addEventListener("click", function(event) {
    runEditButton(newRow, event);
  });

  var deleteButton = document.createElement("input");
  deleteButton.setAttribute("type", "submit");
  deleteButton.setAttribute("name", "delete");
  deleteButton.setAttribute("value", "Delete");
  deleteButton.addEventListener("click", function(event) {
    runDeleteButton(newRow, event);
  });
  
  var hiddenId = document.createElement("input");
  hiddenId.setAttribute("type", "hidden");
  hiddenId.setAttribute("name", "id");
  hiddenId.setAttribute("value", rowData.id);
 
  newForm.appendChild(editButton);
  newForm.appendChild(deleteButton);
  newForm.appendChild(hiddenId);
  
  newData.appendChild(newForm);
  newRow.appendChild(newData);
  tableBody.appendChild(newRow);
}




