export {createCard};
import {openModal, closeModal } from "./modal";
import {deleteCardApi, putLikeCard, deleteLikeCard} from "./api";

const cardTemplate = document.querySelector('#card-template')
const popupConfirm = document.querySelector('.popup__confirm')


// Функция, которая принимает в аргументах данные одной карточки
// и функцию-колбэк для удаления, а возвращает подготовленный к
// выводу элемент карточки

function createCard (card, handleImageClick, userId, putLikeCard, deleteLikeCard) { 
  const cardTemplateContent = cardTemplate.content;
  const cardElement = cardTemplateContent.querySelector('.places__item').cloneNode(true);
  // const cardLikeQuantity = cardElement.querySelector('.card__like-quantity').textContent
  // Функционал клонирования шаблона карточки рекомендуется вынести в отдельную функцию getCardTemplate,
  // чтобы сделать код более декларативным и переиспользуемым.
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__like-quantity').textContent = card.likes.length;
  // cardLikeQuantity = card.likes.length;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  myBasket (userId, card, cardDeleteButton, cardElement);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener("click", () => {
    handleImageClick(card.link, card.alt, card.name)
  });
  
  const likeButton = cardElement.querySelector('.card__like-button');
  isMyLike(card, userId, likeButton);
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  return cardElement;
};

// Проверка лайкнута ли карточка пользователем

function isMyLike(card, userId, likeButton) {
  if (card.likes.includes(userId)) 
    {
      likeButton.classList.add('card__like-button_is-active')
      return true
    }
    else 
      {
      likeButton.classList.remove('card__like-button_is-active')
      return false
    }
}

function likeCard(likeButton)
{
  if (likeButton.classList.contains('card__like-button_is-active'))
    {
    likeButton.classList.remove('card__like-button_is-active')
    }
  else 
    {
    likeButton.classList.add('card__like-button_is-active')
    }
};

function likeCardApi(card, userId, likeButton, cardLikeQuantity) {
  if (isMyLike(card, userId))
    {
    }
    else 
      {
    }
}








// Корзина на карточке тоько для создателя

function myBasket (userId, card, cardDeleteButton, cardElement) {
  if (userId == card.owner._id) {
    cardDeleteButton.addEventListener("click", () => {
      deleteConfirm(card, cardElement)
    });
  }
  else {
    cardDeleteButton.style.display = 'none';
  }
}

// Подтверждение удаления

function deleteConfirm (card, cardElement) {
  openModal(popupConfirm)
  const cardDeleteButton = popupConfirm.querySelector('.popup__button')
  cardDeleteButton.addEventListener("click", () => {
    // console.log(card)
    closeModal(popupConfirm)
    deleteCard(cardElement)
    deleteCardApi(card)
    // .then ((res) => {
    //     // console.log(res)
    //   })
  })
  cardDeleteButton.addEventListener("click", () => {
  })
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


