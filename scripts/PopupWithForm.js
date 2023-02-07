import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this.querySelectorAll(".form__input");
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }

  close() {
    super.close();
    this.reset();
  }
}

export { PopupWithForm };
