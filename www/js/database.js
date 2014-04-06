// JavaScript Document

// Wait for PhoneGap to load
var db = null;
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready
//
function onDeviceReady() {
	db = window.openDatabase("HomeworkTracker3", "2.0", "HomeworkTracker3", 2000);
	db.transaction(populateDB, errorCB, successCB);
	alert('populate done');
	db.transaction(populateClassDB, errorCB, successCB);
	db.transaction(getClasses, errorCB);
}

function populateClassDB(tx) {
	//alert('starting populate');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS classes (id varchar(10) primary key, name varchar(50), location varchar(50), classdate varchar(50), classtime time, teacher varchar(50), email varchar(200), phone varchar(10))');
	 alert('populate done');
	 //alert(tx);
}

function getClasses(tx){
	var sql = "select * from classes";
	tx.executeSql(sql, [] , getClasses_success);
}

function getClasses_success(tx, results){

	var len = results.rows.length;
	alert('len: ' + len);
	//var s = "";
	for (var i=0; i<len; i++){
		var classDB = results.rows.item(i);
		$('#class').append('<option value="'+ classDB.name + '">'+ classDB.name +'</option>');
		//$("#classList").listview().listview('refresh');
	}
		//alert('before append');
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
	alert('save deadline to db');
	var dbId = randomString(5);
	//alert(dbId);
	var dbDescription = document.getElementById("shortDescription").value;
	//alert(dbDescription);
	var dbClass = document.getElementById("class").value;
	//alert(dbClass);
	var dbDueDate = document.getElementById("dueDate").value;
	//alert(dbDueDate);
	var dbDueTime = document.getElementById("dueTime").value;
	//alert(dbDueTime);
	var dbType = document.getElementById("type").value;
	//alert(dbType);
	var dbAdditionalInfo = document.getElementById("additionalInfo").value;
	//alert(dbAdditionalInfo);
	var dbFinished = document.getElementById("finished").value;
	//alert(dbFinished);
	insertDeadlineToDB(dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo, dbFinished);

}

// Populate the database

function populateDB(tx) {
	alert('starting populate');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS deadlines (id varchar(10) primary key, description varchar(500), class varchar(50), duedate date, duetime time, type varchar(50), additionalInfo varchar(200), finished varchar(10))');
	 //alert(tx);
}

// Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
function successCB() {
	//alert('success');
}

function insertDeadlineToDB(dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo, dbFinished) {
	alert('insert called');
	
	alert('before insert');
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO deadlines (id, description, class, dueDate, dueTime, type, additionalInfo, finished) VALUES (?,?,?,?,?,?,?,?)',[dbId,dbDescription,dbClass,dbDueDate, dbDueTime, dbType, dbAdditionalInfo, dbFinished],successCB, errorCB);
		//alert(tx);
   });
}

function updateDeadlineToDB(){
	var id = GET.id;
	var sql = "select * from deadlines where id = '"+ id +"'";
	tx.executeSql(sql, [] , getDeadlineDetail_success);
}

/*function getDeadlineDetail_success(tx, results){
	var len = results.rows.length;
	//var s = "";
	for (var i=0; i<len; i++){
		var deadlineDetail = results.rows.item(i);
		var description = deadlineDetail.description;
		var class = deadlineDetail.class;
		var dueDate = deadlineDetail.duedate;
		var dueTime = deadlineDetail.duetime;
		var additionalInfo = deadlineDetail.additionalInfo;
		var finished = deadlineDetail.finished;
		
		document.getElementById('shortDescription').innerHTML = description;
		
	}
}
*/
GET = (function () {
    var get = {
        push:function (key,value){
            var cur = this[key];
            if (cur.isArray){
                this[key].push(value);
            }else {
                this[key] = [];
                this[key].push(cur);
                this[key].push(value);
            }
        }
    },
    search = document.location.search,
    decode = function (s,boo) {
        var a = decodeURIComponent(s.split("+").join(" "));
        return boo? a.replace(/\s+/g,''):a;
    };
    search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function (a,b,c) {
        if (get[decode(b,true)]){
            get.push(decode(b,true),decode(c));
        }else {
            get[decode(b,true)] = decode(c);
        }
    });
    return get;
})();
// JavaScript Document


// JavaScript Document
