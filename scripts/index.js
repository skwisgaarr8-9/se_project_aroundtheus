import { Card, imagePreviewPopup } from "./Card.js";
import {
  openPopup,
  closePopup,
  handleEditButtonClick,
  handleProfileEditFormSubmit,
  handleAddPlaceFormSubmit,
} from "./utils.js";
import { FormValidator, configObj } from "./FormValidator.js";

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

//template selector
const templateSelector = "#card";

//modals
const addCardPopup = document.querySelector(".modal_content_add-place");
const editProfilePopup = document.querySelector(".modal_content_edit-profile");

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

//list of forms
const formList = [...document.querySelectorAll(configObj.formSelector)];

//submit event listeners
editProfilePopup.addEventListener("submit", handleProfileEditFormSubmit);
addCardPopup.addEventListener("submit", handleAddPlaceFormSubmit);

//open popups click event listeners
editProfileButton.addEventListener("click", handleEditButtonClick);
addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

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

//populate card gallery
initialCards.forEach((item) => {
  const cardElement = new Card(item, templateSelector);
  cardsGallery.append(cardElement.generateCard());
});

//validate each form
formList.forEach((formElement) => {
  const formValidator = new FormValidator(configObj, formElement);
  formValidator.enableValidation();
});

export { addCardPopup, editProfilePopup, cardsGallery, templateSelector };
