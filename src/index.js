import { initialCards } from './scripts/cards.js';
import { createPlacesItemClone, deletePlacesItemClone, addLikeForCard } from './scripts/card.js';
import { closePopup, openPopup} from './scripts/modal.js';
import '../src/styles/index.css';  // '..//styles/index.css'

export { handlerEscape }
// загружаем шаблон для создания элемента списка
const cardTemplate = document.querySelector("#card-template").content;
const placesItem = cardTemplate.querySelector(".places__item");
// загружаем основное содержимое страницы
const mainContent = document.querySelector(".content");

// загружаем список изображений
const placesList = mainContent.querySelector(".places__list");

for (const card of initialCards) {
  // в начало списка ul добавляем элемент li
  placesList.prepend(createPlacesItemClone(card, deletePlacesItemClone, addLikeForCard, placesItem, handlerOpenImage));   
}

// Модальное окно Редактировать профиль
const windowEditProfile = document.querySelector('.popup_type_edit');
  // поле имя пользователя
  const inputUserName = windowEditProfile.querySelector('.popup__input_type_name');
  // поле занятие
  const inputDestiny = windowEditProfile.querySelector('.popup__input_type_description');  

// находим данные о пользователе на странице
  // имя пользователя на странице
  const userName = document.querySelector('.profile__title');
  // занятие пользователя на странице
  const userDestiny = document.querySelector('.profile__description'); 
  
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

//Модальное окно Просмотреть изображение
const openImage = document.querySelector('.popup_type_image');

// Массив форм
const collection = document.forms;
  // Формы
  const formEditProfile = collection['edit-profile'];
  const formAddImage = collection['new-place'];

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

function handlerEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); 
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
  document.addEventListener('keydown', handlerEscape);
};

// функция - слушатель
// открыть форму Добавить изображение
function openAddImage(event) {
  event.preventDefault();
  formAddImage.reset();  // очистка формы при открытии
  openPopup(windowAddImage);
};

// функция - слушатель
// открыть изображение
function handlerOpenImage(event) {  
  //Модальное окно Просмотреть изображение
  const dataImage = openImage.querySelector('.popup__image');
  const titleImage = openImage.querySelector('.popup__caption');

  if (event.target.classList.contains('card__image')) {
    openPopupImage(openImage);
    dataImage.alt = event.target.alt;
    dataImage.src= event.target.src;
    titleImage.textContent = event.target.alt;
  };  
};

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
  closePopup(windowEditProfile); 
};

// функция добавления элемента li (изображения) в начало списка ul
function addImg(event) {
  event.preventDefault();
  const cardImg = {};
  cardImg.name = inputCardName.value;
  cardImg.link = inputCardUrl.value;
  placesList.prepend(createPlacesItemClone(cardImg, deletePlacesItemClone, addLikeForCard, placesItem, handlerOpenImage));
  closePopup(windowAddImage); 
};