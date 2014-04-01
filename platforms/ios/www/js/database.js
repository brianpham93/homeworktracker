// JavaScript Document

// Wait for PhoneGap to load
var db = null;
var dbCreated = false;
document.addEventListener("deviceready", onDeviceReady, false);
var category = "";
// PhoneGap is ready
//
function onDeviceReady() {
	alert('on device ready');
	db = window.openDatabase("HomeworkTracker", "1.0", "HomeworkTracker", 2000);
	alert('before pop');
	db.transaction(populateDB, errorCB, successCB);
	alert('before get');
}


function getDeadlines(tx){
	var sql = "select distinct cName from COCKTAIL where cCategory = '"+category+"'";
	tx.executeSql(sql, [] , getAlcohol_success);
}

function getAlcohol_success(tx, results){
	//alert('get alcohol success');
	var len = results.rows.length;
	//alert(len);
	for (var i=0; i<len; i++){
		var alcohol = results.rows.item(i);
		//alert('before append');
		$('#itemList').append('<li><a href="location.html?name=' + alcohol.cName + '&category='+category+'"><p>' + alcohol.cName + '</p></li>');
	}
	
	alert('before append');
}
// Populate the database 
//
function populateDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS deadlines (id varchar(10) primary key, description varchar(500), class varchar(50), duedate date, duetime time, type varchar(50), additionalInfo varchar(200))');
	 dbCreated = true;
}

// Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
function successCB() {
	alert('success');	
}

function insertDeadlineToDB() {
	//alert('insert called');
	alert('insert called');
	db = window.openDatabase("HomeworkTracker", "1.0", "HomeworkTracker", 2000);
	//alert('before pop');
	db.transaction(populateDB, errorCB, successCB);
	db.transaction(function(tx){		 
		var id = randomString(5);
		alert(id);
		var description = document.getElementById("shortDescription").value;
		alert(description);
		var class = document.getElementById("class").value;
		alert(class);
		var dueDate = document.getElementById("dueDate").value;
		alert(dueDate);
		var dueTime = document.getElementById("dueTime").value;
		alert(dueTime);
		var type = document.getElementById("type").value;
		alert(type);
		var additionalInfo = document.getElementById("additionalInfo").value;
		alert(type);
		tx.executeSql('INSERT INTO deadlines (id, description, class, dueDate, dueTime, type, additionalInfo) VALUES (?,?,?,?,?,?,?)',[id,description,class,dueDate, dueTime, type, additionalInfo],successCB, errorCB);
		alert(tx);
   });
}


// JavaScript Document