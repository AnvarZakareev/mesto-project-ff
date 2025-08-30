//В файле index.js должны остаться:
// 1 объявления и инициализация глобальных констант и
// переменных с DOM-элементами страницы;
// 2 обработчики событий (при открытии и закрытии попапов;
// при отправке форм; обработчик, открывающий попап при
// клике по изображению карточки);
// 3 вызовы других функций, подключённых из созданных модулей,
// которым нужно будет передавать объявленные здесь переменные
// и обработчики.

// Код модулей должен быть написан так, чтобы их можно было
// забрать из проекта и перенести в другой без необходимости
// что-то менять внутри. Подумайте, какие настройки для этого
// нужно передать аргументами.
// Чтобы было чуточку понятнее: вызов функции создания
// карточки должен находиться в файле index.js, но само
// объявление функции — в card.js. Используйте директивы
// export/import.

// Импорт

import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUser, getInitialCards, pathProfile} from './components/api.js'


// Oбъявления и инициализация глобальных констант и
// переменных с DOM-элементами страницы

const placesList = document.querySelector('.places__list');
const profileEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileAdd = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image')
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

// открытие окон попапов

profileEdit.addEventListener('click', () => {
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
  openModal(popupEdit)
  clearValidation(popupEdit, validationConfig)
});

profileAdd.addEventListener('click', () => openModal(formAddCard) 
);

profileAdd.addEventListener('click', () => clearValidation(formAddCard, validationConfig)
);


// отчистка поля ввода

// function cleanInput(popup) {
//   const cleanArrInput = popup.querySelectorAll('.popup__input')
//   cleanArrInput.forEach((errorInput) => {
//     errorInput.value = ''
//   })
// }

function handleImageClick(link, alt, name) {
  const image = document.querySelector('.popup__image');
  image.src = link;
  image.alt = alt;
  const caption = document.querySelector('.popup__caption');
  caption.textContent = name;
  // clearValidation(popup, validationConfig)
  openModal(popupImage);
}


// Редактирование имени и информации о себе

const formEdiProfile = document.querySelector('[name="edit-profile"]');
function submitFormEdiProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closeModal(formEdiProfile.parentNode.parentNode);
}

formEdiProfile.addEventListener('submit', submitFormEdiProfile);


// Добавление карточки

function addCard(evt) {
  evt.preventDefault();
  const popupForm = document.forms.newplace;
  const name = popupForm.elements.placename;
  const link = popupForm.elements.link;
  const newCard = {};
  newCard.name = name.value;
  newCard.link = link.value;
  const cardElement = createCard(newCard, deleteCard, handleImageClick, likeCard);
  placesList.prepend(cardElement);
  popupForm.reset();
  closeModal(formAddCard);
}

formAddCard.addEventListener('submit', addCard);

// включение валидации вызовом enableValidation (все настройки передаются при вызове)
enableValidation(
  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active',
});

// Настройки валидации

const validationConfig ={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active',
  submitButtonSelector: '.popup__button',
}

// Загрузка информации о пользователе с сервера

getUser()
.then((result) => {
  profileTitle.textContent = result.name ;
  profileDescription.textContent = result.about;
  profileAvatar.style.backgroundImage = `url(${result.avatar})`;
})

// Загрузка карточек с сервера

// getInitialCards()
// .then((result) => {
//   result.forEach((cardData) => {
//     const cardElement = createCard(cardData, deleteCard, handleImageClick, likeCard)
//     placesList.append(cardElement);
//   });
// })

// Редактирование профиля

pathProfile('007', 'agent') 

// editProfile()
//   .then((result) => {
//     con
//   })
//   .catch((err) => {
//     console.log(err); // выводим ошибку в консоль
//   }); 

// fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
//     method: 'PATCH',
//     headers: {
//         authorization: '3ad95690-ba9a-4d17-9a66-c1e37bacbfe2',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           name: 'Freeman',
//           about: 'Physicist'
//         })
//       });
      

      // console.log('001')

// to do