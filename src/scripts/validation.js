import { settings } from '../index.js';

/*
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_not-active',  // 'popup__button_disabled'  // кнопка отключена
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active',                                   //  'popup__error_visible',
  dataError: '.data-error-message',
};
*/

// показать ошибку
const showError = (formElement, inputElement, errorMessage, settings) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавим полю ввода класс с ошибкой
  inputElement.classList.add(settings.inputErrorClass);     //  'form__input_type_error'
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(settings.errorClass);   //  'form__input-error_active'
};

// скрыть ошибку
const hideError = (formElement, inputElement, settings) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
  inputElement.classList.remove(settings.inputErrorClass);    //  'form__input_type_error'
  errorElement.classList.remove(settings.errorClass);  // 'form__input-error_active'
  errorElement.textContent = '';
};

// Функция проверки валидности поля
const isValid = (formElement, inputElement) => {
 if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
    // inputElement.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы.");
    inputElement.classList.add(settings.dataError);
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
        // переменная validationMessage хранит кастомное сообщение
    showError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    // Если поле проходит валидацию, то скроем ошибку; hideError получает форму, в кот
    // находится проверяемое поле, и само поле
    hideError(formElement, inputElement, settings);
  }
};

// Блокируем кнопку отправки формы
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

// Стилизация кнопки Сохранить
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделать кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);  // 'popup__button_not-active'
    buttonElement.classList.remove('popup__button:hover');
  } else {
    // иначе сделать кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);  // 'popup__button_not-active'
  }
}; 


// Добавление обработчиков всем полям формы
const setEventListeners = (formElement, settings) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));   //.popup__input
  
  // Найдём в текущей форме кнопку Сохранить
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);   // .popup__button

  // Вызовем toggleButtonState и передадим ей массив полей и кнопку
   // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, settings);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {    
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement); 
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, settings);    
    });
  });
}; 

// Добавление обработчиков всем формам
export const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      //console.log(form);
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(form, settings); //?
  });

};


/////////////////////

// При повторном открытии формы убирает все ошибки и деактивирует кнопку
export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, settings);
      // сделать кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);  // 'popup__button_not-active'
    //buttonElement.classList.remove('popup__button:hover');
    
  });
};






