function submitMessage() {
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
}

let formFields = document.querySelectorAll('.form-field');
for (let i of formFields) {
  if (i.required) {
    i.classList.add('required-field');
  }
}
