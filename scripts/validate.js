const showErrorInput = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideErrorInput = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`$${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...props }
) => {};

const enableValidation = ({ formSelector, ...props }) => {
  const formList = Array.form(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventlistener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, props);
  });
};

enableValidation(configObj);
