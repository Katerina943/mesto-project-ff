const profileUrl = 'https://nomoreparties.co/v1/wff-cohort-41/users/me';
const cardsUrl = 'https://nomoreparties.co/v1/wff-cohort-41/cards';
const avatarUrl = 'https://nomoreparties.co/v1/wff-cohort-41/users/me/avatar';
const token41 = "c569c80a-83b5-4b21-900d-b6e663669d71";

// загружаем данные о пользователе с сервера и отображаем их на странице
export function fetchGetUserProfile() {
  return fetch(profileUrl, {
    headers: {
      authorization: token41,    
    }
  })
  .then((response) => { 
    if (response.ok) return response.json();
    else Promise.reject('Ошибка загрузки профиля');
  })
};

// запрос на изменение данных профиля
export function fetchChangeUserProfile(title, data) {  
  return fetch(profileUrl, {
    method: 'PATCH',
    headers: {
      authorization: token41,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: title,
      about: data,
    })  
  })
  .then((response) => {
    if (response.ok) return response.json();
    else Promise.reject('Ошибка изменения профиля');
  });
}

export function fetchGetCards() {
  return fetch(cardsUrl, {
    headers: {
      authorization: token41,
    }
  })
  .then((response) => { 
    if (response.ok) return response.json();
    else Promise.reject('Ошибка загрузки карточек');
  })
}

export function fetchPostCard(inputCardName, inputCardUrl) {
  return fetch(cardsUrl, {
    method: 'POST',
    headers: {
      authorization: token41,
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
      name: inputCardName.value,
      link: inputCardUrl.value,
      
    }),
  })
  .then((response) => {
    if (response.ok) return response.json();
    else Promise.reject('Ошибка добавления изображения');
  })
}

export function fetchAvatar(inputAvatarValue) {
  return fetch(avatarUrl, {
    method: 'PATCH',
    headers: {
      authorization: token41,
      'Content-Type': 'application/json',
    },
     body: JSON.stringify({
       avatar: inputAvatarValue      
    }),
  })
  .then(response => {
    if (response.ok) return response.json();
    else Promise.reject('Ошибка изменения аватара профиля');        
  });  
}

export function fetchDeleteCard(cardImageId) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards/'+ cardImageId, {
    method: 'DELETE',

    headers: {
      authorization: 'c569c80a-83b5-4b21-900d-b6e663669d71',    
    }
  });
}

export function fetchAddLike(cardImageId) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards/likes/' + cardImageId, {
    method: 'PUT',

    headers: {
      authorization: 'c569c80a-83b5-4b21-900d-b6e663669d71',    
    }
  }) 
  .then((response) => {
      if (response.ok) {      
        return response.json();                      
      }
      else Promise.reject('Ошибка постановки лайка')
  });
}

export function fetchDeleteLike(cardImageId) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards/likes/' + cardImageId , {
    method: 'DELETE',

    headers: {
      authorization: 'c569c80a-83b5-4b21-900d-b6e663669d71',    
    }
  })     
  .then((response) => {
    if (response.ok) {      
      return response.json();                      
    }
    else Promise.reject('Ошибка удаления лайка');                    
  });
}


  