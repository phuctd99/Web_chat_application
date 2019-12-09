function increaseNotification(classname) {
  let currentValue = +$(`.${classname}`)
    .text();
  currentValue += 1;
  $(`.${classname}`).html(currentValue);
}

function decreaseNotification(classname) {
  let currentValue = +$(`.${classname}`)
    .text();
  if (currentValue > 0) {
    currentValue -= 1;
    if (currentValue === 0) {
      $(`.${classname}`).html('');
    } else {
      $(`.${classname}`).html(currentValue);
    }
  }
}