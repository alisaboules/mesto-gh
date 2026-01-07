function showInputError (form, input, errorMessage, settings) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);  
  error.textContent = errorMessage;
  error.classList.add(settings.errorClass);
}

function hideInputError (form, input, settings) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);  
  error.classList.remove(settings.errorClass);
  error.textContent = "";
}

function checkInputValidity (form, input, settings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
    return false;
  }

  hideInputError(form, input, settings);
  return true;
}

function hasInvalidInput (inputArr, settings) {
  return inputArr.some(input => !checkInputValidity(input.closest("form"), input, settings));
}

function disableSubmitButton (button, settings) {
  button.setAttribute("disabled", true);
  button.classList.add(settings.inactiveButtonClass);
}

function enableSubmitButton (button, settings) {
  button.removeAttribute("disabled");
  button.classList.remove(settings.inactiveButtonClass);
}

function toggleButtonState (inputArr, button, settings) {
  if (hasInvalidInput(inputArr, settings)) {
    disableSubmitButton(button, settings);
  } else {
    enableSubmitButton(button, settings);
  }
}

function setEventListeners (form, settings) {
  const inputArr = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);
  inputArr.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputArr, button, settings); 
      });
  });
}

function clearValidation (form, settings){
  const inputArr = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);
  inputArr.forEach((input) => {hideInputError(form, input, settings)})
  disableSubmitButton(button, settings);
}

function enableValidation (settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {setEventListeners(form, settings)});
}

export {enableValidation, clearValidation};