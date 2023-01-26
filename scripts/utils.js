import { Card } from "./Card.js";
import {
  editProfilePopup,
  addCardPopup,
  cardsGallery,
  templateSelector,
} from "./index.js";
import { FormValidator, configObj } from "./FormValidator.js";

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

//opening and closing popups
const openPopup = (popup) => {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyPress);
  popup.addEventListener("mousedown", closePopupOnOutsideClick);
};
const closePopup = (popup) => {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyPress);
  popup.removeEventListener("mousedown", closePopupOnOutsideClick);
};
const closePopupOnOutsideClick = (evt) => {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
};
const handleEscKeyPress = (evt) => {
  const openedPopup = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
};

//handler functions
const handleEditButtonClick = () => {
  const inputList = [
    ...editProfilePopup.querySelectorAll(configObj.inputSelector),
  ];
  const buttonElement = editProfilePopup.querySelector(
    configObj.submitButtonSelector
  );
  const editProfileForm = editProfilePopup.querySelector(
    configObj.formSelector
  );
  const editProfileFormValidator = new FormValidator(
    configObj,
    editProfileForm
  );

  fillProfileForm();
  openPopup(editProfilePopup);
  editProfileFormValidator.resetValidation(inputList, buttonElement);
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
  const addPlaceForm = addCardPopup.querySelector(configObj.formSelector);
  const inputList = [...addPlaceForm.querySelectorAll(configObj.inputSelector)];
  const buttonElement = addPlaceForm.querySelector(
    configObj.submitButtonSelector
  );
  const cardElement = new Card(newPlace, templateSelector);
  const addPlaceFormValidator = new FormValidator(configObj, addPlaceForm);

  cardsGallery.prepend(cardElement.generateCard());
  addPlaceForm.reset();
  addPlaceFormValidator.resetValidation(inputList, buttonElement);

  closePopup(addCardPopup);
};

//fill edit profile popup inputs
const fillProfileForm = () => {
  nameInputValue.value = profileName.textContent;
  descriptionInputvalue.value = profileTitle.textContent;
};

export {
  openPopup,
  closePopup,
  handleEditButtonClick,
  handleProfileEditFormSubmit,
  handleAddPlaceFormSubmit,
};
