export default class NewsApi {
  constructor(q, from, sortBy, pageSize, language, apiKey) {
    this.q = q;
    this.from = from;
    this.sortBy = sortBy;
    this.pageSize = pageSize;
    this.language = language;
    this.apiKey = apiKey;
  }

  setTopic = (topic) => {
    this.q = topic;
  };

  getNews = async () => {
    const res = await fetch(
      `https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=${this.apiKey}&q=${this.q}&from=${this.from}&sortBy=${this.sortBy}&pageSize=${this.pageSize}`
    );

    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }

    const data = await res.json();

    const result = {
      data,
      topic: this.q,
    };

    return result;
  };
}
