import "./pages/main.css";

import Header from "./js/components/Header";
import Popup from "./js/components/Popup";
import Form from "./js/components/Form";
import NewsCardList from "./js/components/NewsCardList";
import NewsCard from "./js/components/NewsCard";

import MainApi from "./js/api/MainApi";
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
  const newsCard = document.querySelector(".card-item").content;

  const newsApi = new NewsApi(
    null,
    dateParser(),
    "publishedAt",
    "100",
    "ru",
    apiKey
  );

  const mainApi = new MainApi("http://localhost:3000");

  const login = () => {
    loginPopup.setContent();
    loginPopup.open();
  };

  const logout = async () => {
    if (confirm("Вы действительно хотите выйти")) {
      const res = await mainApi.logout();
      console.log(res);
      window.localStorage.removeItem("jwt");
      window.localStorage.removeItem("name");
      // header.render(false, null);
      location.reload();
    }
  };

  const header = new Header(headerItem, "dark", login, logout);

  if (window.localStorage.getItem("jwt")) {
    header.render(true, window.localStorage.getItem("name"));
  } else {
    header.render(false, null);
  }

  let cardsData;
  let searchTopic;

  const saveArticle = async (article, isAlreadySaved) => {
    if (isAlreadySaved) {
      await mainApi.removeArticle(article);
      article.setId(null);
    } else {
      const articleData = await mainApi.createArticle(article, searchTopic);
      article.setId(articleData.data._id);
    }
  };

  const renderCard = (source, title, publishedAt, description, url, urlToImage) => {
    const card = new NewsCard(
      newsCard,
      source,
      title,
      publishedAt,
      description,
      url,
      urlToImage,
      saveArticle
    );

    if (window.localStorage.getItem("jwt")) {
      card.setEventListeners();
    }

    card.renderIcon();

    return card.create();
  };

  const cardList = new NewsCardList(
    resultsFoundBlock,
    resultsLoadingBlock,
    resultsNotFoundBlock,
    [],
    renderCard
  );

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

  const sendData = async (data, type) => {
    switch (type) {
      case "search":
        resultsBlock.style.display = "flex";
        cardList.renderLoader();
        cardList.toggleButton(true);
        newsApi.setTopic(data);
        newsApi
          .getNews()
          .then(({ data, topic }) => {
            searchTopic = topic;
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
        const logInfo = await mainApi.signin(data);
        if (logInfo.token) {
          window.localStorage.setItem("jwt", logInfo.token);
          loginPopup.close();

          const userData = await mainApi.getUserData();
          window.localStorage.setItem("name", userData.name);
          // header.render(true, userData.name);
          location.reload();
        } else {
          loginForm.setServerError(logInfo);
        }

        break;
      case "signup":
        signupPopup.close();
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

  loginPopup.setEventListeners();
  signupPopup.setEventListeners();
})();
