import "./pages/main.css";

import Header from "./js/components/Header";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form";

import NewsApi from "./js/api/NewsApi";

import dateParser from "./js/utils/date-parser";

(function () {
  const headerItem = document.querySelector(".header");
  const popupItem = document.querySelector(".popup");
  const loginPopupItem = document.querySelector(".login-popup");
  const signupPopupItem = document.querySelector(".signup-popup");
  const searchFormItem = document.querySelector(".search__form");

  const errorMessages = {
    valueMissing: "Это обязательное поле",
    tooShort2: "Должно быть от 2 до 30 символов",
    tooShort6: "Должно быть от 6 до 30 символов",
    typeMismatch: "Здесь должна быть ссылка",
  };

  const formSelectors = {
    button: ".button",
    buttonActive: "popup__button_active",
    input: ".input",
  };

  const newsApi = new NewsApi(
    "Apple",
    dateParser(),
    "publishedAt",
    "100",
    "ru",
    "393933fc023c43db92ea162494a5ec25"
  );

  let cardsData;

  newsApi
    .getNews()
    .then((res) => {
      cardsData = res.articles;
      console.log(cardsData);
    })
    .catch((err) => console.log(err.message));

  const searchForm = new Form(
    "search",
    searchFormItem,
    formSelectors,
    errorMessages
  );
  const loginForm = new Form("login", null, formSelectors, errorMessages);
  const signupForm = new Form("signup", null, formSelectors, errorMessages);
  searchForm.setEventListeners();

  const changePopup = (type, currentPopup, login) => {
    currentPopup.close();

    if (login) {
      // RES POPUP
    } else if (type === "login") {
      signupPopup.setContent();
      signupPopup.open();
    } else {
      loginPopup.setContent();
      loginPopup.open();
    }
  };

  const setFormListeners = (formItem) => {
    if (formItem.name === "signup") {
      signupForm.setForm(formItem);
      signupForm.setEventListeners();
    } else if (formItem.name === "login") {
      loginForm.setForm(formItem);
      loginForm.setEventListeners();
    }
  };

  const removeFormListeners = (formItem) => {
    if (formItem.name === "signup") {
      signupForm.removeEventListeners();
    } else if (formItem.name === "login") {
      loginForm.removeEventListeners();
    }
  };

  const loginPopup = new Popup(
    popupItem,
    loginPopupItem.content.cloneNode(true),
    changePopup,
    "login",
    setFormListeners,
    removeFormListeners
  );
  const signupPopup = new Popup(
    popupItem,
    signupPopupItem.content.cloneNode(true),
    changePopup,
    "signup",
    setFormListeners,
    removeFormListeners
  );

  const login = () => {
    loginPopup.setContent();
    loginPopup.open();
  };

  const logout = () => {
    alert("Вы действительно хотите выйти?");
    console.log("logout");
  };

  const header = new Header(headerItem, "dark", "Andrey", login, logout);

  loginPopup.setEventListeners();
  signupPopup.setEventListeners();

  header.render();
})();
