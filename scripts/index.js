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
const editButton = mainContent.querySelector(".profile__edit-button");
const modal = mainContent.querySelector(".modal");
const modalCloseButton = mainContent.querySelector(".form__button_type_close");
const profileName = mainContent.querySelector(".profile__name");
const profileTitle = mainContent.querySelector(".profile__title");
const nameInput = modal.querySelector(".form__input_content_name");
const titleInput = modal.querySelector(".form__input_content_title");

function toggleModal() {
  modal.classList.toggle("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  toggleModal();
}

modal.addEventListener("submit", handleProfileFormSubmit);
editButton.addEventListener("click", function () {
  toggleModal();
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
});
modalCloseButton.addEventListener("click", toggleModal);
