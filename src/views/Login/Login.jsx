import React from 'react'
import AXIOS from '../../components/http-axios'
import { Link } from 'react-router-dom'

import './Login.css'

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email:"",
      pass:""
    }; 
    this.onEmail = this.onEmail.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }
  
  onLogin(e){
    e.preventDefault();
    console.log("asdflkajd");
    const userCredentials = {
      email: this.state.email,
      pass: this.state.pass
    }
    AXIOS.post('/login',userCredentials)
      .then(res => {
        if(res.data){
          console.log(res.data);
        }
      }).catch(err => {
        console.log("Alv un Error : ", err);
      })
  }

  onEmail(e){
    this.setState({email: e.target.value});
  }

  onPass(e){
    this.setState({pass: e.target.value});
  }
 
  render(){
  
    return (
      <div className="login-stea">
        <div id="propiedades-stea" className="container">
          <div className="col" align="center">
            <div className="d-inline-block align-middle">
              <h2>Iniciar Sesión</h2>
            </div>
          </div>
          
          <div className="dropdown-divider"/>
          
          <div className="container">
            <form onSubmit={this.onLogin}>
              <div className="row">
                <div className="col-12 p-1" align="center">
                  <label htmlFor="">
                    Correo:
                  </label><br/>
                  <input type="text" value={this.state.email} onChange={this.onEmail}/>
                </div>
                <div className="col-12 p-1" align="center">
                  <label htmlFor="">
                    Contraseña:
                  </label><br/>
                  <input type="password" value={this.state.pass} onChange={this.onPass}/>
                </div>
                <div className="col-12 p-1" align="center">
                  ¿Eres nuevo? <Link to="register"> Registrate </Link>
                </div>
                <div className="col-12 p-1" align="center">
                  <input type="submit" value="Entrar" className="btn btn-warning"/>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }
  
}
