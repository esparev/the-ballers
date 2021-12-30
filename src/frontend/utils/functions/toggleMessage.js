/**
 * Toggles the message's display style between none and grid
 */
const toggleMessage = () => {
  var message = document.getElementById('feedback-message');
  
  if (message.style.display === '' || message.style.display === 'none') {
    message.style.display = 'grid';
  } else {
    message.style.display = 'none';
  }
};

export default toggleMessage;
