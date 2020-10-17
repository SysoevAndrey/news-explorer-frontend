export default class Header {
  constructor(header, theme, userName) {
    this.header = header;
    this.theme = theme;

    this.props = {
      isLoggedIn: false,
      userName: userName,
    };
  }

  render = () => {
    let headerList;

    if (this.props.isLoggedIn) {
      headerList = document.querySelector("#logged").content.cloneNode(true);

      headerList.querySelector(
        ".header__button-text"
      ).textContent = this.props.userName;
    } else {
      headerList = document.querySelector("#unlogged").content.cloneNode(true);
    }

    if (this.theme === "light") {
      this.header.classList.add("header_light");

      headerList
        .querySelector(".header__list-item_current")
        .classList.add("header__list-item_current-light");

      headerList
        .querySelector(".header__button")
        .classList.add("header__button_light");

        headerList
        .querySelector(".header__button-text")
        .classList.add("header__button-text_light");
    }

    this.header.appendChild(headerList.querySelector(".header__container"));
  };
}
