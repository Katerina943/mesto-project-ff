export { createPlacesItemClone, deletePlacesItemClone, addLikeForCard }

// функция создания элемента списка
function createPlacesItemClone (initialCard, deletePlacesItem, addLikeForCard, placesItem, openPopupImage) {
  // создаём новый элемент списка изображений 
  const placesItemClone = placesItem.cloneNode(true);

  // загружаем изображение из нового элемента
  const cardImage = placesItemClone.querySelector('.card__image');
  // проинициализируем изображение
  cardImage.setAttribute('alt', initialCard.name);
  cardImage.setAttribute('src', initialCard.link);

  // загружаем заголовок изображения
  const cardTitle = placesItemClone.querySelector('.card__title');
  cardTitle.textContent = initialCard.name;

  // загружаем кнопку удаления изображения из нового элемента
  const cardDeleteButton = placesItemClone.querySelector('.card__delete-button');
  // добавляем обработчик события кнопке удаления изображения
  cardDeleteButton.addEventListener('click', deletePlacesItem);

  // загружаем кнопку добавления лайка на изображении
  const cardLikeButton =  placesItemClone.querySelector('.card__like-button');
  // добавляем обработчик события кнопке лайка
  cardLikeButton.addEventListener('click', addLikeForCard);

  // загружаем обработчик события на элемент li
  //Модальное окно Просмотреть изображение
  const openImage = document.querySelector('.popup_type_image');
  const dataImage = openImage.querySelector('.popup__image');
  const titleImage = openImage.querySelector('.popup__caption');

  placesItemClone
      .addEventListener('click', function(event) {
        if (event.target.classList.contains('card__image')) {
          openPopupImage(openImage);
          dataImage.alt = event.target.alt;
          dataImage.src= event.target.src;
          titleImage.textContent = event.target.alt;
        };
    });
  return placesItemClone;
}

// функция удаления элемента списка
function deletePlacesItemClone(event) {
  // проверка вызова события на кнопке удаления
  if (!event.target.classList.contains('card__delete-button')) return;
  const cardDeleteButton = event.target;
  // определяем конкретный элемент списка, который необходимо удалить
  const placesItemClone = cardDeleteButton.closest('.places__item');
  // удаляем элемент из списка
  placesItemClone.remove();
}

// функция добавления лайка
function addLikeForCard(event) {
  // проверка вызова события на кнопке лайка
  if (!event.target.classList.contains('card__like-button')) return;
  // определяем конкретный элемент списка лайка
  const cardLikeButton = event.target;
  // смена темы кнопки лайка 
  cardLikeButton.classList.toggle('card__like-button_is-active');
}


