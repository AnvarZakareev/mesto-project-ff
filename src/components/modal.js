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

};

function closeModal (popup) {
  // const x = evt.target.parentNode.parentNode
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupOverlay(evt) {
  const modalOpen = document.querySelector(".popup_is-opened"); 
  if (evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup"))
    { 
    closeModal(modalOpen); 
    }
  // if (evt.key === 'Escape') {
  //   const popup = document.querySelector('.popup_is-opened');
  //   closeModal(popup);
  // }
}

function closePopupEsc(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    // console.log(popup)
    closeModal(popup);
  }
}