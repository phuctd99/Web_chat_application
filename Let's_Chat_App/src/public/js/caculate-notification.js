function increaseNotification(classname) {
    let currentValue = +$(`.${classname}`)
      .find('em')
      .text();
    currentValue += 1;
    if (currentValue === 0) {
      $(`.${classname}`)
        .css('display', 'none')
        .html('');
    } else {
      $(`.${classname}`)
        .css('display', 'block')
        .html(`<em>${currentValue}</em>`);
    }
    
  }
  
  function decreaseNotification(classname) {
    
    let currentValue = +$(`.${classname}`)
      .find('em')
      .text();
      if (currentValue > 0) {
        currentValue -= 1;
        if (currentValue === 0) {
          $(`.${classname}`)
            .css('display', 'none')
            .html('');
        } else {
          $(`.${classname}`)
            .css('display', 'block')
            .html(`<em>${currentValue}</em>`);
        }
      }
  }