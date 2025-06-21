export {createCard, deleteCard, likeCard};

//Темплейт карточки

// Функция, которая принимает в аргументах данные одной карточки
// и функцию-колбэк для удаления, а возвращает подготовленный к
// выводу элемент карточки
function createCard (card, delateCard, handleImageClick, likeCard) 
{
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener("click", delateCard);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener("click", () => {
    handleImageClick(card.link, card.name)
    });
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
    });
  return cardElement;
};


// При клике по иконке удаления выбранная карточка должна удаляться
// со страницы
function deleteCard(evt) 
{
  const cardElement = evt.target.closest('.card');
  cardElement.remove();
};


// Если лайкнуть карточку, сердечко поменяет цвет
// Обратите внимание что функцию обработчика лайка 
// нужно передать в функцию создания карточки как аргумент.
// Это понадобится в будущем для интеграции с API.

function likeCard(evt) 
{
  if (evt.classList.contains('card__like-button_is-active'))
    {
    evt.classList.remove('card__like-button_is-active')
    }
  else 
    {
    evt.classList.add('card__like-button_is-active')
    }
};