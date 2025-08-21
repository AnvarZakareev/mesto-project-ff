// Работу модальных окон — в файл modal.js.
// Оттуда экспортируйте функции openModal и closeModal,
// принимающие в качестве аргумента DOM-элемент
// модального окна, с которым нужно произвести действие.


export {openModal, closeModal};

function openModal (popup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
  clearError (popup);
}

// Удаление ошибок при открытие окна
function clearError (popup) {
  // Находим все поля внутри формы
  const formElement = popup.querySelector('.popup__form')
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input-error_active');
  // Очистим ошибку
  errorElement.textContent = '';
})
}

function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
};

//Закрытие попапа кликом на оверлей
function closePopupOverlay(evt) {
  const popupOpen = document.querySelector('.popup_is-opened'); 
  if (evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup")) 
    { 
    closeModal(popupOpen); 
    };
};

// Закрытие попапа нажатием на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') 
    {
    const popupOpen = document.querySelector('.popup_is-opened');
    closeModal(popupOpen);
    };
};