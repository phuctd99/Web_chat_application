function flashMasterNotify() {
    let notify = $(".master-success-message").text();
    if (notify.length) {
      alertify.notify(notify, "success", 3);
    }
  }
  flashMasterNotify();