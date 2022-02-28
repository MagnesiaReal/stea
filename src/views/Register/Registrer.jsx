import React from 'react'
import AXIOS from '../../components/http-axios'
import { Link } from 'react-router-dom'

export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      lastName: "",
      email: "",
      pass: "",
      passr: ""
    };
    this.onLogin = this.onLogin.bind(this);
    this.onName = this.onName.bind(this);
    this.onLastName = this.onLastName.bind(this);
    this.onEmail = this.onEmail.bind(this);
    this.onPass = this.onPass.bind(this);
    this.onPassR = this.onPassR.bind(this);
  }

  onLogin(e){
    e.preventDefault();
    if (this.state.pass === this.state.passr) {
      const newUserCredentials={
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      pass: this.state.pass
      }
      AXIOS.post('/register', newUserCredentials)
        .then(res=> {
          console.log(res);
        }).catch(err=>{
          throw err;
        })  
    } else {
      this.setState({passInfo: <h6>Las contraseñas no coinciden</h6>})
    }
  }

  onName(e){
    this.setState({name: e.target.value});
  }

  onLastName(e){
    this.setState({lastName: e.target.value});
  }

  onEmail(e){
    this.setState({email: e.target.value});
  }
  
  onPass(e){
    this.setState({pass: e.target.value});
    console.log(e.target.value);
  }

  onPassR(e){
    this.setState({passr: e.target.value});
    console.log(e.target.value);
  }

  render(){
    return(
      <div className="login-stea">
        <div id="propiedades-stea" className="container">
          <div className="col" align="center">
            <div className="d-inline-block align-middle">
              <h2>Registrar Usuario</h2>
            </div>
          </div>
          <div className="este"></div>
          
          <div className="dropdown-divider"/>
          
          <div className="container">
            <form onSubmit={this.onLogin}>
              <div className="row">

                <div className="col-12 p-1" align="center">
                  <label htmlFor="name">
                    Nombre:
                  </label><br/>
                  <input id="name" type="text" value={this.state.name} onChange={this.onName}/>
                </div>

                <div className="col-12 p-1" align="center">
                  <label htmlFor="lastName">
                    Apellido:
                  </label><br/>
                  <input id="lastName" type="text" value={this.state.lastName} onChange={this.onLastName}/>
                </div>

                <div className="col-12 p-1" align="center">
                  <label htmlFor="email">
                    Correo:
                  </label><br/>
                  <input id="email" type="text" value={this.state.email} onChange={this.onEmail}/>
                </div>

                <div className="col-12 p-1" align="center">
                  <label htmlFor="pass">
                    Contraseña:
                  </label><br/>
                  <input id="pass" type="password" placeholder="" value={this.state.pass} onChange={this.onPass}/>
                  {this.state.passInfo}
                </div>

                <div className="col-12 p-1" align="center">
                  <label htmlFor="passr">
                    Repetir contraseña:
                  </label><br/>
                  <input id="passr" type="password" placeholder="" value={this.state.passr} onChange={this.onPassR}/>
                </div>
                
                <div className="col-12 p-1" align="center">
                  <input type="submit" value="Entrar" className="btn btn-warning"/>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>    );
  }


}
