// JavaScript Document

var db = null;
function onDeviceReady() {
	db = window.openDatabase("HomeworkTracker3", "2.0", "HomeworkTracker3", 2000);
	db.transaction(populateDB, errorCB, successCB);

	db.transaction(getDeadlines, errorCB);		
}

function populateDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS deadlines (id varchar(10) primary key, description varchar(500), class varchar(50), duedate date, duetime time, type varchar(50), additionalInfo varchar(200), finished varchar(10))');
}

function getDeadlines(tx){
	var sql = "select * from deadlines where finished = 'no'";
	tx.executeSql(sql, [] , getAllDeadlines_success);
	var sql2 = "select * from deadlines where type = 'Homework'";
	tx.executeSql(sql2, [] , getHomeworkDeadlines_success);
	var sql3 = "select * from deadlines where type = 'Test'";
	tx.executeSql(sql3, [] , getTestDeadlines_success);
}

function getAllDeadlines_success(tx, results){

	var len = results.rows.length;
	//var s = "";
	for (var i=0; i<len; i++){
		var allDeadline = results.rows.item(i);
			
		$('#allList').append('<li><a href="deadlineDetail.html?id='+ allDeadline.id+'">'+ allDeadline.class +'<br>'+ allDeadline.duedate+'  '+ allDeadline.duetime+'<br>'+ allDeadline.description +'</a></li>');
	}
	$("#allList").listview('refresh');
		//alert('before append');
}
function getHomeworkDeadlines_success(tx, results){

	var len = results.rows.length;
	//var s = "";
	for (var i=0; i<len; i++){
		var homeworkDeadline = results.rows.item(i);
			
		$('#homeworkList').append('<li><a href="deadlineDetail.html?id='+ homeworkDeadline.id+'"><p>'+ homeworkDeadline.class+'</p><p>'+ homeworkDeadline.duedate+'</p><p>'+ homeworkDeadline.duetime+'</p></a></li>');
		
	}
	$("#homeworkList").listview('refresh');
		//alert('before append');
}
function getTestDeadlines_success(tx, results){

	var len = results.rows.length;
	//var s = "";
	for (var i=0; i<len; i++){
		var testDeadline = results.rows.item(i);
			
		$('#testList').append('<li><a href="deadlineDetail.html?id='+ testDeadline.id+'"><p>'+ testDeadline.class+'</p><p>'+ testDeadline.duedate+'</p><p>'+ testDeadline.duetime+'</p></a></li>');
	}
	$("#testList").listview('refresh');
		//alert('before append');
}

function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

function successCB(tx){
}
