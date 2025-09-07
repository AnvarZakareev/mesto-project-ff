export {createCard};
import {openModal, closeModal } from "./modal";
import {deleteCardApi, putLikeCard, deleteLikeCard} from "./api";

const cardTemplate = document.querySelector('#card-template');
const popupConfirm = document.querySelector('.popup__confirm');


// Создание карточки

function createCard (card, handleImageClick, userId, putLikeCard, deleteLikeCard) { 
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
  handleLikeButton(card, userId, likeButton);
  likeButton.addEventListener("click", () => {
    likeCard(card, likeButton, cardLikeQuantity);
  });

  return cardElement;
};

// Проверка лайкнута ли карточка пользователем

function isMyLike(card, userId) {
  if (card.likes.find(like => like._id == userId)) 
    {
      return true;
    }
    else 
      {
      return false;
    };
};

// Проверка лайков при загрузке

function handleLikeButton(card, userId, likeButton) {
  if (isMyLike(card, userId)) {
      likeButton.classList.add('card__like-button_is-active')
  };
};

// постановка снятие лайка и счетчик лайков

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

function myBasket (userId, card, cardDeleteButton, cardElement) {
  if (userId == card.owner._id) {
    cardDeleteButton.addEventListener("click", () => {
      deleteConfirm(card, cardElement)
    });
  }
  else {
    cardDeleteButton.style.display = 'none';
  };
};

// Подтверждение удаления

function deleteConfirm (card, cardElement) {
  openModal(popupConfirm);
  const cardDeleteButton = popupConfirm.querySelector('.popup__button');
  cardDeleteButton.addEventListener("click", () => {
    deleteCardApi(card)
    .then ((res) => {
      closeModal(popupConfirm);
      deleteCard(cardElement);
      })
    .catch((err) => {
      console.log(err);
    })
  })
  // cardDeleteButton.addEventListener("click", () => {
  // })
}

// Удаление со страницы

function deleteCard(evt) {
  evt.remove();
};


// Если лайкнуть карточку, сердечко поменяет цвет
// Обратите внимание что функцию обработчика лайка 
// putLikeCard deleteLikeCard
// нужно передать в функцию создания карточки как аргумент.
// Это понадобится в будущем для интеграции с API.


