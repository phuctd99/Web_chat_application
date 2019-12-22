let groupId = null;

function kickMember(){
  $(document).on('click', '.kick-member', function(){
    const userKickedId = $(this).data('uid');
    const kickedFromGroup = $(this).data('gid');
    $.post('/kick-member', {
      userId: userKickedId,
      groupId: kickedFromGroup
    }, function(data){
      if (data.status === 'success'){
        $(`#group-member-${userKickedId}`).remove();
        $('#quantity-of-group-members').text( $('#quantity-of-group-members').text() - 1);
      }
    });
  })
}

function authorizeGroupManager(){
  $(document).on('click', '.authorize-manager', function(){
    const userId = $(this).data('uid');
    const groupId = $(this).data('gid');
    const selector = $(this);
    $.post('/authorize-group-manager', {
      userId: userId,
      groupId: groupId
    }, function(data){
      if (data.status === 'success'){
        selector.remove();
      }
    });
  });
}

function openAddMemberModal(){
  $(document).on('click', '.add-user-to-group', function(){
    groupId = $(this).data('gid');
    $.get(`/friend-not-in-group?gid=${groupId}&uid=${user_id}`, function(data, status){
      $('#group-contact-list-to-add').empty();
      data.result.forEach(friend => {
        let address;
        if (friend.address){
          address = friend.address;
        } else {
          address = 'chưa có';
        }
        let element = ` 
          <li id="group-contact-list-to-add-${friend._id}" class="group-contact-list-to-add-item" data-uid="${friend._id}" data-role="${friend.role}">
              <div class="contactPanel">
                  <div class="user-avatar">
                      <img src="../../images/users/${friend.avatar}" alt="">
                  </div>
                  <div class="user-name" >
                      <p>
                      ${friend.username}
                      </p>
                  </div>
                  <br>
                  <div class="user-address">
                      <span>${address}</span>
                  </div>
                  <div id="btn-add-member-addModal-${friend._id}" class="btn-add-member-addModal group-talk" data-uid="${friend._id}" data-ava="${friend.avatar}" data-username="${friend.username}" data-role="${friend.role}">
                      Thêm vào nhóm
                  </div>
                  <div id="btn-drop-member-addModal-${friend._id}" style="display:none;" class="btn-drop-member-addModal group-talk" data-uid="${friend._id}" data-role="${friend.role}">
                      Bỏ thêm
                  </div>
              </div>
          </li>`;
          $('#group-contact-list-to-add').append(element);
      });
      $('#quantity-of-addable-friend').text(`${data.result.length}`);
    })
    $('#groupAddUserModal').modal('toggle');
  });
}

function addMember(){
  $(document).on('click', '.btn-add-member-addModal', function(){
    let id = $(this).data('uid');
    let role = $(this).data('role');
    $.post('/add-member',{
      userId: id,
      userRole: role,
      groupId: groupId
    }, function(data){
      if (data.status === 'success'){
        $(`#group-contact-list-to-add-${id}`).remove();
        $('#quantity-of-group-members').text( +$('#quantity-of-group-members').text() + 1);
        $('#quantity-of-addable-friend').text($('#quantity-of-addable-friend').text() - 1);
      }
    })
  });
}

$(document).ready(function(){
  kickMember();
  authorizeGroupManager();
  openAddMemberModal();
  addMember();
});