function onDeviceReady(){
	db = window.openDatabase("HomeworkTracker3", "2.0", "HomeworkTracker3", 2000);
	db.transaction(populateDB, errorCB, successCB);

	db.transaction(getMissedDeadlines, errorCB);
}// JavaScript Document

function populateDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS deadlines (id varchar(10) primary key, description varchar(500), class varchar(50), duedate date, duetime time, type varchar(50), additionalInfo varchar(200), finished varchar(10))');
}

function getMissedDeadlines(tx){
	//alert('get missed deadlines');
	var sql = "select * from deadlines where finished = 'no'";
	tx.executeSql(sql, [] , getAllMissedDeadlines_success);
	var sql2 = "select * from deadlines where finished = 'no' and type = 'Homework'";
	tx.executeSql(sql2, [] , getHomeworkMissedDeadlines_success);
	var sql3 = "select * from deadlines where finished = 'no' and type = 'Test'";
	tx.executeSql(sql3, [] , getTestMissedDeadlines_success);
}

function getAllMissedDeadlines_success(tx, results){
	var len = results.rows.length;
	//var s = "";
	for (var i=0; i<len; i++){
		var allMissedDeadline = results.rows.item(i);
		var result = isLate(allMissedDeadline.duedate, allMissedDeadline.duetime).toString();
		if ( result == "false"){
			$('#allMissedList').prepend('<li><a href="deadlineDetail.html?id='+ allMissedDeadline.id+'">'+ allMissedDeadline.class +'<br>'+ allMissedDeadline.duedate+'  '+ allMissedDeadline.duetime+'<br>'+ allMissedDeadline.description +'</a></li>');
		}
	}
	$("#allMissedList").listview('refresh');
		////alert('before append');
}

function getHomeworkMissedDeadlines_success(tx, results){
	
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		var homeworkMissedDeadline = results.rows.item(i);
		var result = isLate(homeworkMissedDeadline.duedate, homeworkMissedDeadline.duetime).toString();
		//alert('result: ' + result);
		if ( result == "false" ){
			//alert('prepend');				
			$('#homeworkMissedList').prepend('<li><a href="deadlineDetail.html?id='+ homeworkMissedDeadline.id+'">'+ homeworkMissedDeadline.class + '<br>' + homeworkMissedDeadline.duedate+'    '+ homeworkMissedDeadline.duetime+'<br>'+ homeworkMissedDeadline.description +'</a></li>');
		} 
		else continue;;
	}
	$("#homeworkMissedList").listview('refresh');
		////alert('before append');
}

function getTestMissedDeadlines_success(tx, results){

	var len = results.rows.length;
	//var s = "";
	for (var i=0; i<len; i++){
		var testMissedDeadline = results.rows.item(i);
		var result = isLate(testMissedDeadline.duedate, testMissedDeadline.duetime).toString();
		if ( result == "false"){
			$('#testMissedList').prepend('<li><a href="deadlineDetail.html?id='+ testMissedDeadline.id+'">'+ testMissedDeadline.class + '<br>' + testMissedDeadline.duedate+'    '+ testMissedDeadline.duetime+'<br>'+ testMissedDeadline.description +'</a></li>');
		}		
	}
	$("#testMissedList").listview('refresh');
		////alert('before append');
}

function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

function successCB(tx){
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

