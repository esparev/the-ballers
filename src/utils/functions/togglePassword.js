/**
 * Toggles the password input field type
 * from password to text and vice versa
 */
const togglePassword = () => {
  var passwd = document.getElementById('password');
  var passwdIcon = document.getElementById('password-icon');

  if (passwd.type === 'password') {
    passwd.type = 'text';
    // Adds CSS class to change the eye icon
    passwdIcon.classList.add('view-icon');
  } else {
    passwd.type = 'password';
    // Removes CSS class to the default eye icon
    passwdIcon.classList.remove('view-icon');
  }
};

export default togglePassword;
