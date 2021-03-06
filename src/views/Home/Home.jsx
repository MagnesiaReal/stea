import react from 'react'
import './Home.css'
import logo from '../../images/logo.png'
import developer from '../../images/developer_activity.svg'
import { Link } from 'react-router-dom'

export default class Home extends react.Component {
  constructor(props){
    super(props);

    this.state = {valor1 : "xd"};
  }

  render(){

    return(
      <div className="stea-home">
        <header>
          <div className="container__menu">
            <div className="logo">
                <img src={logo} alt=""/>
            </div>
            <div className="menu">
                <nav>
                    <ul>
                        <li><a id="selected">Bienvenido</a></li>
                    </ul>
                </nav>
            </div>
          </div>

        </header>
        <main>
          <div className="container__cover">
            <div className="cover">
              <div className="text">
                  <h1>Nosotros somos STEA</h1>

                  <p>Nuestro objetivo es desarrollar un sistema web con el cual se puedan desarrollar
                  actividades, organizados en grupos para su facil gestión haciendo uso de la ludificación
                  
                  </p>
                  <Link to="/login">
                    <input type="button" value="Ingresar" />
                  </Link>
                                
              </div>

              <div className="svg">
                  <img src={developer} alt=""/>
              </div>
            </div>
          </div>
        </main>
        <footer className='footer'>
          
        </footer>
      </div>
    )
  }

}
