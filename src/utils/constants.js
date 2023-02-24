export const configObj = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

//profile nodes
export const profileNameSelector = ".profile__name";
export const profileDescriptionSelector = ".profile__title";
export const profileAvatarSelector = ".profile__image";

//template selector
export const templateSelector = "#card";

// //modals selectors
export const addCardPopupSelector = ".modal_content_add-place";
export const editProfilePopupSelector = ".modal_content_edit-profile";
export const imagePreviewPopupSelector = ".modal_content_card-preview";
export const deleteConfirmPopupSelector = ".modal_content_card-delete-confirm";
export const editProfileAvatarPopupSelector = ".modal_content_edit-avatar";

//api variables
export const apiBaseUrl = "https://around.nomoreparties.co/v1/group-12";
export const apiHeaderObject = {
  authorization: "02e654eb-5ace-4af7-a9f1-ec1c835dc4d8",
  "Content-Type": "application/json",
};

//buttons
export const addCardButton = document.querySelector(".profile__add-button");
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const editProfileAvatarButton = document.querySelector(
  ".profile__image-edit-button"
);

//form validators
export const formValidators = {};
