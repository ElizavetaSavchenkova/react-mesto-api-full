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

  getUserInformation(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  getAllCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  editProfile(name, about, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }

  editAvatar(avatar, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify
        ({ avatar }),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);

  }
}

const api = new Api({
  url: 'https://api.mestoliza.students.nomoredomains.sbs',
  headers: {
    "content-type": "application/json"
    //'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default api;
