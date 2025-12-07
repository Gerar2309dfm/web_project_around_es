import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openModal, closeModal } from './utils.js';

const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
     {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },

    {
       name: "Latemar", 
       link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
     {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
     {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];

initialCards.forEach(function(card) {
    console.log(card.name)
});

const cardsContainer = document.querySelector('.cards__list');

initialCards.forEach((cardData) => {
  const card = new Card(cardData, '#card-template', openImagePopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#edit-popup');
const closeButton = editPopup.querySelector('.popup__close');
const editForm = document.querySelector('#edit-profile-form');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editPopup);
}

editButton.addEventListener('click', handleOpenEditModal);
editForm.addEventListener('submit', handleProfileFormSubmit);

const addCardForm = document.querySelector('#new-card-form');
const addCardModal = document.querySelector('#new-card-popup');

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const titleInput = addCardForm.querySelector('.popup__input_type_card-name');
  const linkInput = addCardForm.querySelector('.popup__input_type_url');
  const newCardData = {
    name: titleInput.value,
    link: linkInput.value
  };
  const card = new Card(newCardData, '#card-template', openImagePopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closeModal(addCardModal);
  addCardForm.reset();
}

addCardForm.addEventListener('submit', handleCardFormSubmit);

const addButton = document.querySelector('.profile__add-button');
const closeAddCardButton = addCardModal.querySelector('.popup__close');

addButton.addEventListener('click', () => openModal(addCardModal));
closeAddCardButton.addEventListener('click', () => closeModal(addCardModal));

const imageModal = document.querySelector('#image-popup');
const modalImage = imageModal.querySelector('.popup__image');
const modalCaption = imageModal.querySelector('.popup__caption');
const closeImageModalButton = imageModal.querySelector('.popup__close');

function openImagePopup(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openModal(imageModal);
}

closeImageModalButton.addEventListener('click', () => closeModal(imageModal));

// Cerrar modal con ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const opendModal = document.querySelector('.popup_is-opened');
    if (opendModal) {
      closeModal(opendModal);
    }
  }
});

// Cerrar modal al hacer clic en el overlay
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
});

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Crear instancias para cada formulario
const editFormValidator = new FormValidator(config, editForm);
const addFormValidator = new FormValidator(config, addCardForm);

// Activar validación
editFormValidator.enableValidation();
addFormValidator.enableValidation();