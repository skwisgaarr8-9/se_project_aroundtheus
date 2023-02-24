import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".modal__image");
    this._imageCaption = this._popup.querySelector(".modal__caption");
  }

  open = (data) => {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.title;
    this._imageCaption.textContent = data.title;

    super.open();
  };
}

export { PopupWithImage };
