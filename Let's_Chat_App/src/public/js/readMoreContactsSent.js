$(document).ready(function(){
    $("#read-more-contacts-sent").bind("click",function(){
        let skipNumber = $("#request-contact-sent").find("li").length;
        $.get(`/contact/read-more-contacts-sent?skipNumber=${skipNumber}`,function(newContactUsers){
            if(!newContactUsers.length){
                //console.log("ban khong co ban be nao");
                alertify.notify("Bạn không có danh sách nào","error",7);
                return false;
            }
            newContactUsers.forEach(function(user){
                $('#request-contact-sent').find("ul").append(`<li class="_contactList" data-uid="${user._id}">
                <div class="contactPanel">
                    <div class="user-avatar">
                        <img src="../../images/users/${user.avatar}" alt="">
                    </div>
                    <div class="user-name">
                        <p>
                        ${user.username}
                        </p>
                    </div>
                    <br>
                    <div class="user-address">
                        <span>&nbsp ${user.address !== null ? user.address:""}</span>
                    </div>
                    <div class="user-remove-request-contact-sent action-danger display-important" data-uid="${user._id}">
                        Hủy yêu cầu
                    </div>
                </div>
            </li>`);
            });
            removeRequestContactSent();
        });
    });
});