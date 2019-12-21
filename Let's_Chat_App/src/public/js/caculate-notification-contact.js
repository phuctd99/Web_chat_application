function increaseNotificationNavbar(classname, number) {
    let currentValue = +$(`.${classname}`).text();
    currentValue += number;
    if (currentValue === 0) {
      $(`.${classname}`)
        .css('display', 'none')
        .html('');
    } else {
      $(`.${classname}`)
        .css('display', 'block')
        .html(currentValue);
    }
  }
  
  function decreaseNotificationNavbar(classname, number) {
    let currentValue = +$(`.${classname}`).text();
    if (currentValue > 0) {
      currentValue -= number;
      if (currentValue === 0) {
        $(`.${classname}`)
          .css('display', 'none')
          .html('');
      } else {
        $(`.${classname}`)
          .css('display', 'block')
          .html(currentValue);
      }
    }
  }