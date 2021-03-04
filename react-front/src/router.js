import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
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
import TeacherPanel from './teacherpanel';

export default function RouterMenu() {
  const { token, setToken, logout } = useToken();
  document.title = 'TTM';

  if(!token) {
    return <Login setToken={setToken} />
  }

  else if(JSON.parse(sessionStorage.getItem('token')).teacher) {
    return <TeacherPanel />
  }

  else {
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
                <NavLink
                  key={route.path}
                  as={NavLink}
                  to={route.path}
                  activeClassName="active"
                  activeStyle={{boxShadow: '0px 3px 0px rgba(22,160,133,0.55)', transition: '0.15s ease'}}
                  exact
                >
                  {route.name}
                </NavLink>
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

  
}
