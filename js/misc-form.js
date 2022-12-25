const form = document.querySelector('#form');
let data = new FormData(form);
let payload = {};

form.addEventListener('submit', readForm);

function readForm(event) {
  event.preventDefault();
  for (let i of data) {
    payload[i[0]] = i[1];
  }
  console.log(payload);
}

const togglePwButton = document.querySelector('#toggle-pw-button');
const pw = document.querySelector('#password');
togglePwButton.addEventListener('click', togglePw);

function togglePw(event) {
  if (pw.type === 'password') {
    pw.type = 'text';
    document.querySelector('#visibility_on').hidden = true;
    document.querySelector('#visibility_off').hidden = false;
  } else {
    pw.type = 'password';
    document.querySelector('#visibility_on').hidden = false;
    document.querySelector('#visibility_off').hidden = true;
  }
}

/**
 * Handle toggle events
 * @param  {Event} event The Event object
 */
function toggleHandler(event) {
  // closest gets the closest parent up the DOM tree
  // Also available: element.parentNode or even h1.parentNode.parentNode
  console.log(event.target.closest('div'));
  // Only run if accordion is open
  if (!event.target.hasAttribute('open')) return;

  // Only run on accordions inside our selector
  let parent = event.target.closest('[data-accordion]');
  if (!parent) return;

  // Get all open accordions inside parent
  let opened = parent.querySelectorAll('details[open]');
  console.log(opened);

  // Close open ones that aren't current accordion
  for (let accordion of opened) {
    if (accordion === event.target) continue;
    accordion.removeAttribute('open');
  }
}

document.addEventListener('toggle', toggleHandler, true);
