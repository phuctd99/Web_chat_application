let members = [$('#chatInputField').data('uid')];

function addMemberToCreate(){
  $('.btn-add-member').bind('click', function(){
    let id = $(this).data('uid');
    members.push(id);
    $(this).hide();
    $(`#btn-drop-member-${id}`).show();
    let listAddMemberItem = `
    <div id="listAddUserToGroup-${id}" class="listAddUserToGroup-item">
      <div class="contactPanel">
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
      userId: $('#chatInputField').data('uid'),
      members: members
    }
    socket.emit('create-group', group);
    $('#groupChatModal').modal('toggle');
    members = [];
    $('#input-groupname').val('');
    $('.listAddUserToGroup-item').remove();
  });
}

function afterSuccessfullyCreateGroup(){
  socket.on('response-group-creation', function(group){
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
    </li>`;
    $('#contact-list').append(element);
  });
}

$(document).ready(function(){
  addMemberToCreate();
  dropMemberToCreate();
  createGroup();
  afterSuccessfullyCreateGroup();
});
