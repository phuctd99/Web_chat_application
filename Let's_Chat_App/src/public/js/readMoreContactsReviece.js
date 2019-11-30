$(document).ready(function(){
    $("#read-more-contacts-reviece").bind("click",function(){
        let skipNumber = $("#request-contact-received").find("li").length;
        $.get(`/contact/read-more-contacts-reviece?skipNumber=${skipNumber}`,function(newContactUsers){
            if(!newContactUsers.length){
                //console.log("ban khong co ban be nao");
                alertify.notify("Bạn không có yêu cầu nào","error",7);
                return false;
            }
            newContactUsers.forEach(function(user){
                $('#request-contact-received').find("ul").append(`<li class="_contactList" data-uid="${user._id}">
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
                    <div class="user-acccept-contact-received" data-uid="${user._id}">
                        Chấp nhận
                    </div>
                    <div class="user-reject-request-contact-received action-danger" data-uid=${user._id}>
                        Xóa yêu cầu
                    </div>
                </div>
            </li>`);
            });
        });
    });
});