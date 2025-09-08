// Импорт

export {deleteConfirm}
import './pages/index.css';
import {createCard, deleteCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation, validationConfig} from './components/validation.js';
import {getUser, getInitialCards, pathProfile, pathCard, pathAvatar, deleteCardApi} from './components/api.js';


// Oбъявления и инициализация глобальных констант ипеременных с DOM-элементами страницы

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
const popupConfirm = document.querySelector('.popup__confirm');


          // ---------------------------------------------------------
          // Во время отправки запроса на сервер меняется текст кнопки
          // ---------------------------------------------------------

// Варианты текста

const settings = {
  save: 'Сохранить',
  saving: 'Сохранение...',
  yes: 'Да',
  create: 'Создать',
};

// Функция изменения текста

function uxSavingButton (popupForm, text) {
  popupForm.querySelector('.popup__button').textContent = text;
};


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


              // -------------------
              // Логика окон попапов
              // -------------------

// Обновление аватара пользователя
    
function editAvatar (evt){
  evt.preventDefault();
  const popupForm = document.forms.avatar;
  const url = popupForm.elements.avatar.value;
  uxSavingButton (popupForm, settings.saving);
  pathAvatar(url)
  .then((res) => {
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    closeModal(popupAvatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
  uxSavingButton (popupForm, settings.save)});
};

popupAvatar.addEventListener('submit', editAvatar);

// Добавление карточки

function addCard(evt) {
  evt.preventDefault();
  const popupForm = document.forms.newplace;
  const name = popupForm.elements.placename;
  const link = popupForm.elements.link;
  const newCard = {};
  newCard.name = name.value;
  newCard.link = link.value;
  uxSavingButton (popupForm, settings.saving);
  pathCard(name.value, link.value)
  .then ((res) => {
    const cardElement = createCard(res, handleImageClick, userId);
    placesList.prepend(cardElement);
    popupForm.reset();
    closeModal(formAddCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
  uxSavingButton (popupForm, settings.save)});
};

formAddCard.addEventListener('submit', addCard);

// Редактирование имени и информации о себе

const formEdiProfile = document.querySelector('[name="profile"]');

function submitFormEdiProfile(evt) {
  evt.preventDefault();
  const popupForm = document.forms.profile;
  const name = popupForm.elements.name.value;
  const description = popupForm.elements.description.value;
  uxSavingButton (popupForm, settings.saving);
  pathProfile(name, description)
  .then ((res) => {
    profileTitle.textContent = name;
    profileDescription.textContent = description;
    closeModal(formEdiProfile.parentNode.parentNode);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
  uxSavingButton (popupForm, settings.save)});
};

formEdiProfile.addEventListener('submit', submitFormEdiProfile);

// Подтверждение удаления

function deleteConfirm (card, cardElement) {
  openModal(popupConfirm);
  const cardDeleteButton = popupConfirm.querySelector('.popup__button');
  cardDeleteButton.addEventListener("click", () => {
    uxSavingButton(popupConfirm, settings.saving);
    deleteCardApi(card)
    .then ((res) => {
      closeModal(popupConfirm);
      deleteCard(cardElement);
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(function(){
      uxSavingButton(popupConfirm, settings.yes);
    });
  });
};


                //  ------
                //  Прочее
                //  -------

// отчистка поля ввода

function cleanInput(popup) {
  const cleanArrInput = popup.querySelectorAll('.popup__input');
  cleanArrInput.forEach((errorInput) => {
    errorInput.value = '';
  });
};

// Настройки валидации

enableValidation(validationConfig);
      
// хранится ID пользователя для отображения значка карзины в созданной карточке

let userId;

// Создаём массив с промисами
// Загрузка информации о пользователе с сервера
// Загрузка карточек с сервера

const getAll = [getUser(), getInitialCards()];


Promise.all(getAll)
  .then((result) => {
    profileTitle.textContent = result[0].name;
    profileDescription.textContent = result[0].about;
    profileAvatar.style.backgroundImage = `url(${result[0].avatar})`;
    const user_Id = result[0]._id;
    result[1].forEach((cardData) => {
      const cardElement = createCard(cardData, handleImageClick, user_Id);
      placesList.append(cardElement);
    });
    userId = user_Id
  })
  .catch((error) => 
    console.error(error)
);