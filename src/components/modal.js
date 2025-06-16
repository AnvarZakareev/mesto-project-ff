// Работу модальных окон — в файл modal.js.
// Оттуда экспортируйте функции openModal и closeModal,
// принимающие в качестве аргумента DOM-элемент
// модального окна, с которым нужно произвести действие.


export {openModal, closeModal};

function openModal (popup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
};

function closeModal (evt) {
  const x = evt.target.parentNode.parentNode
  x.classList.remove('popup_is-opened');
  x.classList.add('popup_is-animated');
}