import React from "react";
import PopupWithForm from "./PopupWithForm.js";
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");
  function onPlaceChange(evt) {
    setPlace(evt.target.value);
  }
  function onLinkChange(evt) {
    setLink(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: place,
      link,
    });
    evt.target.reset()
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      btnText="Создать"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}>
          <input
            className="popup__input"
            id="place"
            type="text"
            placeholder="Название"
            name="place"
            required
            minLength="1"
            maxLength="30"
            onChange={onPlaceChange}
          />
          <span className="popup__error" id="place-error"></span>
          <input
            className="popup__input"
            id="link"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required
            onChange={onLinkChange}
          />
          <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
