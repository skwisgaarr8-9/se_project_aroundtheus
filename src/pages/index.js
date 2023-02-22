import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { configObj, initialCards } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";

//api variables
const apiBaseUrl = "https://around.nomoreparties.co/v1/group-12";
const apiHeaderObject = {
  authorization: "02e654eb-5ace-4af7-a9f1-ec1c835dc4d8",
  "Content-Type": "application/json",
};

//api class
const api = new Api({ baseUrl: apiBaseUrl, headers: apiHeaderObject });

//profile nodes
const profileNameSelector = ".profile__name";
const profileDescriptionSelector = ".profile__title";
const profileAvatarSelector = ".profile__image";

//input values
const nameInput = document.querySelector(".form__input_content_name");
const descriptionInput = document.querySelector(
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

//image preview pop up
const imagePreviewPopup = new PopupWithImage(imagePreviewPopupSelector);
imagePreviewPopup.setEventListeners();

//user info
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileDescriptionSelector,
  avatarSelector: profileAvatarSelector,
});

//gallery wrapper
const cardsGallery = document.querySelector(".gallery__cards");

//fill profile form
const fillProfileForm = () => {
  const user = userInfo.getUserInfo();

  nameInput.value = user.name;
  descriptionInput.value = user.job;
};

//handler functions
const handleEditButtonClick = () => {
  fillProfileForm();

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

  api.editUserInfo({ name, description });
};
const handleAddPlaceFormSubmit = ({ title, link }) => {
  const newPlace = { name: title, link: link };
  const cardElement = createCard(newPlace);

  cardsGallery.prepend(cardElement);
  addCardPopup.close();
};
const handleImageClick = (card) => {
  imagePreviewPopup.open(card);
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
editProfileButton.addEventListener("click", handleEditButtonClick);

//add card popup
const addCardPopup = new PopupWithForm(
  addCardPopupSelector,
  handleAddPlaceFormSubmit
);
addCardPopup.setEventListeners();
addCardButton.addEventListener("click", () => {
  addPlaceFormValidator.resetButtonState();
  addCardPopup.open();
});

enableValidation();

api
  .showPromiseStatus()
  .then(({ initialCards, fetchedUserInfo }) => {
    userInfo.setUserInfo({
      name: fetchedUserInfo.name,
      description: fetchedUserInfo.about,
    });
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
  })
  .catch((err) => {
    console.log(err);
  });
