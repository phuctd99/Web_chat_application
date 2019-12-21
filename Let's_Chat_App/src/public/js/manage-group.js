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
      console.log(data)
      if (data.status === 'success'){
        selector.remove();
      }
    });
  });
}

$(document).ready(function(){
  kickMember();
  authorizeGroupManager();
});