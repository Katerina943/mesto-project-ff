export { openPopup, closePopup };

import { handlerEscape } from '../index.js';

// функция открытия модального окна
function openPopup(nameModalWindow) {
  nameModalWindow.classList.add('popup_is-animated');
  nameModalWindow.classList.toggle('popup_is-opened');
  
  // регистрируем обработчик закрытия модального окна нажатием на клавишу "Escape"
  document.addEventListener('keydown', handlerEscape);
};

// функция закрытия модального окна
function closePopup(nameModalWindow) {
  nameModalWindow.classList.remove('popup_is-opened');
  // удаляем обработчик закрытия модального окна нажатием на клавишу "Escape"
  document.removeEventListener('keydown', handlerEscape); 
}



