export default class MainApi {
  constructor(url) {
    this.url = url;
  }

  signup = async ({ email, pass, name }) => {
    const res = await fetch(`${this.url}/signup`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: pass,
        name,
      }),
    });

    const logInfo = await res.json();

    return logInfo;
  };

  signin = async ({ email, pass }) => {
    const res = await fetch(`${this.url}/signin`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: pass,
      }),
    });

    const logInfo = await res.json();

    return logInfo;
  };

  getUserData = async () => {
    const res = await fetch(`${this.url}/users/me`, {
      credentials: "include",
    });

    const userInfo = await res.json();
    return userInfo;
  };

  logout = async () => {
    const res = await fetch(`${this.url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const logInfo = await res.json();
    return logInfo;
  };

  getArticles = () => {};

  createArticle = async (article, keyword) => {
    const res = await fetch(`${this.url}/articles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source,
        link: article.url,
        image: article.urlToImage,
      }),
    });

    const resJSON = await res.json();

    return resJSON;
  };

  removeArticle = async (article) => {
    const res = await fetch(`${this.url}/articles/${article._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const resJSON = await res.json();

    return resJSON;
  };
}
