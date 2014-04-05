// JavaScript Document

// Wait for PhoneGap to load
var db = null;
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready
//
function onDeviceReady() {
	alert('on device ready');
	db = window.openDatabase("HomeworkTracker3", "2.0", "HomeworkTracker3", 2000);
	db.transaction(populateDB, errorCB, successCB);
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
	var dbFinished = document.getElementById("finished").value;
	alert(dbFinished);
	insertDeadlineToDB(dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo, dbFinished);

}

// Populate the database

function populateDB(tx) {
	alert('starting populate');
	tx.executeSql('CREATE TABLE IF NOT EXISTS deadlines (id varchar(10) primary key, description varchar(500), class varchar(50), duedate date, duetime time, type varchar(50), additionalInfo varchar(200), finished varchar(10))');
	alert(tx);
}

// Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
function successCB() {
	alert('success');
}

function insertDeadlineToDB(dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo, dbFinished) {
	alert('insert called');
	//alert('before populate');
	db.transaction(populateDB, errorCB, successCB);
	alert(dbId);
	alert(dbDescription);
	alert(dbClass);
	alert(dbDueDate);
	alert(dbDueTime);
	alert(dbType);
	alert(dbAdditionalInfo);
	alert(dbFinished);
	alert('before insert');
	
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO deadlines (id, description, class, dueDate, dueTime, type, additionalInfo, finished) VALUES (?,?,?,?,?,?,?,?)',[dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo, dbFinished],successCB, errorCB);
		alert('tx: '+ tx);
   });
}



// JavaScript Document
