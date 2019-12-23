let members = [$('#chatInputField').data('uid')];
let userId = [$('#chatInputField').data('uid')];

function addMemberToCreate(){
  $('.btn-add-member').bind('click', function(){
    let id = $(this).data('uid');
    members.push(id);
    if ($(this).data('role') === 'admin'){
      userId.push(id);
    }
    $(this).hide();
    $(`#btn-drop-member-${id}`).show();
    let listAddMemberItem = `
    <div id="listAddUserToGroup-${id}" class="listAddUserToGroup-item">
      <div class="contactPanel add-user-item">
        <button class="btn-drop btn-drop-member" data-uid="${id}">x</button>
        <div class="user-avatar">
            <img src="../../images/users/${$(this).data('ava')}" alt="">
        </div>
        <div class="user-name" >
            <p>
                ${$(this).data('username')}
            </p>
        </div>
      </div>
    </div>`;
    $('.listAddUserToGroup').append(listAddMemberItem);
  });
}

function dropMemberToCreate(){
  $(document).on('click', '.btn-drop-member', function() {
    let id = $(this).data('uid');
    let index = members.indexOf(id);
    if (index > -1) {
      members.splice(index, 1);
    }
    if ($(this).data('role') === 'admin'){
      let index = userId.indexOf(id);
      if (index > -1) {
        userId.splice(index, 1);
      }
    }
    $(`#btn-add-member-${id}`).show();
    $(`#btn-drop-member-${id}`).hide();
    $(`#listAddUserToGroup-${id}`).remove();
  });
}

function createGroup(){
  $('#input-btn-add-group').bind('click', function(){
    const groupName = $('#input-groupname').val();

    if (members.length < 3){
      alertify.notify('Nhóm phải có 3 người trở lên', 'error', 7);
      return false;
    }
    if (members.length > 20){
      alertify.notify('Nhóm có tối đa 20 người', 'error', 7);
      return false;
    }
    if (groupName.length < 3){
      alertify.notify('Tên nhóm quá ngắn', 'error', 7);
      return false;
    }
    if (groupName.length > 50){
      alertify.notify('Tên nhóm quá dài', 'error', 7);
      return false;
    }
    const group = {
      name: groupName,
      userAmount: members.length,
      userId: userId,
      members: members
    }
    socket.emit('create-group', group);
  });
}

function afterSuccessfullyCreateGroup(){
  socket.on('response-group-creation', function(group){
    $('#groupChatModal').modal('toggle');
    members = [$('#chatInputField').data('uid')];
    $('#input-groupname').val('');
    $('.listAddUserToGroup-item').remove();
    $('.btn-add-member').show();
    $('.btn-drop-member').hide();
    let element = `<li
    id="li-${group._id}"
    class="group"
    data-uid="${group._id}">
    <div class="left-avatar">
      <div class="dot"></div>
      <img src="../../images/users/group.png" alt="" />
    </div>
    <span class="name">
    ${group.name}
    </span>
    <span class="time" data-createAt=""></span>
    <span class="preview"></span>
    <button class="get-group-info-btn" data-gid="${group._id}"><i class="fa fa-cog"></i></button>
    <button class="add-user-to-group"  data-gid="${group._id}"><i class="fa fa-plus-circle"></i></button>
    </li>`;
    $('#contact-list').append(element);
  });
}

function searchFriendToAddToCreateGroup(){
  $('#input-find-users-in-contact').on("keyup", function () {
    if (this.value.length > 0) {   
      $('#group-contact-list li').hide().filter(function () {
        return $(this).find('.user-name').text().toLowerCase().indexOf($('#input-find-users-in-contact').val().toLowerCase()) != -1;
      }).show(); 
    }  
    else { 
      $('#group-contact-list li').show();
    }
  });
}

$(document).ready(function(){
  addMemberToCreate();
  dropMemberToCreate();
  createGroup();
  afterSuccessfullyCreateGroup();
  searchFriendToAddToCreateGroup();
});
