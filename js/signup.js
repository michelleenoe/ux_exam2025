// import { USERS_BASE_URL } from './info.js';
// import { handleError } from './api.js';
import { USERS_BASE_URL } from './utils.js';

export function signupForm() {
    document.querySelector('#frmSignup').addEventListener('submit', (e) => {
    e.preventDefault();

    const password = e.target.txtPassword.value.trim();
    const repeatPassword = e.target.txtRepeatPassword.value.trim();

    if (password !== repeatPassword) {
        handleError('Passwords must match.');
        return false;
    }
    const first_name = e.target.txtFirstName.value.trim();
    const last_name = e.target.txtLastName.value.trim();
    const email = e.target.txtEmail.value.trim();
    const birth_date = e.target.txtBirthDate.value.trim();
    const phone_number = e.target.txtPhone.value.trim();

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('first_name', first_name);
    params.append('last_name', last_name);
    params.append('password', password);
    params.append('birhday', birth_date);
    params.append('phone', phone_number);

    fetch(`${USERS_BASE_URL}/users`,
        {
            method: 'POST',
            body: params
        }
    )
    .then(response => response.json())
    .then(() => {
        window.location.href = 'login.html';
    })
    });
}