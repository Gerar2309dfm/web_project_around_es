import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._button = this._form.querySelector('.popup__button');
    this._defaultText = this._button.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(i => values[i.name] = i.value);
    return values;
  }

  renderLoading(isLoading) {
    this._button.textContent = isLoading ? 'Guardando...' : this._defaultText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}