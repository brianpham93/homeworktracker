function populateClassDB(tx) {
	 tx.executeSql('CREATE TABLE IF NOT EXISTS classes (id varchar(10) primary key, name varchar(50), location varchar(50), classdate varchar(50), classtime time, teacher varchar(50), email varchar(200), phone varchar(10))');
}

function getClasses(tx){
	var sql = "select * from classes";
	tx.executeSql(sql, [] , getClasses_success);
	
}
function getClasses_success(tx, results){
	
	var len = results.rows.length;
	//avoid duplicate class list 
	$('#classList').empty();
	$('#classAddNew').empty();
	$('#class').empty();
	//
	for (var i=0; i<len; i++){
		var classDB = results.rows.item(i);
		$('#class').append('<option value="'+ classDB.name + '">'+ classDB.name +'</option>');
		$('#classAddNew').append('<option value="'+ classDB.name + '">'+ classDB.name +'</option>');
		$('#classList').append('<li><a href="#classDetail" id = "'+classDB.id+'" data-transition = "slide" >'+ classDB.name +'</a></li>');		
	}
	$("#classList").listview().listview('refresh');
	$('#classList').children().each(function(){
                var anchor = $(this).find('a');
                if(anchor){
                    anchor.click(function(){
						   //alert(anchor.attr('id'));
                        sessionStorage.setItem("selectedId", anchor.attr('id'));
                    });
                }
    });
}

function getClassDetail(tx){
	
	id = sessionStorage.getItem("selectedId");
	var sql = "select * from classes where id ='"+ id +"'";
	tx.executeSql(sql, [] , getClassDetail_success);	
}

function getClassDetail_success(tx, results){

	var len = results.rows.length;

	for (var i=0; i<len; i++){
		var classDB = results.rows.item(i);
		var name = classDB.name;
		var location = classDB.location;
		var date = classDB.classdate;
		var time = classDB.classtime;
		var teacher = classDB.teacher;
		var email = classDB.email;
		var phone = classDB.phone;
		document.getElementById("className").value = name;
		document.getElementById("classLocation").value = location;
		document.getElementById("classDate").value = date;
		document.getElementById("classTime").value = time;
		document.getElementById("classTeacher").value = teacher;
		document.getElementById("classTeacherEmail").value = email;
		document.getElementById("classTeacherPhone").value = phone;
	}
}

function getClassFormInfo(){
	//alert(id);
	var name = document.getElementById("className").value;
	//alert(name);
	var location = document.getElementById("classLocation").value;
	//alert(location);
	var date = document.getElementById("classDate").value;
	//alert(date);
	var time = document.getElementById("classTime").value;
	//alert(time);
	var teacher = document.getElementById("classTeacher").value;
	//alert(teacher);
	var email = document.getElementById("classTeacherEmail").value;
	//alert(email);
	var phone = document.getElementById("classTeacherPhone").value;	
	//alert(phone);
	updateClassToDB(name,location,date,time,teacher,email,phone);
}

function saveClassToDB(){
	var dbId = randomString(5);
	//alert(dbId);
	var dbName = document.getElementById("newClassName").value;
	//alert(dbName);
	var dbLocation = document.getElementById("newClassLocation").value;
	//alert(dbLocation);
	var dbDate = document.getElementById("newClassDate").value;
	//alert(dbDate);
	var dbTime = document.getElementById("newClassTime").value;
	//alert(dbTime);
	var dbTeacher = document.getElementById("newClassTeacher").value;
	//alert(dbTeacher);
	var dbEmail = document.getElementById("newClassTeacherEmail").value;
	//alert(dbEmail);
	var dbPhone = document.getElementById("newClassTeacherPhone").value;
	//alert(dbPhone);
	insertClassToDB(dbId,dbName,dbLocation,dbDate, dbTime, dbTeacher, dbEmail, dbPhone);

}

function insertClassToDB(dbId,dbName,dbLocation,dbDate, dbTime, dbTeacher, dbEmail, dbPhone) {
	alert('before insert');
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO classes (id, name, location, classdate, classtime, teacher, email, phone) VALUES (?,?,?,?,?,?,?,?)',[dbId,dbName,dbLocation,dbDate, dbTime, dbTeacher, dbEmail, dbPhone],insertClassSuccessCB, errorCB);
		//alert(tx);
   });
}

function updateClassToDB(name,location,date,time,teacher,email,phone){
	db.transaction(function(tx){
		tx.executeSql("UPDATE classes SET name = ?, location = ?, classdate = ?, classtime =?, teacher = ?, email = ?, phone = ? WHERE id = ?",[name,location,date,time,teacher,email,phone, id], updateClassSuccessCB, errorCB);
		//tx.executeSql('UPDATE deadlines SET description = "' + description + '" WHERE id = "'+ id +'"');
		});
}

//Success and erro calls back 
function insertClassSuccessCB(){
	window.location.hash ="#classlistpage";
}
function populateClassSuccessCB(tx){
	//alert("populate class done");
}
function updateClassSuccessCB(tx){
	window.location.hash ="#classlistpage";
}

//External function

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


function getParameterByName(name) {
    		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}