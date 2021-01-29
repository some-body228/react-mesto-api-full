import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./main/Main";
import ProtectedRoute from "./ProtectRoute";
import Login from "./login/Login";
import Register from "./register/Register";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";
function App(props) {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoPopup, setInfoPopup] = React.useState({
    openPopup: false,
    failed: true,
  });
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(jwt){
      auth
      .checkToken(jwt)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  }, []);

  function onRegistor(data) {
    auth
      .register(data)
      .then((res) => {
        setInfoPopup({
          openPopup: true,
          failed: false,
        });
        history.push("/sign-in");
      })
      .catch((err) => {
        setInfoPopup({
          openPopup: true,
          failed: true,
        });
        console.log(err.message);
      });
  }
  function onLogin(data) {
    auth
      .login(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(data.email);
        history.push("/");
      })
      .catch((err) => {
        setInfoPopup({
          openPopup: true,
          failed: true,
        });
        console.log(err.message);
      });
  }
  function logOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }
  function closeInfoTooltip() {
    setInfoPopup({
      openPopup: false,
      failed: infoPopup.failed,
    });
  }
  return (
    <>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          loggedIn={loggedIn}
          email={email}
          onLogOut={logOut}
        />
        <Route exact path="/sign-in">
        <Header>
              <a className="header__caption" href="/sign-up">
                Регистрация
              </a>
          </Header>
          <Login onLogin={onLogin} />
          <InfoTooltip
            isOpen={infoPopup.openPopup}
            failed={infoPopup.failed}
            onClose={closeInfoTooltip}
          />
        </Route>
        <Route exact path="/sign-up">
          <Header>
              <a className="header__caption" href="/sign-in">
                Войти
              </a>
          </Header>
            
          <Register onRegistor={onRegistor} />
          <InfoTooltip
            isOpen={infoPopup.openPopup}
            failed={infoPopup.failed}
            onClose={closeInfoTooltip}
          />
        </Route>
      </Switch>
    </>
  );
}
export default App;
