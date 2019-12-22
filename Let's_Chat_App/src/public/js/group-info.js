const user_id = $('#chatInputField').data('uid');
let managerOfGroup = false;

function getGroupInfo(){
  $(document).on('click', '.get-group-info-btn', function(){
    const groupId = $(this).data('gid');
    $.get(`/get-group?gid=${groupId}`, function(data, status){
      $('#input-change-groupname').val(data.group.name);
      $('#quantity-of-group-members').text(data.group.members.length);
      $('#groupinfo-contact-list').empty();
      if (data.group.userId.includes(user_id)){
        managerOfGroup = true;
      } else {
        data.membersInfo.forEach(member => {
          if (member._id === user_id && member.role === 'admin'){
            managerOfGroup = true;
          }
        });
      }
      data.membersInfo.forEach(member => {
        let email = null;
        let address = null;
        if (member.local){
          email = member.local.email;
        }else if (member.facebook){
          email = member.facebook.email;
        }else if (member.google){
          email = member.google.email;
        }
        if (member.address){
          address = member.address;
        }else{
          address = 'Chưa có'
        }
        let element = `
        <li id="group-member-${member._id}" class="group-member-item" data-uid="${member._id}">
          <div class="contactPanel">
            <div class="user-avatar">
              <img src="../../images/users/${member.avatar}" alt="">
            </div>
            <div class="user-name">
              <p>
                Tên: ${member.username}
              </p>
            </div>
            <br>
            <div class="user-email">
              <p>
                Email: ${email}
              </p>
            </div>
            <div class="user-address">
              <span>Địa chỉ: ${address}</span>
            </div>`;
        if (managerOfGroup && user_id !== member._id){
          element += `<div class="kick-member" data-uid="${member._id}" data-gid="${groupId}">
              Xóa khỏi nhóm
            </div>`;
          if (!data.group.userId.includes(member._id)){
            element += `<div class="authorize-manager" data-uid="${member._id}" data-gid="${groupId}">
              Ủy quyền quản lý
            </div>`;
          }          
        }
        element += `</div></li>`;
        $('#groupinfo-contact-list').append(element);
      });
    });
    $('#groupChatInfoModal').modal('toggle');
  })
};

$(document).ready(function(){
  getGroupInfo();
});
