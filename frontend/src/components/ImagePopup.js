import React from 'react'

function ImagePopup({card, onClose}){
  return(
<div className={`popup popup_type_picture ${card.link && "popup_is-opened"}`} id="popup_type_picture">
      <div className="popup__picture-container">
        <button className="popup__close-button button" onClick={onClose}></button>
        <div className="popup__figure">
          <img className="popup__picture" src={`${card.link}`}  alt={card.name}/>
          <div className="popup__picture-text">{card.name}</div>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup;

