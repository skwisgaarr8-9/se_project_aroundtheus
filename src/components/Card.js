class Card {
  constructor({
    data,
    templateSelector,
    handleImageClick,
    isUserCard,
    handleDeleteBinClick,
    isLiked,
    handleAddCardLike,
    handleRemoveCardLike,
  }) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._likes = data.likes;
    this._id = data._id;
    this._handleDeleteBinClick = handleDeleteBinClick;
    this._isLiked = isLiked;
    this._ownerId = data.owner._id;
    this._isUserCard = isUserCard;
    this._handleAddCardLike = handleAddCardLike;
    this._handleRemoveCardLike = handleRemoveCardLike;
  }

  _setCardLikes() {
    this._cardLikeCount.textContent = this._likes.length;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button-clicked");
    }
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
    if (!this._isLiked) {
      this._handleAddCardLike(this._id, this._cardLikeCount);
      this._likeButton.classList.add("card__like-button-clicked");
      this._isLiked = !this._isLiked;
    } else {
      this._handleRemoveCardLike(this._id, this._cardLikeCount);
      this._likeButton.classList.remove("card__like-button-clicked");
      this._isLiked = !this._isLiked;
    }
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

    this._setEventListeners();
    this._setDeleteButton();
    this._setCardLikes();

    return this._element;
  }
}

export { Card };
