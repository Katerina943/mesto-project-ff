const url = 'https://nomoreparties.co/v1/wff-cohort-41/';
const token41 = "c569c80a-83b5-4b21-900d-b6e663669d71";

// загружаем данные о пользователе с сервера и отображаем их на странице
export function getUserProfile() {
  return fetch(`${url}users/me`, {          // profileUrl
    headers: {
      authorization: token41,    
    }
  })
  .then(handleResponse);
}

// запрос на изменение данных профиля
export function changeUserProfile(title, data) {  
  return fetch(`${url}users/me`, {      // profileUrl
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
   .then(handleResponse);  
}

export function getCards() {
  return fetch(`${url}cards`, {        // cardsUrl       
    headers: {
      authorization: token41,
    }
  })
  .then(handleResponse);
}

export function postCard(inputCardName, inputCardUrl) {
  return fetch(`${url}cards`, {          // cardsUrl
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
  .then(handleResponse);
}

export function updateAvatar(inputAvatarValue) {
  return fetch(`${url}users/me/avatar`, {           //  avatarUrl
    method: 'PATCH',
    headers: {
      authorization: token41,
      'Content-Type': 'application/json',
    },
     body: JSON.stringify({
       avatar: inputAvatarValue      
    }),
  })
  .then(handleResponse);
}

export function deleteCard(cardImageId) {
  return fetch(`${url}cards/${cardImageId}`, {    //  'https://nomoreparties.co/v1/wff-cohort-41/cards/'+ cardImageId
    method: 'DELETE',

    headers: {
      authorization: 'c569c80a-83b5-4b21-900d-b6e663669d71',    
    }
  })
  .then(handleResponse);
}

export function addLike(cardImageId) {
  return fetch(`${url}cards/likes/${cardImageId}`, {      //  'https://nomoreparties.co/v1/wff-cohort-41/cards/likes/' + cardImageId
    method: 'PUT',

    headers: {
      authorization: 'c569c80a-83b5-4b21-900d-b6e663669d71',    
    }
  })
  .then(handleResponse);
}

export function deleteLike(cardImageId) {
  return fetch(`${url}cards/likes/${cardImageId}` , {    //  'https://nomoreparties.co/v1/wff-cohort-41/cards/likes/' + cardImageId  
    method: 'DELETE',                                    

    headers: {
      authorization: 'c569c80a-83b5-4b21-900d-b6e663669d71',    
    }
  }) 
  .then(handleResponse);
}

export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  else 
  return Promise.reject(`Ошибка: ${response.status}`);  
}


  