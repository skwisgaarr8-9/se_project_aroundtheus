import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (data) => {
    const imageElement = this._popup.querySelector(".modal__image");
    const imageCaption = this._popup.querySelector(".modal__caption");

    imageElement.src = data.link;
    imageElement.alt = data.title;
    imageCaption.textContent = data.title;

    super.open();
  };
}

export { PopupWithImage };
