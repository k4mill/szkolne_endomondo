import React, { Component } from "react";
import axios from 'axios';
import './css/profil.css';

class Profil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      classData: {},
      teacherData: {},
      isEditing: true
    }
  }

  componentDidMount() {
    document.title = 'TTM - profil';
    let token_username = JSON.parse(sessionStorage.getItem('token')).token;

    axios.get('http://20.52.157.254:8080/api/getUserByUsername', {
        params: {
          username: token_username
        }
      })
    .then(res => {
      this.setState({userData: res.data})
      this.setState({classData: res.data.klasy})
      this.setState({teacherData: res.data.klasy.nauczyciele})
      
    })
    .catch(err => {
      console.log(err);
    }) 
  }

  render() {
    return ( 
      <div className="prof-wrapper">
        <div className="h2-wrapper" style={{flex: '1'}}>
          <h2 style={{color: 'rgba(22,160,133,1)'}}>Twój profil</h2>
        </div>

        <div className="data-wrapper">
          <div className="data-child">Imię i nazwisko<span>{this.state.userData.imie} {this.state.userData.nazwisko}</span></div>
          <div className="data-child">Nazwa użytkownika<span>{this.state.userData.userName}</span></div>
          <div className="data-child">Klasa<span>{this.state.classData.nazwa}</span></div>
          <div className="data-child">Nauczyciel<span>{this.state.teacherData.imie} {this.state.teacherData.nazwisko}</span></div>
        </div>
      </div>
      )
    }
  
  }
  
  export default Profil