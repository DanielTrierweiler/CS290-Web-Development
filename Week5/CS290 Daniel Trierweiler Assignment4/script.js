function showTable() {
  var column = 1;
  var row = 1;

  function createTable(cb) {
    var body = document.body;
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    table.style.width = '100%';
    table.style.border = "1px solid";  

    for (var i = 0; i < 4; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 4; j++) {
        if (i === 0) {
          var th = document.createElement('th');
          th.appendChild(document.createTextNode("Header " + (j + 1)));
	  th. style.border = "1px solid";  
          tr.appendChild(th);
        } else {
          var td = document.createElement('td');
          var tdID = (j + 1) + "," + i;
          td.appendChild(document.createTextNode(tdID));
          td.setAttribute('id', tdID);
          
          if (j === 0 && i === 1) {
            td.style.border = "3px solid";  
          } else {
            td.style.border = "1px solid";
          }

	  tr.appendChild(td);
        }
      }
      tableBody.appendChild(tr);
    }
    table.appendChild(tableBody);
    body.appendChild(table);
    cb();
  }

  function createButtons() {
     var tableBody = document.body;
     var buttonNames = ["Up", "Down", "Left", "Right", "Mark Cell"];

     for (var i = 0; i < buttonNames.length; i++) {
        var button = document.createElement('button');
        button.appendChild(document.createTextNode(buttonNames[i]));
        tableBody.appendChild(button);
        button.addEventListener("click", function(e) {
                                           if (e.target.innerText !== "Mark Cell") {
                                             moveCell(e.target.innerText);
                                           } else {
                                             markCell();
                                           }
                                         });
     }
  }

  createTable(createButtons);

  function moveCell(move) {
     var cellID = row + "," + column;
     var cell = document.getElementById(cellID);
     cell.style.border = "1px solid";

     if (move === "Up"){
       if (column !== 1) {
         column--;
       }
     } else if (move === "Down") {
       if (column !== 3) {
         column++;
       }
     } else if (move === "Left") {
       if (row !== 1) {
         row--;
       }
     } else if (move === "Right") {
       if (row !== 4) {
         row++;
       }
     }

     cellID = row + "," + column;
     cell = document.getElementById(cellID);
     cell.style.border = "3px solid";
  }

  function markCell() {
     var cell = document.getElementById(row + "," + column);
     cell.style.backgroundColor = "Orange";
  }

};

showTable();