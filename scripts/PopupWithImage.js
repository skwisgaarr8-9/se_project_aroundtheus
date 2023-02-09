import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = ({ title, link }) => {
    const imageElement = this._popup.querySelector(".modal__image");
    const imageCaption = this._popup.querySelector(".modal__caption");

    imageElement.src = link;
    imageElement.alt = title;
    imageCaption.textContent = title;

    super.open();
  };
}

export { PopupWithImage };
