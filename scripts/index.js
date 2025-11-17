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
const cardTemplate = document.querySelector('#card-template').content;

function getCardElement(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener('click', handleLikeButton);
   deleteButton.addEventListener('click', handleDeleteButton);
    cardImage.addEventListener('click', () => openImagePopup(name, link));

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData.name, cardData.link, cardsContainer);
});

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#edit-popup');
const closeButton = editPopup.querySelector('.popup__close');
const editForm = document.querySelector('#edit-profile-form');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}

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
  renderCard(titleInput.value, linkInput.value, cardsContainer);
  closeModal(addCardModal);
  addCardForm.reset();
}

addCardForm.addEventListener('submit', handleCardFormSubmit);

const addButton = document.querySelector('.profile__add-button');
const closeAddCardButton = addCardModal.querySelector('.popup__close');

addButton.addEventListener('click', () => openModal(addCardModal));
closeAddCardButton.addEventListener('click', () => closeModal(addCardModal));

function handleLikeButton(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function handleDeleteButton(evt) {
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
}

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
    if (openModal) {
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