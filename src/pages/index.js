import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  configObj,
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  templateSelector,
  addCardPopupSelector,
  editProfilePopupSelector,
  imagePreviewPopupSelector,
  deleteConfirmPopupSelector,
  editProfileAvatarPopupSelector,
  apiBaseUrl,
  apiHeaderObject,
  addCardButton,
  editProfileButton,
  editProfileAvatarButton,
  formValidators,
} from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";

//api class
const api = new Api({ baseUrl: apiBaseUrl, headers: apiHeaderObject });

//image preview popup
const imagePreviewPopup = new PopupWithImage(imagePreviewPopupSelector);
imagePreviewPopup.setEventListeners();

//user info
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileDescriptionSelector,
  avatarSelector: profileAvatarSelector,
});

//fill profile form
const fillProfileForm = () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
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

  formValidators["profile-form"].checkInputErrors();
  formValidators["profile-form"].resetButtonState();
  editProfilePopup.open();
};
const handleProfileEditFormSubmit = ({ name, description }, button) => {
  editProfilePopup.renderLoading(true);
  api
    .editUserInfo({ name, description })
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
};
const handleAddPlaceFormSubmit = ({ title, link }, button) => {
  addCardPopup.renderLoading(true);
  api
    .addNewCard({ name: title, link })
    .then((res) => {
      const cardElement = createCard({ data: res, isUserCard: true });

      cardGallery.prependItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
};
const handleImageClick = (card) => {
  imagePreviewPopup.open(card);
};
const handleAddCardLike = (card) => {
  api
    .addCardLike(card.getCardId())
    .then((res) => {
      card.addLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const handleRemoveCardLike = (card) => {
  api
    .removeCardLike(card.getCardId())
    .then((res) => {
      card.removeLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const handleEditProfileAvatarSubmit = ({ link }, button) => {
  editProfileAvatarPopup.renderLoading(true);
  api
    .updateProfileAvatar({ link })
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfileAvatarPopup.renderLoading(false);
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
  const formList = [...document.querySelectorAll(configObj.formSelector)];
  formList.forEach((formElement) => {
    const validator = new FormValidator(configObj, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
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
  formValidators["card-form"].resetButtonState();
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
  formValidators["avatar-form"].resetButtonState();
  editProfileAvatarPopup.open();
});

//card gallery section class
const cardGallery = new Section(
  {
    renderer: (card) => {
      const cardElement = createCard({
        data: card,
        isUserCard: userInfo.getUserInfo().id === card.owner._id,
        isLiked: card.likes.some(
          (like) => like._id === userInfo.getUserInfo().id
        ),
      });
      cardGallery.setItem(cardElement);
    },
  },
  ".gallery__cards"
);

//rendering the cards and user info
api
  .showPromiseStatus()
  .then(({ initialCards, fetchedUserInfo }) => {
    userInfo.setUserInfo(fetchedUserInfo);
    cardGallery.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

//validating all forms
enableValidation();
