import React from 'react';
import '../assets/styles/components/Message.scss';
import crossIcon from '../assets/icons/crossed-icon.svg';
import successIcon from '../assets/icons/check-icon.svg';

const Message = (props) => {
  const { message, messageStatus } = props;

  const closeMessage = () => {
    var message = document.getElementById('message');
    message.style.display = 'none';
  };

  return (
    <div className='main-message' id='message'>
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
