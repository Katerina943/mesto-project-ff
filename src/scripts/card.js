import { deleteCard, addLike, deleteLike } from './api'

export { createPlacesItemClone, deletePlacesItemClone, addLikeForCard }
//import { closePopup, openPopup } from "./modal.js";

// функция создания элемента списка
function createPlacesItemClone(cardData, deletePlacesItem, addLikeForCard, placesItem, handlerOpenImage, usrId) {
  // создаём новый элемент списка изображений 
  const placesItemClone = placesItem.cloneNode(true);

  // загружаем изображение из нового элемента
  const cardImage = placesItemClone.querySelector('.card__image');
  // проинициализируем изображение
  cardImage.setAttribute('alt', cardData.name);
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('data-card_id', cardData._id);


  // загружаем заголовок изображения
  const cardTitle = placesItemClone.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  // загружаем кнопку удаления изображения из нового элемента
  const cardDeleteButton = placesItemClone.querySelector('.card__delete-button');

  // загружаем кнопку добавления лайка на изображении
  const cardLikeButton =  placesItemClone.querySelector('.card__like-button');

  // если загружаемая карточка от моего пользователя, то кнопку удаляем  
  if (cardData.owner._id !== usrId) {
     cardDeleteButton.style.display = "none";    
  }

  //добавляем обработчик события кнопке удаления изображения
  cardDeleteButton.addEventListener('click', deletePlacesItem);   

  // загружаем элемент для отображения количества лайков
  const likeQuantity = placesItemClone.querySelector('.card__like-quantity');
  likeQuantity.innerHTML = cardData.likes.length; 

  // загружаем пользовател, который лайкали карточку
  for (const liker of cardData.likes) {
    if (liker._id === usrId)  {
      cardLikeButton.classList.add('card__like-button_is-active'); 
    }
  } 

  // добавляем обработчик события кнопке лайка
  cardLikeButton.addEventListener('click', addLikeForCard);

  // загружаем обработчик события на элемент li
  placesItemClone.addEventListener('click', handlerOpenImage);

  return placesItemClone;
}

// функция удаления элемента списка
function deletePlacesItemClone(event) {
  /*
  // заружаем модальное окно Удалить изображение
  const confirmPopup = document.querySelector('.popup_confirm');
  // загружаем кнопку Да, находящуюся на модальном окне
  const buttonYes = confirmPopup.querySelector('.popup__button');
  const parent = cardImage.parentNode;

  // вызываем функцию открытия модального окна
  openPopup(confirmPopup);
  // устанавливаем обработчик события на кнопку Да
  buttonYes.addEventListener('click', () => {  
    // удаляем элемент из списка
    parent.remove(); 
    closePopup(confirmPopup); 
  });
  */

  // проверка вызова события на кнопке удаления
  if (!event.target.classList.contains('card__delete-button')) return;

  const cardDeleteButton = event.target;
  // определяем конкретный элемент списка, который необходимо удалить
  const placesItemClone = cardDeleteButton.closest('.places__item');
  // определяем дочерний элемент, для нахождения атрибута с id
  const cardImage = placesItemClone.querySelector('.card__image');
  const cardImageId = cardImage.getAttribute('data-card_id');


  deleteCard(cardImageId)
  .then(() => {     
       // удаляем элемент из списка
       placesItemClone.remove();
      })
  .catch(error => console.log(error));
}

// функция добавления лайка
function addLikeForCard(event) {
  // проверка вызова события на кнопке лайка
  if (!event.target.classList.contains('card__like-button')) return;
  // определяем конкретный элемент списка лайка
  const cardLikeButton = event.target;
  // определяем конкретный элемент списка
  const placesItemClone = cardLikeButton.closest('.places__item');
  // определяем дочерний элемент, для нахождения атрибута с id
  const cardImage = placesItemClone.querySelector('.card__image');
  const cardImageId = cardImage.getAttribute('data-card_id');
  const likeQuantity = placesItemClone.querySelector('.card__like-quantity');
    
  // проверка наличия класса у кнопки лайка 
  /* 
  if (!cardLikeButton.classList.contains('card__like-button_is-active') ) {
    addLike(cardImageId)    
    .then((json) => {
        cardLikeButton.classList.add('card__like-button_is-active'); 
        likeQuantity.textContent = json.likes.length;
        console.log(json._id);
      })  
    .catch(error => {console.log(error)});    
  }   
  else { 
    // запрос для удаления лайка
    deleteLike(cardImageId)
    .then((json) => {      
      cardLikeButton.classList.remove('card__like-button_is-active');
      likeQuantity.textContent = json.likes.length;
      console.log(json.likes.length);
    })
  } 
  */
  const likeMethod = cardLikeButton.classList.contains('card__like-button_is-active') ? deleteLike : addLike;
    likeMethod(cardImageId) 
      .then((res) => {
           likeQuantity.textContent = res.likes.length; 
           cardLikeButton.classList.toggle("card__like-button_is-active"); 
      })
      .catch(err => console.log(err));
}