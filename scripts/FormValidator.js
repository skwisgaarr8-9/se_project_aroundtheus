const configObj = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

class FormValidator {
  constructor(settingsObject, formElement) {
    this._formSelector = settingsObject.formSelector;
    this._inputSelector = settingsObject.inputSelector;
    this._submitButtonSelector = settingsObject.submitButtonSelector;
    this._inactiveButtonClass = settingsObject.inactiveButtonClass;
    this._inputErrorClass = settingsObject.inputErrorClass;
    this._errorClass = settingsObject.errorClass;
    this._formElement = formElement;
  }

  _showErrorInput(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideErrorInput(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _toggleInputError(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorInput(inputElement, inputElement.validationMessage);
    } else {
      this._hideErrorInput(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputError(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation(inputList, buttonElement) {
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      this._toggleInputError(inputElement);
    });
  }
}

export { FormValidator, configObj };
