
export {enableValidation, clearValidation};

// Валидация форм

// Функция, которая добавляет класс с ошибкой
function showInputError (formElement, inputElement, errorMessage, settings) {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(settings.inputErrorActive);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError (formElement, inputElement, settings) {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(settings.inputErrorActive);
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
function isValid (formElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением, переменная validationMessage хранит наше кастомное сообщение
    // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    // Если проходит, скроем hideInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, settings);
  }};

// Функция принимает массив полей
function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
    // проходим по этому массиву методом some если поле не валидно, колбэк вернёт true обход массива прекратится и вся функция вернёт true
    return !inputElement.validity.valid;
})};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState (inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
    // Если есть хотя бы один невалидный инпут сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {  // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
}};

//Функция setEventListeners добавит обработчики сразу всем полям формы.
function setEventListeners (formElement, settings) {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  // Найдём в текущей форме кнопку отправки вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, settings);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // каждому полю добавим обработчик события input внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, settings)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, settings);
});});};

//Функция enableValidation найдёт на странице и обработает все формы с классом form.
function enableValidation (settings) {
    const {
        formSelector, //'.popup__form'
        inputSelector, //'.popup__input'
        submitButtonSelector, //'.popup__button'
        inactiveButtonClass, //'popup__button_disabled'
        inputErrorClass, // 'popup__input_type_error'
        inputErrorActive, // 'popup__input-error_active'
        // errorClass: 'popup__error_visible'
    } = settings
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement, settings);
  });};


// очистка ошибок валидации вызовом clearValidation
  function clearValidation (profileForm, validationConfig) {
//   // Находим все поля внутри формы
  const formElement = profileForm.querySelector(validationConfig.formSelector)
//   // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
//   // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
//   // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
//   // Скрываем сообщение об ошибке
  errorElement.classList.remove(validationConfig.inputErrorActive);
//   // Очистим ошибку
  errorElement.textContent = '';
})
}