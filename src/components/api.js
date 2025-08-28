export {getUser}

// Вот небольшой пример того, как можно обустроить код в файле api.js:

// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   }
// }

// export const getInitialCards = () => {
//     return fetch('', {})
//     // ...
// } 


// function cards (){
//   return fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
//     headers: {
//       authorization: '3ad95690-ba9a-4d17-9a66-c1e37bacbfe2'
//     }
//   })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });}
  

// Все запросы присвойте переменным

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '3ad95690-ba9a-4d17-9a66-c1e37bacbfe2',
    // 'Content-Type': 'application/json'
  }
}

// Загрузка информации о пользователе с сервера

const getUser = () => {
    // console.log(`${config.baseUrl}/users/me`)}
  return fetch (`${config.baseUrl}/users/me`, {
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

