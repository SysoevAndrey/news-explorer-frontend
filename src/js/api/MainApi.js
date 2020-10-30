export default class MainApi {
  constructor(url) {
    this.url = url;
  }

  signup = async ({ email, pass, name }) => {
    try {
      const res = await fetch(`${this.url}/signup`, {
        method: "POST",
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

      if (!res.ok) {
        throw new Error(res.status);
      }

      const logInfo = await res.json();

      return logInfo;
    } catch (err) {
      throw err
    }
  };

  signin = async ({ email, pass }) => {
    try {
      const res = await fetch(`${this.url}/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pass,
        }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const logInfo = await res.json();

      return logInfo;
    } catch (err) {
      throw err;
    }
  };

  getUserData = async () => {
    try {
      const res = await fetch(`${this.url}/users/me`, {
        credentials: "include",
      });

      const userInfo = await res.json();
      return userInfo;
    } catch (err) {
      console.log(err);
    }
  };

  logout = async () => {
    try {
      const res = await fetch(`${this.url}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const logInfo = await res.json();

      return logInfo;
    } catch (err) {
      throw err;
    }
  };

  getArticles = async () => {
    try {
      const res = await fetch(`${this.url}/articles`, {
        credentials: "include",
      });

      const resJSON = await res.json();

      return resJSON;
    } catch (err) {
      console.log(err);
    }
  };

  createArticle = async (article, keyword) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  removeArticle = async (article) => {
    try {
      const res = await fetch(`${this.url}/articles/${article._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const resJSON = await res.json();

      return resJSON;
    } catch (err) {
      console.log(err);
    }
  };
}
