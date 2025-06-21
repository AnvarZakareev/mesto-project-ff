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


// Экспорт

export {handleImageClick};


// Импорт

import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';


// Oбъявления и инициализация глобальных констант и
// переменных с DOM-элементами страницы

const placesList = document.querySelector('.places__list');
const profile__edit = document.querySelector('.profile__edit-button');
const profile__add = document.querySelector('.profile__add-button');
const popup_edit = document.querySelector('.popup_type_edit');
const popup_new = document.querySelector('.popup_type_new-card');
const popup_image = document.querySelector('.popup_type_image');


// Загрузка массива карт из cards.js

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, handleImageClick, likeCard)
  placesList.append(cardElement);
});


// открытие окон попапов

profile__edit.addEventListener('click', () => openModal(popup_edit));
profile__add.addEventListener('click', () => openModal(popup_new));
function handleImageClick(link, name) {
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = link;
  const popupName = document.querySelector('.popup__caption');
  popupName.textContent = name;
  openModal(popup_image);
}


// Редактирование имени и информации о себе

let profile__title = document.querySelector('.profile__title');
let profile__description = document.querySelector('.profile__description');
let popup__input_type_name = document.querySelector('.popup__input_type_name');
let popup__input_type_description = document.querySelector('.popup__input_type_description');
popup__input_type_name.placeholder = profile__title.textContent;
popup__input_type_description.placeholder = profile__description.textContent;

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
function handleFormSubmit(evt) {
    evt.preventDefault();
    const x = nameInput.value;
    const y = jobInput.value;
    let popup__input_type_name = document.querySelector('.profile__title');
    let popup__input_type_description = document.querySelector('.profile__description');
    popup__input_type_name.textContent = x;
    popup__input_type_description.textContent = y;
    closeModal(formElement.parentNode.parentNode);
}

formElement.addEventListener('submit', handleFormSubmit);


// Добавление карточки

const popupAddNewCard = document.querySelector('.popup_type_new-card');

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
  closeModal(popupAddNewCard);
}

popupAddNewCard.addEventListener('submit', addCard);


