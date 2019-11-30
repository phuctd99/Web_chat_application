
function markNotificationsReaded(targetUsers) {
    $.ajax({
        url: "notification/mark-readed",
        type: "put",
        data: {targetUsers: targetUsers},
        success: function(result) {
            if(result) {
                targetUsers.forEach(function(uid) {
                    $(".noti_content").find(`div[data-uid = ${uid}]`).removeClass("noti-readed-false");
                    $("ul.list-notifications").find(`li>div[data-uid = ${uid}]`).removeClass("noti-readed-false");
                });
                decreaseNotificationNavbar("noti_counter", targetUsers.length);
            }
        }
    });
}
$(document).ready(function() {
    // liên kết tại pop up
    $("#popup-mark-notif-as-read").bind("click", function() {
        let targetUsers = [];
        $(".noti_content").find("div.noti-readed-false").each(function(index, notification) {
            targetUsers.push($(notification).data("uid"));
        });
        if (!targetUsers.length) {
            alertify.notify("Đã hết thông báo chưa đọc", "error", 7);
            return false;
        }
        markNotificationsReaded(targetUsers);
    });
    // liên kết tại modal
    $("#modal-mark-notif-as-read").bind("click", function() {
        let targetUsers = [];
        $("ul.list-notifications").find("li>div.noti-readed-false").each(function(index, notification) {
            targetUsers.push($(notification).data("uid"));
        });
        if (!targetUsers.length) {
            alertify.notify("Đã hết thông báo chưa đọc", "error", 7);
            return false;
        }
        markNotificationsReaded(targetUsers);
    });
});