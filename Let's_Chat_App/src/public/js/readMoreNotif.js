$(document).ready(function(){
    $("#read-more-notif").bind("click",function(){
        let skipNumber = $("ul.list-notifications").find("li").length;
        $.get(`/notification/read-more?skipNumber=${skipNumber}`,function(notifications){
            if(!notifications.length){
                //console.log("ban khong co thong bao nao");
                alertify.notify("Bạn không có thông báo nào","error",7);
                return false;
            }
            notifications.forEach(function(notification){
                $('ul.list-notifications').append(`<li>${notification}</li>`);
            });
        });
    });
});