import React, { useEffect } from 'react';
import toggleMessage from '@functions/toggleMessage';
import '@styles/FeedbackMessage.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the delete message component with all its functions
 * stored inside for its full operation
 */
const DeleteMessage = (props) => {
  // Component's props
  const { entity, onClick } = props;

  useEffect(() => {
    /**
     * Hides the message
     */
    const hideMessage = () => {
      var message = document.getElementById('feedback-message');
      if (message.style.display === '') {
        message.style.display = 'none';
      }
    };
    hideMessage();
  }, []);

  return (
    <div className='feedback-message' id='feedback-message'>
      <div className='feedback-message__container'>
        {entity === 'liga' || entity === 'noticia' ? (
          <h1 className='feedback-message__container--title'>
            ¿Está seguro de eliminar la {entity}?
          </h1>
        ) : (
          <h1 className='feedback-message__container--title'>
            ¿Está seguro de eliminar el {entity}?
          </h1>
        )}
        <p className='feedback-message__container--text'>
          Esta acción es permanente y no podrás restaurar esta información
        </p>
        <div className='buttons__container'>
          <a className='button secondary-button' onClick={toggleMessage}>
            Cancelar
          </a>
          <a className='button danger-button' onClick={onClick}>
            Eliminar
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessage;
