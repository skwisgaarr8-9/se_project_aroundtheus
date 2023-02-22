class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._likes = data.likes.length;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeClick = () => {
    this._likeButton.classList.toggle("card__like-button-clicked");
  };

  _handleDeleteClick = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const cardImage = this._element.querySelector(".card__image");

    this._likeButton.addEventListener("click", this._handleLikeClick);
    deleteButton.addEventListener("click", this._handleDeleteClick);
    cardImage.addEventListener("click", () => {
      this._handleImageClick({ title: this._title, link: this._link });
    });
  }

  generateCard() {
    this._element = this._getCardTemplate();
    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");
    this._cardLikeCount = this._element.querySelector(".card__like-count");

    cardImage.alt = this._title;
    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    this._cardLikeCount.textContent = this._likes;

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
