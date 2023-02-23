import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { configObj } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
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
const imagePreviewPopupSelector = ".modal_content_card-preview";
const deleteConfirmPopupSelector = ".modal_content_card-delete-confirm";
const editProfileAvatarPopupSelector = ".modal_content_edit-avatar";

//forms
const editProfileForm = document
  .querySelector(editProfilePopupSelector)
  .querySelector(configObj.formSelector);
const addPlaceForm = document
  .querySelector(addCardPopupSelector)
  .querySelector(configObj.formSelector);
const editProfileAvatarForm = document
  .querySelector(editProfileAvatarPopupSelector)
  .querySelector(configObj.formSelector);

//form validators
const editProfileFormValidator = new FormValidator(configObj, editProfileForm);
const addPlaceFormValidator = new FormValidator(configObj, addPlaceForm);
const editProfileAvatarFormValidator = new FormValidator(
  configObj,
  editProfileAvatarForm
);

//buttons
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileAvatarButton = document.querySelector(
  ".profile__image-edit-button"
);

//image preview popup
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

//show loading class
const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Saving...";
  } else {
    button.textContent = "Save";
  }
};

//handler functions
const handleDeleteBinClick = (cardId, card) => {
  deleteCardConfirmPopup.setCallback(() => {
    api
      .deleteCard({ cardId })
      .then(() => {
        card.remove();
        deleteCardConfirmPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  deleteCardConfirmPopup.open();
};
const handleEditButtonClick = () => {
  fillProfileForm();

  editProfileFormValidator.checkInputErrors();
  editProfileFormValidator.resetButtonState();
  editProfilePopup.open();
};
const handleProfileEditFormSubmit = ({ name, description }, button) => {
  renderLoading(true, button);
  api
    .editUserInfo({ name, description })
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
        avatar: res.avatar,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
};
const handleAddPlaceFormSubmit = ({ title, link }, button) => {
  renderLoading(true, button);
  api
    .addNewCard({ name: title, link })
    .then((res) => {
      const cardElement = createCard({ data: res, isUserCard: true });

      cardsGallery.prepend(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
};
const handleImageClick = (card) => {
  imagePreviewPopup.open(card);
};
const handleAddCardLike = (cardId, cardLikeCount) => {
  api
    .addCardLike({ cardId })
    .then((res) => {
      cardLikeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};
const handleRemoveCardLike = (cardId, cardLikeCount) => {
  api
    .removeCardLike({ cardId })
    .then((res) => {
      cardLikeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};
const handleEditProfileAvatarSubmit = ({ link }, button) => {
  renderLoading(true, button);
  api
    .updateProfileAvatar({ link })
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
        avatar: res.avatar,
      });
      editProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
};

//create card element
const createCard = ({ data, isUserCard, isLiked }) => {
  const cardElement = new Card({
    data,
    templateSelector,
    handleImageClick,
    isUserCard,
    handleDeleteBinClick,
    isLiked,
    handleAddCardLike,
    handleRemoveCardLike,
  });
  return cardElement.generateCard();
};

//validate forms
const enableValidation = () => {
  addPlaceFormValidator.enableValidation();
  editProfileFormValidator.enableValidation();
  editProfileAvatarFormValidator.enableValidation();
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

//delete card confirmation popup
const deleteCardConfirmPopup = new PopupWithConfirmation({
  popupSelector: deleteConfirmPopupSelector,
});
deleteCardConfirmPopup.setEventListeners();

//change avatar popup
const editProfileAvatarPopup = new PopupWithForm(
  editProfileAvatarPopupSelector,
  handleEditProfileAvatarSubmit
);
editProfileAvatarPopup.setEventListeners();
editProfileAvatarButton.addEventListener("click", () => {
  editProfileAvatarFormValidator.resetButtonState();
  editProfileAvatarPopup.open();
});

enableValidation();

api
  .showPromiseStatus()
  .then(({ initialCards, fetchedUserInfo }) => {
    userInfo.setUserInfo({
      name: fetchedUserInfo.name,
      description: fetchedUserInfo.about,
      avatar: fetchedUserInfo.avatar,
    });
    const cardGallery = new Section(
      {
        items: initialCards,
        renderer: (card) => {
          const cardElement = createCard({
            data: card,
            isUserCard: fetchedUserInfo._id === card.owner._id,
            isLiked: card.likes.some(
              (like) => like._id === fetchedUserInfo._id
            ),
          });
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
