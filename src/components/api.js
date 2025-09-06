export {getUser, getInitialCards, pathProfile, pathCard, deleteCardApi, putLikeCard, deleteLikeCard, pathAvatar}

// Все запросы присвойте переменным

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '3ad95690-ba9a-4d17-9a66-c1e37bacbfe2',
    'Content-Type': 'application/json'
  }
}

// Загрузка информации о пользователе с сервера

const getUser = () => {
    // console.log(`${config.baseUrl}/users/me`)}
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
  })
  .then(res => {
    if (res.ok) {
        return res.json() 
    }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
    return result
  });}

// Загрузка карточек с сервера

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
} 

// Обновление аватара пользователя

const pathAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url})
    })
    .then(res => {
      if (res.ok) {
        // console.log(url)
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
});
}

// Редактирование профиля

const pathProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: name,
        about: about})
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Добавление новой карточки

const pathCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link})
    })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Удаление карточки

const deleteCardApi = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Постановка лайка

const putLikeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers,
    })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Cнятие лайка

const deleteLikeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers,
    })
    .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
