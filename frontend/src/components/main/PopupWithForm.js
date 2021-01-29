function PopupWithForm(props) {
  return (
    <section
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id={props.name}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={`popup-form-${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__save-button">
            {props.btnText}
          </button>
          <button
            type="button"
            className="popup__exit-button"
            onClick={props.onClose}
          ></button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
