class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      description: this._job.textContent,
      avatar: this._avatar.src,
      id: this._userId,
    };

    return userInfo;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}

export { UserInfo };
