import React, { useEffect } from 'react';
import '../assets/styles/components/FeedbackMessage.scss';
import toggleMessage from '../functions/toggleMessage';

const DeleteMessage = (props) => {
  const { entity } = props;

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
      <div className='message__container'>
        {entity === 'liga' || entity === 'noticia' ? (
          <h1 className='message__container--title'>
            ¿Está seguro de eliminar la {entity}?
          </h1>
        ) : (
          <h1 className='message__container--title'>
            ¿Está seguro de eliminar el {entity}?
          </h1>
        )}
        <p className='message__container--text'>
          Esta acción es permanente y no podrás restaurar esta información
        </p>
        <div className='buttons__container'>
          <a className='button gray-button' onClick={toggleMessage}>
            Cancelar
          </a>
          <a className='button red-button' onClick={toggleMessage}>
            Eliminar
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessage;
