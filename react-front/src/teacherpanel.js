import React, { Component } from "react";
import axios from 'axios';
import './css/teacherpanel.css';
import Select from 'react-select';

function getTeacherID() {
  return axios.get('http://localhost:8080/api/getUserByUsername', {
    params: {
      username: JSON.parse(sessionStorage.getItem('token')).token
    }
  })
  .then(res => {
    return res;
  })
  .catch(err => {
    console.log(err);
  })
}

class TeacherPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      classOptions: [],
      studentOptions: [],
      selectedClass: '',
      selectedStudent: 'Jakis debil',
      klasa: '',
      activities: []
    }

    this.logoutAndClearStorage = this.logoutAndClearStorage.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logoutAndClearStorage() {
    this.setState({ loggedIn: !this.state.loggedIn }, () => {
      sessionStorage.removeItem('token');
      window.location.reload()
    })  
  }

  handleClassChange(klasa) {
    this.setState({ selectedClass: klasa })
    axios.get('http://localhost:8080/api/getClassById', {
      params: {
        id: klasa.value
      }
    })
    .then(students => {
      let studentOptions = [];
      students.data.users.map(st => {
        studentOptions.push({ value: `${st.ID}`, label: `${st.imie} ${st.nazwisko}` })
      })

      this.setState({ studentOptions: studentOptions });
      this.setState({ selectedStudent: '' })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleStudentChange(student) {
    this.setState({ selectedStudent: student })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get('http://localhost:8080/api/getAllActivities', {
      params: {
        uczen_ID: this.state.selectedStudent.value
      }
    })
    .then(activities => {
      this.setState({ activities: activities.data })
    })
  }

  componentDidMount() {
    document.title = 'TTM - panel nauczyciela';
    getTeacherID().then((res) => {
      axios.get('http://localhost:8080/api/getClass', {
        params: {
          nauczyciel_ID: res.data.ID
        }
      })
        .then(classes => {
          let classOptions = [];
          classes.data.map(cl => {
            classOptions.push({ value: `${cl.ID}`, label: `${cl.nazwa}` })
          })
          this.setState({ classOptions: classOptions });
        })
        .catch(err => {
          console.log(err);
        })
    });


  }

  render() {
    return ( 
        <div className="teacher-wrapper">
          <div className="h2-wrapper">
            <h2>Statystyki klas</h2>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="form-wrapper-stats">
              <div className="form-child-select">
                <label>Klasa</label>
                <Select defaultValue={{ label: "Wybierz..."}} options={this.state.classOptions} onChange={this.handleClassChange} maxMenuHeight={150} />
              </div>

              <div className="form-child-select">
                <label>Uczeń</label>
                <Select defaultValue={{ label: "Wybierz..."}} options={this.state.studentOptions} value={this.state.selectedStudent} onChange={this.handleStudentChange} maxMenuHeight={150} />
              </div>
              <button className="login-button" type="submit" style={{textAlign: 'center'}}>Wyświetl</button>
            </div>
          </form>

          <div className="result-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Uczeń</th>
                  <th>Typ aktywności</th>
                  <th>Wynik</th>
                  <th>Data wprowadzenia</th>
                </tr>
              </thead>

              <tbody>
                {this.state.activities.map(act => {
                  return ( 
                    <tr key={act.ID}>
                      <td>{act.user.imie} {act.user.nazwisko}</td>
                      <td>{act.aktywnosc_typ.nazwa}</td>
                      <td>{act.wynik}</td>
                      <td>{act.data_wprowadzenia.split("T").join(" ").split(".")[0]}</td>
                    </tr> )
                })}
              </tbody>
            </table>
        </div>
        <button className="login-button" style={{position: 'fixed', right: '2vw', top: '2vh', opacity: '0.75'}} onClick={this.logoutAndClearStorage}>Wyloguj</button>
      </div>  
      )
  }
}

export default TeacherPanel