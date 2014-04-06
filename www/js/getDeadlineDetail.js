var db = null;
var id = "";
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready
//
function onDeviceReady() {
	db = window.openDatabase("HomeworkTracker3", "2.0", "HomeworkTracker3", 2000);
	db.transaction(populateDB, errorCB, successCB);
	//////alert('populate db done');
	db.transaction(populateClassDB, errorCB, successCB);
	//////alert('populate class db done');
	db.transaction(getClasses, errorCB);
	db.transaction(getDeadlineDetail, errorCB);
	
}

function populateDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS deadlines (id varchar(10) primary key, description varchar(500), class varchar(50), duedate date, duetime time, type varchar(50), additionalInfo varchar(200), finished varchar(10))');
}

function populateClassDB(tx) {
	////////alert('starting populate');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS classes (id varchar(10) primary key, name varchar(50), location varchar(50), classdate varchar(50), classtime time, teacher varchar(50), email varchar(200), phone varchar(10))');
	 //////alert('populate done');
	 ////////alert(tx);
}

function getClasses(tx){
	//////alert('classes');
	var sql = "select * from classes";
	tx.executeSql(sql, [] , getClasses_success);
	
}

function getClasses_success(tx, results){

	var len = results.rows.length;
	//////alert('len: ' + len);
	//var s = "";
	for (var i=0; i<len; i++){
		var classDB = results.rows.item(i);
		$('#class').append('<option value="'+ classDB.name + '">'+ classDB.name +'</option>');
	}
		////////alert('before append');
}

function getDeadlineDetail(tx){
	//////alert('get deadline detail');
	id = GET.id;
	//////alert(id);
	var sql = "select * from deadlines where id = '" + id +"'";
	tx.executeSql(sql, [] , getDeadlineDetail_success);
}

function getDeadlineDetail_success(tx, results){

	var len = results.rows.length;
	//var s = "";
	for (var i=0; i<len; i++){
		var deadline = results.rows.item(i);
		var description = deadline.description;
		var classDeadline = deadline.class;
		////alert(classDeadline);
		console.log(classDeadline);
		var duedate = deadline.duedate;
		var duetime = deadline.duetime;
		var type = deadline.type;
		var additionalInfo = deadline.additionalInfo;
		var finished = deadline.finished;
		////alert(finished);
		document.getElementById("shortDescription").value = description;
		document.getElementById("dueDate").value = duedate;
		document.getElementById("dueTime").value = duetime;
		document.getElementById("additionalInfo").value = additionalInfo;
		//$("#class").val(classDeadline);
		//document.getElementById("class").selected = classDeadline;
		//$("#class").val(classDeadline).attr('selected', true);
		var selectClass = $("#class"); 
		$("#class").val(classDeadline);
		selectClass.selectmenu("refresh");

		var selectType = $("#type");
		$("#type").val(type);
		selectType.selectmenu("refresh");
		
		////alert('before select finished');
		var selectFinished = $("#finished");
		$("#finished").val(finished);
		selectFinished.flipswitch("refresh");
			
	}
		////////alert('before append');
}

function getFormInfo(){
	//alert(id);
	var description = document.getElementById("shortDescription").value;
	//alert(description);
	var classDeadline = document.getElementById("class").value;
	//alert(classDeadline);
	var duedate = document.getElementById("dueDate").value;
	//alert(duedate);
	var duetime = document.getElementById("dueTime").value;
	//alert(duetime);
	var type = document.getElementById("type").value;
	//alert(type);
	var additionalInfo = document.getElementById("additionalInfo").value;
	//alert(additionalInfo);
	var finished = document.getElementById("finished").value;	
	//alert(finished);
	updateDeadlineToDB(description,classDeadline,duedate, duetime, type, additionalInfo, finished);
	
}

function updateDeadlineToDB(description,classDeadline,duedate, duetime, type, additionalInfo, finished){
	db.transaction(populateDB, errorCB, successCB);
	db.transaction(function(tx){
		tx.executeSql("UPDATE deadlines SET description = ?, class = ?, duedate = ?, duetime =?, type = ?, additionalInfo = ?, finished = ? WHERE id = ?",[description,classDeadline,duedate, duetime, type, additionalInfo, finished, id], successCB, errorCB);
		//tx.executeSql('UPDATE deadlines SET description = "' + description + '" WHERE id = "'+ id +'"');
		});
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
})();

function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

function successCB(tx){
	//alert("Successfully");
}
