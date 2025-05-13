
// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');

function createCard (card, callback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener("click", callback);
  return cardElement;
};

function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
}

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
   placesList.append(cardElement);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
