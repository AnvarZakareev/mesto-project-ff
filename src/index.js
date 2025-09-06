//В файле index.js должны остаться:
// 1 объявления и инициализация глобальных констант и
// переменных с DOM-элементами страницы;
// 2 обработчики событий (при открытии и закрытии попапов;
// при отправке форм; обработчик, открывающий попап при
// клике по изображению карточки);
// 3 вызовы других функций, подключённых из созданных модулей,
// которым нужно будет передавать объявленные здесь переменные
// и обработчики.

// Код модулей должен быть написан так, чтобы их можно было
// забрать из проекта и перенести в другой без необходимости
// что-то менять внутри. Подумайте, какие настройки для этого
// нужно передать аргументами.
// Чтобы было чуточку понятнее: вызов функции создания
// карточки должен находиться в файле index.js, но само
// объявление функции — в card.js. Используйте директивы
// export/import.

// Импорт

import './pages/index.css';
import {createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUser, getInitialCards, pathProfile, pathCard, pathAvatar} from './components/api.js';


// Oбъявления и инициализация глобальных констант и
// переменных с DOM-элементами страницы

const placesList = document.querySelector('.places__list');
const profileEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileAdd = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

 
    // ---------------------  
    // открытие окон попапов
    // ---------------------
    
// Редактирование информации о себе

profileEdit.addEventListener('click', () => {
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
  openModal(popupEdit);
  clearValidation(popupEdit, validationConfig);
});
    
// Добавление новой карточки

profileAdd.addEventListener('click', () => {
  openModal(formAddCard);
  clearValidation(formAddCard, validationConfig);
  cleanInput(formAddCard);
});

// Обновление аватара пользователя

profileAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  clearValidation(popupAvatar, validationConfig);
  cleanInput(popupAvatar);
});

// открытие окна просмотра карточки

function handleImageClick(link, alt, name) {
  const image = document.querySelector('.popup__image');
  image.src = link;
  image.alt = alt;
  const caption = document.querySelector('.popup__caption');
  caption.textContent = name;
  openModal(popupImage);
};

    // ---------------------
    // Изменения на странице
    // ---------------------

    
// Обновление аватара пользователя
    
function editAvatar (evt){
  evt.preventDefault();
  const popupForm = document.forms.avatar;
  const url = popupForm.elements.avatar.value;
  uxSavingButton (popupForm);
  pathAvatar(url)
  .then((res) => {
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    closeModal(popupAvatar);
    uxSavingButton (popupForm);
  })
  .catch((err) => {
    console.log(err);
  });
};

popupAvatar.addEventListener('submit', editAvatar)

// Добавление карточки

function addCard(evt) {
  evt.preventDefault();
  const popupForm = document.forms.newplace;
  const name = popupForm.elements.placename;
  const link = popupForm.elements.link;
  const newCard = {};
  newCard.name = name.value;
  newCard.link = link.value;
  uxSavingButton (popupForm);
  pathCard(name.value, link.value)
  .then ((res) => {
    const cardElement = createCard(res, handleImageClick);
    placesList.prepend(cardElement);
    popupForm.reset();
    closeModal(formAddCard);
    uxSavingButton (popupForm);
  })
  .catch((err) => {
    console.log(err);
  });
};

formAddCard.addEventListener('submit', addCard);


<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 60ec5775f48464c4cd63f87ab89af3c5ce56c2d8
// Валидация 

const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

// Функция, которая добавляет класс с ошибкой
<<<<<<< HEAD

=======
>>>>>>> 60ec5775f48464c4cd63f87ab89af3c5ce56c2d8
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // console.log(errorElement)
  // Остальной код такой же
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};


// Функция, которая удаляет класс с ошибкой
<<<<<<< HEAD

=======
>>>>>>> 60ec5775f48464c4cd63f87ab89af3c5ce56c2d8
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('form__input-error');
  errorElement.textContent = '';
}; 

// Функция, которая проверяет валидность поля
// formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
// inputElement — проверяемое поле ввода.
const isValid = (formElement, inputElement) => {
  // console.log(inputElement.validity.patternMismatch)
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
}; 

// Вызовем функцию isValid на каждый ввод символа
// formInput.addEventListener('input', isValid(formElement, formInput)); 


// Добавление обработчиков всем полям формы

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__button');
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Добавление обработчиков всем формам

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    // console.log(buttonElement)
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
<<<<<<< HEAD
};
>>>>>>> d9e4fc3 (002903072025)
=======
};
>>>>>>> 60ec5775f48464c4cd63f87ab89af3c5ce56c2d8
