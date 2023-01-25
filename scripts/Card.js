import { openPopup } from "./utils.js";

//image preview popup elements
const imagePreviewPopup = document.querySelector(".modal_content-card-preview");
const imageElement = imagePreviewPopup.querySelector(".modal__image");
const imageCaption = imagePreviewPopup.querySelector(".modal__caption");

class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle("card__like-button-clicked");
  }

  _handleDeleteClick(evt) {
    evt.target.closest(".card").remove();
  }

  _handlePicturePreview(evt) {
    imageElement.src = evt.target.src;
    imageElement.alt = evt.target.alt;
    imageCaption.textContent = evt.target.alt;

    openPopup(imagePreviewPopup);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const cardImage = this._element.querySelector(".card__image");

    likeButton.addEventListener("click", this._handleLikeClick);
    deleteButton.addEventListener("click", this._handleDeleteClick);
    cardImage.addEventListener("click", this._handlePicturePreview);
  }

  generateCard() {
    this._element = this._getCardTemplate();
    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");

    cardImage.alt = this._title;
    cardTitle.textContent = this._title;
    cardImage.src = this._link;

    this._setEventListeners();

    return this._element;
  }
}

export { Card, imagePreviewPopup };
