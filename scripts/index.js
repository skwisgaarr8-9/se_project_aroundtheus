const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=952&q=80",
  },

  {
    name: "Lake Louise",
    link: "https://images.unsplash.com/photo-1581088382991-83c7f170de75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },

  {
    name: "Bald Mountains",
    link: "https://images.unsplash.com/photo-1529289252419-03cfc364face?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  },

  {
    name: "Latemar",
    link: "https://images.unsplash.com/photo-1530173822362-c9e47227cb87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1018&q=80",
  },

  {
    name: "Vanoise National Park",
    link: "https://images.unsplash.com/photo-1601809774049-90a98e3a10c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmFub2lzZSUyMG5hdGlvbmFsJTIwcGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  },

  {
    name: "Lago di Braies",
    link: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
];

//validation configuration object
const configObj = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

//modals
const addCardPopup = document.querySelector(".modal_content_add-place");
const editProfilePopup = document.querySelector(".modal_content_edit-profile");
const imagePreviewPopup = document.querySelector(".modal_content-card-preview");

//buttons
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardPopupCloseButton = addCardPopup.querySelector(
  ".modal__close-button"
);
const editProfilePopupCloseButton = editProfilePopup.querySelector(
  ".modal__close-button"
);
const imagePreviewPopupCloseButton = imagePreviewPopup.querySelector(
  ".modal__close-button"
);

//profile nodes
const profile = document.querySelector(".profile");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

//gallery wrapper
const cardsGallery = document.querySelector(".gallery__cards");

//template
const cardTemplate = document.querySelector("#card").content;

//input values
const nameInputValue = editProfilePopup.querySelector(
  ".form__input_content_name"
);
const descriptionInputvalue = editProfilePopup.querySelector(
  ".form__input_content_description"
);
const cardNameInputValue = addCardPopup.querySelector(
  ".form__input_content_card-name"
);
const cardLinkInputValue = addCardPopup.querySelector(
  ".form__input_content_card-link"
);
const imageElement = imagePreviewPopup.querySelector(".modal__image");
const imageCaption = imagePreviewPopup.querySelector(".modal__caption");

//open and close popups functions
const openPopup = (popup) => {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyPress);
};
const closePopup = (popup) => {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyPress);
};

const handleProfileEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInputValue.value;
  profileTitle.textContent = descriptionInputvalue.value;
  closePopup(editProfilePopup);
};

const handleAddPlaceFormSubmit = (evt) => {
  evt.preventDefault();
  const placeName = cardNameInputValue.value;
  const placeLink = cardLinkInputValue.value;
  const newPlace = { name: placeName, link: placeLink };
  const addPlaceForm = addCardPopup.querySelector(".form");
  cardsGallery.prepend(getCardElement(newPlace));
  addPlaceForm.reset();
  closePopup(addCardPopup);
};

const getCardElement = (data) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardImage.src = data.link;

  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", handleDeleteClick);
  cardImage.addEventListener("click", () => handlePicturePreview(data));
  return cardElement;
};

const handleLikeClick = (evt) => {
  evt.target.classList.toggle("card__like-button-clicked");
};

const handleDeleteClick = (evt) => {
  evt.target.closest(".card").remove();
};

const handlePicturePreview = (data) => {
  imageElement.src = data.link;
  imageElement.alt = data.name;
  imageCaption.textContent = data.name;

  openPopup(imagePreviewPopup);
};

const fillProfileForm = () => {
  nameInputValue.value = profileName.textContent;
  descriptionInputvalue.value = profileTitle.textContent;
};

const handleEditButtonClick = () => {
  fillProfileForm();
  openPopup(editProfilePopup);
};

const clickClosePopup = (evt) => {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
};

const handleEscKeyPress = (evt) => {
  if (evt.key === "Escape") {
    closePopup(editProfilePopup);
    closePopup(addCardPopup);
    closePopup(imagePreviewPopup);
  }
};

editProfilePopup.addEventListener("submit", handleProfileEditFormSubmit);
addCardPopup.addEventListener("submit", handleAddPlaceFormSubmit);

editProfileButton.addEventListener("click", handleEditButtonClick);
addCardButton.addEventListener("click", () => openPopup(addCardPopup));

editProfilePopupCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
addCardPopupCloseButton.addEventListener("click", () =>
  closePopup(addCardPopup)
);
imagePreviewPopupCloseButton.addEventListener("click", () =>
  closePopup(imagePreviewPopup)
);

editProfilePopup.addEventListener("mousedown", clickClosePopup);
addCardPopup.addEventListener("mousedown", clickClosePopup);
imagePreviewPopup.addEventListener("mousedown", clickClosePopup);

initialCards.forEach((card) => {
  cardsGallery.append(getCardElement(card));
});
fillProfileForm();
