document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector("#body");
  const toggleSwitch = document.querySelector('#js-switch');
  
  function toggleDarkLight() {
    if(body.className === 'ui-light-theme') {
      body.classList.remove('ui-light-theme');
      body.classList.add('ui-dark-theme');
    } else {
      body.classList.remove('ui-dark-theme');
      body.classList.add('ui-light-theme');
    }
  }
  
  toggleSwitch.addEventListener('click', toggleDarkLight);
});