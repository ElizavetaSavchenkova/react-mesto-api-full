import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault()

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleСhangeAbout(event) {
    setDescription(event.target.value)
  }

  return (
    <PopupWithForm
      name={"profile"}
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <label className="popup__label">
        <input className="popup__form-input popup__form-input_name_title" id="name" type="text" name="titleInput"
          placeholder="Имя" minLength="2" maxLength="40" required onChange={handleChangeName} value={name || ''} />
        <span className="popup__form-input-error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__form-input popup__form-input_name_subtitle" id="text" type="text"
          name="subtitleInput" placeholder="О себе" minLength="2" maxLength="200" required onChange={handleСhangeAbout} value={description || ''} />
        <span className="popup__form-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
