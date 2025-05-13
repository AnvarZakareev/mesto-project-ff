
// @todo: Темплейт карточки

let placesList = document.querySelector('.places__list');

// Создайте карточки
// Вам нужно написать функцию, 
// которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления, 
function addCard (card, callback) {
  // Для этого внутри функции вам понадобится: 
  // клонировать шаблон
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  // установить значения вложенных элементов,
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  placesList.append(cardElement);
  // добавить к иконке удаления обработчик клика,
  // по которому будет вызван переданный в аргументах колбэк
  const cardDelBtn = document.querySelectorAll('.card__delete-button');
  cardDelBtn.forEach(function(elem) {
      elem.addEventListener('click', callback)
  })
  // а возвращает подготовленный к выводу элемент карточки.
  return cardElement;
};

// Удалите карточки
// В шаблоне карточек уже добавлена иконка удаления,
// при клике по ней выбранная карточка должна удаляться со страницы.
// Функцию удаления карточки нужно реализовать отдельно и передать 
// в функцию создания карточки, где она будет вызвана из обработчика клика по иконке.
function delFunc(evt) {
    const deleteButton = evt.target;
    const listItem = deleteButton.closest('.card');
    listItem.remove();
}

// Используя полученную функцию, выведите все карточки 
// из массива на страницу в элемент .places__list.
initialCards.forEach(function (item) { 
  addCard(item, delFunc);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
