export default class NewsApi {
  constructor(q, from, sortBy, pageSize, language, apiKey) {
    this.q = q;
    this.from = from;
    this.sortBy = sortBy;
    this.pageSize = pageSize;
    this.language = language;
    this.apiKey = apiKey;
  }

  getNews = async () => {
    const res = await fetch(
      `http://newsapi.org/v2/everything?q=${this.q}&from=${this.from}&sortBy=${this.sortBy}&pageSize=${this.pageSize}&language=${this.language}&apiKey=${this.apiKey}`
    )

    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }

    const data = await res.json();
    return data;
  };
}
