export {openModal, closeModal};

function openModal (popup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
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