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

// Экспорт
export {handleImageClick};
// Импорт
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js'


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
  const cardElement = createCard(cardData, deleteCard, handleImageClick)
  placesList.append(cardElement);
});

// открытие окон попапов
profile__edit.addEventListener('click', () => openModal(popup_edit))
profile__add.addEventListener('click', () => openModal(popup_new))

function handleImageClick(link, name) {
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = link;
  const popupName = document.querySelector('.popup__caption')
  popupName.textContent = name;
  openModal(popup_image)
}

// закрытие окон попапов
const popup_close = document.querySelectorAll('.popup__close');
popup_close.forEach((closePopupButton) => {
  closePopupButton.addEventListener('click', closeModal)
})