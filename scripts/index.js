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

const mainContent = document.querySelector(".content");
const profile = mainContent.querySelector(".profile");
const profileName = mainContent.querySelector(".profile__name");
const profileTitle = mainContent.querySelector(".profile__title");
const cardsGallery = mainContent.querySelector(".gallery__cards");
const cardTemplate = mainContent.querySelector("#card").content;
const addModal = document.querySelector(".modal_content_add-place");
const addButton = mainContent.querySelector(".profile__add-button");
const addModalCloseButton = addModal.querySelector(".form__button_type_close");
const editButton = mainContent.querySelector(".profile__edit-button");
const editModal = document.querySelector(".modal_content_edit-profile");
const editModalCloseButton = editModal.querySelector(
  ".form__button_type_close"
);

const toggleModal = (modal) => {
  modal.classList.toggle("modal_opened");
};

const handleProfileEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = editModal.querySelector(
    ".form__input_content_name"
  ).value;
  profileTitle.textContent = editModal.querySelector(
    ".form__input_content_title"
  ).value;
  toggleModal(editModal);
};

const handleAddPlaceFormSubmit = (evt) => {
  evt.preventDefault();
  const placeName = addModal.querySelector(".form__input_content_title").value;
  const placeLink = addModal.querySelector(".form__input_content_link").value;
  const newPlace = { name: placeName, link: placeLink };
  const newCard = getCardElement(newPlace);
  cardsGallery.prepend(newCard);
  toggleModal(addModal);
};

const getCardElement = (data) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  return cardElement;
};

initialCards.forEach((card) => {
  cardsGallery.append(getCardElement(card));
});

profile.addEventListener("click", (evt) => {
  if (evt.target === editButton) {
    toggleModal(editModal);
    editModal.querySelector(".form__input_content_name").value =
      profileName.textContent;
    editModal.querySelector(".form__input_content_title").value =
      profileTitle.textContent;
    editModal
      .querySelector(".modal__form")
      .addEventListener("submit", handleProfileEditFormSubmit);
  }
  if (evt.target === addButton) {
    toggleModal(addModal);
    addModal.querySelector(".form__input_content_title").value = "";
    addModal.querySelector(".form__input_content_link").value = "";
    addModal
      .querySelector(".modal__form")
      .addEventListener("submit", handleAddPlaceFormSubmit);
  }
});

editModalCloseButton.addEventListener("click", () => toggleModal(editModal));
addModalCloseButton.addEventListener("click", () => toggleModal(addModal));

cardsGallery.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button-clicked");
  }
});
