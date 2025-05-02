import { initialCards } from './scripts/cards.js';
import { createPlacesItemClone, deletePlacesItemClone, addLikeForCard } from './scripts/card.js';
import { openAddImage, addDataInProfile, addImg, closePopup, openPopup} from './scripts/modal.js';
import '../src/styles/index.css';  // '..//styles/index.css'

export { placesList, placesItem, windowEditProfile, inputUserName, inputDestiny, userName, userDestiny, 
  formAddImage, windowAddImage, inputCardName, inputCardUrl }

// загружаем шаблон для создания элемента списка
const cardTemplate = document.querySelector("#card-template").content;
const placesItem = cardTemplate.querySelector(".places__item");
// загружаем основное содержимое страницы
const mainContent = document.querySelector(".content");

// загружаем список изображений
const placesList = mainContent.querySelector(".places__list");

for (let card of initialCards) {
  // в начало списка ul добавляем элемент li
  placesList.prepend(createPlacesItemClone(card, deletePlacesItemClone, addLikeForCard, placesItem, openPopupImage));   
}

// Модальное окно Редактировать профиль
const windowEditProfile = document.querySelector('.popup_type_edit');
  // поле имя пользователя
  let inputUserName = windowEditProfile.querySelector('.popup__input_type_name');
  // поле занятие
  let inputDestiny = windowEditProfile.querySelector('.popup__input_type_description');  

// находим данные о пользователе на странице
  // имя пользователя на странице
  let userName = document.querySelector('.profile__title');
  // занятие пользователя на странице
  let userDestiny = document.querySelector('.profile__description'); 
  
//Модальное окно Добавить изображение
const windowAddImage = document.querySelector('.popup_type_new-card');
  // поле название места
  let inputCardName = windowAddImage.querySelector('.popup__input_type_card-name');
  // поле ссылка
  let inputCardUrl = windowAddImage.querySelector('.popup__input_type_url');

// Кнопки открытия модальных окон
// кнопка Редактировать профиль
const buttonEditProfile = document.querySelector('.profile__edit-button');

// кнопка Добавить изображение
const buttonAddImage = document.querySelector('.profile__add-button');

// Кнопки-крестики закрытия модальных окон
const buttonsClose = document.querySelectorAll('.popup__close');

// Массив форм
let collection = document.forms;
  // Формы
  let formEditProfile = collection['edit-profile'];
  let formAddImage = collection['new-place'];

// модальные окна
const popups = document.querySelectorAll('.popup');

// слушатель кнопки Редактировать профиль
buttonEditProfile.addEventListener('click', editProfileOpenedHandler);

// слушатель кнопки Добавить изображение (+)
// открывается форма добавления изображения
buttonAddImage.addEventListener('click', openAddImage);

// слушатели кнопок сохранить
formEditProfile.addEventListener('submit', addDataInProfile);
formAddImage.addEventListener('submit', addImg);

//закрытие модального окна на крестик
buttonsClose.forEach((buttonClose) => {
  buttonClose.addEventListener('click', () => {
    const popup = buttonClose.closest('.popup');  // находим родительсткий элемент
    closePopup(popup);       
  });
});

// закрытие модального окна по оверлею
popups.forEach((popup) => {
  popup.onclick = function(event) {
    const target = event.target;
    if (target === popup) {
      closePopup(popup);      
    };
  };
});

// закрытие модального окна нажатием на клавишу "Escape"
document.addEventListener('keydown', handleEscape);

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); 
    if (openedPopup === null) return;
    closePopup(openedPopup);     
  }
};

// функция-слушатель
// открыть Редактировать профиль
function editProfileOpenedHandler() {
  inputUserName.value = userName.textContent;
  inputDestiny.value = userDestiny.textContent;
  openPopup(windowEditProfile);
};

// функция открытия модального окна изображения
function openPopupImage(nameModalWindowImage) {
  nameModalWindowImage.classList.add('popup_is-animated');
  nameModalWindowImage.classList.toggle('popup_is-opened');
};


