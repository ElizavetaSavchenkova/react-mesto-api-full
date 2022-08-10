import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img src={currentUser.avatar} className="profile__avatar" alt="Аватар пользователя" onClick={onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button aria-label="Редактировать профиль" className="profile__edit-button button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button aria-label="Добавить содержимое" className="profile__add-button button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main

