import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DodajAkt from './dodaj_akt'; //IMPORT MODUŁU
import Profil from './profil';
import Podsumowanie from './podsumowanie';
import Login from './login';
import Home from './home';
import './css/main.css';


export default function RouterMenu() {
  const [token, setToken ] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/podsumowanie">Podsumowanie aktywności</Link>
          </li>
          <li>
            <Link to="/profil">Mój profil</Link>
          </li>
          <li>
            <Link to="/dodajAkt">Dodaj nową aktywność</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profil">
            <Profil />
          </Route>
          <Route path="/podsumowanie">
            <Podsumowanie />
          </Route>
          <Route path="/dodajAkt">
            <DodajAkt />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

