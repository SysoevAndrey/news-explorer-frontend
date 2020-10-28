import dateFormatter from "../utils/date-formatter";

export default class NewsCard {
  constructor(card, source, title, publishedAt, description, url, urlToImage, save) {
    this.card = card.cloneNode(true).querySelector(".card");
    this.source = source;
    this.title = title;
    this.publishedAt = dateFormatter(publishedAt);
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.save = save;
    this.saved = false;
    this.icon = this.card.querySelector(".card__save-icon");
  }

  setId = (_id) => {
    this._id = _id;
    console.log(this)
  }

  create = () => {
    let image;
    const path = "./images/no-image.png";

    if (this.urlToImage !== null) {
      image = `url(${this.urlToImage})`;
    } else {
      image = `url(${path})`;
    }

    this.card.querySelector(".card__image").style.backgroundImage = image;
    this.card.querySelector(".card__date").textContent = this.publishedAt;
    this.card.querySelector(".card__title").textContent = this.title;
    this.card.querySelector(".card__text").textContent = this.description;
    this.card.querySelector(".card__source").textContent = this.source;

    return this.card;
  };

  renderIcon = () => {
    const iconText = this.card.querySelector(".card__additional_type_save");

    if (window.localStorage.getItem("jwt")) {
      iconText.style.display = "none";

      if (!this.saved) {
        this.icon.classList.remove("card__save-icon_saved");
      } else {
        this.icon.classList.add("card__save-icon_saved");
      }
      this.saved = !this.saved;
    }
  };

  setEventListeners = () => {
    this.icon.addEventListener("click", () => {
      if (this.icon.classList.contains("card__save-icon_saved")) {
        this.save(this, true);
      } else {
        this.save(this, false);
      }

      this.renderIcon();
    });
  };
}
