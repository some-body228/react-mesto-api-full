
class api {
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
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    getName() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    patchAvatar(avatarLink) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink,
        }),
      }).then(this._getResponseData);
    }
    patchName(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
  
    postCard(data) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
  
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    }
    likeCard(id) {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    dislikeCard(id) {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
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
  const mainApi = new api({
    baseUrl: "https://subdomain.nomoredomains.students.nomoredomains.rocks",
    headers: {
      authorization: "8e87a5dc-6c3c-4389-85a0-676a9403f4b5",
      "Content-Type": "application/json",
    },
  });
  export default mainApi
  