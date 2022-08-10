import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `cards__delete-button ${isOwn ? 'cards__delete-button_visible' : 'cards__delete-button_hidden'}`
  );

  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = `cards__likes-button ${isLiked ? 'cards__likes-button_active' : ''}`;

  return (
    <li className="cards__card">
      <img src={card.link} className="cards__image" alt={card.name} onClick={handleCardClick} />
      <div className="cards__description">
        <h2 className="cards__description-title">{card.name}</h2>
        <div className="cards__section-likes">
          <button aria-label="Нравится" className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="cards__likes-number">{card.likes.length}</p>
        </div>
        <button aria-label="Удалить" className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} ></button>
      </div>
    </li>
  );
}

export default Card;
