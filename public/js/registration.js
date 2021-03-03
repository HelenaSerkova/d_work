'use strict';

var check = function() {
  if (document.getElementById('password').value ==
    document.getElementById('repeat_password').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'Пароль совпадает!';
    return 0;

  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Пароль не совпадает!';
    // document.getElementById('togg').classList.toggle("tog");
    return 1;

  }
}

let form = document.querySelector('form');
let answer = document.querySelector('#answer');


form.addEventListener('submit', async (event)=>{
  event.preventDefault();

  if (check === 1){
    document.getElementById('togg').classList.toggle("tog");
  } else {
    console.log("ура");
    const response = await fetch('RegistrationController.php', {
      method: 'POST',
      body: new FormData(form)
    });
    const answer = await response.json();
    responseHandler(answer)
  }
});

// form.addEventListener('submit', async (event)=>{
//   event.preventDefault();
//   const response = await fetch('RegistrationController.php', {
//     method: 'POST',
//     body: new FormData(form)
//   });
//   const answer = await response.json();
//   responseHandler(answer)
// });


function responseHandler(serverAnswer) {
    console.log(serverAnswer);
    if(serverAnswer['answer_state']=== 'error'){
      answer.innerText = serverAnswer['reason'];
    } else if (serverAnswer['answer_state']=== 'succcess'){
      answer.innerText = serverAnswer['reason'];
    } else {
      console.log(serverAnswer['reason']);
    }

}
