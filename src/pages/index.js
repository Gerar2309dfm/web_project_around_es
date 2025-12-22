import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

// --------------------
// Datos iniciales
// --------------------
const initialCards = [
  {
    name: 'Valle de Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg'
  },
  {
    name: 'Lago Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg'
  },
  {
    name: 'Montañas Calvas',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg'
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg'
  },
  {
    name: 'Parque Nacional de la Vanoise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg'
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg'
  }
];

// --------------------
// UserInfo
// --------------------
const userInfo = new UserInfo({
  nameSelector: '.profiletitle',
  jobSelector: '.profiledescription'
});

// --------------------
// Popup de imagen
// --------------------
const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

function openImagePopup(name, link) {
  imagePopup.open(name, link);
}

// --------------------
// Section (tarjetas)
// --------------------
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, '#card-template', openImagePopup);
      return card.generateCard();
    }
  },
  '.cards__list'
);

cardSection.renderItems();

// --------------------
// Popups con formulario
// --------------------
const editProfilePopup = new PopupWithForm(
  '#edit-popup',
  handleProfileFormSubmit
);

const addCardPopup = new PopupWithForm(
  '#new-card-popup',
  handleCardFormSubmit
);

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

// --------------------
// Botones
// --------------------
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', () => {
  editProfilePopup.open();
});

addButton.addEventListener('click', () => {
  addCardPopup.open();
});

// --------------------
// Configuración del validador 
// --------------------
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// --------------------
// Validación
// --------------------
const editForm = document.querySelector('#edit-profile-form');
const addCardForm = document.querySelector('#new-card-form');

const editFormValidator = new FormValidator(config, editForm);
const addFormValidator = new FormValidator(config, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// --------------------
// Handlers
// --------------------
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}

function handleCardFormSubmit(data) {
  const card = new Card(data, '#card-template', openImagePopup);
  cardSection.addItem(card.generateCard());
  addCardPopup.close();
}