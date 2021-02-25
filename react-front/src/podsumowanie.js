import React, { Component } from "react";
import axios from "axios";
import './css/podsumowanie.css';
import './css/main.css';

class Podsumowanie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
    };
  }

  componentDidMount() {
    var token_username = JSON.parse(sessionStorage.getItem('token')).token;
    console.log(token_username);
    var user_ID;
    axios.get('http://localhost:8080/api/getUserByUsername', {
        params: {
          username: JSON.parse(sessionStorage.getItem('token')).token
        }
      })
      .then(res => {
        console.log(res.data.ID);
        user_ID = res.data.ID;
        axios.get('http://localhost:8080/api/getAllActivities', {
          params: {
            uczen_ID: user_ID
          }
        })
        .then(res => {
          const activities = res.data;
          this.setState({activities});
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          console.log(user_ID);
    })
      })
      .catch(err => {
        console.log(err);
      }) 
  }
  
  render() {
    return (
      <div className="pods-wrapper">
        <div className="h2-wrapper" style={{flex: '1'}}>
          <h2 style={{color: 'rgba(22,160,133,1)'}}>Twoje aktywności</h2>
        </div>
        <table>
          <thead>
              <tr>
                <th>Data wprowadzenia</th>
                <th>Typ aktywności</th>
                <th>Wynik</th>
              </tr>
          </thead>

          <tbody>
            {this.state.activities.map(act => {
              return ( 
                <tr key={act.ID}>
                <td>{act.data_wprowadzenia.split("T").join(" ").split(".")[0]}</td>
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
  
  export default Podsumowanie