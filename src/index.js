import './styles/index.css'; // добавьте импорт главного файла стилей 

// загружаем шаблон для создания элемента списка
const cardTemplate = document.querySelector("#card-template").content;
const placesItem = cardTemplate.querySelector(".places__item");
// загружаем основное содержимое страницы
const mainContent = document.querySelector(".content");
// загружаем кнопку добавления изображения
const profileAddButton = mainContent.querySelector(".profile__add-button");
// загружаем список изображений
const placesList = mainContent.querySelector(".places__list");

for (let card of initialCards) {
  placesList.append(createPlacesItemClone(card, deletePlacesItemClone));
}

// функция созданием элемента списка
function createPlacesItemClone(initialCard, deletePlacesItem) {
  // создаём новый элемент списка изображений
  const placesItemClone = placesItem.cloneNode(true);

  // загружаем изображение из нового элемента
  const cardImage = placesItemClone.querySelector(".card__image");
  // проинициализируем изображение
  cardImage.setAttribute("alt", initialCard.name);
  cardImage.setAttribute("src", initialCard.link);

  // загружаем кнопку удаления изображения из нового элемента
  const cardDeleteButton = placesItemClone.querySelector(".card__delete-button");
  // добавляем обработчик события кнопке удаления изображения
  cardDeleteButton.addEventListener("click", deletePlacesItem);

  return placesItemClone;
}

// функция удаления элемента списка
function deletePlacesItemClone(event) {
  // проверка вызова события на кнопке удаления
  if (!event.target.classList.contains("card__delete-button")) return;
  const cardDeleteButton = event.target;
  // определяем конкретный элемент списка, который необходимо удалить
  const placesItemClone = cardDeleteButton.closest(".places__item");
  // удаляем элемент из списка
  placesItemClone.remove();
}

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки 

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// console.log('Hello, World!')

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10








