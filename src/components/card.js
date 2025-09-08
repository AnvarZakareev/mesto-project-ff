export {createCard, deleteCard};
import {deleteConfirm } from "../index";
import {putLikeCard, deleteLikeCard} from "./api";

const cardTemplate = document.querySelector('#card-template');

// Создание карточки

function createCard (card, handleImageClick, userId) { 
  const cardTemplateContent = cardTemplate.content;
  const cardElement = cardTemplateContent.querySelector('.places__item').cloneNode(true);
  let cardLikeQuantity = cardElement.querySelector('.card__like-quantity');
  // Функционал клонирования шаблона карточки рекомендуется вынести в отдельную функцию getCardTemplate,
  // чтобы сделать код более декларативным и переиспользуемым.
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardLikeQuantity.textContent = card.likes.length;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  myBasket (userId, card, cardDeleteButton, cardElement);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener("click", () => {
    handleImageClick(card.link, card.alt, card.name);
  });
  const likeButton = cardElement.querySelector('.card__like-button');
  checkleLikeButton(card, userId, likeButton);
  likeButton.addEventListener("click", () => {
    likeCard(card, likeButton, cardLikeQuantity);
  });

  return cardElement;
};

// Проверка лайкнута ли карточка пользователем

function isMyLike(card, userId) {
  return card.likes.some(like => like._id === userId);
}

// Проверка лайков при загрузке

function checkleLikeButton(card, userId, likeButton) {
  if (isMyLike(card, userId)) {
      likeButton.classList.add('card__like-button_is-active')
  };
};

// Постановка снятие лайка и счетчик лайков

function likeCard(card, likeButton, cardLikeQuantity)
{
  if (likeButton.classList.contains('card__like-button_is-active'))
  {
    deleteLikeCard(card)
    .then((res) => {
      likeButton.classList.remove('card__like-button_is-active');
      cardLikeQuantity.textContent = Number(cardLikeQuantity.textContent) - 1;
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else 
  {
    putLikeCard(card)
    .then((res) => {
      likeButton.classList.add('card__like-button_is-active');
      cardLikeQuantity.textContent = Number(cardLikeQuantity.textContent) + 1;
    })
    .catch((err) => {
      console.log(err);
    });
  };
};


// Корзина на карточке тоько для создателя

function myBasket (userId = false, card, cardDeleteButton, cardElement) {
  if (userId !== card.owner._id) {
    cardDeleteButton.style.display = 'none';
  }
  else {
    cardDeleteButton.addEventListener("click", () => {
      deleteConfirm(card, cardElement)
    });
  };
};

// Удаление со страницы

function deleteCard(evt) {
  evt.remove();
};