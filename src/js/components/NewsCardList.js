export default class NewsCardList {
  constructor(container, loader, notFound, initialCards, renderCard) {
    this.container = container;
    this.loader = loader;
    this.notFound = notFound;
    this.initialCards = initialCards;
    this.renderCard = renderCard;
    this.cards = [];
    this.cardsContainer = this.container.querySelector(".results__container");
    this.buttonMore = this.container.querySelector(".results__button");
  }

  renderResults = () => {
    this.cards = this.initialCards.map((card) =>
      this.renderCard(
        card.source.name,
        card.title,
        card.publishedAt,
        card.description,
        card.url,
        card.urlToImage
      )
    );

    for (this.counter = 0; this.counter < 3; this.counter++) {
      this.cardsContainer.appendChild(this.cards[this.counter]);
    }

    this.buttonMore.addEventListener("click", this.showMore);

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

  showMore = () => {
    this.counter += 3;

    for (let i = this.counter - 3; i < this.counter; i++) {
      this.cardsContainer.appendChild(this.cards[i]);

      if (this.cards[i + 1] === undefined) {
        this.toggleButton(false);
        break;
      }
    }
  };

  addCard = (card) => {
    this.initialCards.push(card);
  };

  clearData = () => {
    this.initialCards = [];
    while (this.cardsContainer.firstChild) {
      this.cardsContainer.removeChild(this.cardsContainer.lastChild);
    }
  };

  toggleButton = (visible) => {
    if (visible) {
      this.buttonMore.style.display = "block";
    } else {
      this.buttonMore.style.display = "none";
    }
  };
}
