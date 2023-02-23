class Card {
  constructor({
    data,
    templateSelector,
    handleImageClick,
    isUserCard,
    handleDeleteBinClick,
  }) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._likes = data.likes;
    this._id = data._id;
    this._isUserCard = isUserCard;
    this._handleDeleteBinClick = handleDeleteBinClick;
    this._isLiked = false;
  }

  _setDeleteButton() {
    this._deleteButton = this._element.querySelector(".card__delete-button");
    if (!this._isUserCard) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteBinClick(this._id, this._element);
      });
    }
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

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    const cardImage = this._element.querySelector(".card__image");

    this._likeButton.addEventListener("click", this._handleLikeClick);
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
    this._cardLikeCount.textContent = this._likes.length;

    this._setEventListeners();
    this._setDeleteButton();
    return this._element;
  }
}

export { Card };
