//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// вызов функций enableValidation и clearValidation должен находиться в файле index.js.
// А все другие функции, включая декларирование функции enableValidation и валидации форм,
// — в отдельном файле validation.js.


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// очистка ошибок валидации вызовом clearValidation

clearValidation(profileForm, validationConfig);