// Вызов функции создания карточки должен находиться в файле index.js,
// но само объявление функции — в card.js. 
// Используйте директивы export/import.

import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard} from './components/card.js';

const placesList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
   placesList.append(cardElement);
});
