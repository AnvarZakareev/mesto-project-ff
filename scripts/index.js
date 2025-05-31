
// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');

// Функция, которая принимает в аргументах данные одной карточки
// и функцию-колбэк для удаления, а возвращает подготовленный к выводу элемент карточки
function createCard (card, callback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener("click", callback);
  return cardElement;
};

// При клике по иконке удаления выбранная карточка должна удаляться со страницы
function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
}

// Используя полученную функцию, выведите все карточки из массива на страницу в элемент .places__list.
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
   placesList.append(cardElement);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
