function increaseNotification(classname) {
    let currentValue = +$(`.${classname}`)
      .text();
    currentValue += 1;
    if (currentValue === 0) {
      $(`.${classname}`)
        .css('display', 'none')
        .html('');
    } else {
      $(`.${classname}`)
        .css('display', 'inline-block')
        .html(currentValue);
    }
  }
  
  function decreaseNotification(classname) {
    let currentValue = +$(`.${classname}`)
      .text();
      if (currentValue > 0) {
        currentValue -= 1;
        if (currentValue === 0) {
          $(`.${classname}`)
            .css('display', 'none')
            .html('');
        } else {
          $(`.${classname}`)
            .css('display', 'inline-block')
            .html(currentValue);
        }
      }
  }