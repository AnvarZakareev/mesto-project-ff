//В файле index.js должны остаться:
// 1 объявления и инициализация глобальных констант и
// переменных с DOM-элементами страницы,
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

//
// Импорт функций
// 
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js'

// 
const placesList = document.querySelector('.places__list');
// открытие окон попапов
const profile__edit = document.querySelector('.profile__edit-button');
const profile__add = document.querySelector('.profile__add-button');
const card__image = document.querySelector('.card__image');// not work
const popup_edit = document.querySelector('.popup_type_edit');
const popup_new = document.querySelector('.popup_type_new-card');
const popup_image = document.querySelector('.popup_type_image');
// закрытие окон попапов
const popup_close = document.querySelectorAll('.popup__close');

// Загрузка массива карт из cards.js
initialCards.forEach((cardData) => {
  
  const cardElement = createCard(cardData, deleteCard)//, () => openModal(popup_image), closeModal);
  // card__image.addEventListener('click', () => openModal(popup_edit))
  // console.log(card__image)
  placesList.append(cardElement);
});

profile__edit.addEventListener('click', () => openModal(popup_edit))
profile__add.addEventListener('click', () => openModal(popup_new))
console.log(card__image)
// card__image.forEach((openPupopInCard) => {
  // console.log(openPupopInCard)
  // openPupopInCard.addEventListener('click', openModal)
// })
popup_close.forEach((closePopupButton) => {
  // console.log(closeButton)
  closePopupButton.addEventListener('click', closeModal)
})
// popup_close.addEventListener('click', closeModal)
// popup_close.addEventListener('click', closeModal)

// card__image.addEventListener('click', () => console.log('hi'))