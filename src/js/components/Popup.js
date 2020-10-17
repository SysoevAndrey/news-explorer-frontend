export default class Popup {
  constructor(popup, content, changePopup, type) {
    this.popup = popup;
    this.content = content.querySelector(".popup__content");
    this.changePopup = changePopup;
    this.type = type;
  }

  setContent = () => {
    this.popup.appendChild(this.content);
  };

  clearContent = () => {
    this.popup.removeChild(this.content);
  };

  open = () => {
    this.popup.classList.add("popup_is-opened");
  };

  close = () => {
    this.popup.classList.remove("popup_is-opened");
    this.clearContent();
  };

  setEventListeners = () => {
    this.content
      .querySelector(".popup__close")
      .addEventListener("click", this.close);

    this.content
      .querySelector(".popup__link")
      .addEventListener("click", this.changePopup.bind(null, this.type, this));
  };
}
