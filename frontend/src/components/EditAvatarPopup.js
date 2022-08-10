import { useContext, useRef, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const updatedAvatar = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: updatedAvatar.current.value
    });
  }

  useEffect(() => {
    updatedAvatar.current.value = '';
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"avatar"}
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}>
      <label className="popup__label">
        <input className="popup__form-input popup__form-input_name_avatar" id="avatar" type="url" name="avatarInput"
          placeholder="Ссылка на картинку" required ref={updatedAvatar} />
        <span className="popup__form-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
