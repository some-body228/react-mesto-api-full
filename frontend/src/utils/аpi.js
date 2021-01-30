
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
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
      }).then(this._getResponseData);
    }
  
    getName() {
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
      }).then(this._getResponseData);
    }
  
    patchAvatar(avatarLink) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
        body: JSON.stringify({
          avatar: avatarLink,
        }),
      }).then(this._getResponseData);
    }
    patchName(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
  
    postCard(data) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
  
    deleteCard(id) {
      return fetch(`${this._url}/cards${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
      }).then(this._getResponseData);
    }
    likeCard(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
      }).then(this._getResponseData);
    }
  
    dislikeCard(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
      }).then(this._getResponseData);
    }
  
    register(data) {
      console.log(data);
      return fetch(`${this._url}/signup`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
    login(data) {
      return fetch(`${this._url}/signin`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }).then(this._getResponseData);
    }
    checkToken(token) {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      }).then(this._getResponseData);
    }
  }
  const mainApi = new api({
    baseUrl: "https://api.subdomain.students.nomoredomains.rocks",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
      
    },
  });
  export default mainApi
  