
// @todo: Темплейт карточки
// 1
let placesList = document.querySelector('.places__list');

function addCard (card, callback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  placesList.append(cardElement);
  const cardDelBtn = document.querySelectorAll('.card__delete-button');
  cardDelBtn.forEach(function(elem) {
    elem.addEventListener('click', callback)
    })
  return cardElement;
};

function delFunc(evt) {
    const deleteButton = evt.target;
    const listItem = deleteButton.closest('.card');
    listItem.remove();
}

initialCards.forEach(function (item) { 
  addCard(item, delFunc);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
