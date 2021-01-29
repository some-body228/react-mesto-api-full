import React from "react";
function Login(props) {
  const [email, setEmail] = React.useState({
      value: ""
  });
  const [password, setPassword] = React.useState({
      value: ""
  });
  function onSubmit(evt) {
    evt.preventDefault();
    props.onLogin({ email: email.value, password: password.value });
  }
  return (
    <section className="sing">
      <h1 className="sing__title">Вход</h1>
      <form className="sing__form" onSubmit={onSubmit}>
        <input
          className="sing__input"
          type="email"
          required
          placeholder="Email"
          value={email.value}
          onChange={(evt) => {
            setEmail({value: evt.target.value});
          }}
        ></input>
        <input
          className="sing__input"
          type="password"
          required
          minLength="8"
          maxLength="30"
          placeholder="Пароль"
          value={password.value}
          onChange={(evt) => {
            setPassword({value: evt.target.value});
          }}
        ></input>
        <button className="sing__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
export default Login;
