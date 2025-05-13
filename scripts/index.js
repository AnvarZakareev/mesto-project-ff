
// @todo: Темплейт карточки

const placesList = document.querySelector('.places__list');

function createCard (card, callback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  // То есть эта функция должна только возвращать один экземпляр карточки,
  // но не добавлять его в общий список.
  placesList.append(cardElement);
  const cardDelBtn = document.querySelectorAll('.card__delete-button');
  // В функции createCard функция удаления карточки  должна быть добавлена 
  // как обработчик на одну кнопку cardDeleteButton, без вызова цикла forEach
  cardDelBtn.forEach(function(elem) {
    elem.addEventListener('click', callback)
    })
  // Функция createCard должна получать элемент карточки cardElement
  // из клонированного шаблона карточки и возвращать этот элемент в инструкции return.
  return cardElement;
};

function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
}

// Добавляться в общий список методом append элемент карточки должен в методе forEach,
// вызываемом вне функции createCard.
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
   placesList.append(cardElement);
});

// initialCards.forEach(function (item) { 
//   addCard(item, deleteCard);
// });

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
