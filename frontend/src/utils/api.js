class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка (в файле апи фронт): ${res.status}`);
  }

  getUserInformation(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((res) => this._checkResponse(res));
  }

  getAllCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((res) => this._checkResponse(res));
  }

  editProfile(name, about, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addCard(name, link, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name,
        link
      })
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then((res) => this._checkResponse(res));
  }

  editAvatar(avatar, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify
        ({ avatar }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked, token) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
      }).then(this._checkResponse);

  }
}

const api = new Api({
  url: 'https://api.mestoliza.students.nomoredomains.sbs',
  headers: {
    "Content-type": "application/json",
  }
});

export default api;
