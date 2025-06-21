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


// Oбъявления и инициализация глобальных констант и
// переменных с DOM-элементами страницы

const placesList = document.querySelector('.places__list');
const profileEdit = document.querySelector('.profile__edit-button');
const profileAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');


// Загрузка массива карт из cards.js

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, handleImageClick, likeCard)
  placesList.append(cardElement);
});


// открытие окон попапов

profileEdit.addEventListener('click', () => openModal(popupEdit));
profileAdd.addEventListener('click', () => openModal(popupNew));
function handleImageClick(link, name) {
  const image = document.querySelector('.popup__image');
  image.src = link;
  const caption = document.querySelector('.popup__caption');
  caption.textContent = name;
  openModal(popupImage);
}


// Редактирование имени и информации о себе

let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let popupName = document.querySelector('.popup__input_type_name');
let popupDescription = document.querySelector('.popup__input_type_description');
popupName.placeholder = profileTitle.textContent;
popupDescription.placeholder = profileDescription.textContent;

const formElement = document.querySelector('.popup__form');
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closeModal(formElement.parentNode.parentNode);
}

formElement.addEventListener('submit', handleFormSubmit);


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
  closeModal(popupNew);
}

popupNew.addEventListener('submit', addCard);


