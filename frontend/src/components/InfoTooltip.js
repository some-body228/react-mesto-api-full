import failIcon from "../images/Union.svg";
import successIcon from "../images/icon.svg";
function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_failed-sign-in">
        <img
          className="popup__icon"
          src={props.failed ? failIcon : successIcon}
          alt="результат регистрации"
        />
        <h1 className="popup__title">
          {props.failed
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </h1>
        <button
          type="button"
          className="popup__exit-button popup__exit-button_type_failed-sign-in"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}
export default InfoTooltip;
