
import React from "react";
import failedAction from '../images/failedAction.svg';
import successfulAction from '../images/successfulAction.svg'

function InfoTooltip({ name, isOpen, onClose, infoMessage }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ""}`} >
      <div className="popup__container">
        <div className="popup__info-container">
          <img className="popup__info-pic" src={infoMessage ? successfulAction : failedAction} />
          <h2 className="popup__info-text">{infoMessage ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
          <button className="popup__close-button button" type="button" onClick={onClose}></button>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip
