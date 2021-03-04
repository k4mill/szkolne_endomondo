import React, { Component } from "react";
import axios from 'axios';
import './css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activities: []
    }
  }

  getLastActivities(username) {
    return axios.get('http://localhost:8080/api/getUserByUsername', {
        params: {
          username: username
        }
      })
    .then(res => {
        var user_ID = res.data.ID;
        return axios.get('http://localhost:8080/api/getLastActivities', {
          params: {
            uczen_ID: user_ID
          }
        })
        .then(res => {
          return res.data
        })
        .catch(err => {
          console.log(err);
      })
      })
    .catch(err => {
      console.log(err);
    }) 
  }

  componentDidMount() {
    document.title = 'TTM - strona główna';
    const username = JSON.parse(sessionStorage.getItem('token')).token;
    this.getLastActivities(username)
      .then(act => {
        this.setState({activities: act})
      })
  }
    

  render() {
    return ( 
      <div className="home-wrapper">
        <div className="logo-wrapper">
              <h1>Time To <span className="highlight-text">Move</span></h1>
        </div>

        <div className="text-wrapper">
          <div className="h2-wrapper">
            <h2>Witaj {JSON.parse(sessionStorage.getItem('token')).token}!</h2>
          </div>

          <div className="act-wrapper">
            <div className="h2-wrapper">
              <h2 style={{color: 'rgba(22,160,133,1)'}}>Twoje ostatnie aktywności</h2>
            </div>

            <div className="table-wrapper">
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
          </div>
        </div>

      </div>  
      )
    }
  }
  
  export default Home