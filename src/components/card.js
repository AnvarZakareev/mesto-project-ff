export {createCard, deleteCard, likeCard};

const cardTemplate = document.querySelector('#card-template')

// Функция, которая принимает в аргументах данные одной карточки
// и функцию-колбэк для удаления, а возвращает подготовленный к
// выводу элемент карточки

function createCard (card, deleteCard, handleImageClick, likeCard, getCardTemplate)
{
  const cardTemplateContent = cardTemplate.content;
  const cardElement = cardTemplateContent.querySelector('.places__item').cloneNode(true);
  // Функционал клонирования шаблона карточки рекомендуется вынести в отдельную функцию getCardTemplate,
  // чтобы сделать код более декларативным и переиспользуемым.
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__like-quantity').textContent = card.likes.length;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener("click", deleteCard);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener("click", () => {
    handleImageClick(card.link, card.alt, card.name)
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