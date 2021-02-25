import React, { Component } from "react";
import axios from 'axios';
import './css/dodaj_akt.css';
import Select from 'react-select';

function getCurrentDate() {
  let d = new Date();
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

class DodajAkt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      wynik: '',
      typ: '1'
    }

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleScoreChange(event) {
    this.setState({wynik: event.target.value});
  }

  handleTypeChange(typ) {
    this.setState({typ: typ});
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.get('http://localhost:8080/api/getUserByUsername', {
        params: {
          username: JSON.parse(sessionStorage.getItem('token')).token
        }
      })
      .then(res => {
        const user_ID = res.data.ID;
          axios.put('http://localhost:8080/api/insertActivity', {
            uczen_ID: user_ID,
            data_wprowadzenia: `'${getCurrentDate()}'`,
            typ_ID: `${this.state.typ.value}`,
            wynik: `${this.state.wynik}`
          })
        .then(res => {
          console.log("Successfully inserted an activity");
          console.log(getCurrentDate())
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/getActivityTypes')
      .then(res => {
        let options = [];
        res.data.map(act => {
          options.push({ value: `${act.ID}`, label: `${act.nazwa}` })
        })
        this.setState({ options });
      })
      .catch(err => {
        console.log(err);
      })
  }
  

    render() {
      return ( 
          <form onSubmit={this.handleSubmit}>
            <div className="form-wrapper-add-act">
              <div className="h2-wrapper">
                <h2 style={{color: 'rgba(22,160,133,1)'}}>Zanotuj swoją aktywność</h2>
              </div>
              <div className="form-child-select">
                <label>Rodzaj aktywności</label>
                <Select options={this.state.options} onChange={this.handleTypeChange} />
              </div>
              
              <div className="form-child-act">
                <input name="wynik" type="text" required onChange={this.handleScoreChange}/>
                <label htmlFor="wynik">Wynik(kg, czas, itp.)</label>
                <button className="login-button" type="submit" style={{textAlign: 'center'}}>Dodaj</button>
              </div>
            </div>
          </form>
       )
    }
  }
  
  export default DodajAkt