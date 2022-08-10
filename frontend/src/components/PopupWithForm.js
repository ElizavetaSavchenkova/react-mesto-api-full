import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <>
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ""}`} >
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <button className="popup__close-button button" type="button" onClick={onClose}></button>
          <form className="popup__info popup__info_element_edit" name={name} onSubmit={onSubmit} noValidate>
            <fieldset className="popup__form-info">
              {children}
              <button className="popup__button-submit" type="submit">{buttonText}</button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm
