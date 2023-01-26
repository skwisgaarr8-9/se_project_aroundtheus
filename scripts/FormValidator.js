class FormValidator {
  constructor(settingsObject, formElement) {
    this._formSelector = settingsObject.formSelector;
    this._inputSelector = settingsObject.inputSelector;
    this._submitButtonSelector = settingsObject.submitButtonSelector;
    this._inactiveButtonClass = settingsObject.inactiveButtonClass;
    this._inputErrorClass = settingsObject.inputErrorClass;
    this._errorClass = settingsObject.errorClass;
    this._formElement = formElement;
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
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

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleInputError(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetButtonState() {
    this._toggleButtonState();
  }

  checkInputErrors() {
    this._inputList.forEach((inputElement) => {
      this._toggleInputError(inputElement);
    });
  }
}

export { FormValidator };
