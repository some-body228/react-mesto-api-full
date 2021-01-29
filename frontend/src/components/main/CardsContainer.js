import react from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../../context/CurrentUserContext";
function CardsContainer(props) {
  const currentUser = react.useContext(CurrentUserContext);
  function renderCards() {
    return props.cards.map((card) => {
      return (
        <Card
          curCard={card}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
          key={card._id}
        />
      );
    });
  }
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
          <div
            className="profile__avatar-redaction"
            onClick={props.onEditAvatar}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <button
            className="profile__redaction-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__user-caption">{currentUser.about}</p>
        </div>
        <button
          className="profile__button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">{renderCards()}</ul>
      </section>
    </main>
  );
}
export default CardsContainer;
