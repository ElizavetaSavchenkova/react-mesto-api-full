import { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(event) {
    event.preventDefault()

    onAddPlace({ name, link })
  }

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleСhangeLink(event) {
    setLink(event.target.value)
  }

  return (
    <PopupWithForm
      name={"add"}
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}>
      <label className="popup__label">
        <input className="popup__form-input popup__form-input_name_heading" id="heading" type="text"
          name="headingInput" placeholder="Название" minLength="2" maxLength="30" required value={name || ''} onChange={handleChangeName} />
        <span className="popup__form-input-error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__form-input popup__form-input_name_link" id="link" type="url" name="linkInput"
          placeholder="Ссылка на картинку" required value={link || ''} onChange={handleСhangeLink} />
        <span className="popup__form-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup
