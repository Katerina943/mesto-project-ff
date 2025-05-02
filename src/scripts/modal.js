export { openAddImage,  addDataInProfile, addImg, 
         openPopup, closePopup };

import { placesList, placesItem, windowEditProfile, inputUserName, inputDestiny, userName, userDestiny, 
  formAddImage, windowAddImage, inputCardName, inputCardUrl } from '../index.js';
import { createPlacesItemClone, deletePlacesItemClone, addLikeForCard } from './card.js';


// функция - слушатели
// открыть форму Добавить изображение
function openAddImage(event) {
  event.preventDefault();
  formAddImage.reset();  // очистка формы при открытии
  openPopup(windowAddImage);
}

// функция добавления значений: имени и занятия в текстовые поля на страницу
function addInpyt(title, data) {
  userName.textContent = title;
  userDestiny.textContent = data;
};

// функция-слушатель, сохраняет значения имени и занятия по кнопке Сохранить
// сохраняет значения полей-инпутов в функцию, которая 
// будет возвращать значения на страницу профиля 
function addDataInProfile(event) {
  event.preventDefault();  
  addInpyt(inputUserName.value, inputDestiny.value);
  windowEditProfile.classList.remove('popup_is-opened'); 
};

// функция добавления элемента li (изображения) в начало списка ul
function addImg(event) {
  event.preventDefault();
  const cardImg = {};
  cardImg.name = inputCardName.value;
  cardImg.link = inputCardUrl.value;
  placesList.prepend(createPlacesItemClone(cardImg, deletePlacesItemClone, addLikeForCard, placesItem));
  windowAddImage.classList.remove('popup_is-opened');  
};

// функция открытия модального окна
function openPopup(nameModalWindow) {
  nameModalWindow.classList.add('popup_is-animated');
  nameModalWindow.classList.toggle('popup_is-opened');
};

// функция закрытия модального окна
function closePopup(nameModalWindow) {
  nameModalWindow.classList.remove('popup_is-opened');
}



