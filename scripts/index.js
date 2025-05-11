
// @todo: Темплейт карточки

// Удалите карточки
// В шаблоне карточек уже добавлена иконка удаления,
// при клике по ней выбранная карточка должна удаляться со страницы.
// Функцию удаления карточки нужно реализовать отдельно и передать 
// в функцию создания карточки, где она будет вызвана из обработчика клика по иконке.
function delFunc(elem) {
    console.log('Мы кликнули по элементу');

    const parant = elem;
    // parant.remove();
    // elem.remove();
}

// Создайте карточки
// Вам нужно написать функцию, 
// которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления, 
function addCard (card, callback) {
    // Для этого внутри функции вам понадобится: 
    let placesList = document.querySelector('.places__list');
    // клонировать шаблон
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    // установить значения вложенных элементов,
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    // добавить к иконке удаления обработчик клика,
    // по которому будет вызван переданный в аргументах колбэк
    const cardDelBtn = document.querySelector('.profile__add-button');
    // cardDelBtn.addEventListener('click', callback); 
    cardDelBtn.addEventListener('click', function () {
        const deleteButton = document.querySelector('.profile__add-button');
        const listItem = deleteButton.closest('.profile');
        listItem.remove();
    }); 

    
// а возвращает подготовленный к выводу элемент карточки. 
    return placesList.append(cardElement)
};

// вызов функции с переданной ей другой функцей(КОЛБЭК)
// addCard(initialCards, delFunc);

// Используя полученную функцию, выведите все карточки 
// из массива на страницу в элемент .places__list.
for (let i = 0; i < initialCards.length; i ++) {
    addCard(initialCards[i], delFunc)
}


/*
<template id="card-template">
  <li class="places__item card">
    <img class="card__image" src="" alt="" />
    <button type="button" class="card__delete-button"></button>
    <div class="card__description">
      <h2 class="card__title">
      </h2>
      <button type="button" class="card__like-button"></button>
    </div>
  </li>
</template>

*/

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
