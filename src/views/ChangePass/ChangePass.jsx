import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { passwordStrength } from 'check-password-strength';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AXIOS from '../../services/http-axios';


class WrappedChangePass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPass: "",
      newPassR: "",
      targetEmail: "",
      passwordStrength: "",
      errorPass: "",
      changeSuccessfully: false,
      eye: "fas fa-eye-slash",
      btnClass: "btn btn-dark"
    };

    this.passOptions = [
      {
        id: 0,
        value: "Muy Debil   :(",
        minDiversity: 0,
        minLength: 0
      },
      {
        id: 1,
        value: "Debil    :|",
        minDiversity: 2,
        minLength: 6
      },
      {
        id: 2,
        value: "Mediana     :O",
        minDiversity: 4,
        minLength: 8
      },
      {
        id: 3,
        value: "Fuerte     :D",
        minDiversity: 4,
        minLength: 10
      }
    ]; 

    this.onSubmitNewPass = this.onSubmitNewPass.bind(this);
    this.onPass = this.onPass.bind(this);
    this.onPassR = this.onPassR.bind(this);
    this.onShowPass = this.onShowPass.bind(this);

    this.refPass = React.createRef(null);
    this.refPassR = React.createRef(null);
  }

  componentDidMount() {
    console.log(this.props.params.code);
    
    AXIOS.post('/verifychangepass', {code: this.props.params.code})
    .then((res)=> {
      
      console.log("CHANGEPASS>> ",res.data);
      this.setState({targetEmail: res.data.email});    

    }).catch(err => {

      console.log("CHANGEPASS>> ",err.response.data.message);
      this.props.navigation('/home');

    });

  }

  onSubmitNewPass (e) {
    e.preventDefault();
    console.log(this.props.params.code);

    if(this.state.newPass === this.state.newPassR) {
      if(passwordStrength(this.state.newPass, this.passOptions).id > 1) {

        const credentials = {
          code: this.props.params.code,
          pass: this.state.newPass
        }

        AXIOS.post('/changepass', credentials)
        .then(res => {
          
          console.log("CHANGEPASS>> ", res.data.message);
          this.setState({changeSuccessfully: true});

          setTimeout(()=>{
            this.props.navigation('/login');
          },5000);

        }).catch(err => {
          
          console.log("CHANGEPASS>> error: ", err);
          
        });

      } else {<i class="fa-solid fa-eye"></i>
        this.setState({errorPass: <small>la contraseña tiene que ser medianamente fuerte</small>});
      }
    } else {
      this.setState({errorPass: <small>las contraseñas no coinciden</small>});
    }

    

  }

  onPass(e) {
    this.setState({newPass: e.target.value, passStrength: <small>{passwordStrength(e.target.value, this.passOptions).value}</small>});
  }

  onPassR(e) {
    this.setState({newPassR: e.target.value});
  }

  onShowPass(e) {
    e.preventDefault();
    if(this.refPass.current.type === "password") {
      this.refPass.current.type = "text";
      this.refPassR.current.type = "text";
      this.setState({eye: "fa-solid fa-eye", btnClass: "btn btn-light"});

    } else {
      this.refPass.current.type = "password";
      this.refPassR.current.type = "password";
      this.setState({eye: "fas fa-eye-slash", btnClass: "btn btn-dark"});
    }

  }

  render() {
    
    if(this.state.changeSuccessfully) return(
      <div className="register-stea">
        <div id="propiedades-stea" className="container">
          <div className="col" align="center">
            <div className="d-inline-block align-middle">
              <h2>Usuario Verificado !!!</h2>
            </div>
          </div>
          <div className="este"></div>
          <div className="dropdown-divider"/>
          <div className="container">
            <div className="row">
              <div className="col-12 stea-register-desc m-2">
                <p align="justify">
                Contraseña cambiada con exito, serás redireccionado al inicio de sesión en algunos segundos. :)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return(
      <div className="login-stea">
          <div id="propiedades-stea" className="container">
            <div className="col" align="center">
              <div className="d-inline-block align-middle">
                <h2>Cambiar contraseña para {this.state.targetEmail}</h2>
              </div>
            </div>

            <div className="dropdown-divider"></div>
            <div className="container">
              <form onSubmit={this.onSubmitNewPass}>
                <div className="col-12 p-1" align="center">
                  <br/>
                  <label htmlFor="1">
                    Nueva contraseña:
                  </label><br/>
                  <input id="1" className="stea-login-input-text" type="password" ref={this.refPass} value={this.state.newPass} onChange={this.onPass}/><br/>
                  {this.state.passStrength}
                </div>

                <div className="col-12 p-1" align="center">
                  <br/>
                  <label htmlFor="2">
                    Repetir nueva contraseña:
                  </label><br/>
                  <input id="2" className="stea-login-input-text" type="password" ref={this.refPassR} value={this.state.newPassR} onChange={this.onPassR}/><br/>
                  {this.state.errorPass}
                </div>
                  
                <div className="col-12 col-sm-5 p-1">
                  <button className={this.state.btnClass} onClick={this.onShowPass}><FontAwesomeIcon icon={this.state.eye}/></button> Mostrar contraseña
                </div>

                <div className="col-12 p-1" align="center">
                  <input type="submit" value="Reestablecer contraseña" className="btn btn-dark"/>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }

}


export default function ChangePass(props) {
  const params = useParams();
  const navigation = useNavigate();
  return <WrappedChangePass {...props} params={params} navigation={navigation}/>
}
