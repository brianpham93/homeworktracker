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
	//alert('get deadline');
	var sql = "select * from deadlines where finished = 'no'";
	tx.executeSql(sql, [] , getAllDeadlines_success);
	var sql2 = "select * from deadlines where finished = 'no' and type = 'Homework'";
	tx.executeSql(sql2, [] , getHomeworkDeadlines_success);
	//alert('get test deadline');
	var sql3 = "select * from deadlines where finished = 'no' and type = 'Test'";
	tx.executeSql(sql3, [] , getTestDeadlines_success);
}

function getAllDeadlines_success(tx, results){

	var len = results.rows.length;
	
	for (var i=0; i<len; i++){
		var allDeadline = results.rows.item(i);
		var result = isLate(allDeadline.duedate, allDeadline.duetime).toString();
		if ( result == "true"){
			$('#allList').append('<li><a href="deadlineDetail.html?id='+ allDeadline.id+'" data-transition="slide">'+ allDeadline.class +'<br>'+ allDeadline.duedate+'  '+ allDeadline.duetime+'<br>'+ allDeadline.description +'</a></li>');
		}
	}
	$("#allList").listview('refresh');
		////alert('before append');
}

function getHomeworkDeadlines_success(tx, results){
	
	//alert('get homework deadlines');
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		var homeworkDeadline = results.rows.item(i);
		var result = isLate(homeworkDeadline.duedate, homeworkDeadline.duetime).toString();
		//alert('result: ' + result);
		if ( result == "true" ){
			//alert('prepend');				
			$('#homeworkList').append('<li><a href="deadlineDetail.html?id='+ homeworkDeadline.id+'">'+ homeworkDeadline.class + '<br>' + homeworkDeadline.duedate+'    '+ homeworkDeadline.duetime+'<br>'+ homeworkDeadline.description +'</a></li>');
		} 
		else continue;;
	}
	$("#homeworkList").listview('refresh');
		////alert('before append');
}


function getTestDeadlines_success(tx, results){

	var len = results.rows.length;
	//var s = "";
	for (var i=0; i<len; i++){
		var testDeadline = results.rows.item(i);
		var result = isLate(testDeadline.duedate, testDeadline.duetime).toString();
		if ( result == "true"){
			$('#testList').append('<li><a href="deadlineDetail.html?id='+ testDeadline.id+'">'+ testDeadline.class + '<br>' + testDeadline.duedate+'    '+ testDeadline.duetime+'<br>'+ testDeadline.description +'</a></li>');
		}		
	}
	$("#testList").listview('refresh');
		////alert('before append');
}


function isLate(deadlineDate, deadlineTime){
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	
	var parts = deadlineDate.split('-');
	var time = deadlineTime.split(':');
	
	if ( parts[0] < year ){// previous year
		return false;
	} else if ( ( parts[0] == year ) && ( parts[1] < month)){ // previous month
		return false;
	} else if (( parts[0] == year ) && ( parts[1] == month) && (parts[2] < date)){// previous date
		return false;
	} else if (( parts[0] == year ) && ( parts[1] == month) && (parts[2] == date) && (time[0] < hour)){ // previous hour
		return false;
	} else if (( parts[0] == year ) && ( parts[1] == month) && (parts[2] == date) && (time[0] == hour) && (time[1] < minute)) { // previous minute
		return false;
	} else {
		return true;
	}	
}


function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

function successCB(tx){
}
