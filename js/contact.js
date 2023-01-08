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

function validate() {
  let formFields = document.querySelectorAll('.form-field');
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  for (let i of formFields) {
    if (i.required) {
      i.classList.add('required-field');
    }
    /* Add required error on blur if required field is empty */
    i.addEventListener('blur', (event) => {
      if (i.required && event.target.value.length === 0) {
        i.nextElementSibling.innerHTML = 'This field is required';
        /* If required is good for the email field, check the email address*/
      } else if (
        i.value &&
        i.type === 'email' &&
        !emailPattern.test(i.value.trim())
      ) {
        i.nextElementSibling.innerHTML = 'Please enter a valid email address';
        /* If required is good for the phone field, check the phone number */
      } else if (
        i.value &&
        i.type === 'tel' &&
        !phonePattern.test(i.value.trim())
      ) {
        i.nextElementSibling.innerHTML = 'Please enter a valid US phone number';
      } else {
        i.nextElementSibling.innerHTML = '';
      }
    });
    /* Remove error message when the user beings typing in a field */
    i.addEventListener('input', () => {
      i.nextElementSibling.innerHTML = '';
    });
  }
}
validate();
