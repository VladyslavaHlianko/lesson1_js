let email;
let password;
let error;
let tries = 3;

do{
    error = '';
    email = prompt('Write your email');
    password = prompt('Write your password');
    if (email.endsWith('@') || email.startsWith('@')) {
        error = error + 'Email should not contain "@" at the beginning and at the end \n';
    }
    if (email.endsWith(' ') || email.startsWith(' ')) {
        error = error + 'Email should not contain spaces at the beginning and at the end \n';
    }
    if (email.includes('@') >= 2 || email.includes('@') < 1) {
        error = error + 'Email should contain one symbol "@" \n';
    }
    if (email.length > 15) {
        error = error + 'Email should be less then 15 symbols \n';
    }
    if (email.endsWith('.com') === false) {
        error = error + 'Email must end in ".com" \n';
    }
    if (password.match(/[A-Z]/g) === null) {
        error = error + 'Password must contain one capital letter \n';
    }
    if (password.length < 4 || password.length > 12) {
        error = error + 'Password must contain between 4 and 12 characters \n';
    }
    tries--;
    if (tries === 0 && error !== '') {
        alert(`Sorry, you don't have more tries`);
    }
    if (tries > 0 && error !== '') {
        alert(`Your email is not correct.\n${error}You have also ${tries} tries`);
    }
} while(tries && error !== '');

if(error == ''){
    document.write(`Your account successfully registered <br> email: ${email} <br> password: ${password}`);
}