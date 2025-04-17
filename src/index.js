export {placesItem, placesList, inputUserName, inputDestiny, userName, destiny, inputCardName, inputCardUrl,
  openImage, buttonsClose, popups};

import { initialCards } from "./scripts/cards";
import { createPlacesItemClone, deletePlacesItemClone, addLikeForCard, addImg } from './scripts/card';
import { openEditProfile, openAddImage, addDataInProfile } from './scripts/modal';
import './styles/index.css';


// загружаем шаблон для создания элемента списка
const cardTemplate = document.querySelector("#card-template").content;
const placesItem = cardTemplate.querySelector(".places__item");
// загружаем основное содержимое страницы
const mainContent = document.querySelector(".content");
// загружаем кнопку добавления изображения
//const profileAddButton = mainContent.querySelector(".profile__add-button");
// загружаем список изображений
const placesList = mainContent.querySelector(".places__list");


// перебор элементов массива
for (let card of initialCards) {
  // в конец списка ul добавляем элемент li
  placesList.prepend(createPlacesItemClone(card, deletePlacesItemClone, addLikeForCard));   
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
  let destiny = document.querySelector('.profile__description'); 
  
//Модальное окно Добавить изображение
const windowAddImage = document.querySelector('.popup_type_new-card');
  // поле название места
  let inputCardName = windowAddImage.querySelector('.popup__input_type_card-name');
  // поле ссылка
  let inputCardUrl = windowAddImage.querySelector('.popup__input_type_url');

// кнопки Сохранить
//const buttonsSave = document.querySelectorAll('.popup__button');

//Модальное окно Просмотреть изображение
const openImage = document.querySelector('.popup_type_image');

// Кнопки открытия модальных окон
// кнопка Редактировать профиль
const buttonEditProfile = document.querySelector('.profile__edit-button');

// кнопка Добавить изображение
const buttonAddImage = document.querySelector('.profile__add-button');

// Массив изображений
//const cards = document.querySelectorAll('.card');

// Кнопки-крестики закрытия модальных окон
const buttonsClose = document.querySelectorAll('.popup__close');

// Массив форм
let collection = document.forms;

// Формы
let formEditProfile = collection['edit-profile'];
let formAddImage = collection['new-place'];

const popups = document.querySelectorAll('.popup');

// слушатель кнопки Редактировать профиль
buttonEditProfile.addEventListener('click', openEditProfile);

// слушатель кнопки Добавить изображение (+)
// открывается форма добавления изображения
buttonAddImage.addEventListener('click', openAddImage);

// Cлушатели кнопок Сохранить
// на форме Редактировать профиль
formEditProfile.addEventListener('submit', addDataInProfile);
// на форме Добавить изображение
formAddImage.addEventListener('submit', addImg);

// закрытие модального окна по оверлею
popups.forEach((popup) => {
  popup.onclick = function(event) {
    const target = event.target;
    if (target === popup) {
      closePopup(popup);      
    };
  };
});

//закрытие модального окна на крестик
buttonsClose.forEach((buttonClose) => {
  buttonClose.addEventListener('click', () => {
    const popup = buttonClose.closest('.popup');  // находим родительсткий элемент
    closePopup(popup);       
  });
});