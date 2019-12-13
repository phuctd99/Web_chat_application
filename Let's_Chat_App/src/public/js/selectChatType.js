function selectTypeOfChat(){
  $('#select-type-chat').on('change', function(){
    const type = $(this).val();
    switch (type) {
      case 'all-chat':
        $('.person').show();
        $('.group').show();
        break;
      case 'user-chat':
        $('.person').show();
        $('.group').hide();
        break;
      case 'group-chat':
        $('.person').hide();
        $('.group').show();
        break;
    }
  });
}

$(document).ready(function(){
  selectTypeOfChat();
})
