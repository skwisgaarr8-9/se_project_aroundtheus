class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("modal_opened");
  }

  close() {
    this._popup.classList.remove("modal_opened");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton = this._popup.querySelector(".modal__close-button");
    this._closeButton.addEventListener("click", this.close);
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}

export { Popup };
