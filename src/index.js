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

  const newsApi = new NewsApi(
    "Москва",
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

  const searchForm = new Form("search", searchFormItem);
  searchForm.setEventListeners();

  const changePopup = (type, currentPopup) => {
    currentPopup.close();

    if (type === "login") {
      signupPopup.setContent();
      signupPopup.open();
    } else {
      loginPopup.setContent();
      loginPopup.open();
    }
  };

  const loginPopup = new Popup(
    popupItem,
    loginPopupItem.content.cloneNode(true),
    changePopup,
    "login"
  );
  const signupPopup = new Popup(
    popupItem,
    signupPopupItem.content.cloneNode(true),
    changePopup,
    "signup"
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
