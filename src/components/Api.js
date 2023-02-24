class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  editUserInfo({ name, description }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    });
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard({ cardId }) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addCardLike(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  removeCardLike(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  updateProfileAvatar({ link }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  showPromiseStatus() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]).then(
      (res) => {
        return { initialCards: res[0], fetchedUserInfo: res[1] };
      }
    );
  }
}

export { Api };
