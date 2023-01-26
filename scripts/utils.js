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
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
};

export { openPopup, closePopup };
