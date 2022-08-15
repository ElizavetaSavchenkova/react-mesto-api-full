class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._checkResponse(res));
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._checkResponse(res));
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then((res) => this._checkResponse(res));
  }

  //addNewLikes(cardId) {
  //return fetch(`${this._url}/cards/likes/${cardId}`, {
  //  method: 'PUT',
  //  headers: this._headers
  // }).then((res) => this._checkResponse(res));
  //}

  //deleteLikes(cardId) {
  //  return fetch(`${this._url}/cards/likes/${cardId}`, {
  //   method: 'DELETE',
  //   headers: this._headers
  // }).then((res) => this._checkResponse(res));
  //}

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify
        ({ avatar }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: this._headers,
      }).then(this._checkResponse);

  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '109c2e52-7f95-443b-8943-4438d34487f3',
    "content-type": "application/json"
  }
});

export default api;
