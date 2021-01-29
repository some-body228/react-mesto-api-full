function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_image ${
        props.cardImageState.link ? "popup_opened" : ""
      }`}
      id="image"
    >
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={props.cardImageState.link}
          alt={props.cardImageState.name}
        />
        <h2 className="popup__caption">{props.cardImageState.name}</h2>
        <button
          type="button"
          className="popup__exit-button popup__exit-button_type_image"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}
export default ImagePopup;
