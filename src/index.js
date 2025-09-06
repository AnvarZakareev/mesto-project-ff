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
// import {initialCards} from './scripts/cards.js';
import {createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUser, getInitialCards, pathProfile, pathCard, pathAvatar} from './components/api.js'


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
const popupAvatar = document.querySelector('.popup_type_avatar')
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

 
    // ---------------------  
    // открытие окон попапов
    // ---------------------
    
// Редактирование информации о себе

profileEdit.addEventListener('click', () => {
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
  openModal(popupEdit)
  clearValidation(popupEdit, validationConfig)
});
    
// Добавление новой карточки

profileAdd.addEventListener('click', () => {
  openModal(formAddCard) 
  clearValidation(formAddCard, validationConfig)
  cleanInput(formAddCard)
});

// Обновление аватара пользователя

profileAvatar.addEventListener('click', () => {
  openModal(popupAvatar)
  clearValidation(popupAvatar, validationConfig)
  cleanInput(popupAvatar)
})

// открытие окна просмотра карточки

function handleImageClick(link, alt, name) {
  const image = document.querySelector('.popup__image');
  image.src = link;
  image.alt = alt;
  const caption = document.querySelector('.popup__caption');
  caption.textContent = name;
  // clearValidation(popup, validationConfig)
  openModal(popupImage);
}

    // ---------------------
    // Изменения на странице
    // ---------------------

    
// Обновление аватара пользователя
    
function editAvatar (evt){
  evt.preventDefault()
  const popupForm = document.forms.avatar
  const url = popupForm.elements.avatar.value;
  pathAvatar(url)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`
    })
  closeModal(popupAvatar)
}

popupAvatar.addEventListener('submit', editAvatar)

// Добавление карточки

function addCard(evt) {
  evt.preventDefault();
  const popupForm = document.forms.newplace;
  const name = popupForm.elements.placename;
  const link = popupForm.elements.link;
  const newCard = {};
  newCard.name = name.value;
  newCard.link = link.value;
  // Добавление новой карточки
  pathCard(name.value, link.value)
  .then ((res) => {
    // console.log(res)
    const cardElement = createCard(res, handleImageClick)
    // placesList.append(cardElement)
    placesList.prepend(cardElement)
  })
  popupForm.reset();
  closeModal(formAddCard);
}

formAddCard.addEventListener('submit', addCard);

// Редактирование имени и информации о себе

const formEdiProfile = document.querySelector('[name="profile"]');
function submitFormEdiProfile(evt) {
  evt.preventDefault();
  const popupForm = document.forms.profile
  const name = popupForm.elements.name.value
  const description = popupForm.elements.description.value
  pathProfile(name, description)
  .then ((res) => {
    profileTitle.textContent = name;
    profileDescription.textContent = description;
    closeModal(formEdiProfile.parentNode.parentNode);
  })
}

formEdiProfile.addEventListener('submit', submitFormEdiProfile);

    //  ------
    //  Прочее
    //  ------

// отчистка поля ввода

function cleanInput(popup) {
  const cleanArrInput = popup.querySelectorAll('.popup__input')
  // console.log(cleanArrInput)
  cleanArrInput.forEach((errorInput) => {
    errorInput.value = ''
  })
}

// включение валидации вызовом enableValidation (все настройки передаются при вызове)
// Настройки валидации

enableValidation(
  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active',
});

const validationConfig ={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active',
  submitButtonSelector: '.popup__button',
}
      
// Создаём массив с промисами
// Загрузка информации о пользователе с сервера
// Загрузка карточек с сервера

const getAll = [getUser(), getInitialCards()]

Promise.all(getAll)
  .then((result) => {
    profileTitle.textContent = result[0].name ;
    profileDescription.textContent = result[0].about;
    profileAvatar.style.backgroundImage = `url(${result[0].avatar})`;
    const userId = result[0]._id;
    result[1].forEach((cardData) => {

      const cardElement = createCard(cardData, handleImageClick, userId)
      placesList.append(cardElement);
    })
  })

