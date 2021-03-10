import React, { Component } from "react";
import axios from 'axios';
import './css/dodaj_akt.css';
import Select from 'react-select';
import './css/main.css';
import styles from './css/login.css';

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
      typ: '',
      opis: 'Wynik',
      isActive: false
    }

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleScoreChange(event) {
    this.setState({wynik: event.target.value});
  }

  handleTypeChange(typ) {
    this.setState({typ: typ}, () => {
      if(this.state.typ.label == 'Bieganie' || this.state.typ.label == 'Jazda na rowerze' || this.state.typ.label == 'Pływanie' || this.state.typ.label == 'Orbitrek') {
        this.setState({opis: `Wynik (czas w minutach)`})
      }
  
      else if(this.state.typ.label == 'Spacer') {
        this.setState({opis: `Wynik (liczba kroków)`})
      }
  
      else if(this.state.typ.label == 'Przysiady' || this.state.typ.label == 'Pompki') {
        this.setState({opis: `Wynik (liczba powtórzeń)`})
      }
    });
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
          this.setState({typ: this.state.options[0]});
          this.setState({wynik: ''});
          this.setState({isActive: !this.state.isActive}, () => {
            setTimeout(() => {
              this.setState({isActive: !this.state.isActive})
            }, 3000)
          })
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
    document.title = 'TTM - dodaj aktywność';
    axios.get('http://localhost:8080/api/getActivityTypes')
      .then(res => {
        let options = [];
        res.data.map(act => {
          options.push({ value: `${act.ID}`, label: `${act.nazwa}` })
        })
        this.setState({ options });
        console.log(styles.animate)
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
                <Select defaultValue={{ label: "Wybierz..."}} options={this.state.options} value={this.state.typ} onChange={this.handleTypeChange} maxMenuHeight={150} />
              </div>
              
              <div className="form-child-act">
                <input name="wynik" type="number" min="0" required onChange={this.handleScoreChange} value={this.state.wynik}/>
                <label htmlFor="wynik">{this.state.opis}</label>
                <button className="login-button" type="submit" style={{textAlign: 'center'}}>Dodaj</button>
                <p className={this.state.isActive ? 'active' : 'success-text'}>
                  Pomyślnie dodano aktywność
                </p>
              </div>
            </div>
          </form>
       )
    }
  }
  
  export default DodajAkt