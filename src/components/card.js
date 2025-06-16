
export {createCard, deleteCard};

//Темплейт карточки

// Функция, которая принимает в аргументах данные одной карточки
// и функцию-колбэк для удаления, а возвращает подготовленный к
// выводу элемент карточки
function createCard (card, delateCard, ) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener("click", delateCard);
  // cardElement.addEventListener("click", funcOpenPopup)
  // const popup_close = document.querySelector('.popup__close');
  // console.log(popup_close)
  // popup_close.addEventListener("click", funcClosePopup);
  return cardElement;
};

// При клике по иконке удаления выбранная карточка должна удаляться
// со страницы
function deleteCard(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
};