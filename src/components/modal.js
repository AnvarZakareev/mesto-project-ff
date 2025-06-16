// Работу модальных окон — в файл modal.js.
// Оттуда экспортируйте функции openModal и closeModal,
// принимающие в качестве аргумента DOM-элемент
// модального окна, с которым нужно произвести действие.


export {openModal, closeModal};

function openModal (popup, funcClosePopup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
  // const popup_close = document.querySelector('.popup__close');
  // popup_close.addEventListener("click", funcClosePopup);
};

function closeModal (evt) {
  const x = evt.target.parentNode.parentNode
  // console.log(x)
  x.classList.remove('popup_is-opened');
  x.classList.add('popup_is-animated');
}