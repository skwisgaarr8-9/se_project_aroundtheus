import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { configObj, initialCards } from "./constants.js";
import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";

//profile nodes
const profileNameSelector = ".profile__name";
const profileDescriptionSelector = ".profile__title";

//input values
const nameInputValue = document.querySelector(".form__input_content_name");
const descriptionInputValue = document.querySelector(
  ".form__input_content_description"
);

//template selector
const templateSelector = "#card";

// //modals selectors
const addCardPopupSelector = ".modal_content_add-place";
const editProfilePopupSelector = ".modal_content_edit-profile";
const imagePreviewPopupSelector = ".modal_content-card-preview";

//forms
const editProfileForm = document
  .querySelector(editProfilePopupSelector)
  .querySelector(configObj.formSelector);
const addPlaceForm = document
  .querySelector(addCardPopupSelector)
  .querySelector(configObj.formSelector);

//form validators
const editProfileFormValidator = new FormValidator(configObj, editProfileForm);
const addPlaceFormValidator = new FormValidator(configObj, addPlaceForm);

//buttons
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

//user info
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileDescriptionSelector,
});

//gallery wrapper
const cardsGallery = document.querySelector(".gallery__cards");

//handler functions
const handleEditButtonClick = () => {
  nameInputValue.value = userInfo.getUserInfo().name;
  descriptionInputValue.value = userInfo.getUserInfo().job;
  editProfileFormValidator.checkInputErrors();
  editProfileFormValidator.resetButtonState();
  editProfilePopup.open();
};
const handleProfileEditFormSubmit = ({ name, description }) => {
  userInfo.setUserInfo({
    name,
    description,
  });

  editProfilePopup.close();
};
const handleAddPlaceFormSubmit = ({ title, link }) => {
  const newPlace = { name: title, link: link };
  const cardElement = createCard(newPlace);

  cardsGallery.prepend(cardElement);
  addPlaceForm.reset();
  addPlaceFormValidator.resetButtonState();
  addCardPopup.close();
};
const handleImageClick = ({ title, link }) => {
  const imagePreviewPopup = new PopupWithImage(imagePreviewPopupSelector);
  imagePreviewPopup.setEventListeners();
  imagePreviewPopup.open({ title, link });
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

//edit profile popup
const editProfilePopup = new PopupWithForm(
  editProfilePopupSelector,
  handleProfileEditFormSubmit
);
editProfilePopup.setEventListeners();
editProfileButton.addEventListener("click", () => {
  handleEditButtonClick();
});

//add card popup
const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  handleAddPlaceFormSubmit
);
addCardPopup.setEventListeners();
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

//create cardGallery section
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
enableValidation();
