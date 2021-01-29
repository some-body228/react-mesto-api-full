import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser.id === props.curCard.owner._id;
  const isLiked = props.curCard.likes.some((i) => i._id === currentUser.id);
  function handleLikeClick() {
    props.onCardLike(props.curCard);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.curCard);
  }
  return (
    <li className="elements__card">
      <img
        className="elements__image"
        src={props.curCard.link}
        alt={props.curCard.name}
        onClick={() => {
          props.onCardClick(props.curCard);
        }}
      />
      <h2 className="elements__title">{props.curCard.name}</h2>
      <div className="elements__like-container">
        <button
          className={`elements__like-button ${
            isLiked && "elements__like-button_liked"
          }`}
          type="button"
          onClick={handleLikeClick}
        ></button>
        <span className="elements__like-number">
          {props.curCard.likes.length}
        </span>
      </div>
      <button
        className="elements__trash-button"
        type="button"
        style={{ display: isOwn ? "block" : "none" }}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
export default Card;
