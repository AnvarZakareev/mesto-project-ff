import {handleImageClick} from '../index.js';
export {createCard, deleteCard};

//Темплейт карточки

// Функция, которая принимает в аргументах данные одной карточки
// и функцию-колбэк для удаления, а возвращает подготовленный к
// выводу элемент карточки
function createCard (card, delateCard, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener("click", delateCard);
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.addEventListener("click", () => {
  handleImageClick(card.link, card.name)})
// ищешь первую сверху картинку карточки
// И вешаешь на нее открытие попапа, 
// назначаешь ему ссылку и описание
// Это нужно делать для каждой карточки, то есть внутри createCard. 
  return cardElement;
};

// При клике по иконке удаления выбранная карточка должна удаляться
// со страницы
function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
};