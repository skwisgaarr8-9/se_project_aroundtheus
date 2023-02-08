import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    const imageElement = this._popup.querySelector(".modal__image");
    const imageCaption = this._popup.querySelector(".modal__caption");

    // console.log(evt);

    // imageElement.src = evt.target.src;
    // imageElement.alt = evt.target.alt;
    // imageCaption.textContent = evt.target.alt;

    super.open();
  }
}

export { PopupWithImage };
