import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/getAllActivities')
      .then(res => {
        const activities = res.data;
        this.setState({ activities });    
        console.log(res.data);
        // ^ to loguje do konsoli w przegladarce odpowiedz z API, mozna wyciagnac wszystkie nazwy pol zeby moc wypisac dane
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        <table>
          <thead>
              <tr>
                <th>ID</th>
                <th>Uczeń</th>
                <th>Data wprowadzenia</th>
                <th>Typ aktywności</th>
                <th>Wynik</th>
              </tr>
          </thead>

          <tbody>
            {this.state.activities.map(act => {
              return ( <tr key={act.ID}>
                <td>{act.ID}</td>
                <td>{act.user.imie} {act.user.nazwisko}</td>
                <td>{act.data_wprowadzenia.split("T").join(" ").split(".")[0]}</td>
                {/* data_wprowadzenia to jest string dlatego nie mozna uzyc metod obiektu Date z JS, wiec mozna to sformatowac jak string
                    a nie chcialo mi sie bawic z konwertowaniem do Date w react */} 
                <td>{act.aktywnosc_typ.nazwa}</td>
                <td>{act.wynik}</td>
              </tr> )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;