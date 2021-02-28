import React, { Component } from "react";
import axios from "axios";
import './css/podsumowanie.css';
import './css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Podsumowanie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  getActivityList(token_username) {
    return axios.get('http://localhost:8080/api/getUserByUsername', {
        params: {
          username: token_username
        }
      })
    .then(res => {
        var user_ID = res.data.ID;
        return axios.get('http://localhost:8080/api/getAllActivities', {
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

  handleDelete(e) {
    const actID = e.currentTarget.id;
    let token_username = JSON.parse(sessionStorage.getItem('token')).token;

    axios.delete('http://localhost:8080/api/deleteActivity', {
      params: {
        id: actID
      }
    })
    .then(res => {
      console.log(res)
      this.getActivityList(token_username).then(res => {
        this.setState({activities: res})
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    let token_username = JSON.parse(sessionStorage.getItem('token')).token;
    this.getActivityList(token_username).then(res => {
      this.setState({activities: res})
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
                <th></th>
              </tr>
          </thead>

          <tbody>
            {this.state.activities.map(act => {
              return ( 
                <tr key={act.ID}>
                <td>{act.data_wprowadzenia.split("T").join(" ").split(".")[0]}</td>
                <td>{act.aktywnosc_typ.nazwa}</td>
                <td>{act.wynik}</td>
                <td><FontAwesomeIcon icon={faTimes} size='2x' id={act.ID} onClick={this.handleDelete} /></td>
              </tr> )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export { Podsumowanie }  
export default Podsumowanie;
