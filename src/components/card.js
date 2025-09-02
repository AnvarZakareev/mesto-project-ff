export {createCard, deleteConfirm, likeCard};
import {openModal, closeModal } from "./modal";
import {delCard} from "./api";

const cardTemplate = document.querySelector('#card-template')
const popupConfirm = document.querySelector('.popup__confirm')


// Функция, которая принимает в аргументах данные одной карточки
// и функцию-колбэк для удаления, а возвращает подготовленный к
// выводу элемент карточки

function createCard (card, deleteConfirm, handleImageClick, likeCard, userId) { 
  const cardTemplateContent = cardTemplate.content;
  const cardElement = cardTemplateContent.querySelector('.places__item').cloneNode(true);
  // console.log(cardTemplateContent)
  // const cardId = card._id;
  // Функционал клонирования шаблона карточки рекомендуется вынести в отдельную функцию getCardTemplate,
  // чтобы сделать код более декларативным и переиспользуемым.
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__like-quantity').textContent = card.likes.length;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  // isMylike(userId, card.owner._id, cardDeleteButton)
  cardDeleteButton.addEventListener("click", () => {
    // console.log(card)
    deleteConfirm(card)
  });

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener("click", () => {
    handleImageClick(card.link, card.alt, card.name)
  });
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });
  return cardElement;
};

// function isMylike (userId, cardId, cardDeleteButton) {
//   if (userId !== cardId) {
// cardDeleteButton.classList.remove('card__delete-button')  }
// }

// Подтверждение удаления
function deleteConfirm (x) {
  openModal(popupConfirm)
  const cardDeleteButton = popupConfirm.querySelector('.popup__button')
  cardDeleteButton.addEventListener("click", () => {
    console.log(x)
    delCard(x)
    .then ((res) => {
        // console.log(res)
      })
  })
  cardDeleteButton.addEventListener("click", () => {
    closeModal(popupConfirm)
    deleteCard(x)
  })
}

// При клике по иконке удаления выбранная карточка должна удаляться
// со страницы
function deleteCard(evt) {
  // const cardElement = evt.target.closest('.card');
  console.log(evt)
  // cardElement.remove();
};


// Если лайкнуть карточку, сердечко поменяет цвет
// Обратите внимание что функцию обработчика лайка 
// нужно передать в функцию создания карточки как аргумент.
// Это понадобится в будущем для интеграции с API.

function likeCard(evt) 
{
  if (evt.classList.contains('card__like-button_is-active'))
    {
    evt.classList.remove('card__like-button_is-active')
    }
  else 
    {
    evt.classList.add('card__like-button_is-active')
    }
};