const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirm = formData.get('confirm');
  const rodo = formData.get('rodo') === 'on' ? true : false;
  formData.set('rodo', rodo);

  const nameisVerified = verifyName(
    name,
    document.getElementById('input_name_error')
  );
  const emailIsVerified = verifyEmail(
    email,
    document.getElementById('input_email_error')
  );
  const passwordIsVerified = verifyPassword(
    password,
    document.getElementById('input_password_error')
  );
  const confirmIsVerified = verifyConfirm(
    password,
    confirm,
    passwordIsVerified,
    document.getElementById('input_confirm_error')
  );

  if (
    nameisVerified &&
    emailIsVerified &&
    passwordIsVerified &&
    confirmIsVerified
  ) {
    sendForm(formData);
  }
});

function verifyName(name, errorMessage) {
  const input = document.getElementById('input_name');
  const regExp = new RegExp(/[^a-ż]\d/gi);
  if (name.length < 2 || regExp.test(name)) {
    showError(input, errorMessage);
    return false;
  } else {
    hideError(input, errorMessage);
    return true;
  }
}

function verifyEmail(email, errorMessage) {
  const input = document.getElementById('input_email');
  const regExp = new RegExp(/\w+@\w+.\w{2}/gi);
  if (!regExp.test(email)) {
    showError(input, errorMessage);
    return false;
  } else {
    hideError(input, errorMessage);
    return true;
  }
}

function verifyPassword(password, errorMessage) {
  const input = document.getElementById('input_password');
  const regExpUpperCase = new RegExp(/^[^A-Z]*[A-Z][^A-Z]*$/g);
  const regExpNumber = new RegExp(/[\d]+/g);
  const regExpSpecialCharacter = new RegExp(/[\W]+/g);
  if (
    password.length < 8 ||
    !regExpUpperCase.test(password) ||
    !regExpNumber.test(password) ||
    !regExpSpecialCharacter.test(password)
  ) {
    showError(input, errorMessage);
    return false;
  } else {
    hideError(input, errorMessage);
    return true;
  }
}

function verifyConfirm(password, confirm, passwordIsVerified, errorMessage) {
  const input = document.getElementById('input_confirm');
  if (password === confirm && passwordIsVerified) {
    hideError(input, errorMessage);
    return true;
  } else {
    showError(input, errorMessage);
    return false;
  }
}

function showError(input, errorMessage) {
  input.classList.add('form__input_error');
  errorMessage.classList.remove('hidden');
}

function hideError(input, errorMessage) {
  input.classList.remove('form__input_error');
  errorMessage.classList.add('hidden');
}

function sendForm(data, errorMessage) {
  const request = new XMLHttpRequest();

  request.addEventListener('load', () => {
    console.log('sent');
  });
  request.addEventListener('error', () => {
    console.log('sending failed');
  });
  request.open('POST', 'https://przeprogramowani.pl/projekt-walidacja');
  request.send(data);
}
