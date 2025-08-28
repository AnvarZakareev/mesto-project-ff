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
  
  
// это GET-запрос к ресурсу https://nomoreparties.co/v1/wff-cohort-41/cards

function user() {
    console.log("start")
  fetch ('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
      headers: {
        authorization: '3ad95690-ba9a-4d17-9a66-c1e37bacbfe2'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.dir(result);
        console.log("finish")
  });}

  // api()
  user()