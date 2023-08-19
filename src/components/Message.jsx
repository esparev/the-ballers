import React from 'react';
import '@styles/Message.scss';
import successIcon from '@icons/check-icon.svg';
import uploadIcon from '@icons/upload-icon.svg';
import crossIcon from '@icons/crossed-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the message component with all its functions
 * stored inside for its full operation
 */
const Message = (props) => {
  // Component's props
  const { message, messageStatus } = props;

  /**
   * Closes the message after the X
   * button has been clicked
   */
  const closeMessage = () => {
    var message = document.getElementById('message');
    message.style.display = 'none';
  };

  return (
    <div className='main-message' id='message'>
      <div className='message__card'>
        <div className='message__container'>
          {messageStatus === 'success' && (
            <img className='message__container--icon success-icon' src={successIcon} />
          )}
          {messageStatus === 'upload' && (
            <img className='message__container--icon upload-icon' src={uploadIcon} />
          )}
          {messageStatus === 'error' && (
            <img className='message__container--icon error-icon' src={crossIcon} />
          )}
          <p className='message__container--message'>{message}</p>
        </div>
        <a className='message-close-button' id='close-button' onClick={closeMessage}>
          <img className='message--close' src={crossIcon} alt='Cerrar' />
        </a>
      </div>
    </div>
  );
};

export default Message;
