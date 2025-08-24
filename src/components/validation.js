
export {enableValidation};

// Валидация форм

// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');


// Функция, которая добавляет класс с ошибкой
// Передадим текст ошибки вторым параметром
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input-error_active');
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
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
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем hideInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    // проходим по этому массиву методом some если поле не валидно, колбэк вернёт true обход массива прекратится и вся функция вернёт true
    return !inputElement.validity.valid;
})};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    // Если есть хотя бы один невалидный инпут сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {  // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
}};

//Функция setEventListeners добавит обработчики сразу всем полям формы.
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  
  const buttonElement = formElement.querySelector('.button');
  // Найдём в текущей форме кнопку отправки вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // каждому полю добавим обработчик события input внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });});};

//Функция enableValidation найдёт на странице и обработает все формы с классом form.
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });};