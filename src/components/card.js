export {createCard, deleteCard};

//Темплейт карточки

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



// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
