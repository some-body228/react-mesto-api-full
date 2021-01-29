import React from "react";
import PopupWithForm from "./PopupWithForm.js";
function EditAvatarPopup({ isOpen, onClose, onUpdateUser }) {
  const inputRef = React.useRef();
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(inputRef.current.value);
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      children={
        <>
          <input
            className="popup__input"
            id="link"
            type="url"
            placeholder="Ссылка на картинку"
            name="linkAvatar"
            required
            ref={inputRef}
          />
          <span className="popup__error" id="link-error"></span>
        </>
      }
    />
  );
}
export default EditAvatarPopup;
