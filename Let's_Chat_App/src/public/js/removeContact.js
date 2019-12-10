function removeContact() {
    $('.user-remove-contact').unbind('click').on('click', function() {
      const targetId = $(this).data('uid');
      Swal.fire({
        title:`Bạn có chắc muốn xóa người này khỏi danh bạ?` ,
        text: "Bạn không thể hoàn tác lại quá trình này",
        type: "warning",
        showCancelButton:true,
        confirmButtonColor:"green",
        cancelButtonColor:"red",
        confirmButtonText:"Xác nhận",
        cancelButtonText:"Hủy"
      }).then((result)=>{
        if(!result.value){
          return false;
        }
        $.ajax({
          url: '/contact/remove-contact',
          type: 'delete',
          data: { uid: targetId },
          success: function(data) {
              if (data) {
                $("#contacts").find(`ul li[data-uid = ${targetId}]`).remove();
              
                decreaseNotification("count-contacts");
                //sau nay se xoa user o phan chat
                socket.emit('remove-contact', {contactId: targetId});
            }
          }
        });

      });
      
      
    });
}
socket.on('respond-remove-contact', function(user) {
    $("#contacts").find(`ul li[data-uid = ${user.id}]`).remove();
    decreaseNotification("count-contacts");
});
  
$(document).ready(function() {
  removeContact();
});
