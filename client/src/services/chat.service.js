import io from 'socket.io-client';
import moment from 'moment';
const socket = io('http://localhost:3000');

const button = document.getElementById('send');
console.log(button);
const input = document.getElementById('input');
let userId;

button.addEventListener('click', () => {
  console.log("hello");
  if(input.value.trim() === '') {
    return;
  }

  socket.emit('message', input.value);
  input.value = '';
});

socket.on('welcome', id => {
  userId = id;
});

socket.on('receiveMessage', response => {
  const isOur = response.userId === userId;
  
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('messageContainer');
  if(!isOur) {
    messageContainer.classList.add('left');
  }

  const innerMessage = document.createElement('div');
  innerMessage.classList.add('message');
  if(!isOur) {
    innerMessage.classList.add('foreign');
  }

  const messageInfo = document.createElement('div');
  messageInfo.classList.add('messageInfo');
  
  const username = document.createElement('p');
  // TODO: Get the current user's username
  username.innerText = 'example@gmail.com';
  username.classList.add('username');
  
  const date = document.createElement('p');
  date.innerText = moment().format('MMMM Do YYYY, h:mm:ss a'); 
  date.classList.add('date');
  
  const textContainer = document.createElement('div');
  textContainer.classList.add('textContainer');
  
  const textParagraph = document.createElement('p');
  textParagraph.innerText = response.message;
  
  messageContainer.appendChild(innerMessage);
  innerMessage.appendChild(messageInfo);
  messageInfo.appendChild(username);
  messageInfo.appendChild(date);
  innerMessage.appendChild(textContainer);
  textContainer.appendChild(textParagraph);
  
  const mainMessageContainer = document.getElementsByClassName('message-wrapper')[0];
  mainMessageContainer.appendChild(messageContainer);
});