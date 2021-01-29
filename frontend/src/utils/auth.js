
class Auth {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
    _getResponseData(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
    register(data) {
      console.log(data);
      return fetch(`${this._url}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
    login(data) {
      return fetch(`${this._url}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
    checkToken(token) {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(this._getResponseData);
    }
  }

  const auth = new Auth({
    baseUrl: "https://api.subdomain.students.nomoredomains.rocks",
    headers: {
      "Content-Type": "application/json",
    },
  });
  export default auth