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

function populateDB(tx) {
	//alert('starting populate');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS classes (id varchar(10) primary key, name varchar(50), location varchar(50), classdate varchar(50), classtime time, teacher varchar(50), email varchar(200), phone varchar(10))');
	 alert('populate done');
	 //alert(tx);
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

function saveClassToDB(){
	var dbId = randomString(5);
	alert(dbId);
	var dbName = document.getElementById("className").value;
	alert(dbName);
	var dbLocation = document.getElementById("classLocation").value;
	alert(dbLocation);
	var dbDate = document.getElementById("classDate").value;
	alert(dbDate);
	var dbTime = document.getElementById("classTime").value;
	alert(dbTime);
	var dbTeacher = document.getElementById("classTeacher").value;
	alert(dbTeacher);
	var dbEmail = document.getElementById("classTeacherEmail").value;
	alert(dbEmail);
	var dbPhone = document.getElementById("classTeacherPhone").value;
	alert(dbPhone);
	insertClassToDB(dbId,dbName,dbLocation,dbDate, dbTime, dbTeacher, dbEmail, dbPhone);

}

// Populate the database



// Transaction error callback
function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

// Transaction success callback
function successCB() {
	alert('success');
}

function insertClassToDB(dbId,dbName,dbLocation,dbDate, dbTime, dbTeacher, dbEmail, dbPhone) {
	alert('before insert');
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO classes (id, name, location, classdate, classtime, teacher, email, phone) VALUES (?,?,?,?,?,?,?,?)',[dbId,dbName,dbLocation,dbDate, dbTime, dbTeacher, dbEmail, dbPhone],successCB, errorCB);
		alert(tx);
   });
}

function updateClassToDB(){
	var id = GET.id;
	var sql = "select * from deadlines where id = '"+ id +"'";
	tx.executeSql(sql, [] , getDeadlineDetail_success);
}

/*function getClassDetail_success(tx, results){
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
})();*/
// JavaScript Document


// JavaScript Document
// JavaScript Document