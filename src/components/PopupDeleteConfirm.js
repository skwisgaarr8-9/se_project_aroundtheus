import { Popup } from "./Popup.js";

class PopupDeleteConfirm extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

  setCallback(handleDeleteCardConfirmSubmit) {
    this._handleDeleteCardConfirmSubmit = handleDeleteCardConfirmSubmit;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteCardConfirmSubmit(this._cardId);
    });

    super.setEventListeners();
  }
}

export { PopupDeleteConfirm };
