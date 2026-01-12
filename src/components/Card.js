export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    this._userId = userId;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._ownerId = data.owner;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._element.querySelector('.card__title').textContent = this._name;
    const img = this._element.querySelector('.card__image');
    img.src = this._link;
    img.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this.setLikes(this._isLiked);

    img.addEventListener('click', () =>
      this._handleImageClick(this._name, this._link)
    );

    this._likeButton.addEventListener('click', () =>
      this._handleLikeClick(this)
    );

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () =>
        this._handleDeleteClick(this)
      );
    }

    return this._element;
  }

  setLikes(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle(
      'card__like-button_is-active',
      isLiked
    );
  }

  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}