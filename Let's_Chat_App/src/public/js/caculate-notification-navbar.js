function increaseNotificationNavbar(classname) {
    let currentValue = +$(`.${classname}`).text();
    currentValue += 1;
  
    $(`.${classname}`)
      .css('display', 'block')
      .html(`${currentValue}`);
  }
  
  function decreaseNotificationNavbar(classname) {
    let currentValue = +$(`.${classname}`).text();
    if (currentValue > 0) {
      currentValue -= 1;
      if (currentValue === 0) {
        $(`.${classname}`)
          .css('display', 'none')
          .html('');
      } else {
        $(`.${classname}`)
          .css('display', 'block')
          .html(`${currentValue}`);
      }
    }
  }