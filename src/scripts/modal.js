export { openEditProfile, openAddImage, openPopup, closePopup, addDataInProfile };
import { inputUserName, inputDestiny, userName, destiny, openImage, buttonsClose, popups } from './index.js';


// функции - слушатели
// открыть Редактировать профиль
function openEditProfile() {
  inputUserName.value = userName.textContent;
  inputDestiny.value = destiny.textContent;
  openPopup(windowEditProfile);
} 

// открыть форму Добавить изображение
function openAddImage(event) {
  event.preventDefault();
  formAddImage.reset();  // очистка формы при открытии
  windowAddImage.classList.add('popup_is-animated');
  windowAddImage.classList.toggle('popup_is-opened');
}

// функция добавления значений: имени и занятия в текстовые поля на страницу
function addInpyt(title, data) {
  userName.textContent = title;
  destiny.textContent = data;
};

// функция-слушатель, сохраняет значения имени и занятия по кнопке Сохранить
// сохраняет значения полей-инпутов в функцию, которая 
// будет возвращать значения на страницу профиля 
function addDataInProfile(event) {
  event.preventDefault();  
  addInpyt(inputUserName.value, inputDestiny.value);
  windowEditProfile.classList.remove('popup_is-opened'); 
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

// закрытие модального окна нажатием на клавишу "Escape"
document.addEventListener('keydown', function(event) {    
  if (event.key === 'Escape') {
    closePopup(openImage);    
  };
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

//закрытие модального окна на крестик
buttonsClose.forEach((buttonClose) => {
  buttonClose.addEventListener('click', () => {
    const popup = buttonClose.closest('.popup');  // находим родительсткий элемент
    closePopup(popup);       
  });
});