import React, {useEffect} from 'react'
import AXIOS from '../../components/http-axios'
import { useNavigate } from 'react-router-dom'
import { passwordStrength } from 'check-password-strength'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Registrer.css'

class WrappedRegister extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      lastName: "",
      email: "",
      born:"",
      pass: "",
      passr: "",
      verifyview: false,
      code: "",
      successRegister: false,
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

    this.onVerify = this.onVerify.bind(this);
    this.onCode = this.onCode.bind(this);
    this.onResend = this.onResend.bind(this);

    this.onRegister = this.onRegister.bind(this);
    this.onName = this.onName.bind(this);
    this.onLastName = this.onLastName.bind(this);
    this.onEmail = this.onEmail.bind(this);
    this.onBorn = this.onBorn.bind(this);
    this.onPass = this.onPass.bind(this);
    this.onPassR = this.onPassR.bind(this);
    this.onShowPass = this.onShowPass.bind(this);

    this.refEmail = React.createRef(null);
    this.refPass = React.createRef(null);
    this.refPassr = React.createRef(null);

    if(this.props.cookie.get('UUID')) this.props.navigation(`/user/${this.props.cookie.get('userId')}`);
  }

  onVerify(e) {
    e.preventDefault();
    console.log("REGISTER>> Verifing user");

    const newUserCredentials = {
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      born: this.state.born,
      pass: this.state.pass,
      code: this.state.code
    }


    AXIOS.post('/verify', newUserCredentials)
      .then((res)=> {
        if (true) {
          
          this.props.cookie.set('userId', res.data.idUsuario, { path: '/' });
          this.props.cookie.set('UUID', res.data.uuid, { path: '/' });
          this.props.cookie.set('name', this.state.name, { path: '/'});
          this.props.cookie.set('lastName', this.state.lastName, { path: '/'});
          this.props.cookie.set('email', this.state.email, { path: '/'});
          this.props.cookie.set('born', this.state.born, { path: '/'});
          this.props.cookie.set('admin', 0, { path: '/'});
          this.props.cookie.set('configuration', null, { path: '/'});
          this.props.cookie.set('avatarId', null, { path: '/'});

          this.setState({successRegister: true});

          setTimeout(()=> {
            this.props.navigation(`/user/${res.data.idUsuario}`);
          }, 8000);

        }
      }).catch(err => {

        console.log("REGISTER>> Verify error");
        switch (err.response.status) {
          case 500:
            this.setState({errorCode: <small>* Error en el Serivdor intenta mas tarde</small>});
            break;
          case 401:
            this.setState({errorCode: <small>* Codigo incorrecto !!!</small>});
            break;
          default:
          this.setState({errorCode: <small>* Error desconocido hmm...</small>});
        }  
        if (err) throw err;

      })

  }

  onCode(e) {
    this.setState({code: e.target.value});
  }

  onResend(e) {
    e.preventDefault();
    AXIOS.post('/register', {email: this.state.email})
      .then(res=> {

        console.log("REGISTER>> ", res);
        this.setState({verifyview: true});

      }).catch((err)=>{

        if (err.response.status === 409){

          console.log("REGISTER>> Error code: ", err.response.data);
          this.setState({emailExist: <small>* Ya existe un usuario con este correo</small>})
          this.refEmail.current.className = `${this.refEmail.current.className} stea-input-error`;

        } else {

          alert("Algo salio mal Intenta mas tarde");

        }
      }) 

  }

  onRegister(e){
    e.preventDefault();
    console.log("REGISTER>> Registering user");
    if(passwordStrength(this.state.pass, this.passOptions).id < 1) {
      
      this.setState({passInfo: <small>* La contraseña debe ser medianamente fuerte</small>});
      return;

    }
    if (this.state.pass === this.state.passr) {

      AXIOS.post('/register', {email: this.state.email})
        .then(res=> {

          console.log("REGISTER>> ", res);
          this.setState({verifyview: true});

        }).catch((err)=>{

          if (err.response.status === 409){

            console.log("REGISTER>> Error code: ", err.response.data);
            this.setState({emailExist: <small>* Ya existe un usuario con este correo</small>})
            this.refEmail.current.className = `${this.refEmail.current.className} stea-input-error`;

          } else {

            alert("Algo salio mal Intenta mas tarde");

          }
        }) 

    } else {

      this.refPassr.current.className = `${this.refPassr.current.className} stea-input-error`;
      this.setState({passInfo: <small>* Las contraseñas no coinciden</small>})

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

  onBorn(e){
    this.setState({born: e.target.value});
  }

  onPass(e){
    this.setState({pass: e.target.value, passStrength: <small>{passwordStrength(e.target.value, this.passOptions).value}</small>});
    console.log(e.target.value);
  }

  onPassR(e){
    this.setState({passr: e.target.value});
  }

  onShowPass(e) {
    e.preventDefault();
    if(this.refPass.current.type === "password") {
      this.refPass.current.type = "text";
      this.refPassr.current.type = "text";
      this.setState({eye: "fa-solid fa-eye", btnClass: "btn btn-light"});

    } else {
      this.refPass.current.type = "password";
      this.refPassr.current.type = "password";
      this.setState({eye: "fas fa-eye-slash", btnClass: "btn btn-dark"});
    }

  }

  render(){

    if (this.state.successRegister) {
      return (
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
                  Felicidades, tu usuario ha sido verificado, seras redireccionado al inicio de sesión en unos segundos
                  por favor espera. :)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.verifyview) return (
      <div className="register-stea">
        <div id="propiedades-stea" className="container">
          <div className="col" align="center">
            <div className="d-inline-block align-middle">
              <h2>Verificar Usuario</h2>
            </div>
          </div>
          <div className="este"></div>

          <div className="dropdown-divider"/>

          <div className="container">
            <form onSubmit={this.onVerify}>
              <div className="row">
                <div className="col-12 stea-register-desc">
                  <p align="justify">
                  Hemos enviado un código de verificación en tu correo, por favor escribe 
                  el codigo que recibiste, el enlace expirara en 30 minutos.
                  </p>
                </div>
                <div className="col-12 p-1" align="center">
                  <input id="code" placeholder="Codigo" type="text" value={this.state.code} onChange={this.onCode} className="stea-register-input-text" required/>
                  {this.state.errorCode}
                </div>

                <div className="col-12 p-1" align="center">
                  <input type="submit" value="Verificar" className="btn btn-dark"/>
                </div>
                <div className="col-12 p-1" align="center">
                  <a href="##" id="stea-register-resend" onClick={this.onResend}>Reenviar Código</a>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    );

    return(
      <div className="register-stea">
        <div id="propiedades-stea" className="container">
          <div className="col" align="center">
            <div className="d-inline-block align-middle">
              <h2>Registrar Usuario</h2>
            </div>
          </div>
          <div className="este"></div>

          <div className="dropdown-divider"/>

          <div className="container">
            <form onSubmit={this.onRegister}>
              <div className="row">

                <div className="col-12 col-md-6 p-1">
                  <label htmlFor="name">
                  Nombre:
                  </label><br/>
                  <input id="name" placeholder="John" type="text" value={this.state.name} onChange={this.onName} className="form-control" required/>
                </div>

                <div className="col-12 col-md-6 p-1">
                  <label htmlFor="lastName">
                  Apellido:
                  </label><br/>
                  <input id="lastName" placeholder="Cena" type="text" value={this.state.lastName} onChange={this.onLastName} className="form-control" required/>
                </div>

                <div className="col-12 col-sm-7 p-1">
                  <label htmlFor="email">
                  Correo:
                  </label><br/>
                  <input id="email" type="text" ref={this.refEmail} value={this.state.email} onChange={this.onEmail} className="form-control" required/>
                  {this.state.emailExist}
                </div>

                <div className="col-12 col-sm-5 p-1">
                  <label htmlFor="born">
                  Fecha de nacimiento:
                  </label>
                  <input type="date" name="born" id="born" value={this.state.born} onChange={this.onBorn} className="form-control" required/>
                </div>


                <div className="col-12 p-1">
                  <label htmlFor="pass">
                  Contraseña:
                  </label><br/>
                  <input id="pass" ref={this.refPass} type="password" placeholder="" value={this.state.pass} onChange={this.onPass} className="form-control" required/>
                  {this.state.passStrength}
                </div>

                <div className="col-12 p-1">
                  <label htmlFor="passr">
                  Repetir contraseña:
                  </label><br/>
                  <input id="passr" type="password" placeholder="" ref={this.refPassr} value={this.state.passr} onChange={this.onPassR} className="form-control" required/>
                  {this.state.passInfo}
                </div>

                <div className="col-12 col-sm-5 p-1">
                  <button className={this.state.btnClass} onClick={this.onShowPass}><FontAwesomeIcon icon={this.state.eye}/></button> Mostrar contraseña
                </div>

                <div className="col-12 p-1" align="center">
                  <input type="submit" value="Registrar" className="btn btn-dark"/>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>    
    );

  }

}

export default function Register(props){

  const navigation = useNavigate();
  
  useEffect(()=>{
    if(props.cookie.get('UUID')) navigation(`/user/${props.cookie.get('userId')}`);
  },[]);

  return <WrappedRegister {...props} navigation={navigation}/>
}
