import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
import { configObj, initialCards } from "./constants.js";
import { Section } from "./Section.js";

//profile nodes
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

//input values
const nameInputValue = document.querySelector(".form__input_content_name");
const descriptionInputvalue = document.querySelector(
  ".form__input_content_description"
);
const cardNameInputValue = document.querySelector(
  ".form__input_content_card-name"
);
const cardLinkInputValue = document.querySelector(
  ".form__input_content_card-link"
);

//template selector
const templateSelector = "#card";

//modals
const addCardPopup = document.querySelector(".modal_content_add-place");
const editProfilePopup = document.querySelector(".modal_content_edit-profile");

//image preview popup elements
const imagePreviewPopup = document.querySelector(".modal_content-card-preview");
const imageElement = imagePreviewPopup.querySelector(".modal__image");
const imageCaption = imagePreviewPopup.querySelector(".modal__caption");

//forms
const editProfileForm = editProfilePopup.querySelector(configObj.formSelector);
const addPlaceForm = addCardPopup.querySelector(configObj.formSelector);

//form validators
const editProfileFormValidator = new FormValidator(configObj, editProfileForm);
const addPlaceFormValidator = new FormValidator(configObj, addPlaceForm);

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

//gallery wrapper
const cardsGallery = document.querySelector(".gallery__cards");

//handler functions
const handleEditButtonClick = () => {
  fillProfileForm();
  editProfileFormValidator.checkInputErrors();
  editProfileFormValidator.resetButtonState();
  openPopup(editProfilePopup);
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
  const cardElement = createCard(newPlace);

  cardsGallery.prepend(cardElement);
  addPlaceForm.reset();
  addPlaceFormValidator.resetButtonState();

  closePopup(addCardPopup);
};
const handleImageClick = (evt) => {
  imageElement.src = evt.target.src;
  imageElement.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;

  openPopup(imagePreviewPopup);
};

//fill edit profile popup inputs
const fillProfileForm = () => {
  nameInputValue.value = profileName.textContent;
  descriptionInputvalue.value = profileTitle.textContent;
};

//create card element
const createCard = (data) => {
  const cardElement = new Card(data, templateSelector, handleImageClick);
  return cardElement.generateCard();
};

//validate forms
const enableValidation = () => {
  addPlaceFormValidator.enableValidation();
  editProfileFormValidator.enableValidation();
};

//open popups click event listeners
editProfileButton.addEventListener("click", handleEditButtonClick);
addCardButton.addEventListener("click", () => openPopup(addCardPopup));

//submit event listeners
editProfilePopup.addEventListener("submit", handleProfileEditFormSubmit);
addCardPopup.addEventListener("submit", handleAddPlaceFormSubmit);

//close popups click event listeners
editProfilePopupCloseButton.addEventListener("click", () =>
  closePopup(editProfilePopup)
);
addCardPopupCloseButton.addEventListener("click", () =>
  closePopup(addCardPopup)
);
imagePreviewPopupCloseButton.addEventListener("click", () =>
  closePopup(imagePreviewPopup)
);

const cardGallery = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const cardElement = createCard(card);
      cardGallery.setItem(cardElement);
    },
  },
  ".gallery__cards"
);

cardGallery.renderItems();
//populate card gallery
// initialCards.forEach((item) => {
//   const cardElement = createCard(item);
//   cardsGallery.append(cardElement);
// });

enableValidation();
