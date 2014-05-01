$('form').submit(function(){
    var landmarkID = $(this).parent().attr('data-landmark-id');
    var postData = $(this).serialize();
$.ajax({
        type: 'POST',
        data: postData+'&amp;lid='+landmarkID,
        url: 'http://thangpq.fall.vn/save.php',
        success: function(data){
            console.log(data);
            alert('Your comment was successfully added');
        },
        error: function(){
            console.log(data);
            alert('There was an error adding your comment');
        }
    });
    return false;
});
// JavaScript Document