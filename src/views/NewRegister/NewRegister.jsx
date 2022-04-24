import react from 'react'

import './NewRegister.css'

import AXIOS from '../../services/http-axios'

export default class NewRegister extends react.Component{
  constructor(props) {
    super(props);

    this.state = {
      avatars: [],
      i: 0,
      loadingImgs: false
    }
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onNewRegister = this.onNewRegister.bind(this);
    console.log("IN NEWREGISTER");
  }

  componentDidMount() {

    AXIOS.get('/avatars',{})
    .then((res)=> {

      console.log("NEWREGISTER>> ", res.data);
      this.setState({loadingImgs: true, avatars: res.data.avatars})

    }).catch((err)=>{
      if(err) throw err;
    })
    

  }
  
  onPrev(e){
    e.preventDefault();
    console.log("i:", this.state.i);
    this.setState({i: (this.state.i === 0) ? 3 : --this.state.i});
  }

  onNext(e){
    e.preventDefault();
    this.setState({i: (this.state.i === 3) ? 0 : ++this.state.i});
  }
  
  onNewRegister(e){
    e.preventDefault();

    AXIOS.put('/newregister', {idAvatar: this.state.i+1, configuration: JSON.stringify({algo: 1}), UUID: this.props.cookie.get('UUID'), photo: null})
    .then(res => {

      console.log("NEWREGISTER>> response: ", res.data);
      this.props.cookie.set('avatarId', this.state.i+1, { path: '/' });
      this.props.cookie.set('configuration', JSON.stringify({algo:1}), {path: '/'});
      
      
      this.props.navigation(`/user/${this.props.cookie.get('userId')}`);
      this.props.setNewRegister(false);

    }).catch(err=> {

      console.log(err);

    });
  }

  render(){

    if (this.state.loadingImgs) return(
      <div className="register-stea">
        <div id="propiedades-stea" className="container">
          <div className="col" align="center">
            <div className="d-inline-block align-middle">
              <h2>Continuar Registro</h2>
            </div>
          </div>
          <div className="este"></div>
          
          <div className="dropdown-divider"/>
          
          <div className="container">
            <form onSubmit={this.onNewRegister}>
              <div className="row">

                <div className="col-12 p-1">
                  <h3>Elige un Avatar</h3>
                  <p>Los Avatars te dan ventajas significativas durante las activides, aprovecha estas ventajas para sacar una mayor puntaje</p>
                </div>
                <div className="col-12 p-1 d-flex justify-content-center align-items-center">

                  <button className="btn btn-dark" onClick={this.onPrev}> {"<<<"} </button>
                  <div className="stea-newregister-img">
                    <img src={this.state.avatars[this.state.i].avatarUrl} alt="fierro"/>
                  </div>
                  <button className="btn btn-dark" onClick={this.onNext}> {">>>"} </button>
                </div>
                <div className="col-12 p-1 stea-newregister-desc">
                  <p align="justify">{this.state.avatars[this.state.i].descripcion}</p>
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
    else return (
      <h2>Loading data</h2>
    );
  }
}
