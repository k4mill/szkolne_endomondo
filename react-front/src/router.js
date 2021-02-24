import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import DodajAkt from './dodaj_akt'; //IMPORT MODUŁU
import Profil from './profil';
import Podsumowanie from './podsumowanie';
import Login from './login';
import Home from './home';
import { CSSTransition } from 'react-transition-group';
import './css/main.css';
import useToken from './useToken';

export default function RouterMenu() {
  const { token, setToken, logout } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  const routes = [
    { path: '/', name: 'Strona główna', Component: Home },
    { path: '/podsumowanie', name: 'Podsumowanie', Component: Podsumowanie },
    { path: '/dodajAkt', name: 'Dodaj aktywność', Component: DodajAkt },
    { path: '/profil', name: 'Mój profil', Component: Profil }
  ]

  return (
    <Router>
      <>
      <div className="navbar-wrapper">
          <nav className="navbar">
            {routes.map(route => (
              <Link
                key={route.path}
                as={NavLink}
                to={route.path}
                activeClassName="active"
                exact
              >
                {route.name}
              </Link>
            ))}
          <a onClick={logout}>Wyloguj</a>
          </nav>
        </div>
        <div className="container">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={450}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </div>
        </>
    </Router>
  );
}
