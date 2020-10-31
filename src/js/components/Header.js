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

  toggleList = () => {
    const mobileHeader = this.header.querySelector(".header__container");

    if (document.documentElement.clientWidth <= 575) {
      if (this.openButton.classList.contains('header__open_close')) {
        this.openButton.classList.remove('header__open_close');
        this.header.classList.remove("header_dark");
        mobileHeader.classList.remove("header__container_is-opened");
      } else {
        this.openButton.classList.add('header__open_close');
        this.header.classList.add("header_dark");
        mobileHeader.classList.add("header__container_is-opened");
      }
    }
  }

  setEventListeners = (action) => {
    const button = this.headerList.querySelector(".header__button");
    this.openButton = this.header.querySelector(".header__open");

    this.openButton.addEventListener('click', this.toggleList);

    if (action === "login") {
      button.addEventListener("click", this.login);
      button.removeEventListener("click", this.logout);
    } else {
      button.addEventListener("click", this.logout);
      button.removeEventListener("click", this.login);
    }
  };
}
