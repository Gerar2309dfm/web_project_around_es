export default class Card {
    
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardImage = this._element.querySelector('.card__image');

    this._likeButton.addEventListener('click', () => this._handleLikeButton());
    this._deleteButton.addEventListener('click', () => this._handleDeleteButton());
    this._cardImage.addEventListener('click', () => this._handleImageClick(this._name, this._link));
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('card__like-button_is-active');
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    
    return this._element;
  }
}