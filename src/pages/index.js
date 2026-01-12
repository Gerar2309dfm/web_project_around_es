import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// ================= API =================
const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: '28d8c648-c411-484b-a3a1-f90b62549144',
    'Content-Type': 'application/json'
  }
});

// ================= UserInfo =================
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__image'
});

// ================= Popups =================
const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm('#edit-popup', handleProfileSubmit);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('#new-card-popup', handleAddCardSubmit);
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', handleAvatarSubmit);
avatarPopup.setEventListeners();

const confirmPopup = new PopupWithConfirmation('#confirm-popup');
confirmPopup.setEventListeners();

// ================= Section =================
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        userInfo.getUserId(),
        '#card-template',
        handleImageClick,
        handleDeleteClick,
        handleLikeClick
      );
      return card.generateCard();
    }
  },
  '.cards__list'
);

// ================= Load initial data =================
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserId(userData._id);
    cardSection.renderItems(cards);
  })
  .catch(err => console.log(err));

// ================= Handlers =================
function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function handleProfileSubmit(data) {
  editProfilePopup.renderLoading(true);
  api.updateUserInfo({ name: data.name, about: data.description })
    .then(userData => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => editProfilePopup.renderLoading(false));
}

function handleAddCardSubmit(data) {
  addCardPopup.renderLoading(true);
  api.addCard({ name: data['place-name'], link: data.link })
    .then(cardData => {
      cardSection.addItem(cardSection._renderer(cardData));
      addCardPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => addCardPopup.renderLoading(false));
}

function handleAvatarSubmit(data) {
  avatarPopup.renderLoading(true);
  api.updateAvatar(data.avatar)
    .then(userData => {
      userInfo.setUserInfo(userData);
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
}

function handleDeleteClick(card) {
  confirmPopup.setSubmitAction(() => {
    api.deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        confirmPopup.close();
      })
      .catch(err => console.log(err));
  });
  confirmPopup.open();
}

function handleLikeClick(card) {
  api.changeLikeStatus(card.getId(), card.isLiked())
    .then(data => card.setLikes(data.isLiked))
    .catch(err => console.log(err));
}

// ================= Buttons =================
document.querySelector('.profile__edit-button')
  .addEventListener('click', () => editProfilePopup.open());

document.querySelector('.profile__add-button')
  .addEventListener('click', () => addCardPopup.open());

document.querySelector('.profile__image')
  .addEventListener('click', () => avatarPopup.open());