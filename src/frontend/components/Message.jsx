import React from 'react';
import '../assets/styles/components/Message.scss';
import crossIcon from '../assets/icons/crossed-icon.svg';
import successIcon from '../assets/icons/check-icon.svg';

const Message = (props) => {
  const { message, messageStatus, onLoad } = props;

  const hideMessage = () => {
    var main = document.getElementById('app');
    var message = document.getElementById('message');
    if (message.style.display === 'flex') {
      main.remove(message);
    }
  };

  const closeMessage = () => {
    var message = document.getElementById('message');
    message.remove('div');
  };

  return (
    <div className='main-message' id='message' onLoad={onLoad | hideMessage}>
      <div className='message__card'>
        <div className='message__container'>
          {messageStatus === 'success' ? (
            <img
              className='message__container--icon success-icon'
              src={successIcon}
            />
          ) : (
            <img
              className='message__container--icon error-icon'
              src={crossIcon}
            />
          )}
          <p className='message__container--message'>{message}</p>
        </div>
        <a
          className='message-close-button'
          id='close-button'
          onClick={closeMessage}
        >
          <img className='message--close' src={crossIcon} alt='Cerrar' />
        </a>
      </div>
    </div>
  );
};

export default Message;
