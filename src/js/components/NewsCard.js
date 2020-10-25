import dateFormatter from '../utils/date-formatter';

export default class NewsCard {
  constructor(card, source, title, publishedAt, description, urlToImage) {
    this.card = card.cloneNode(true).querySelector(".card");
    this.source = source;
    this.title = title;
    this.publishedAt = publishedAt;
    this.description = description;
    this.urlToImage = urlToImage;
  }

  create = () => {
    this.card.querySelector(".card__image").style.backgroundImage = `url(${this.urlToImage})`;
    this.card.querySelector(".card__date").textContent = dateFormatter(this.publishedAt);
    this.card.querySelector(".card__title").textContent = this.title;
    this.card.querySelector(".card__text").textContent = this.description;
    this.card.querySelector(".card__source").textContent = this.source;

    return this.card;
  };

  renderIcon = () => {};
}
