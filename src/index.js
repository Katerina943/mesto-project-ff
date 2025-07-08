import { initialCards } from './scripts/cards.js';
import { createPlacesItemClone, deletePlacesItemClone, addLikeForCard } from './scripts/card.js';
import { closePopup, openPopup} from './scripts/modal.js';
import '../src/styles/index.css'; 
import { enableValidation } from './scripts/validation.js';
import { fetchChangeUserProfile, fetchGetUserProfile, fetchGetCards, fetchPostCard, fetchAvatar} from './scripts/api.js'

export { handlerEscape }
// загружаем шаблон для создания элемента списка
const cardTemplate = document.querySelector("#card-template").content;
const placesItem = cardTemplate.querySelector(".places__item");
// загружаем основное содержимое страницы
const mainContent = document.querySelector(".content");

// загружаем список изображений
const placesList = mainContent.querySelector(".places__list");

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

const avatarProfile = document.querySelector('.profile__image');

Promise.all([fetchGetUserProfile(), fetchGetCards()]) 
  .then((array) => {
    const user = array[0]; 
    const cards = array[1];

    userName.textContent = user.name;
    userDestiny.textContent = user.about; 
    const userId = user._id;
      
    avatarProfile.style.backgroundImage = `url(${user.avatar})`;

    for (const card of cards) {
      // в начало списка ul добавляем элемент li
      placesList.prepend(createPlacesItemClone(card, deletePlacesItemClone, addLikeForCard, placesItem, handlerOpenImage, userId));   
    }    
  })
  .catch(error => console.log(error));


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
  //console.log(formEditProfile);

  const formAddImage = collection['new-place'];
  //console.log(formAddImage);  

// модальные окна
const popups = document.querySelectorAll('.popup');

// Валидция
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_not-active', 
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active',                                  
};

enableValidation(settings);



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
  const buttonSave = formEditProfile.querySelector('.popup__button');
	buttonSave.textContent = 'Сохранение...';

  fetchChangeUserProfile(title, data)
  .then((json) => { 
    userName.textContent = json.name;
    userDestiny.textContent = json.about;
  })
  .catch((error) => {console.log(error)})
  .finally(()=> {buttonSave.textContent = 'Сохранить'})
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

  const buttonSave = formAddImage.querySelector('.popup__button');
	buttonSave.textContent = 'Сохранение...';

  const cardImg = {};

  fetchPostCard(inputCardName, inputCardUrl)
  .then((json) => {
    cardImg.name = json.name;
    cardImg.link = json.link;
    cardImg.owner= json.owner;
    cardImg.likes = json.likes;
    cardImg._id = json._id;    
    
    placesList.prepend(createPlacesItemClone(cardImg, deletePlacesItemClone, addLikeForCard, placesItem, handlerOpenImage, json.owner._id));
  })
  .catch((error) => {console.log(error)})
  .finally(() => {buttonSave.textContent = 'Сохранить'});
  
  closePopup(windowAddImage); 
};

// Загружаем данные со страницы
// загружаем фотографию с аватаром
const avatarImg = document.querySelector('.profile__image');

// кнопка-фото Изменить аватар с помощью клика на неё
const editAvatarButton = document.querySelector('.profile__image_edit-button');
//слушатель кнопки Аватар
editAvatarButton.addEventListener('click', openEditAvatarForm);

// Модальное окно Изменить аватар
const editAvatarModal = document.querySelector('.popup_avatar_edit');
// инпут модального окна с ссылкой
const inputAvatar = editAvatarModal.querySelector('.popup__input_type_url');

// нахождение коллекции всей формы для установки на ней слушателя submit
const formEditAvatar = collection['edit-profile-avatar'];
// слушатель кнопки Сохранить изменения аватара
formEditAvatar.addEventListener('submit', changeAvatar);

// функция-слушатель клика по Аватару
// открытие модального окна Изменение аватара
function openEditAvatarForm(event) {
  event.preventDefault(); 
  inputAvatar.value = '' ; // очистка инпута при открытии
  openPopup(editAvatarModal); 
};

function changeAvatar(event) {
  event.preventDefault();

  const buttonSave = formEditAvatar.querySelector('.popup__button');
	buttonSave.textContent = 'Сохранение...';

  const inputAvatarValue = inputAvatar.value;

  fetchAvatar(inputAvatarValue)
  .then(json => {
    avatarImg.style.backgroundImage = `url(${json.avatar})`;       
  }) 
  .catch((error) => {console.log(error)})
  .finally(() => {buttonSave.textContent = 'Сохранить'});

  closePopup(editAvatarModal);
}