class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOutsideClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton = this._popup.querySelector(".modal__close-button");

    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("mousedown", this._handleOutsideClick);
  }
}

export { Popup };
