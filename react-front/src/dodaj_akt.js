import React, { Component } from "react";
import axios from 'axios';
import './css/dodaj_akt.css';
import Select from 'react-select';

class DodajAkt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    }

    this.handleSubmit = () => {
      return 1;
    }
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
                <Select options={this.state.options} />
              </div>
              
              <div className="form-child-act">
                <input name="wynik" type="text" required />
                <label htmlFor="wynik">Wynik(kg, czas, itp.)</label>
                <div className="login-button" style={{width: '20%', textAlign: 'center', position: 'relative', left: '40%'}}>Dodaj</div>
              </div>
              
            </div>
          </form>
       )
    }
  }
  
  export default DodajAkt