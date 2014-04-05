function onDeviceReady() {
    db = window.openDatabase("HomeworkTracker3", "2.0", "HomeworkTracker3", 2000);
    db.transaction(populateDB, errorCB, successCB);

    db.transaction(getFinishedDeadlines, errorCB);
} // JavaScript Document

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS deadlines (id varchar(10) primary key, description varchar(500), class varchar(50), duedate date, duetime time, type varchar(50), additionalInfo varchar(200), finished varchar(10))');
}

function getFinishedDeadlines(tx) {
    alert('get finished deadlines');
    var sql = "select * from deadlines where finished = 'yes'";
    tx.executeSql(sql, [], getAllFinishedDeadlines_success);
    var sql2 = "select * from deadlines where finished = 'yes' and type = 'Homework'";
    tx.executeSql(sql2, [], getHomeworkFinishedDeadlines_success);
    var sql3 = "select * from deadlines where finished = 'yes' and type = 'Test'";
    tx.executeSql(sql3, [], getTestFinishedDeadlines_success);
}

function getAllFinishedDeadlines_success(tx, results) {
    var len = results.rows.length;
    //var s = "";
    for (var i = 0; i < len; i++) {
        var allFinishedDeadline = results.rows.item(i);
        $('#allFinishedList').prepend('<li><a href="deadlineDetail.html?id=' + allFinishedDeadline.id + '"><del>' + allFinishedDeadline.class + '<br>' + allFinishedDeadline.duedate + '  ' + allFinishedDeadline.duetime + '<br>' + allFinishedDeadline.description + '</del></a></li>');

    }
    $("#allFinishedList").listview('refresh');
    //alert('before append');
}

function getHomeworkFinishedDeadlines_success(tx, results) {

    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var homeworkFinishedDeadline = results.rows.item(i);

        $('#homeworkFinishedList').prepend('<li><a href="deadlineDetail.html?id=' + homeworkFinishedDeadline.id + '"><del>' + homeworkFinishedDeadline.class + '<br>' + homeworkFinishedDeadline.duedate + '    ' + homeworkFinishedDeadline.duetime + '<br>' + homeworkFinishedDeadline.description + '</del></a></li>');

    }
    $("#homeworkFinishedList").listview('refresh');
    //alert('before append');
}

function getTestFinishedDeadlines_success(tx, results) {

    var len = results.rows.length;
    //var s = "";
    for (var i = 0; i < len; i++) {
        var testFinishedDeadline = results.rows.item(i);

        $('#testFinishedList').prepend('<li><a href="deadlineDetail.html?id=' + testFinishedDeadline.id + '">' + testFinishedDeadline.class + '<br>' + testFinishedDeadline.duedate + '    ' + testFinishedDeadline.duetime + '<br>' + testFinishedDeadline.description + '</a></li>');

    }
    $("#testFinishedList").listview('refresh');
    //alert('before append');
}

function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

function successCB(tx) {}