// JavaScript Document// JavaScript Document

var db = null;
function onDeviceReady() {
	alert('on device ready');
	db = window.openDatabase("HomeworkTracker3", "2.0", "HomeworkTracker3", 2000);
	db.transaction(populateDB, errorCB, successCB);

	db.transaction(getClasses, errorCB);
}

function populateDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS classes (id varchar(10) primary key, name varchar(50), location varchar(50), classdate varchar(50), classtime time, teacher varchar(50), email varchar(200), phone varchar(10))');
	 alert('populate done');
}


function getClasses(tx){
	alert('classes');
	var sql = "select * from classes";
	tx.executeSql(sql, [] , getClasses_success);
	
}

function getClasses_success(tx, results){

	var len = results.rows.length;
	alert('len: ' + len);
	//var s = "";
	for (var i=0; i<len; i++){
		var classDB = results.rows.item(i);
		$('#classList').append('<li><a href="classDetail.html?id='+ classDB.id+'">'+ classDB.name +'</a></li>');
		$("#classList").listview().listview('refresh');
	}
		//alert('before append');
}

function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

function successCB(tx){
}
