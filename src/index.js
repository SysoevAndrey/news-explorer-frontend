import "./pages/main.css";

import Header from "./js/components/Header";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form";
import NewsCardList from "./js/components/NewsCardList";
import NewsCard from "./js/components/NewsCard";

import NewsApi from "./js/api/NewsApi";

import dateParser from "./js/utils/date-parser";

import { errorMessages, formSelectors, apiKey } from "./js/constants/constants";

(function () {
  const headerItem = document.querySelector(".header");
  const popupItem = document.querySelector(".popup");
  const loginPopupItem = document.querySelector(".login-popup");
  const signupPopupItem = document.querySelector(".signup-popup");
  const searchFormItem = document.querySelector(".search__form");
  const resultsBlock = document.querySelector(".results");
  const resultsLoadingBlock = resultsBlock.querySelector(".results__loading");
  const resultsFoundBlock = resultsBlock.querySelector(".results__found");
  const resultsNotFoundBlock = resultsBlock.querySelector(
    ".results__not-found"
  );
  const newsCard = document
    .querySelector(".card-item")
    .content;

  const newsApi = new NewsApi(
    null,
    dateParser(),
    "publishedAt",
    "100",
    "ru",
    apiKey
  );

  let cardsData;

  const renderCard = (source, title, publishedAt, description, urlToImage) => {
    const card = new NewsCard(newsCard, source, title, publishedAt, description, urlToImage);

    return card.create();
  };

  const cardList = new NewsCardList(
    resultsFoundBlock,
    resultsLoadingBlock,
    resultsNotFoundBlock,
    [],
    renderCard,
    "test_id"
  );

  const sendData = (data, type) => {
    switch (type) {
      case "search":
        resultsBlock.style.display = "flex";
        cardList.renderLoader();
        newsApi.setTopic(data);
        newsApi
          .getNews()
          .then((data) => {
            if (!data.articles.length) {
              cardList.renderError();
            } else {
              cardsData = data.articles;
              cardList.clearData();
              cardsData.forEach((card) => cardList.addCard(card));
              cardList.renderResults();
            }
          })
          .catch((err) => console.log(err.message));

        break;
      case "login":
        // login(data);
        break;
      case "signup":
        // signupForm(data);
        break;
    }
  };

  const searchForm = new Form(
    "search",
    searchFormItem,
    formSelectors,
    errorMessages,
    sendData
  );
  const loginForm = new Form(
    "login",
    null,
    formSelectors,
    errorMessages,
    sendData
  );
  const signupForm = new Form(
    "signup",
    null,
    formSelectors,
    errorMessages,
    sendData
  );
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
