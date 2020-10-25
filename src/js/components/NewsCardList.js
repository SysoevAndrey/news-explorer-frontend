export default class NewsCardList {
  constructor(container, loader, notFound, initialCards, renderCard, user) {
    this.container = container;
    this.loader = loader;
    this.notFound = notFound;
    this.initialCards = initialCards;
    this.renderCard = renderCard;
    this.user = user;
    this.cards = [];
    this.cardsContainer = this.container.querySelector(".results__container");
  }

  renderResults = () => {
    this.cards = this.initialCards.map((card) =>
      this.renderCard(
        card.source.name,
        card.title,
        card.publishedAt,
        card.description,
        card.urlToImage
      )
    );

    for (let i = 0; i < 3; i++) {
      this.cardsContainer.appendChild(this.cards[i]);
    }

    this.container.style.display = "flex";
    this.loader.style.display = "none";
    this.notFound.style.display = "none";
  };

  renderLoader = () => {
    this.container.style.display = "none";
    this.loader.style.display = "flex";
    this.notFound.style.display = "none";
  };

  renderError = () => {
    this.container.style.display = "none";
    this.loader.style.display = "none";
    this.notFound.style.display = "flex";
  };

  showMore = () => {};

  addCard = (card) => {
    this.initialCards.push(card);
  };

  clearData = () => {
    this.initialCards = [];
    while (this.cardsContainer.firstChild) {
      this.cardsContainer.removeChild(this.cardsContainer.lastChild);
    }
  }
}
