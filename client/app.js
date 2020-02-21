const loginForm = document.getElementById('welcome-form');
const userNameInput = document.getElementById('username');
const messagesSection = document.getElementById('messages-section');

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

loginForm.addEventListener('submit', login);