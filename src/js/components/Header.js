export default class Header {
  constructor(header, theme, login, logout) {
    this.header = header;
    this.theme = theme;
    this.login = login;
    this.logout = logout;
  }

  render = (isLoggedIn, userName) => {
    this.props = {
      isLoggedIn,
      userName,
    };

    this.currentList = document.querySelector(".header__container");

    if (this.currentList) {
      this.header.removeChild(this.currentList);
    }

    if (this.props.isLoggedIn) {
      this.headerList = document
        .querySelector("#logged")
        .content.cloneNode(true);

      this.headerList.querySelector(
        ".header__button-text"
      ).textContent = this.props.userName;

      this.setEventListeners("logout");
    } else {
      this.headerList = document
        .querySelector("#unlogged")
        .content.cloneNode(true);
      this.setEventListeners("login");
    }

    if (this.theme === "light") {
      this.header.classList.add("header_light");

      this.headerList
        .querySelector(".header__list-item_current")
        .classList.add("header__list-item_current-light");

      this.headerList
        .querySelector(".header__button")
        .classList.add("header__button_light");

      this.headerList
        .querySelector(".header__button-text")
        .classList.add("header__button-text_light");
    }

    this.header.appendChild(
      this.headerList.querySelector(".header__container")
    );
  };

  setEventListeners = (action) => {
    const button = this.headerList.querySelector(".header__button");

    if (action === "login") {
      button.addEventListener("click", this.login);
      button.removeEventListener("click", this.logout);
    } else {
      button.addEventListener("click", this.logout);
      button.removeEventListener("click", this.login);
    }
  };
}
