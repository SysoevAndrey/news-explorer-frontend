import "../pages/articles.css";

import Header from "../js/components/Header";
import MainApi from "../js/api/MainApi";
import NewsCard from "../js/components/NewsCard";
import NewsCardList from "../js/components/NewsCardList";

import { endings } from "../js/constants/constants";

(async function () {
  const headerItem = document.querySelector(".header");
  const infoTitleItem = document.querySelector(".info__title");
  const infoTopicsItem = document.querySelector(".info__strong");
  const infoTopicsEndItem = document.querySelector(".info__strong_third");
  const resultsBlock = document.querySelector(".results");
  const resultsLoadingBlock = resultsBlock.querySelector(".results__loading");
  const resultsFoundBlock = resultsBlock.querySelector(".results__found");
  const resultsNotFoundBlock = resultsBlock.querySelector(
    ".results__not-found"
  );
  const newsCard = document.querySelector(".card-item").content;

  if (!window.localStorage.getItem("jwt")) {
    window.location.href = "/";
  }

  const mainApi = new MainApi("https://api.getnews.gq");

  const logout = async () => {
    if (confirm("Вы действительно хотите выйти")) {
      await mainApi.logout();
      window.localStorage.removeItem("jwt");
      window.localStorage.removeItem("name");
      // header.render(false, null);
      window.location.reload();
    }
  };

  const header = new Header(headerItem, "light", null, logout);

  header.render(true, window.localStorage.getItem("name"));

  const savedArticles = await mainApi.getArticles();
  const keywords = savedArticles.data.map((article) => article.keyword);

  const uniqueKeywords = [];

  keywords.forEach((keyword) => {
    if (uniqueKeywords.find((obj) => obj.keyword === keyword)) {
      const found = uniqueKeywords.find((obj) => obj.keyword === keyword);
      found.repeats++;
    } else {
      uniqueKeywords.push({ keyword, repeats: 1 });
    }
  });

  const sortedUniqueKeywords = uniqueKeywords.sort(
    (a, b) => b.repeats - a.repeats
  );

  infoTitleItem.textContent = `${window.localStorage.getItem("name")}, у вас ${
    keywords.length
  } ${endings[uniqueKeywords.length % 10]}`;

  if (sortedUniqueKeywords[0] && sortedUniqueKeywords[1]) {
    infoTopicsItem.textContent = `${sortedUniqueKeywords[0].keyword}, ${sortedUniqueKeywords[1].keyword}`;
  } else if (sortedUniqueKeywords[0]) {
    infoTopicsItem.textContent = `${sortedUniqueKeywords[0].keyword}`;
  }

  if (uniqueKeywords.length <= 3 && uniqueKeywords.length > 2) {
    infoTopicsEndItem.textContent = sortedUniqueKeywords[2].keyword;
  } else {
    if ((uniqueKeywords.length % 10) - 2 === 1) {
      infoTopicsEndItem.textContent = `${uniqueKeywords.length - 2}-ой другой`;
    } else {
      infoTopicsEndItem.textContent = `${uniqueKeywords.length - 2}-м другим`;
    }
  }

  const removeArticle = async (article) => {
    await mainApi.removeArticle(article);

    newsCardList.removeArticle(article.card);
  };

  const renderCard = (
    source,
    title,
    publishedAt,
    description,
    url,
    urlToImage,
    keyword,
    _id
  ) => {
    const card = new NewsCard(
      newsCard,
      source,
      title,
      publishedAt,
      description,
      url,
      urlToImage,
      keyword,
      _id,
      removeArticle
    );

    card.setEventListeners();

    card.renderIcon();

    return card.create();
  };

  const formattedData = savedArticles.data.map((article) => {
    const temp = {
      source: {
        name: article.source,
      },
      title: article.title,
      publishedAt: article.date,
      description: article.text,
      url: article.link,
      urlToImage: article.image,
      keyword: article.keyword,
      _id: article._id,
    };
    return temp;
  });

  const newsCardList = new NewsCardList(
    resultsFoundBlock,
    resultsLoadingBlock,
    resultsNotFoundBlock,
    formattedData.reverse(),
    renderCard
  );

  resultsBlock.style.display = "flex";

  newsCardList.renderResults(savedArticles.data.length, true);
})();
