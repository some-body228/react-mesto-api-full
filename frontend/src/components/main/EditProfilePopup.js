import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  function onNameChange(evt) {
    setName(evt.target.value);
  }
  function onDescriptionChange(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="redaction"
      title="Редактировать профиль"
      btnText="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      children={
        <>
          <input
            className="popup__input"
            id="user-name"
            type="text"
            placeholder="Имя"
            name="name"
            required
            minLength="2"
            maxLength="40"
            onChange={onNameChange}
            value={name || ""}
          />
          <span className="popup__error" id="user-name-error"></span>
          <input
            className="popup__input"
            id="user-caption"
            type="text"
            placeholder="О себе"
            name="caption"
            required
            minLength="2"
            maxLength="200"
            onChange={onDescriptionChange}
            value={description || ""}
          />
          <span className="popup__error" id="user-caption-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
