function increaseNotification(classname) {
    let currentValue = +$(`.${classname}`)
      .find('em')
      .text();
    currentValue += 1;
    $(`.${classname}`).html(`<em>${currentValue}</em>`);
  }
  
  function decreaseNotification(classname) {
    let currentValue = +$(`.${classname}`)
      .find('em')
      .text();
    if (currentValue > 0) {
      currentValue -= 1;
      if (currentValue === 0) {
        $(`.${classname}`).html('');
      } else {
        $(`.${classname}`).html(`<em>${currentValue}</em>`);
      }
    }
  }