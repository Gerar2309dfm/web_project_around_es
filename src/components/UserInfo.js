export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._name.textContent = name;
    if (about) this._job.textContent = about;
    if (avatar) this._avatar.src = avatar;
  }

  setUserId(id) {
    this._id = id;
  }

  getUserId() {
    return this._id;
  }
}