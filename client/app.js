
const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));

const loginForm = document.getElementById('welcome-form');
const userNameInput = document.getElementById('username');
const messagesSection = document.getElementById('messages-section');

const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const messageContentInput = document.getElementById('message-content');

let userName;

function login (e) {
    e.preventDefault();
    console.log(userNameInput.value);
    if (userNameInput.value == ''){ 
        window.alert('Login cannot be empty') 
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    } 
};

function addMessage (author, textMessage) {
    const message = document.createElement('li');
    message.classList.add('message', 'message--received');
    author == userName? message.classList.add('message--self') : '';

    const messageHeader = document.createElement('h3');
    messageHeader.classList.add('message__author');
    author == userName? messageHeader.innerHTML = 'You' : messageHeader.innerHTML = author;
    const messageContent = document.createElement('div');
    messageContent.classList.add('message__content');
    messageContent.innerHTML = textMessage;

    message.appendChild(messageHeader);
    message.appendChild(messageContent);

    messagesList.insertAdjacentElement('beforeend', message);
};

function sendMessage (e) {
    e.preventDefault();
    let messageContent = messageContentInput.value;

    if (!messageContent.length) {
        window.alert('Insert the message');
    } else {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, text: messageContent});
        messageContentInput.value = '';
    }
};

addMessageForm.addEventListener('submit', sendMessage);
loginForm.addEventListener('submit', login);