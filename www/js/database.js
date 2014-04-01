// JavaScript Document

// Wait for PhoneGap to load
var db = null;
var dbCreated = false;
document.addEventListener("deviceready", onDeviceReady, false);
var category = "";
// PhoneGap is ready
//
function onDeviceReady() {
	db = window.openDatabase("HomeworkTracker2", "2.0", "HomeworkTracker2", 2000);
	db.transaction(populateDB, errorCB, successCB);
}


function getDeadlines(tx){
	var sql = "select distinct cName from COCKTAIL where cCategory = '"+category+"'";
	tx.executeSql(sql, [] , getAlcohol_success);
}

function randomString(L){
    var s= '';
    var randomchar=function(){
    	var n= Math.floor(Math.random()*62);
    	if(n<10) return n; //1-10
    	if(n<36) return String.fromCharCode(n+55); //A-Z
    	return String.fromCharCode(n+61); //a-z
    }
    while(s.length< L) s+= randomchar();
    return s;
}

function saveDeadlineToDB(){
	var dbId = randomString(5);
	alert(dbId);
	var dbDescription = document.getElementById("shortDescription").value;
	alert(dbDescription);
	var dbClass = document.getElementById("class").value;
	alert(dbClass);
	var dbDueDate = document.getElementById("dueDate").value;
	alert(dbDueDate);
	var dbDueTime = document.getElementById("dueTime").value;
	alert(dbDueTime);
	var dbType = document.getElementById("type").value;
	alert(dbType);
	var dbAdditionalInfo = document.getElementById("additionalInfo").value;
	alert(dbAdditionalInfo);
	insertDeadlineToDB(dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo);
	
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
}

// Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
function successCB() {
	alert('success');	
}

function insertDeadlineToDB(dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo) {
	//alert('insert called');
	alert('before populate');
	db.transaction(populateDB, errorCB, successCB);
	alert('before insert');
	db.transaction(function(tx){		 		
		tx.executeSql('INSERT INTO deadlines (id, description, class, dueDate, dueTime, type, additionalInfo) VALUES (?,?,?,?,?,?,?)',[dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo],successCB, errorCB);
		alert(tx);
   });
   window.location.replace("index.html");
}



// JavaScript Document